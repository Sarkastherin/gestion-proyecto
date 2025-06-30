import type { Route } from "../../+types/root";
import { ContainerToForms } from "~/components/Generals/Containers";
import ConditionsForm from "~/templates/ConditionsForm";
import { SectionCreateQuote } from "~/components/Specific/SectionCreateQuote";
import { useOutletContext } from "react-router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Oportunidad [Condiciones]" },
    { name: "description", content: "Oportunidad [Condiciones]" },
  ];
}

export default function Conditions() {
  const { selectedQuoteId } = useOutletContext<{
    selectedQuoteId: number | null;
  }>();
  if (!selectedQuoteId) return <SectionCreateQuote />;

  return (
    <>
      {selectedQuoteId && (
        <ContainerToForms>
          <ConditionsForm quoteActive={selectedQuoteId} />
        </ContainerToForms>
      )}
    </>
  );
}
