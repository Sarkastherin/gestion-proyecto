// 🌐 Imports
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import type { FC } from "react";
import type { Route } from "../../+types/root";

import { useUI } from "~/context/UIContext";

import { Card } from "~/components/Generals/Cards";
import { ContainerToForms } from "~/components/Generals/Containers";
import BadgeStatus from "~/components/Specific/Badge";

import type {
  DetailsItemsType,
  DetailsMaterialsType,
  UnitsType,
  PricesType,
} from "~/backend/dataBase";
import type { OpportunityAll } from "~/context/UIContext";
import { Button } from "~/components/Forms/Buttons";

// 📌 Meta
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nueva Oportunidad" },
    { name: "description", content: "Nueva Oportunidad" },
  ];
}

// 🔍 Utilidad para filtrar y mapear detalles según cotización activa
type ExtendedDetailsMaterials = DetailsMaterialsType & {
  unit: string | undefined;
};

const getActiveQuoteDetails = (
  opportunity: OpportunityAll | null,
  quoteId: number | null,
  units: UnitsType[]
): (ExtendedDetailsMaterials | DetailsItemsType)[] => {
  if (!opportunity || !quoteId || !units) return [];

  const materials = opportunity.details_materials
    .filter((m) => m.id_quote === quoteId)
    .map((m) => {
      const unit = units.find((u) => u.id === m.materials.id_unit)?.description;
      return { ...m, unit };
    });

  const items = opportunity.details_items.filter((i) => i.id_quote === quoteId);
  return [...materials, ...items];
};

// 🧩 Cabecera de la oportunidad
const OpportunitySummaryHeader: FC<{
  selectedOpportunity: OpportunityAll | null;
  totalQuote: number;
}> = ({ selectedOpportunity, totalQuote }) => {
  if (!selectedOpportunity) return null;

  const { name, client, created_at, phases, quotes, status } =
    selectedOpportunity;

  return (
    <Card>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          {name || "Oportunidad sin nombre"}
        </h2>
        <BadgeStatus size="md" variant={status || "No status"}>
          {status || "!"}
        </BadgeStatus>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 text-sm">
        <div>
          <span className="font-medium">Cliente:</span>{" "}
          <span>{client.nombre ?? "No especificado"}</span>
        </div>
        <div>
          <span className="font-medium">Fecha de creación:</span>{" "}
          <span>{new Date(created_at).toLocaleDateString()}</span>
        </div>
        <div className="row-span-2">
          <span className="font-medium block mb-1">Etapas:</span>
          <div className="flex flex-wrap gap-2">
            {phases?.length > 0 ? (
              phases.map((phase) => (
                <span
                  key={phase.id}
                  className="px-3 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-700 font-medium"
                >
                  {phase.name}
                </span>
              ))
            ) : (
              <span className="text-zinc-400">No definidas</span>
            )}
          </div>
        </div>
        <div>
          <span className="font-medium">Total estimado:</span>{" "}
          <span className="font-semibold">
            {totalQuote?.toLocaleString("es-AR", {
              style: "currency",
              currency: "USD",
            }) ?? "0"}
          </span>
        </div>
        <div>
          <span className="font-medium">Cotizaciones asociadas:</span>{" "}
          <span>{quotes?.length ?? 0}</span>
        </div>
      </div>
    </Card>
  );
};

// 🧾 Tabla de detalles de cotización
const QuoteDetailsTable = ({
  details,
}: {
  details: (ExtendedDetailsMaterials | DetailsItemsType)[];
}) => {
  if (!details.length)
    return (
      <p className="text-sm text-zinc-400">
        No hay detalles para esta cotización.
      </p>
    );

  return (
    <>
    <div className="flex justify-between mt-6 mb-4">
      <h2 className="text-lg font-medium">Detalle de la cotización</h2>
      <Button variant="green">Exportar</Button>
    </div>
      <div className="overflow-auto">
        <table className="min-w-full border border-zinc-300 dark:border-zinc-700 rounded-md text-sm">
          <thead className="bg-white text-zinc-600 dark:bg-zinc-900/70 dark:text-zinc-300">
            <tr>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-right">Cantidad</th>
              <th className="px-4 py-2 text-right">Unidad</th>
              <th className="px-4 py-2 text-right">Precio Unitario</th>
              <th className="px-4 py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, index) => {
              const isItem = "unit_cost" in item;
              const price = isItem
                ? item.unit_cost ?? 0
                : (item.prices as PricesType)?.price ?? 0;

              const description = isItem
                ? item.item ?? "-"
                : (item as ExtendedDetailsMaterials).materials?.description ??
                  "-";

              const unit = isItem
                ? "Unidad"
                : (item as ExtendedDetailsMaterials).unit ?? "-";

              return (
                <tr
                  key={`${item.type}-${index}`}
                  className="border-t border-zinc-300 dark:border-zinc-700"
                >
                  <td className="px-4 py-2">{item.type.toUpperCase()}</td>
                  <td className="px-4 py-2">{description}</td>
                  <td className="px-4 py-2 text-right">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">{unit}</td>
                  <td className="px-4 py-2 text-right">
                    {price.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {(item.quantity * price).toLocaleString("es-AR", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

// 🧩 Página principal
export default function Resumen() {
  const [totalQuote, setTotalQuote] = useState<number>(0);
  const [details, setDetails] = useState<
    (ExtendedDetailsMaterials | DetailsItemsType)[] | null
  >(null);

  const { selectedQuoteId } = useOutletContext<{
    selectedQuoteId: number | null;
  }>();
  const { selectedOpportunity, units, getUnits } = useUI();
  const { quotes } = selectedOpportunity || {};

  useEffect(() => {
    if (!units) getUnits();
  }, []);

  useEffect(() => {
    const quote = quotes?.find((q) => q.id === selectedQuoteId);
    if (!quote) return;

    setTotalQuote(quote.t_mg_total);
    if (units)
      setDetails(
        getActiveQuoteDetails(selectedOpportunity, selectedQuoteId, units)
      );
  }, [selectedQuoteId, units]);

  return (
    <ContainerToForms>
      <OpportunitySummaryHeader
        selectedOpportunity={selectedOpportunity}
        totalQuote={totalQuote}
      />

      {units && <QuoteDetailsTable details={details ?? []} />}
    </ContainerToForms>
  );
}
