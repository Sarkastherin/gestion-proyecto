import type { Route } from "./+types/conditions";
import { useUI } from "~/context/UIContext";
import { ContainerToForms } from "~/components/Generals/Containers";
import PhasesForm from "~/templates/PhasesForm";
import { useOpportunityRealtime } from "~/backend/realTime";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Oportunidad [Etapas]" },
    { name: "description", content: "Etapas" },
  ];
}
export default function Phases() {
  useOpportunityRealtime();
  const { selectedOpportunity } = useUI();
  const { phases, id } = selectedOpportunity || {};

  return (
    <>
      {phases && id && (
        <ContainerToForms>
          <PhasesForm mode="view" defaultValues={{ phases: phases }} idOpportunity={id} />
        </ContainerToForms>
      )}
    </>
  );
}
