import type { TableColumn, ConditionalStyles } from "react-data-table-component";
import { useUI } from "~/context/UIContext";
import { useEffect, useState, type ChangeEvent } from "react";
import { Input } from "~/components/Forms/Inputs";
import DataTable from "react-data-table-component";
import { customStyles } from "~/components/Generals/EntityTable";
import { supabase } from "~/backend/supabaseClient";
import {BadgeStatus} from "~/components/Specific/Badge";
import type { StatusType } from "~/types/database";
type ViewType = {
  id_opportunity: number;
  quote_id: number;
  opportunity_name: string;
  opportunity_status: StatusType;
  total_materials: number;
  total_labor: number;
  total_subcontracting: number;
  total_others: number;
  gain_materials: number;
  gain_labor: number;
  gain_subcontracting: number;
  gain_others: number;
  total_quote: number;
};
export type HandleRowClicked = {
  (data: ViewType): void;
};
const columns: TableColumn<ViewType>[] = [
  {
    name: "Id",
    selector: (row) => row.id_opportunity,
    width: "80px",
  },
  {
    name: "Nombre de la Oportunidad",
    selector: (row) => row.opportunity_name,
  },
  {
    name: "Monto cotizado",
    selector: (row) =>
      (row.total_quote ?? 0).toLocaleString("es-AR", {
        style: "currency",
        currency: "USD",
      }),
      sortable: true
  },
  {
    name: "Status",
    cell: (row) => (
      <BadgeStatus variant={row.opportunity_status}>
        {row.opportunity_status}
      </BadgeStatus>
    ),
    width: "120px",
  },
];

export const OpportunityDB = ({
  handleRowClicked,
}: {
  handleRowClicked: HandleRowClicked;
}) => {
  const [data, setData] = useState<ViewType[] | null>(null);
  const [filterData, setFilterData] = useState<ViewType[] | null>(null);
  const { theme } = useUI();
  const isDark = theme === "dark";
const conditionalRowStyles: ConditionalStyles<ViewType>[] = [
  {
    when: (row) => row.total_quote <= 0,
    style: {
      color: isDark ? "#a3a3a3" : "#6b7280", // zinc-400 vs zinc-500 aprox
      backgroundColor: isDark ? "#27272a" : "#f9fafb", // dark:bg-zinc-800 vs light
      pointerEvents: "none",
      opacity: 0.6,
    },
  },
]
  useEffect(() => {
    getOpportunities();
  }, []);
  useEffect(() => {
    if (data) {
      setFilterData(data);
    }
  }, [data]);
  const onFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const searchText = target.value;
    const searchData = data?.filter((item) =>
      item.opportunity_name
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase())
    );
    setFilterData(searchData || []);
  };
  const getOpportunities = async (): Promise<void> => {
    let allData: ViewType[] = [];
    let from = 0;
    const pageSize = 1000;

    while (true) {
      const { data, error, count } = await supabase
        .from("view_resume_totals")
        .select("*")
        .order("id_opportunity", { ascending: false })
        .range(from, from + pageSize - 1);

      if (error) throw new Error("Error: " + error.message);

      if (!data || data.length === 0) break;

      allData = allData.concat(data);
      from += pageSize;
      if (data.length < pageSize) break;
    }
    setData(allData);
  };
  if (filterData)
    return (
      <>
        <Input
          type="search"
          placeholder="Buscar por descripcion"
          onChange={onFilter}
        />
        <DataTable
          columns={columns}
          data={filterData}
          customStyles={customStyles}
          theme={theme}
          pagination
          paginationPerPage={10}
          onRowClicked={handleRowClicked}
          pointerOnHover
          highlightOnHover
          conditionalRowStyles={conditionalRowStyles}
          />
      </>
    );
  return <p>Cargando datos</p>;
};
