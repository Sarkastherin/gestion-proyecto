import type {
  UpdateorDeleteResponse,
  CommonResponse,
} from "~/backend/crudFactory";

export type DirtyMap<T> = Partial<Record<keyof T, boolean>>;

type Props<T> = {
  fieldsArray: T[];
  dirtyFields: Record<string, DirtyMap<T>[]>;
  fieldName: string;
  fieldsDelete: number[];
  onUpdate: (args: {
    id: number;
    values: Partial<T>;
  }) => Promise<UpdateorDeleteResponse>;
  onInsert: (data: T) => Promise<CommonResponse<T>>;
  onRemove: (id: number) => Promise<UpdateorDeleteResponse>;
};

export const updatesArrayFields = async <T extends object>({
  fieldsArray,
  dirtyFields,
  fieldName,
  fieldsDelete,
  onUpdate,
  onInsert,
  onRemove,
}: Props<T>): Promise<T[]> => {
  const dirtyArray = dirtyFields[fieldName] ?? [];
  let newData: T[] = [];
  await Promise.all(
    fieldsArray.map(async (field, i) => {
      const hasId = "id" in field;
      const dirty = dirtyArray[i] ?? {};
      const hasFieldChanged = Object.values(dirty).some((v) => v);

      if (hasId && hasFieldChanged) {
        const fieldsChanged = Object.keys(dirty) as (keyof T)[];
        const updates: Partial<T> = fieldsChanged.reduce((acc, key) => {
          acc[key] = field[key];
          return acc;
        }, {} as Partial<T>);
        const { error: errorUpdate } = await onUpdate({
          id: (field as any).id, // asegurate que id exista en tus tipos
          values: updates,
        });
        if (errorUpdate) {
          throw new Error(
            `Error actualizando el registro con id=${field.id}: ${errorUpdate.message}`
          );
        }
      } else if (!hasId) {
        const { data: dataInsert, error: errorInsert } = await onInsert(field);
        if (errorInsert) {
          console.error("Error insertando nuevo registro:", errorInsert, field);
          throw new Error(
            `Error insertando un nuevo registro: ${errorInsert.message}`
          );
        }

        if (dataInsert !== null) {
          newData = [dataInsert, ...newData];
        }
      }
    })
  );
  for (const id of fieldsDelete) {
    const { error: errorRemove } = await onRemove(id);
    if (errorRemove) {
      throw new Error(
        `Error eliminando el registro con id=${id}: ${errorRemove.message}`
      );
    }
  }
  return newData;
};
