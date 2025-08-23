import { data } from "react-router";
import { supabase } from "~/backend/supabaseClient";
import type { ClientDataType } from "~/context/ContactsContext";
type EntityWithClient<T> = T & { client: ClientDataType };
interface FetchEntitiesOptions<T> {
  table: string;
  select: string;
}
export async function fetchEntities<T>({
  table,
  select,
}: FetchEntitiesOptions<T>): Promise<T[]> {
  let allData: T[] = [];
  let from = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .order("id", { ascending: false })
      .range(from, from + pageSize - 1);

    if (error)
      throw new Error(`Error al obtener datos de ${table}: ${error.message}`);
    if (!data || data.length === 0) break;

    allData = allData.concat(data as T[]);
    from += pageSize;
    if (data.length < pageSize) break;
  }
  return allData;
}
export async function setEntities<T>({
  table,
  select,
  setData,
  clients,
  clientKey,
}: FetchEntitiesOptions<T> & {
  setData: (data: T[]) => void;
  clientKey?: keyof T;
  clients?: ClientDataType[];
}): Promise<T[]> {
  if (clients && clientKey) {
    const entities = await fetchEntitiesWithClient<T>({
      table,
      select,
      clientKey,
      clients,
    });
    setData(entities);
    return entities;
  } else {
    const entities = await fetchEntities<T>({ table, select });
    setData(entities);
    return entities;
  }
}
export async function fetchEntitiesWithClient<T>({
  table,
  select,
  clientKey,
  clients,
}: FetchEntitiesOptions<T> & {
  clientKey: keyof T;
  clients: ClientDataType[];
}): Promise<T[]> {
  let allData = await fetchEntities<T>({ table, select });

  if (clients && clients.length > 0 && clientKey) {
    const enriched = allData
      .map((item) => {
        const clientId = item[clientKey];
        const client = clients.find((c) => c.id === clientId);
        if (!client) return null;
        return { ...item, client };
      })
      .filter((item): item is EntityWithClient<T> => item !== null);
    allData = enriched;
  }

  return allData;
}
