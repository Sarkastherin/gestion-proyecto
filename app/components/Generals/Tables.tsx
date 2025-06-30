import { createTheme } from "react-data-table-component";
import type { TableColumn } from "react-data-table-component";
import React, { useState, useEffect, type JSX } from "react";
import { useUI } from "~/context/UIContext";
import type { ListResponse } from "~/backend/crudFactory";
import { Button } from "../Forms/Buttons";
export const customStyles = {
  headCells: {
    style: {
      fontFamily: "sans-serif",
      fontWeight: "bold",
      fontSize: "15px",
    },
  },
  cells: {
    style: {
      fontFamily: "sans-serif",
      fontSize: "14px",
    },
  },
};
createTheme("dark", {
  background: {
    default: "transparent",
  },
});
createTheme("light", {
  background: {
    default: "transparent",
  },
});

const options = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
};
export type FetchResponse = {
  page: number;
  perPage: number;
};
type MyDataTableProps<T extends object> = {
  columns: TableColumn<T>[];
  fetchData: ({ page, perPage }: FetchResponse) => Promise<ListResponse<T>>;
  formFilters: React.ReactNode;
  onFilter: (perPage: number) => Promise<ListResponse<T>>;
  onRowClicked: (data: T) => void;
  paginationPerPage?: number
};

export default function MyDataTable<T extends object>({
  columns,
  fetchData,
  formFilters,
  onFilter,
  onRowClicked,
  paginationPerPage
}: MyDataTableProps<T>): JSX.Element {
  const [ClientComponent, setClientComponent] = useState<any>(null);
  const { theme } = useUI();
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [dataTable, setDataTable] = useState<T[]>([]);
  const [perPage, setPerPage] = useState<number>(paginationPerPage || 30);

  const fetching = async (page: number) => {
    setLoading(true);
    const { data, error, count } = await fetchData({ page, perPage });
    if (error) alert(error);
    setDataTable(data ?? []);
    setTotalRows(count ?? 0);
    setLoading(false);
  };
  useEffect(() => {
    // Solo se ejecuta en cliente
    import("react-data-table-component").then((mod) => {
      setClientComponent(() => mod.default);
    });
    fetching(1);
  }, []);
  const handlePageChange = async (page: number) => {
    fetching(page);
  };
  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
    fetching(page);
  };
  const handlerFilter = async () => {
    setLoading(true);
    const { data, error, count } = await onFilter(perPage);
    if (error) alert(error);
    setDataTable(data ?? []);
    setTotalRows(count ?? 0);
    setLoading(false);
  };
  if (!ClientComponent) return <div>Cargando tabla...</div>;
  return (
    <>
      <form className="flex gap-4 mt-4 items-end">
        {formFilters}
        <Button type="button" onClick={handlerFilter}>
          Filtrar
        </Button>
      </form>
      <ClientComponent
        columns={columns}
        data={dataTable}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        customStyles={customStyles}
        theme={theme}
        paginationPerPage={perPage}
        paginationComponentOptions={options}
        onRowClicked={onRowClicked}
        pointerOnHover
        highlightOnHover
      />
    </>
  );
}
