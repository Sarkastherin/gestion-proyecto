
import { useData } from "~/context/DataContext";
import { useEffect, useState} from "react";
import type { QuotesUI } from "~/types/opportunitiesType";
import type { PropStateReport } from "~/routes/opportunities/report";
import { PDFViewer } from "@react-pdf/renderer";
import QuotePDFDocument from "./QuotePDFDocument";

export default function PDFQuote({
  quoteActive,
  settings,
}: {
  quoteActive: number;
  settings: PropStateReport;
}) {
  const { selectedOpportunity } = useData();
  const { quotes } = selectedOpportunity || {};
  const [quote, setQuote] = useState<QuotesUI | undefined>(
    quotes?.find((q) => q.id === quoteActive)
  );

  useEffect(() => {
    setQuote(quotes?.find((q) => q.id === quoteActive));
  }, [quoteActive]);

  return (
    <div style={{ height: "calc(100vh - 270px)" }}>
      <PDFViewer key={JSON.stringify(settings)} width="100%" height="100%">
        {quote && (
          <QuotePDFDocument
            quote={quote}
            quoteId={quoteActive}
            settings={settings}
            selectedOpportunity={selectedOpportunity}
          />
        )}
      </PDFViewer>
    </div>
  );
}
