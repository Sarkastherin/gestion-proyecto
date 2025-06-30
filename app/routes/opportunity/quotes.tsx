import type { Route } from "../../+types/root";
import { useUI } from "~/context/UIContext";
import { SectionCreateQuote } from "~/components/Specific/SectionCreateQuote";
import { Outlet } from "react-router";
import { Select } from "~/components/Forms/Inputs";
import { Button } from "~/components/Forms/Buttons";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import type { ChangeEventHandler } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Oportunidad [Cotizaciones]" },
    { name: "description", content: "Oportunidad [Cotizaciones]" },
  ];
}
type PropsType = {
  key: "materiales" | "mano de obra" | "subcontratos" | "otros";
  label: string;
};
export default function Quotes() {
  const { selectedQuoteId } = useOutletContext<{
    selectedQuoteId: number | null;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState<
    "materiales" | "mano de obra" | "subcontratos" | "otros" | ""
  >("materiales");
  const {
    selectedOpportunity,
    selectedPhase,
    setSelectedPhase,
    isFieldsChanged,
    setIsFieldsChanged,
  } = useUI();
  const { phases, quotes, details_materials, details_items } =
    selectedOpportunity || {};
  const shouldShowCreateQuote = quotes?.length === 0;
  
  const handleNavigate = (t: PropsType) => {
    const href = `opportunity/${id}/quotes/${
      t.key === "materiales" ? "materials" : "items"
    }`;
    if (isFieldsChanged) {
      if (confirm("Tienes cambios sin guardar, ¿deseas continuar?")) {
        setIsFieldsChanged(false);
        navigate(href);
        setActiveType(t.key);
      }
    } else {
      navigate(href);
      setActiveType(t.key);
    }
  };
  const types: PropsType[] = [
    { key: "materiales", label: "Materiales" },
    { key: "mano de obra", label: "Mano de Obra" },
    { key: "subcontratos", label: "Subcontratos" },
    { key: "otros", label: "Otros" },
  ];
  const handleChangePhases: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const target = e.target;
    const value = target.value;
    setSelectedPhase(Number(value));
  };
  useEffect(() => {
    if (!selectedQuoteId) return;
    const materials_list = details_materials?.filter(
      (q) => q.id_quote === selectedQuoteId
    );
    const items_list = details_items?.filter(
      (q) => q.id_quote === selectedQuoteId
    );
    if (
      activeType === "materiales" &&
      materials_list &&
      materials_list.length > 0
    ) {
      const defaultPhase = materials_list[0].id_phase ?? null;
      setSelectedPhase(defaultPhase || null);
    }
    else if (activeType !== "materiales" && items_list && items_list.length > 0) {
      const firstItem = items_list.find((item) => item.type === activeType);
      const defaultPhase = firstItem?.id_phase ?? null;
      setSelectedPhase(defaultPhase || null);
    }
    else {setSelectedPhase(null)}
  }, [activeType, selectedQuoteId]);
  return (
    <>
      {shouldShowCreateQuote ? (
        <SectionCreateQuote />
      ) : (
        selectedQuoteId && (
          <div className="w-full px-8 mt-8 mx-auto pb-18">
            <section className="flex gap-4">
              {/* Selector de fase */}
              <div className="w-2/3">
                <Select
                  value={String(selectedPhase)}
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
                {types.map((t) => (
                  <div className="w-1/4" key={t.key}>
                    <Button
                      type="button"
                      onClick={() => handleNavigate(t)}
                      variant={activeType === t.key ? "primary" : "secondary"}
                      className="w-full"
                    >
                      {t.label}
                    </Button>
                  </div>
                ))}
              </div>
            </section>
            <Outlet context={{ selectedQuoteId, activeType, setActiveType }} />
          </div>
        )
      )}
    </>
  );
}
