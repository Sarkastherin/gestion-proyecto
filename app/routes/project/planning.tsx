import type { Route } from "../../+types/root";
import { ContainerToForms } from "~/components/Generals/Containers";
import { useData } from "~/context/DataContext";
import { useContacts } from "~/context/ContactsContext";
import { useModalState } from "~/components/modals_temp/particularsModals/useModalState";
import { useTasksRealtime, useOpportunityRealtime } from "~/backend/realTime";
import PlanningForm from "~/components/planning/PlanningForm";
import { Button } from "~/components/Forms/Buttons";
import CustomerRequirementModal from "~/components/modals_temp/particularsModals/CustomerRequirementModal";
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
  const customerRequirementModal = useModalState();
  const { selectedProject } = useData();
  const { employees } = useContacts();
  if (!selectedProject) return null;
  return (
    <ContainerToForms>
      <div className="mb-4 flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Checklist de requerimientos del cliente
        </span>
        <div className="w-38">
          <Button
            type="button"
            variant={selectedProject.customer_requirement ? "green" : "yellow"}
            onClick={() => customerRequirementModal.openModal()}
          >
            {selectedProject.customer_requirement ? "Validado ✔" : "Validar"}
          </Button>
        </div>
        <CustomerRequirementModal
          open={customerRequirementModal.open}
          onClose={customerRequirementModal.closeModal}
          data={{ customer_requirement: selectedProject.customer_requirement }}
        />
      </div>

      <PlanningForm
        selectedProject={selectedProject}
        employees={employees}
        personalModal={personalModal}
      />
    </ContainerToForms>
  );
}
