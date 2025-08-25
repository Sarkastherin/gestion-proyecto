import type { Route } from "./+types/home";
import { EntityTable } from "~/components/Generals/EntityTable";
import { useData } from "~/context/DataContext";
import { useNavigate } from "react-router";
import { StatusOptions } from "~/components/Specific/StatusOptions";
import type { ProjectsUI } from "~/types/projectsType";
import type { TableColumn } from "react-data-table-component";
import { useEffect } from "react";
import { ContainerWithTitle } from "~/components/Generals/Containers";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Proyectos" },
    { name: "description", content: "Proyectos" },
  ];
}
const columns: TableColumn<ProjectsUI>[] = [
  { name: "Id", selector: (row) => row.id, width: "80px", sortable: true },
  {
    name: "Fecha",
    selector: (row) => new Date(row.created_at).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    width: "170px",
    sortable: true,
  },
  { name: "Nombre de la Oportunidad", selector: (row) => row.name, sortable: true },
  { name: "Cliente", selector: (row) => row.client?.nombre || "", width: "270px", sortable: true },
  { name: "Creado por", selector: (row) => row.users?.user_name || "", width: "120px", sortable: true },
];

export default function Projects() {
  const { getProjects, projects } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!projects) getProjects();
  }, []);

  return (
    <>
      {projects && (
        <ContainerWithTitle title={"Proyectos"} width="w-full">
        <EntityTable
          data={projects}
          columns={columns}
          onRowClick={(row) => navigate(`/project/${row.id}/resumen`)}
          filterFields={[
            { key: "name", label: "Buscar por descripción" },
            { key: "client.nombre", label: "Buscar por cliente" },
            { key: "status", label: "Estado", type: "select", options: <StatusOptions /> },
          ]}
        /></ContainerWithTitle>
      )}
    </>
  );
}