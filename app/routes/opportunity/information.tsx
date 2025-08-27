import type { Route } from "../../+types/root";
import OpportunityForm from "~/templates/OpportunityForm";
import { useData } from "~/context/DataContext";
import { ContainerToForms } from "~/components/Generals/Containers";
import { useOpportunityRealtime } from "~/backend/realTime";
import { useOutletContext } from "react-router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Oportunidad [Información]" },
    { name: "description", content: "Oportunidad" },
  ];
}
export default function Information() {
  const { selectedQuoteId } = useOutletContext<{
    selectedQuoteId: number | null;
  }>();
  useOpportunityRealtime();
  const { selectedOpportunity } = useData();
  if (selectedOpportunity) {
  const { phases, quotes, ...dataOpportunity } = selectedOpportunity;
    return (
      <>
        {phases && (
          <ContainerToForms>
            <OpportunityForm initialEditMode={false} isNew={false} defaultValues={dataOpportunity} selectedQuoteId={selectedQuoteId}/>
          </ContainerToForms>
        )}
      </>
    );
  }

  return <p>No hay datos</p>;
}
