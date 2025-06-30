import { useState } from "react";
import { supabase } from "~/backend/supabaseClient";
import { Button } from "../Forms/Buttons";
import { ConfigFormModal } from "./ConfigFromModal";
import DataTable from "react-data-table-component";
import { customStyles } from "../Generals/Tables";
import { useUI } from "~/context/UIContext";
import type { TableColumn } from "react-data-table-component";
import type { CrudMethod } from "~/backend/crudFactory";
import type {Path} from "react-hook-form"

type FormField<T> = {
  name: Path<T>;
  label: string;
  type: "text" | "boolean" | "select";
  required?: boolean;
  options?: { value: string | number; label: string }[];
};

type Props<T extends { id: number }, TInsert = Partial<T>> = {
  table: string;
  title: string;
  columns: TableColumn<T>[];
  formFields: FormField<T>[];
  data: T[];
  method: CrudMethod<T, TInsert>;
};

export const ConfigTable = <T extends { id: number }, TInsert = Partial<T>>({
  table,
  title,
  columns,
  formFields,
  data,
  method,
}: Props<T, TInsert>) => {
  const { theme, showModal } = useUI();
  const [selected, setSelected] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  function handleAdd() {
    setSelected(null);
    setOpen(true);
  }
  const handleOnRowClicked = (row: T) => {
    setSelected(row);
    setOpen(true);
  };
  const actionColumn: TableColumn<T> = {
    name: "🗑️",
    button: true,
    cell: (row) => (
      <Button
        variant="danger_outline"
        size="sm"
        onClick={(e) => {
          e.stopPropagation(); // evita que se dispare el onRowClicked
          handleDelete(row);
        }}
      >
        Eliminar
      </Button>
    ),
    width: "90px",
  };

  async function handleDelete(row: T) {
    const ok = confirm("¿Eliminar este registro?");
    if (!ok) return;
    const { error } = await method.remove({ id: row.id });
    if (error) {
      showModal({
        title: "Error",
        message: "No se pudo eliminar el elmento",
        code: error.message,
        variant: "error",
      });
      return
    }
    showModal({
      title: "¡Todo Ok!",
      message: "El elemento fue eliminado",
      variant: "success",
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Agregar
        </Button>
      </div>
      <DataTable
        columns={[...columns, actionColumn]}
        data={data}
        customStyles={customStyles}
        theme={theme}
        pagination
        onRowClicked={handleOnRowClicked}
        pointerOnHover
        highlightOnHover
        defaultSortFieldId={"id"}
        defaultSortAsc={true}
      />

      <ConfigFormModal<T, TInsert>
        open={open}
        onClose={() => setOpen(false)}
        table={table}
        fields={formFields}
        initialValues={selected}
        method={method}
      />
    </div>
  );
};
