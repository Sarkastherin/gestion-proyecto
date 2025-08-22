import type { Route } from "./+types/home";
import type { TableColumn } from "react-data-table-component";
import { BadgeStatus } from "~/components/Specific/Badge";
import { StatusOptions } from "~/components/Specific/StatusOptions";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import type { OpportunityUITable } from "~/types/opportunitiesType";
import { useData } from "~/context/DataContext";
import { EntityTable } from "~/components/Generals/EntityTable";
import { ButtonNavigate } from "~/components/Specific/Buttons";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Oportunidades" },
    { name: "description", content: "Oportunidades" },
  ];
}
const columns: TableColumn<OpportunityUITable>[] = [
  {
    name: "Id",
    selector: (row) => row.id,
    width: "80px",
    sortable: true,
  },
  {
    name: "Fecha",
    selector: (row) => {
      const dateString = row.created_at;
      const date = new Date(dateString);
      const options = {
        year: "numeric" as const,
        day: "numeric" as const,
        month: "long" as const,
      };
      return date.toLocaleString("es-AR", options);
    },
    width: "170px",
    sortable: true,
  },
  {
    name: "Nombre de la Oportunidad",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Cliente",
    selector: (row) => row.client?.nombre || "",
    width: "270px",
    sortable: true,
  },
  {
    name: "Status",
    cell: (row) => <BadgeStatus variant={row.status}>{row.status}</BadgeStatus>,
    width: "120px",
  },
  {
    name: "Creado por",
    selector: (row) => row.users?.user_name || "",
    width: "120px",
    sortable: true,
  },
];
export default function Opportunities() {
  const { getOpportunities, opportunities } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!opportunities) getOpportunities();
  }, []);

  return (
    <>
      {opportunities && (
        <EntityTable
          title="Oportunidades"
          data={opportunities}
          columns={columns}
          onRowClick={(row) => navigate(`/opportunity/${row.id}/resumen`)}
          filterFields={[
            { key: "name", label: "Buscar por descripción" },
            { key: "client.nombre", label: "Buscar por cliente" },
            {
              key: "status",
              label: "Estado",
              type: "select",
              options: <StatusOptions />,
            },
          ]}
        />
      )}
      <span className="fixed bottom-0 w-full">
        <div className="flex justify-end w-full px-10 py-5 hover:bg-zinc-200 hover:dark:bg-zinc-900">
          <div className="w-42">
            <ButtonNavigate variant="yellow" route="/new-opportunity">
              Nueva Oportunidad
            </ButtonNavigate>
          </div>
        </div>
      </span>
    </>
  );
}
