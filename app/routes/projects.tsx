import type { Route } from "./+types/home";
import { EntityTable } from "~/components/Generals/EntityTable";
import { useData } from "~/context/DataContext";
import { useNavigate } from "react-router";
import { StatusOptions } from "~/components/Specific/StatusOptions";
import type { ProjectsUITable } from "~/types/projectsType";
import type { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { ALLOWED_PROJECTS } from "~/components/auth/allowedRoles";
import { useAuth } from "~/context/AuthContext";
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
  useEffect(() => {
    if (!projects) return;
    if (user?.roles.name === "supervisor") {
      const id_supervisors = projects.flatMap((p) =>
        p.phases_project_supervisors.map((pp) => pp.id_supervisor)
      );
      const filteredProjects = projects.filter((p) =>
        id_supervisors.includes(user.id_supervisor!)
      );
      setProjectsDataSupervisor(filteredProjects);
    } else {
      setProjectsDataSupervisor(projects);
    }
  }, [projects]);

  return (
    <ProtectedRoute allowed={ALLOWED_PROJECTS}>
      {projectsDataSupervisor && (
        <ContainerWithTitle title={"Proyectos"} width="w-full">
          <EntityTable
            data={projectsDataSupervisor}
            columns={columns}
            onRowClick={(row) => navigate(`/project/${row.id}/resumen`)}
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
          />
        </ContainerWithTitle>
      )}
    </ProtectedRoute>
  );
}
