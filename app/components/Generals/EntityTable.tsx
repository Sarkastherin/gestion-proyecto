import React, { useState, useEffect, type JSX } from "react";
import { useForm } from "react-hook-form";
import DataTable, {createTheme,  type TableColumn } from "react-data-table-component";
import { Input, Select } from "../Forms/Inputs";
import { Button } from "../Forms/Buttons";
import { ContainerWithTitle } from "../Generals/Containers";
import { useUI } from "~/context/UIContext";
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
type FilterField = {
  key: string;
  label: string;
  type?: "text" | "select";
  options?: React.ReactNode;
};

type EntityTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  filterFields?: FilterField[];
  onRowClick?: (row: T) => void;
};

export function EntityTable<T>({
  data,
  columns,
  filterFields = [],
  onRowClick,
}: EntityTableProps<T>) {
  const {theme} =useUI()
  const { register, handleSubmit } = useForm<Record<string, string>>();
  const [filteredData, setFilteredData] = useState<T[]>(data);

  const onFilter = (filters: Record<string, string>) => {
    const result = data.filter((item) =>
      filterFields.every(({ key }) => {
        const value = filters[key]?.toLowerCase() ?? "";
        const itemValue = String((item as any)[key] ?? "").toLowerCase();
        return itemValue.includes(value);
      })
    );
    setFilteredData(result);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <>
      {filterFields.length > 0 && (
        <form className="flex gap-2 items-baseline md:flex-row flex-col" onSubmit={handleSubmit(onFilter)}>
          {filterFields.map(({ key, label, type = "text", options }) => (
            <div key={key} className="w-full">
              {type === "select" ? (
                <Select {...register(key)}>{options}</Select>
              ) : (
                <Input type="search" placeholder={label} {...register(key)} />
              )}
            </div>
          ))}
          <div className="w-32">
            <Button variant="yellow" type="submit">Filtrar</Button>
          </div>
        </form>
      )}
      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        theme={theme}
        pagination
        paginationPerPage={30}
        onRowClicked={onRowClick}
        pointerOnHover
        highlightOnHover
      />
    </>
  );
}