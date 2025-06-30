import type { UpdateorDeleteResponse } from "~/backend/crudFactory";
export type DirtyMap<T> = Partial<Record<keyof T, boolean>>;

type Props<T extends { id: number }> = {
  dirtyFields: DirtyMap<T>;
  formData: T;
  onUpdate: (args: {
    id: number;
    values: Partial<T>;
  }) => Promise<UpdateorDeleteResponse>;
};

export const updateSingleRow = async <T extends { id: number }>({
  dirtyFields,
  formData,
  onUpdate,
}: Props<T>) => {
  const updatePayload = Object.entries(dirtyFields).reduce(
    (acc, [key, isDirty]) => {
      if (isDirty) {
        acc[key as keyof T] = formData[key as keyof T];
      }
      return acc;
    },
    {} as Partial<T>
  );

  if (Object.keys(updatePayload).length === 0) return;
console.log(updatePayload)
  const { error } = await onUpdate({
    id: formData.id,
    values: updatePayload,
  });

  if (error)
    throw new Error(
      `No se pudo actualizar la fila. Error: ${String(error.message)}`
    );
};
