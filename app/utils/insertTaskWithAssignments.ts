import type {
  UpdateorDeleteResponse,
  CommonResponse,
} from "~/backend/crudFactory";
import type { TaskDB, TaskAssignmentDB } from "~/types/projectsType";

export type DirtyMap<T> = Partial<Record<keyof T, boolean>>;

type Props = {
  fieldsArray: any[];
  dirtyFields: Record<string, DirtyMap<any>[]>;
  fieldName: string; // ejemplo: 'prices'
  fieldsDelete: number[];
  onUpdate: (args: {
    id: number;
    values: Partial<any>;
  }) => Promise<UpdateorDeleteResponse>;
  onInsert: (data: any) => Promise<CommonResponse<any>>;
  onRemove: (id: number) => Promise<UpdateorDeleteResponse>;
};

export const insertTaskWithAssignments = async () => {
};
