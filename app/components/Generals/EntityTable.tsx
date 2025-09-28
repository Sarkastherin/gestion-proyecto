import React, { useState, useEffect, type JSX } from "react";
import DataTable, {
  createTheme,
  type TableColumn,
} from "react-data-table-component";
import { Input, Select } from "../Forms/Inputs";
import { Button } from "../Forms/Buttons";
import { useUI } from "~/context/UIContext";
import { useLocation } from "react-router";
function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}
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
  const location = useLocation();
  const storageKey = `entityTableFilters_${location.pathname}`;
  const [filters, setFilters] = useState<Record<string, string>>(() => {
    // Recupera filtros guardados
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {};
  });
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [showFilterInfo, setShowFilterInfo] = useState(false);
  function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
  const onFilter = (newFilters: Record<string, string>) => {
    const result = data.filter((item) =>
      filterFields.every(({ key }) => {
        const value = removeAccents(newFilters[key]?.toLowerCase() ?? "");
        const itemValue = removeAccents(String(getNestedValue(item, key) ?? "").toLowerCase());
        return itemValue.includes(value);
      })
    );
    setFilteredData(result);
    setShowFilterInfo(Object.values(newFilters).some((v) => v));
  };

  const handleChange = (key: string, value: string, auto?: boolean) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated)); // Guarda filtros
    if (auto) onFilter(updated);
  };
  useEffect(() => {
    setFilteredData(data);
    setShowFilterInfo(Object.values(filters).some((v) => v));
  }, [data]);
  // ...existing code...
  useEffect(() => {
    // Aplica filtros guardados al montar si existen
    if (Object.values(filters).some((v) => v)) {
      onFilter(filters);
    } else {
      setFilteredData(data);
    }
    setShowFilterInfo(Object.values(filters).some((v) => v));
  }, [data]); // Ejecuta cuando cambia la data
  // ...existing code...
  return (
    <>
      {showFilterInfo && (
        <div className="mb-2 text-blue font-semibold text-sm">
          ℹ️ Filtros aplicados.
        </div>
      )}
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
            <div className="w-fit">
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
