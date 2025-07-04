import type { Route } from "../../+types/root";
import { useOutletContext } from "react-router";
import { Input, Select } from "~/components/Forms/Inputs";
import { useRef } from "react";
import PDFQuote from "~/PDF/Quote";
type ReportMode =
  | "closed"
  | "byType"
  | "groupedServices"
  | "useCategory"
  | "materialsOnly"
  | "fullBreakdown"
  | "comparative"
  | "percentage"
  | "threshold"
  | "viewMode";

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
  const currencies: { value: string; label: string }[] = [
    { value: "USD", label: "Dólares americanos" },
    { value: "ARS", label: "Pesos argentinos" },
  ];
  const typeOfTable: { name: string; mode: ReportMode }[] = [
    { name: "Precio cerrado", mode: "closed" },
    { name: "Total por tipo", mode: "byType" },
    { name: "Servicios", mode: "groupedServices" },
    { name: "Directos e indirectos", mode: "useCategory" },
    { name: "Materiales + totales", mode: "materialsOnly" },
  ];
  const inputRef = useRef<HTMLSelectElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      alert(`El valor del input es: ${inputRef.current.value}`);
    } else {
      alert("El input no está disponible.");
    }
  };

  return (
    <div className="w-full mt-8 mx-auto flex gap-6 px-8">
      <div className="min-w-48 flex flex-col gap-2">
        <h3 className="text-2xl font-medium mb-6">Opciones</h3>
        <Select label="Tipo de moneda" selectText="Seleccione una modena">
          {currencies.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </Select>
        <Input label="Tasa de cambio" type="number" />
        <Select label="Modelo de tabla" onChange={handleClick}>
          {typeOfTable.map((c) => (
            <option key={c.mode} value={c.mode}>
              {c.name}
            </option>
          ))}
        </Select>
        {/* 
        1. Precio cerrado
        - Muestra un solo total global, sin desglose.
        - Ideal para ofertas paquetizadas o clientes que no necesitan ver detalle.
        2. Totales por tipo (actual)
        - Muestra los 4 bloques por separado:
        - Materiales
        - Mano de obra
        - Subcontratos
        - Otros
        3. Mano de obra + subcontratos agrupados
        - Combinación bajo la etiqueta “Servicios”.
        - Útil cuando se quiere simplificar la presentación y mostrar solo:
        - Materiales
        - Servicios
        - Otros
        4. Agrupamiento por categoría de uso
        - Separar en:
        - Directos (materiales, mano de obra)
        - Indirectos (subcontratos, otros)
        5. Mostrar solo materiales + totales
        - Ocultar mano de obra y subcontratos.
        - Puede servir cuando se necesita un listado rápido para compras.

        */}
      </div>
      <div className="w-full">
        {selectedQuoteId && <PDFQuote quoteActive={selectedQuoteId} />}
      </div>
    </div>
  );
}
