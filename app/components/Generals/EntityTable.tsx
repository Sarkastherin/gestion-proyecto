import React, { useState, useEffect, type JSX } from "react";
import DataTable, {
  createTheme,
  type TableColumn,
} from "react-data-table-component";
import { Input, Select } from "../Forms/Inputs";
import { Button } from "../Forms/Buttons";
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
  autoFilter?: boolean; // ← nuevo
};

type EntityTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  filterFields?: FilterField[];
  onRowClick?: (row: T) => void;
};
const options = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
};
export function EntityTable<T>({
  data,
  columns,
  filterFields = [],
  onRowClick,
}: EntityTableProps<T>) {
  const { theme } = useUI();
  const [filters, setFilters] = useState<Record<string, string>>({});
  //const { register, handleSubmit } = useForm<Record<string, string>>();
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const onFilter = (newFilters: Record<string, string>) => {
    const result = data.filter((item) =>
      filterFields.every(({ key }) => {
        const value = newFilters[key]?.toLowerCase() ?? "";
        const itemValue = String((item as any)[key] ?? "").toLowerCase();
        return itemValue.includes(value);
      })
    );
    setFilteredData(result);
  };

  const handleChange = (key: string, value: string, auto?: boolean) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    if (auto) onFilter(updated);
  };
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <>
      {filterFields.length > 0 && (
        <form
          className="flex gap-2 items-baseline md:flex-row flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            onFilter(filters);
          }}
        >
          {filterFields.map(
            ({ key, label, type = "text", options, autoFilter }) => (
              <div key={key} className="w-full">
                {type === "select" ? (
                  <Select
                    value={filters[key] ?? ""}
                    onChange={(e) =>
                      handleChange(key, e.target.value, autoFilter)
                    }
                  >
                    {options}
                  </Select>
                ) : (
                  <Input
                    type="search"
                    placeholder={label}
                    value={filters[key] ?? ""}
                    onChange={(e) =>
                      handleChange(key, e.target.value, autoFilter)
                    }
                  />
                )}
              </div>
            )
          )}
          {!filterFields.every((f) => f.autoFilter) && (
            <div className="w-32">
              <Button variant="yellow" type="submit">
                Filtrar
              </Button>
            </div>
          )}
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
        paginationComponentOptions={options}
      />
    </>
  );
}
