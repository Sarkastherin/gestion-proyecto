import type { Route } from "../../+types/root";
import { useUI } from "~/context/UIContext";
import { SectionCreateQuote } from "~/components/Specific/SectionCreateQuote";
import { useEffect } from "react";
import { useParams, useNavigate, useOutletContext, Outlet } from "react-router";
import { useOpportunityRealtime } from "~/backend/realTime";
import { useData } from "~/context/DataContext";
import QuotesAndBudgetLayout from "~/components/QuotesAndBudgets/QuotesAndBudgetLayout";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Oportunidad [Cotizaciones]" },
    { name: "description", content: "Oportunidad [Cotizaciones]" },
  ];
}
export type PropsType = {
  key: "materiales" | "mano de obra" | "subcontratos" | "otros";
  label: string;
};
export const typesQuotes: PropsType[] = [
  { key: "materiales", label: "Materiales" },
  { key: "mano de obra", label: "Mano de Obra" },
  { key: "subcontratos", label: "Subcontratos" },
  { key: "otros", label: "Otros" },
];
export default function Quotes() {
  useOpportunityRealtime();
  const { selectedQuoteId } = useOutletContext<{
    selectedQuoteId: number | null;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setPropsQuoteAndBudget } = useUI();
  const { selectedOpportunity } = useData();
  const { phases, quotes, details_materials, details_items } =
    selectedOpportunity || {};
  const shouldShowCreateQuote = quotes?.length === 0;

  useEffect(() => {
    getDefaultPhase();
  }, [selectedQuoteId]);
  const getDefaultPhase = () => {
    if (!selectedQuoteId) return;
    const materials_list = details_materials?.filter(
      (q) => q.id_quote === selectedQuoteId
    );
    const items_list = details_items?.filter(
      (q) => q.id_quote === selectedQuoteId
    );
    if (materials_list && materials_list.length > 0) {
      materials_list.sort((a, b) => a.id_phase - b.id_phase);
      setPropsQuoteAndBudget({
        activeType: "materiales",
        selsectedPhase: materials_list[0].id_phase || 0,
      });
    } else if (items_list && items_list.length > 0) {
      items_list.sort((a, b) => a.id_phase - b.id_phase);
      setPropsQuoteAndBudget(() => ({
        activeType: items_list[0].type as PropsType["key"],
        selsectedPhase: items_list[0].id_phase || 0,
      }));
      navigate(`opportunities/${id}/quotes/items`);
    } else {
      setPropsQuoteAndBudget({
        activeType: "materiales",
        selsectedPhase: 0,
      });
    }
  };
  return (
    <>
      {shouldShowCreateQuote ? (
        <SectionCreateQuote />
      ) : (
        selectedQuoteId && (
          <QuotesAndBudgetLayout phases={phases} type="quotes">
            <Outlet context={{ selectedQuoteId }} />
          </QuotesAndBudgetLayout>
        )
      )}
    </>
  );
}
