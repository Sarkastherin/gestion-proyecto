import { Select } from "../Forms/Inputs";
import { useUI } from "~/context/UIContext";
import type {ChangeEventHandler } from "react";
import { Button } from "../Forms/Buttons";
import { useNavigate, useParams } from "react-router";
import type { QuoteTypes } from "~/context/UIContext";
type Phase = {
  id: number | string;
  name: string;
};

type PropsLayout<T extends Phase> = {
  phases: T[] | undefined;
  type?: "budget" | "quotes";
  children: React.ReactNode;
};

type PropsType = {
  key: QuoteTypes;
  label: string;
};
const typesQuotes: PropsType[] = [
  { key: "materiales", label: "Materiales" },
  { key: "mano de obra", label: "Mano de Obra" },
  { key: "subcontratos", label: "Subcontratos" },
  { key: "otros", label: "Otros" },
];
export const columnsMaterialsQuote
 = [
  { groupColsClass: "w-[1%]", label: "#" },
  { groupColsClass: "", label: "Elemento cotizado" },
  { groupColsClass: "w-[10%]", label: "Unidad" },
  { groupColsClass: "w-[10%]", label: "Cantidad" },
  { groupColsClass: "w-[10%]", label: "Costo unitario" },
  { groupColsClass: "w-[10%]", label: "Total" },
  { groupColsClass: "w-[1%]", label: "🗑️" },
];
export default function QuotesAndBudgetLayout<T extends Phase>({
  phases,
  type,
  children,
}: PropsLayout<T>) {
  const {
    isFieldsChanged,
    setIsFieldsChanged,
    propsQuoteAndBudget,
    setPropsQuoteAndBudget,
  } = useUI();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleChangePhases: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const target = e.target;
    const value = target.value;
    setPropsQuoteAndBudget((prev) => ({
      ...prev,
      selsectedPhase: Number(value),
    }));
  };
  
  const getHref = (t: PropsType) => {
    if (type === "quotes") {
      return `opportunities/${id}/quotes/${t.key === "materiales" ? "materials" : "items"}`;
    }
    return `projects/${id}/budget/${t.key === "materiales" ? "materials" : "items"}`;
  };
  const handleNavigate = (t: PropsType) => {
    const href = getHref(t);
    if (isFieldsChanged) {
      if (confirm("Tienes cambios sin guardar, ¿deseas continuar?")) {
        setIsFieldsChanged(false);
        navigate(href);
        setPropsQuoteAndBudget((prev) => ({
          ...prev,
          activeType: t.key,
        }));
      }
    } else {
      navigate(href);
        setPropsQuoteAndBudget((prev) => ({
            ...prev,
            activeType: t.key,
        }));
    }
  };
  return (
    <div className="w-full px-8 mt-8 mx-auto pb-18">
      <section className="flex gap-4">
        {/* Selector de fase */}
        <div className="w-2/3">
          <Select
            value={propsQuoteAndBudget?.selsectedPhase ?? 0}
            id="id_phase"
            onChange={(e) => handleChangePhases(e)}
            disabled={isFieldsChanged}
          >
            {phases?.map((phase) => (
              <option key={phase.id} value={phase.id}>
                {`[${phase.id}] ${phase.name}`}
              </option>
            ))}
          </Select>
        </div>
        {/* Tabs por tipo */}
        <div className="w-full flex gap-2">
          {typesQuotes.map((t) => (
            <div className="w-1/4" key={t.key}>
              <Button
                type="button"
                onClick={() => handleNavigate(t)}
                variant={propsQuoteAndBudget?.activeType === t.key ? "primary" : "light"}
                className="w-full"
              >
                {t.label}
              </Button>
            </div>
          ))}
        </div>
      </section>
      {children}
    </div>
  );
}
