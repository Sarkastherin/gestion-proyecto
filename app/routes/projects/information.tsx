import type { Route } from "../+types/home";
import { ContainerToForms } from "~/components/Generals/Containers";
import { InformationForms } from "~/templates/Projects/InformationForms";
import { useData } from "~/context/DataContext";
import { useProjectRealtime } from "~/backend/realTime";
// 📌 Meta
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Información" },
    { name: "description", content: "Información del proyecto" },
  ];
}
// 🧩 Página principal
export default function Information() {
  useProjectRealtime();
  const { selectedProject } = useData();
  if (!selectedProject) return null;
  const {
    phases_project,
    budget_details_items,
    budget_details_materials,
    client,
    ...project
  } = selectedProject;
  return (
    <ContainerToForms>
      <InformationForms defaultValues={project} />
    </ContainerToForms>
  );
}
