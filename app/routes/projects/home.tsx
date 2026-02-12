import type { Route } from "../+types/home";
import { EntityTable } from "~/components/Generals/EntityTable";
import { useData } from "~/context/DataContext";
import { useNavigate } from "react-router";
import type { ProjectsUITable } from "~/types/projectsType";
import type { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { ALLOWED_PROJECTS } from "~/components/auth/allowedRoles";
import { useAuth } from "~/context/AuthContext";
import { LoaderComponent } from "~/components/Generals/LoaderComponent";
import { FolderKanban } from "lucide-react";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Proyectos" },
    { name: "description", content: "Proyectos" },
  ];
}
const columns: TableColumn<ProjectsUITable>[] = [
  { name: "Id", selector: (row) => row.id, width: "80px", sortable: true },
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
    name: "Creado por",
    selector: (row) => row.users?.user_name || "",
    width: "120px",
    sortable: true,
  },
];
const headers = [
  { label: "Id", key: "id" },
  { label: "Fecha", key: "created_at" },
  { label: "Nombre del Proyecto", key: "name" },
  { label: "Cliente", key: "client.nombre" },
  {label: "Fecha de inicio [PLAN]", key: "plan_start_date"},
  {label: "Fecha de fin [PLAN]", key: "plan_end_date"},
  {label: "Duración [PLAN]", key: "plan_duration"},
  {label: "Fecha de inicio [REAL]", key: "start_date"},
  {label: "Fecha de fin [REAL]", key: "end_date"},
  {label: "Duración [REAL]", key: "duration"},
  {label: "Status", key: "status"},
  {label: "Modalidad", key: "mode"},
  {label: "Requerimientos de cliente", key: "customer_requirement"},
  { label: "Creado por", key: "users.user_name" },
];
export default function Projects() {
  const { user } = useAuth();
  const { getProjects, projects } = useData();
  const [projectsDataSupervisor, setProjectsDataSupervisor] = useState<
    ProjectsUITable[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!projects) getProjects();
  }, []);
  
  if (!projects) return <LoaderComponent />;
  return (
    <ProtectedRoute allowed={ALLOWED_PROJECTS}>
      <ContainerWithTitle
        title={"Proyectos"}
        width="w-full"
        back_path="/"
        IconComponent={{ component: FolderKanban, color: "text-purple-500" }}
      >
        <EntityTable
          data={projects}
          columns={columns}
          onRowClick={(row) => navigate(`/projects/${row.id}/resumen`)}
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
          ]}
          buttonExport={{
            headers,
            filename: "Proyectos",
            type: "projects"
          }}
        />
      </ContainerWithTitle>
    </ProtectedRoute>
  );
}
