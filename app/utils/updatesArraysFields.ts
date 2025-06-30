import type {
  UpdateorDeleteResponse,
  CommonResponse,
} from "~/backend/crudFactory";

export type DirtyMap<T> = Partial<Record<keyof T, boolean>>;

type Props<T> = {
  fieldsArray: T[];
  dirtyFields: Record<string, DirtyMap<T>[]>;
  fieldName: string; // ejemplo: 'prices'
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
        if (errorUpdate) throw new Error(errorUpdate.message);
      } else if (!hasId) {
        const { data: dataInsert, error: errorInsert } = await onInsert(field);
        if (errorInsert) throw new Error(errorInsert.message);

        if (dataInsert !== null) {
          newData = [dataInsert, ...newData];
        }
      }
    })
  );

  for (const id of fieldsDelete) {
    const { error: errorRemove } = await onRemove(id);
    if (errorRemove) throw new Error(errorRemove.message);
  }
  return newData;
};
