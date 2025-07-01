// 🌐 Imports
import { useEffect, useState, useMemo } from "react";
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
import { CSVLink, CSVDownload } from "react-csv";
import { Select } from "~/components/Forms/Inputs";

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

  // Agrupar materiales por id_material + id_price
  const materialMap = new Map<string, ExtendedDetailsMaterials>();

  const materialsRaw = opportunity.details_materials.filter(
    (m) => m.id_quote === quoteId
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

  const items: DetailsItemsType[] = opportunity.details_items.filter(
    (i) => i.id_quote === quoteId
  );

  return [...groupedMaterials, ...items];
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
type DetailItem = ExtendedDetailsMaterials | DetailsItemsType;

interface Props {
  details: DetailItem[];
}
export const QuoteDetailsTable = ({ details }: Props) => {
  const [filterType, setFilterType] = useState<string>("Todos");
  const [separator, setSeparator] = useState<"," | ";">(";");

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
        <div className="text-sm inline-flex divide-x divide-gray-300 overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm dark:divide-zinc-700 dark:border-zinc-700 dark:bg-zinc-800">
          {/* Botón Exportar */}
          <CSVLink
            data={filtered}
            headers={headers}
            separator={separator}
            className="bg-green-600 text-white dark:text-zinc-800 px-3 py-1.5 font-medium hover:bg-green-700 transition"
          >
            Exportar
          </CSVLink>

          {/* Selector de separador */}
          <div className="relative">
            <select
              className="dark:bg-zinc-800 appearance-none w-full h-full px-3 py-1.5 text-gray-700 dark:text-zinc-200 bg-transparent pr-8 focus:outline-none cursor-pointer"
              onChange={(e) => setSeparator(e.target.value as "," | ";")}
              value={separator}
            >
              <option disabled>Separador</option>
              <option value=",">coma [,]</option>
              <option value=";">punto y coma [;]</option>
            </select>

            {/* Ícono de flecha */}
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-zinc-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
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
