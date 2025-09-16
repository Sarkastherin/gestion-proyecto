import ProjectSummary from "~/templates/Projects/Summary";
import type { Route } from "../../+types/root";
import { useData } from "~/context/DataContext";
import { ContainerToForms } from "~/components/Generals/Containers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumen" },
    { name: "description", content: "Resumen del proyecto" },
  ];
}

export default function ProjectSummaryDemo() {
  const { selectedProject } = useData();
  if (!selectedProject) return;
  
  return (
    <ContainerToForms>
      <ProjectSummary
        project={selectedProject}
      />
    </ContainerToForms>
  );
}

