import type { Route } from "../../+types/root";
import { useOutletContext } from "react-router";
import PDFQuote from "~/PDF/Quote";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Oportunidad [Informes]" },
    { name: "description", content: "Oportunidad [Informes]" },
  ];
}
export default function Report() {
  const { selectedQuoteId } = useOutletContext<{
    selectedQuoteId: number | null;
  }>();


  return (
    <div className="w-full max-w-7xl mt-8 mx-auto">
      <h2 className="text-2xl font-bold">Informe Oportunidad Id:</h2>
        {selectedQuoteId && (
          <PDFQuote quoteActive={selectedQuoteId}/>
        )}
    </div>
  );
}
