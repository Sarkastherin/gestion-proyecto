import type { Route } from "../+types/home";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { Select } from "~/components/Forms/Inputs";
import { LoaderComponent } from "~/components/Generals/LoaderComponent";
import { useData } from "~/context/DataContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nuevo reporte diario" },
    { name: "description", content: "Nuevo reporte diario" },
  ];
}

export default function NewDailyReport() {
  const navigate = useNavigate();
  const {
    selectedProject,
    refreshProject,
    projects,
    getProjects,
    getProjectById,
  } = useData();
  useEffect(() => {
    if (!projects) getProjects();
  }, []);
  const handleSelectProject = (projectId: number) => {
    navigate(`/projects/${projectId}/resumen`);
    navigate(`/projects/${projectId}/daily_reports`, {
      state: { openModal: true },
    });
  };
  if (!projects)
    return <LoaderComponent content="Cargando listado de proyectos" />;
  return (
    <ContainerWithTitle
      title="Nuevo reporte diario"
      back_path="/projects"
      IconComponent={{
        component: ClipboardDocumentCheckIcon,
        color: "text-blue-600 dark:text-blue-400",
      }}
    >
      <div className="max-w-xl mx-auto">
        <Select
          label="Selecciona un proyecto para crear un reporte diario"
          value=""
          onChange={(e) => handleSelectProject(Number(e.target.value))}
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </Select>
      </div>
    </ContainerWithTitle>
  );
}
