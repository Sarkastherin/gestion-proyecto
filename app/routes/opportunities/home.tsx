import type { Route } from "../+types/home";
import type { TableColumn } from "react-data-table-component";
import { BadgeStatus } from "~/components/Specific/Badge";
import { StatusOptions } from "~/components/Specific/StatusOptions";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import type { OpportunityUITable } from "~/types/opportunitiesType";
import { useData } from "~/context/DataContext";
import { EntityTable } from "~/components/Generals/EntityTable";
import FooterUITables from "~/components/Generals/FooterUITable";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { ALLOWED_OPPORTUNITIES } from "~/components/auth/allowedRoles";
import { BriefcaseBusiness } from "lucide-react";
import { LoaderComponent } from "~/components/Generals/LoaderComponent";
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
    selector: (row) =>
      new Date(row.created_at).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
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
    cell: (row) => <BadgeStatus status={row.status}>{row.status}</BadgeStatus>,
    width: "130px",
  },
  {
    name: "Creado por",
    selector: (row) => row.users?.user_name || "",
    width: "120px",
    sortable: true,
  },
];
export default function Opportunities() {
  const { getOpportunities, opportunities, setSelectedOpportunity } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!opportunities) getOpportunities();
  }, []);
  if (!opportunities) return <LoaderComponent />;
  return (
    <ProtectedRoute allowed={ALLOWED_OPPORTUNITIES}>
      <ContainerWithTitle
        title={"Oportunidades"}
        width="w-full"
        IconComponent={{
          component: BriefcaseBusiness,
          color: "text-green-600 dark:text-green-400",
        }}
        back_path="/"
      >
        <EntityTable
          data={opportunities}
          columns={columns}
          onRowClick={(row) => {
            setSelectedOpportunity(null);
            navigate(`/opportunities/${row.id}/resumen`);
          }}
          filterFields={[
            {
              key: "name",
              label: "Buscar por descripción",
              autoFilter: true,
            },
            {
              key: "client.nombre",
              label: "Buscar por cliente",
              autoFilter: true,
            },
            {
              key: "status",
              label: "Estado",
              type: "select",
              options: <StatusOptions />,
              autoFilter: true,
            },
          ]}
        />
      </ContainerWithTitle>
      <FooterUITables
        justify="justify-end"
        buttonNavigate={{
          title: "+ Oportunidad",
          route: "/opportunities/new-opportunity",
          color: "green",
        }}
      />
    </ProtectedRoute>
  );
}
