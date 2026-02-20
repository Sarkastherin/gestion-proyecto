import { useState } from "react";
import { ConfigFormModal } from "./ConfigFromModal";
import type { TableColumn } from "react-data-table-component";
import type { CrudMethod } from "~/backend/crudFactory";
import type { Path } from "react-hook-form";
import { useUIModals } from "~/context/ModalsContext";
import { ButtonDeleteIcon } from "./Buttons";
import { EntityTable } from "../Generals/EntityTable";
import { Subtitle } from "../Generals/Containers";
import type { IconType } from "react-icons/lib";
import type { ConfigType } from "~/routes/settings/generals";

type FormField<T> = {
  name: Path<T>;
  label: string;
  type: "text" | "boolean" | "select";
  required?: boolean;
  options?: { value: string | number; label: string }[];
  isInFilter: boolean;
};

type Props<T extends { id: number }> = {
  value: ConfigType;
  title: string;
  columns: TableColumn<T>[];
  formFields: FormField<T>[];
  data: T[];
  method: CrudMethod<T>;
  icon: IconType;
  headers: { key: string; label: string }[];
};

export const ConfigTable = <T extends { id: number }>({
  value,
  title,
  columns,
  formFields,
  data,
  method,
  icon,
  headers,
}: Props<T>) => {
  const { openModal } = useUIModals();
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
    name: "Eliminar",
    button: true,
    cell: (row) => (
      <ButtonDeleteIcon
        onClick={(e) => {
          e.stopPropagation(); // evita que se dispare el onRowClicked
          handleDelete(row);
        }}
      >
        Eliminar
      </ButtonDeleteIcon>
    ),
    width: "90px",
  };

  async function handleDelete(row: T) {
    const ok = confirm("¿Eliminar este registro?");
    if (!ok) return;
    const { error } = await method.remove({ id: row.id });
    if (error) {
      openModal("ERROR", {
        title: "Error",
        message: `No se pudo eliminar el elemento ${error.message}`,
        variant: "error",
      });
      return;
    }
    openModal("SUCCESS", {
      title: "¡Todo Ok!",
      message: "El elemento fue eliminado",
      variant: "success",
    });
  }
  const filterFields = () => {
    const form = formFields.filter((f) => f.isInFilter);
    if (form.length === 0) return undefined;
    return form.map((field) => ({
      key: field.name as string,
      label: `Buscar por ${field.label}`,
      autoFilter: true,
    }));
  };
  return (
    <div>
      <div className="my-4">
        <Subtitle
          title={title}
          back_path="/settings"
          IconComponent={{ component: icon, color: "text-orange-500" }}
        />
      </div>
      <EntityTable
        columns={[...columns, actionColumn]}
        data={data}
        onRowClick={handleOnRowClicked}
        filterFields={filterFields()}
        buttonExport={{
          headers,
          filename: `${title}`,
          type: value
        }}
        buttonOnClick={{
          onClick: handleAdd,
          title: "Agregar",
          color: "orange",
        }}
      />
      <ConfigFormModal<T>
        open={open}
        onClose={() => setOpen(false)}
        fields={formFields}
        initialValues={selected}
        method={method}
      />
    </div>
  );
};
