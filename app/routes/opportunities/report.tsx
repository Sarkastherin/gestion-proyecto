import type { Route } from "../+types/home";
import { useOutletContext } from "react-router";
import { Input, Select } from "~/components/Forms/Inputs";
import { useState } from "react";
import PDFQuote from "~/PDF/Quote";
import { useMemo } from "react";
import {
  TextDescription,
  type ReportMode,
  type PropsModelTable,
} from "~/components/Specific/ModelDescription";
import { Button } from "~/components/Forms/Buttons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Oportunidad [Informes]" },
    { name: "description", content: "Oportunidad [Informes]" },
  ];
}
export const currencies: { value: Currencies; label: string }[] = [
  { value: "USD", label: "Dólares americanos" },
  { value: "ARS", label: "Pesos argentinos" },
];

export const modelOfTable: PropsModelTable[] = [
  {
    name: "Precio Global",
    mode: "closed",
    listDescription: [
      "Muestra un solo total global, sin desglose.",
      "Ideal para ofertas paquetizadas o clientes que no necesitan ver detalle.",
    ],
    active: true,
  },
  {
    name: "Total por tipo",
    mode: "byType",
    paragraph: "Muestra los 4 bloques por separado:",
    listDescription: ["Materiales", "Mano de obra", "Subcontratos", "Otros"],
    active: true,
  },
  {
    name: "Servicios",
    mode: "groupedServices",
    paragraph:
      "Muestra 3 bloques, agrupando mano de obra y subcontratos en una etiqueta 'Servicios':",
    listDescription: ["Materiales", "Servicios", "Otros"],
    active: false,
  },
  {
    name: "Directos e indirectos",
    mode: "useCategory",
    paragraph: "Categoriza la cotización en 2 bloques:",
    listDescription: [
      "Directos (materiales, mano de obra)",
      "Indirectos (subcontratos, otros)",
    ],
    active: false,
  },
  {
    name: "Materiales + Mano de Obra",
    mode: "materialsOnly",
    listDescription: [
      "Agrupa mano de obra, subcontratos y otros en 'Mano de Obra'",
      "Total de Materiales",
    ],
    active: true,
  },
];
type Currencies = "USD" | "ARS";
export type PropStateReport = {
  currency: Currencies;
  exchangeRate: number;
  model: ReportMode;
};
export default function Report() {
  const [settings, setSettings] = useState<PropStateReport>({
    currency: "USD",
    exchangeRate: 1,
    model: "byType",
  });
  const { selectedQuoteId } = useOutletContext<{
    selectedQuoteId: number | null;
  }>();
  const handleSettingChange = () => {
    const currencyElement = document.getElementById(
      "currency"
    ) as HTMLSelectElement | null;
    const currency = currencyElement ? currencyElement.value : "";
    const exchangeRateElement = document.getElementById(
      "exchangeRate"
    ) as HTMLSelectElement | null;
    const exchangeRate = exchangeRateElement ? exchangeRateElement.value : "";
    const modelElement = document.getElementById(
      "model"
    ) as HTMLSelectElement | null;
    const model = modelElement ? modelElement.value : "";
    setSettings({
      currency: currency as Currencies,
      exchangeRate: Number(exchangeRate),
      model: model as ReportMode,
    });
  };
  const description = useMemo(() => {
    return modelOfTable.find((t) => t.mode === settings.model);
  }, [settings.model]);
  return (
    <div className="w-full mt-8 mx-auto flex gap-6 px-8">
      <div className="w-fit">
        <h3 className="text-2xl font-medium mb-6">Opciones</h3>
        <div className="flex flex-col gap-10">
          <div>
            <Select
              id="currency"
              label="Tipo de moneda"
              selectText="Seleccione una modena"
              defaultValue={settings.currency}
            >
              {currencies.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label} {c.value === "USD" ? "🔴 🇺🇸" : "🔵 🇦🇷"}
                </option>
              ))}
            </Select>
            <Input
              id="exchangeRate"
              label="Tasa de cambio"
              type="number"
              step={0.01}
              defaultValue={settings.exchangeRate}
            />
            <Select
              id="model"
              label="Modelo de tabla"
              defaultValue={settings.model}
            >
              {modelOfTable
                .filter((c) => c.active)
                .map((item) => (
                  <option key={item.mode} value={item.mode}>
                    {item.name}
                  </option>
                ))}
            </Select>
            {description && <TextDescription description={description} />}
          </div>
          <Button variant="red" onClick={handleSettingChange}>
            Generar nuevo PDF
          </Button>
        </div>
      </div>
      <div className="w-full">
        {selectedQuoteId && (
          <PDFQuote quoteActive={selectedQuoteId} settings={settings} />
        )}
      </div>
    </div>
  );
}
