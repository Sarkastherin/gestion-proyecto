import type { Route } from "../../+types/root";
import { ContainerToForms } from "~/components/Generals/Containers";
import { InformationForms } from "~/templates/Projects/InformationForms";
import { useData } from "~/context/DataContext";
// 📌 Meta
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Información" },
    { name: "description", content: "Información del proyecto" },
  ];
}
// 🧩 Página principal
export default function Information() {
  const { selectedProject } = useData();
  if (!selectedProject) return null;
  const { phases_project, budget_items, budget_materials, client, ...project } =
    selectedProject;
  return (
    <ContainerToForms>
      <InformationForms defaultValues={project} />
    </ContainerToForms>
  );
}
