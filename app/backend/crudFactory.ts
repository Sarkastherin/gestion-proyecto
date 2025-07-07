import { supabase } from "./supabaseClient";

export type CommonResponse<TFull> = {
  data: TFull | null;
  error: Error | null;
};
export type ListResponse<TFull> = {
  data: TFull[] | null;
  error: Error | null;
  count: number | null;
};
export type UpdateorDeleteResponse = {
  status: number | null;
  error: Error | null;
};
type FilterOptions = {
  searchText?: string;
  columnsToSearch?: string[];
  exactFilters?: { [column: string]: string | number };
  rangeFilters?: { [column: string]: { min?: number; max?: number } };
  page?: number; // número de página, empezando desde 1
  pageSize?: number; // cantidad de registros por página
};
export type CrudMethod<TFull, TInsert = Partial<TFull>> = {
  insertOne: (data: TInsert) => Promise<CommonResponse<TFull>>;
  update: (args: { id: number; values: Partial<TFull> }) => Promise<UpdateorDeleteResponse>;
  remove: (args: { id: number }) => Promise<UpdateorDeleteResponse>;
};

export const createCrud = <TFull, TInsert extends object>(table: string) => {
  return {
    insertOne: async (payload: TInsert): Promise<CommonResponse<TFull>> => {
      try {
        const { data, error } = await supabase
          .from(table)
          .insert([payload])
          .select();
        if (error) throw error;

        return { data: data?.[0] ?? null, error: null };
      } catch (err) {
        return {
          data: null,
          error:
            err instanceof Error
              ? err
              : new Error(
                  typeof err === "object" && err !== null && "message" in err
                    ? (err as any).message
                    : String(err)
                ),
        };
      }
    },
    insert: async (payload: TInsert[]): Promise<CommonResponse<TFull[]>> => {
      try {
        const { data, error } = await supabase
          .from(table)
          .insert(payload)
          .select();
        if (error) throw error;

        return { data: data ?? null, error: null };
      } catch (err) {
        return {
          data: null,
          error:
            err instanceof Error
              ? err
              : new Error(
                  typeof err === "object" && err !== null && "message" in err
                    ? (err as any).message
                    : String(err)
                ),
        };
      }
    },
    getAll: async (options: FilterOptions): Promise<ListResponse<TFull>> => {
      // Paginacion
      const page = options.page ?? 1;
      const pageSize = options.pageSize ?? 100;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      try {
        const { data, error, count } = await supabase
          .from(table)
          .select("*", { count: "exact" })
          .order("id", { ascending: true })
          .range(from, to);
        if (error) throw error;
        return { data: data ?? [], error: null, count };
      } catch (err) {
        return {
          data: null,
          error: err instanceof Error
              ? err
              : new Error(
                  typeof err === "object" && err !== null && "message" in err
                    ? (err as any).message
                    : String(err)
                ),
          count: null,
        };
      }
    },
    getById: async ({ id }: { id: number }): Promise<CommonResponse<TFull>> => {
      try {
        const { data, error } = await supabase
          .from(table)
          .select("*")
          .eq("id", id);
        if (error) throw error;
        return { data: data?.[0] ?? null, error: null };
      } catch (err) {
        console.log(err);
        return {
          data: null,
          error: err instanceof Error
              ? err
              : new Error(
                  typeof err === "object" && err !== null && "message" in err
                    ? (err as any).message
                    : String(err)
                ),
        };
      }
    },
    getDataByAnyColumn: async ({
      column,
      id,
    }: {
      column: string;
      id: number;
    }): Promise<ListResponse<TFull>> => {
      try {
        const { data, error, count } = await supabase
          .from(table)
          .select("*")
          .eq(column, id);
        if (error) throw error;
        return { data: data ?? [], error: null, count };
      } catch (err) {
        return {
          data: null,
          error: err instanceof Error
              ? err
              : new Error(
                  typeof err === "object" && err !== null && "message" in err
                    ? (err as any).message
                    : String(err)
                ),
          count: null,
        };
      }
    },
    update: async ({id,values}: {id: number; values: Partial<TFull>}): Promise<UpdateorDeleteResponse> => {
      try {
        const { status, error } = await supabase
          .from(table)
          .update(values)
          .eq("id", id);
        if (error) throw error;
        return { status, error: null };
      } catch (err) {
        return {
          status: null,
          error: err instanceof Error
              ? err
              : new Error(
                  typeof err === "object" && err !== null && "message" in err
                    ? (err as any).message
                    : String(err)
                ),
        };
      }
    },
    remove: async ({ id }: { id: number }): Promise<UpdateorDeleteResponse> => {
      try {
        const { status, error } = await supabase
          .from(table)
          .delete()
          .eq("id", id);

        if (error) throw error;
        return { status, error: null };
      } catch (err: any) {
        if (err.code === "23503") {
          return {
            status: null,
            error: new Error(
              "No se puede eliminar este registro porque está siendo utilizado en otra tabla."
            ),
          };
        }

        return {
          status: null,
          error: err instanceof Error
              ? err
              : new Error(
                  typeof err === "object" && err !== null && "message" in err
                    ? (err as any).message
                    : String(err)
                ),
        };
      }
    },

    filter: async (options: FilterOptions): Promise<ListResponse<TFull>> => {
      try {
        let query = supabase.from(table).select("*", { count: "exact" });
        // Filtro OR con ilike para múltiples columnas
        if (options.searchText && options.columnsToSearch?.length) {
          const onFilters = options.columnsToSearch
            .map((col) => `${col}.ilike.%${options.searchText}%`)
            .join(",");
          query = query.or(onFilters);
        }
        // Filtros exactos con eq
        if (options.exactFilters) {
          for (const [column, value] of Object.entries(options.exactFilters)) {
            if (value !== "") {
              query = query.eq(column, value);
            }
          }
        }
        // Filtros de rango (gte/lte)
        if (options.rangeFilters) {
          for (const [column, range] of Object.entries(options.rangeFilters)) {
            if (range.min !== undefined) {
              query = query.gte(column, range.min);
            }
            if (range.max !== undefined) {
              query = query.gte(column, range.max);
            }
          }
        }
        // Paginacion
        const page = options.page ?? 1;
        const pageSize = options.pageSize ?? 10;
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        query = query.range(from, to);
        const { data, error, count } = await query;

        if (error) throw error;

        return { data: data ?? [], error: null, count };
      } catch (err) {
        console.log(err);
        return {
          data: null,
          error: err instanceof Error
              ? err
              : new Error(
                  typeof err === "object" && err !== null && "message" in err
                    ? (err as any).message
                    : String(err)
                ),
          count: null,
        };
      }
    },
    getDataByEveryIds: async (
      ids: number[],
      column: string
    ): Promise<ListResponse<TFull>> => {
      try {
        const { data, error, count } = await supabase
          .from(table)
          .select("*", { count: "exact" })
          .in(column, ids);
        if (error) throw error;
        return { data: data ?? [], error: null, count };
      } catch (err) {
        return {
          data: null,
          error: err instanceof Error
              ? err
              : new Error(
                  typeof err === "object" && err !== null && "message" in err
                    ? (err as any).message
                    : String(err)
                ),
          count: null,
        };
      }
    },
  };
};
