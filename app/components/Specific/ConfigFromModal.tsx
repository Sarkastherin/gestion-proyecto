import { useEffect, useState } from "react";
import { supabase } from "~/backend/supabaseClient";
import { Button } from "../Forms/Buttons";
import { useForm } from "react-hook-form";
import { Input, Select } from "../Forms/Inputs";
import { LayoutModal } from "../Generals/Modals";
import type { DefaultValues, Path } from "react-hook-form";
import { useUI } from "~/context/UIContext";
import { updateSingleRow, type DirtyMap } from "~/utils/updatesSingleRow";
import type { CrudMethod } from "~/backend/crudFactory";

type Field<T> = {
  name: Path<T>;
  label: string;
  type: "text" | "boolean" | "select";
  required?: boolean;
  options?: { value: string | number; label: string }[];
};

type Props<T extends { id: number }, TInsert = Partial<T>> = {
  open: boolean;
  table: string;
  fields: Field<T>[];
  onClose: () => void;
  initialValues: DefaultValues<T>;
  method: CrudMethod<T, TInsert>;
};

export function ConfigFormModal<T extends { id: number }, TInsert = Partial<T>>({
  open,
  table,
  fields,
  initialValues,
  method,
  onClose,
}: Props<T, TInsert>) {
  const { showModal } = useUI();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<T>({ defaultValues: initialValues });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  const onSubmit = async (data: T | TInsert) => {
    try {
      if (initialValues?.id) {
        await updateSingleRow<T>({
          dirtyFields: dirtyFields as DirtyMap<T>,
          formData: data as T & { id: number },
          onUpdate: method.update,
        });
      } else {
        const {error} = await method.insertOne(data as TInsert);
        if (error) throw new Error(error.message)
      }
      showModal({
        title: "¡Todo OK!",
        message: `Configuracion actualizada`,
        variant: "success",
      });
    } catch (err) {
      showModal({
        title: "Error al actualizar",
        message: `No se pudo actualizar la configuración:`,
        code: String(err),
        variant: "error",
      });
    }
    finally {
      onClose()
    }
  };

  if (!open) return null;
  return (
    <LayoutModal
      open={open}
      title={`${initialValues?.id ? "Editar" : "Agregar"} registro`}
      handleOpen={onClose}
      size="w-md min-w-xs"
    >
      <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((f) => (
          <div key={f.name}>
            {f.type === "text" && (
              <Input
                label={f.label}
                {...register(f.name as Path<T>, { required: f.required })}
              />
            )}

            {f.type === "boolean" && (
              <label className="inline-flex gap-2 text-sm items-center">
                <input type="checkbox" {...register(f.name as Path<T>)} />
                {f.label}
              </label>
            )}

            {f.type === "select" && (
              <>
                <label
                  htmlFor={f.name}
                  className="block text-sm font-medium mb-1"
                >
                  {f.label}
                </label>
                <Select
                  {...register(f.name as Path<T>, { required: f.required })}
                  defaultValue=""
                >
                  <option value="">— Seleccionar —</option>
                  {f.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </>
            )}
          </div>
        ))}

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="secondary_outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {initialValues?.id ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </LayoutModal>
  );
}
