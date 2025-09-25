import type { Route } from "../../+types/root";
import { ContainerToForms } from "~/components/Generals/Containers";
import { useData } from "~/context/DataContext";
import { useContacts } from "~/context/ContactsContext";
import { useModalState } from "~/components/modals_temp/particularsModals/useModalState";
import { useTasksRealtime, useOpportunityRealtime } from "~/backend/realTime";
import PlanningForm from "~/components/planning/PlanningForm";
// 📌 Meta
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Planificación" },
    { name: "description", content: "Planificación del proyecto" },
  ];
}
export type PersonalModalPayload = {
  activeIndex: number | null;
};
// 🧩 Página principal
export default function Planning() {
  useOpportunityRealtime();
  useTasksRealtime();
  const personalModal = useModalState<PersonalModalPayload>();
  const { selectedProject } = useData();
  const { employees } = useContacts();
  if (!selectedProject) return null;
  
  return (
    <ContainerToForms>
      <PlanningForm
        selectedProject={selectedProject}
        employees={employees}
        personalModal={personalModal}
      />
    </ContainerToForms>
  );
}
