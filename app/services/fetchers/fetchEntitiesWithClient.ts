import { supabase } from "~/backend/supabaseClient";
import type { ContactsDataType, EmployeesDataType } from "~/context/ContactsContext";
type EntityWithClient<T> = T & { client: ContactsDataType };
type EntityWithEmployee<T> = T & { employee: EmployeesDataType };
interface FetchEntitiesOptions<T> {
  table: string;
  select: string;
  id_name?: string;
}
export async function fetchEntities<T>({
  table,
  select,
  id_name,
}: FetchEntitiesOptions<T>): Promise<T[]> {
  let allData: T[] = [];
  let from = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .order(id_name ? id_name : "id", { ascending: false })
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
  id_name,
  employeeKey,
  employees,
}: FetchEntitiesOptions<T> & {
  setData: (data: T[]) => void;
  clientKey?: keyof T;
  clients?: ContactsDataType[];
  employeeKey?: keyof T;
  employees?: EmployeesDataType[];
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
  } 
  else if (employees && employeeKey) {
    const entities = await fetchEntitiesWithEmployees<T>({
      table,
      select,
      employeeKey,
      employees,
    });
    setData(entities);
    return entities;
  }
  else {
    if(table === "holidays") console.log("Fetching holidays without client enrichment");
    const entities = await fetchEntities<T>({ table, select, id_name });
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
  clients: ContactsDataType[];
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
export async function fetchEntitiesWithEmployees<T>({
  table,
  select,
  employeeKey,
  employees,
}: FetchEntitiesOptions<T> & {
  employeeKey: keyof T;
  employees: EmployeesDataType[];
}): Promise<T[]> {
  let allData = await fetchEntities<T>({ table, select });

  if (employees && employees.length > 0 && employeeKey) {
    const enriched = allData
      .map((item) => {
        const employeeId = item[employeeKey];
        const employee = employees.find((c) => c.id === employeeId);
        if (!employee) return null;
        return { ...item, employee };
      })
      .filter((item): item is EntityWithEmployee<T> => item !== null);
    allData = enriched;
  }

  return allData;
}
