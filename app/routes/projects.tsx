import type { Route } from "./+types/home";
import { EntityTable } from "~/components/Generals/EntityTable";
import { useData } from "~/context/DataContext";
import { useNavigate } from "react-router";
import { StatusOptions } from "~/components/Specific/StatusOptions";
import type { ProjectsUITable } from "~/types/projectsType";
import type { TableColumn } from "react-data-table-component";
import { useEffect } from "react";
import { ContainerWithTitle } from "~/components/Generals/Containers";
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
        month: "long",
        day: "numeric",
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
  const { getProjects, projects } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!projects) getProjects();
  }, []);

  return (
    <>
      {projects && (
        <ContainerWithTitle title={"Proyectos"} width="w-full">
          {import.meta.env.VITE_SHOW_DEBUG === "true" ? (
            <EntityTable
              data={projects}
              columns={columns}
              onRowClick={(row) => navigate(`/project/${row.id}/resumen`)}
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
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-zinc-600 dark:text-zinc-400 mt-20">
              <span className="text-2xl font-semibold mb-2">
                🛠️ Proyectos en construcción
              </span>
              <p className="max-w-md">
                Se esta creando la interfaz de proyectos. Muy pronto vas a poder
                gestionar tus proyectos de manera más eficiente.
              </p>
            </div>
          )}
        </ContainerWithTitle>
      )}
    </>
  );
}
