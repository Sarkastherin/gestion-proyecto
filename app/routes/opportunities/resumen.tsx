// 🌐 Imports
import { useEffect, useState, useMemo } from "react";
import { useOutletContext } from "react-router";
import type { FC } from "react";
import type { Route } from "../../+types/root";

import { useUI } from "~/context/UIContext";
import { useData } from "~/context/DataContext";

import { Card } from "~/components/Generals/Cards";
import { ContainerToForms } from "~/components/Generals/Containers";
import { BadgeStatus, Badge } from "~/components/Specific/Badge";

import { ButtonExport } from "~/components/Specific/Buttons";
import { BriefcaseIcon } from "@heroicons/react/16/solid";
import type { OpportunityAndQuotesUI, DetailsMaterialsUI, DetailsItemsDB } from "~/types/opportunitiesType";
import type { PricesDB, UnitsDB } from "~/types/materialsType";
// 📌 Meta
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nueva Oportunidad" },
    { name: "description", content: "Nueva Oportunidad" },
  ];
}

// 🔍 Utilidad para filtrar y mapear detalles según cotización activa
type ExtendedDetailsMaterials = DetailsMaterialsUI & {
  unit: string | undefined;
};

const getActiveQuoteDetails = (
  opportunity: OpportunityAndQuotesUI | null,
  quoteId: number | null,
  units: UnitsDB[]
): (ExtendedDetailsMaterials | DetailsItemsDB)[] => {
  if (!opportunity || !quoteId || !units) return [];

  // Agrupar materiales por id_material + id_price
  const materialMap = new Map<string, ExtendedDetailsMaterials>();

  const materialsRaw = opportunity.details_materials.filter(
  (m: any) => m.id_quote === quoteId
  );

  for (const m of materialsRaw) {
    const key = `${m.id_material}-${m.id_price}`;
    const unit = units.find((u) => u.id === m.materials.id_unit)?.description;
    const existing = materialMap.get(key);

    if (existing) {
      materialMap.set(key, {
        ...existing,
        quantity: existing.quantity + m.quantity, // sumamos cantidades
      });
    } else {
      materialMap.set(key, {
        ...m,
        unit,
      });
    }
  }

  const groupedMaterials = Array.from(materialMap.values());

  const items: DetailsItemsDB[] = opportunity.details_items.filter(
  (i: any) => i.id_quote === quoteId
  );

  return [...groupedMaterials, ...items];
};

// 🧩 Cabecera de la oportunidad
const OpportunitySummaryHeader: FC<{
  selectedOpportunity: OpportunityAndQuotesUI | null;
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
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          {selectedOpportunity.id_project && (
            <Badge variant="green">
            <div className="flex items-center gap-1">
              <BriefcaseIcon className="w-5" /> Proyecto creado
            </div>
          </Badge>
          )}
          <BadgeStatus status={status || "default"}>
            {status || "!"}
          </BadgeStatus>
        </div>
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
              phases.map((phase: any) => (
                <span
                  key={phase.id}
                  className="px-3 py-0.5 rounded-full text-xs bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-300 font-medium"
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
type DetailItem = ExtendedDetailsMaterials | DetailsItemsDB;

interface Props {
  details: DetailItem[];
}
export const QuoteDetailsTable = ({ details }: Props) => {
  const [filterType, setFilterType] = useState<string>("Todos");

  const uniqueTypes = useMemo(() => {
    const types = new Set(details.map((item) => item.type));
    return ["Todos", ...Array.from(types)];
  }, [details]);

  const filtered = useMemo(() => {
    return filterType === "Todos"
      ? details
      : details.filter((item) => item.type === filterType);
  }, [details, filterType]);

  if (!details.length) {
    return (
      <p className="text-sm text-zinc-400">
        No hay detalles para esta cotización.
      </p>
    );
  }
  const headers = [
    { label: "TIPO", key: "type" },
    { label: "ID MATERIAL", key: "materials.id" },
    { label: "DESCRIPCION MATERIAL", key: "materials.description" },
    { label: "DESCRIPCION ITEM", key: "item" },
    { label: "CANTIDAD", key: "quantity" },
    { label: "PRECIO UNITARIO", key: "prices.price" },
    { label: "PRECIO UNITARIO", key: "unit_cost" },
    { label: "UNIDAD", key: "unit" },
  ];
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6 mb-4 sm:items-center">
        <h2 className="text-lg font-medium">Detalle de la cotización</h2>
        <div className="flex gap-2 flex-wrap">
          {uniqueTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`text-sm px-3 py-1 rounded-full border ${
                filterType === type
                  ? "bg-yellow-200 text-yellow-700 border-yellow-400"
                  : "bg-zinc-100 text-zinc-500 border-zinc-300 dark:bg-zinc-700 dark:border-zinc-700 dark:text-zinc-400"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <ButtonExport
          data={filtered}
          headers={headers}
          filename={`detalle_cotizacion_${
            details[0].id_quote
          }_${filterType.toLocaleLowerCase()}`}
          type="resumen"
        />
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
            {filtered.map((item, index) => {
              const isItem = "unit_cost" in item;
              const price = isItem
                ? item.unit_cost ?? 0
                : (item.prices as PricesDB)?.price ?? 0;

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
    (ExtendedDetailsMaterials | DetailsItemsDB)[] | null
  >(null);

  const { selectedQuoteId } = useOutletContext<{
    selectedQuoteId: number | null;
  }>();
  const { units, getUnits } = useData();
  const { selectedOpportunity } = useData();
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
