import type { TableColumn } from "react-data-table-component";
import type { MaterialsType } from "~/backend/dataBase";
import { useUI } from "~/context/UIContext";
import { useEffect, useState, type ChangeEvent } from "react";
import { Input } from "~/components/Forms/Inputs";
import DataTable from "react-data-table-component";
import type { MaterialsUI } from "~/types/materialsType";
import { customStyles } from "~/components/Generals/EntityTable";
import { useMaterialsRealtime } from "~/backend/realTime";
export type HandleRowClicked = {
  (data: MaterialsUI): void;
};
const columns: TableColumn<MaterialsUI>[] = [
  {
    name: "Id",
    selector: (row) => row.id,
    width: "80px",
  },
  {
    name: "Descripcion",
    selector: (row) => row.description,
  },
  {
    name: "Sub-rubro",
    selector: (row) => row.view_categorizations.description_subcategory,
    width: "250px",
  },
  {
    name: "Rubro",
    selector: (row) => row.view_categorizations.description_category,
    width: "250px",
  },
  {
    name: "Familia",
    selector: (row) => row.view_categorizations.description_family,
    width: "250px",
  },
];
export const MaterialTable = ({
  handleRowClicked,
  paginationPerPage,
}: {
  handleRowClicked: HandleRowClicked;
  paginationPerPage?: number;
}) => {
  const [filterData, setFilterData] = useState<MaterialsUI[] | null>(null);
  const { getMaterials, materials, theme } = useUI();
  useEffect(() => {
    if (!materials) getMaterials();
  }, []);
  useEffect(() => {
    if (materials) {
      setFilterData(materials);
    }
  }, [materials]);
  const onFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const searchText = target.value;
    const searchData = materials?.filter((item) =>
      item.description
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase())
    );
    setFilterData(searchData || []);
  };
  if (filterData)
    return (
      <>
        <Input
          type="search"
          placeholder="Buscar por descripcion"
          onChange={onFilter}
        />
        <DataTable
          columns={columns}
          data={filterData}
          customStyles={customStyles}
          theme={theme}
          pagination
          paginationPerPage={paginationPerPage}
          onRowClicked={handleRowClicked}
          pointerOnHover
          highlightOnHover
        />
      </>
    );
  return <p>Cargando datos</p>;
};
