import type { Route } from "../../+types/root";
import OpportunityForm from "~/templates/OpportunityForm";
import { useUI } from "~/context/UIContext";
import { ContainerToForms } from "~/components/Generals/Containers";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Oportunidad [Información]" },
    { name: "description", content: "Oportunidad" },
  ];
}
export default function Information() {
  const { selectedOpportunity } = useUI();
  if (selectedOpportunity) {
    const { phases, details_items, details_materials, quotes, ...dataOpportunity } = selectedOpportunity;
    return (
      <>
        {phases && (
          <ContainerToForms>
            <OpportunityForm mode="view" defaultValues={dataOpportunity} />
          </ContainerToForms>
        )}
      </>
    );
  }

  return <p>No hay datos</p>;
}
