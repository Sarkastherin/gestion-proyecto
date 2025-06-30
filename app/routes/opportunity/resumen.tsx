import type { Route } from "../../+types/root";
import { useAuth } from "~/context/AuthContext";
import { Card } from "~/components/Generals/Cards";
import { useUI } from "~/context/UIContext";
import BadgeStatus from "~/components/Specific/Badge";
import { ContainerToForms } from "~/components/Generals/Containers";
import { useOutletContext } from "react-router";
import { useEffect, useState } from "react";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nueva Oportunidad" },
    { name: "description", content: "Nueva Oportunidad" },
  ];
}
function DataField({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="flex-none flex items-center font-semibold">
        {label}:
      </span>
      <span
        className={`bg-zinc-200/50 dark:bg-zinc-700/50 rounded-lg w-full px-4 py-1.5 min-h-8`}
      >
        {value}
      </span>
    </div>
  );
}
export default function Resumen() {
  const [totalQuote, setTotalQuote] = useState<number>(0);
  const { selectedQuoteId } = useOutletContext<{
    selectedQuoteId: number | null;
  }>();
  const { selectedOpportunity, selectedClient } = useUI();

  useEffect(() => {
    const { quotes } = selectedOpportunity || {};
    const quote = quotes?.find((q) => q.id === selectedQuoteId);
    if (!quote) return;
    setTotalQuote(quote.t_mg_total);
  }, [selectedQuoteId]);
  return (
    <ContainerToForms>
      <h2 className="text-2xl font-bold">Resumen Oportunidad Id:</h2>
      <div className="flex flex-col gap-4 mt-4">
        <Card>
          <div className="flex flex-col gap-2">
            <DataField
              label={"Nombre de Oportunidad"}
              value={selectedOpportunity?.name || ""}
            />
            <DataField label={"Cliente"} value={selectedClient?.nombre || ""} />

            <DataField
              label={"Alcance"}
              value={selectedOpportunity?.scope || ""}
            />
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-2">
            <DataField
              label={"Monto de Cotización"}
              value={
                totalQuote?.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "USD",
                }) || "$ 0.00"
              }
            />
            <div className="flex justify-between mb-2 gap-4 text-sm">
              <span className="flex-none flex items-center font-semibold">
                {"Status"}:
              </span>
              <span className="px-5 py-0.5 w-full">
                <BadgeStatus
                  variant={selectedOpportunity?.status || "No status"}
                >
                  {selectedOpportunity?.status || "!"}
                </BadgeStatus>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </ContainerToForms>
  );
}
