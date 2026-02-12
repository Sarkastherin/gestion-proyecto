import type { Route } from "../../+types/root";
import { useData } from "~/context/DataContext";
import { Outlet, useParams, useNavigate } from "react-router";
import QuotesAndBudgetLayout from "~/components/QuotesAndBudgets/QuotesAndBudgetLayout";
import { useEffect } from "react";
import { useUI } from "~/context/UIContext";
import { useProjectRealtime } from "~/backend/realTime";
// 📌 Meta
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Presupuesto" },
    { name: "description", content: "Presupuesto del proyecto" },
  ];
}
// 🧩 Página principal
export default function Budget() {
  useProjectRealtime();
  const { selectedProject } = useData();
  const { setPropsQuoteAndBudget } = useUI();
  const { id } = useParams();
  const navigate = useNavigate();
  if (!selectedProject) return null;
  const {
    phases_project,
    budget_details_items,
    budget_details_materials,
    client,
    ...project
  } = selectedProject;
  useEffect(() => {
    getDefaultPhase();
  }, [selectedProject]);
  const getDefaultPhase = () => {
    if (budget_details_materials && budget_details_materials.length > 0) {
      budget_details_materials.sort((a, b) => a.id_phase - b.id_phase);
      setPropsQuoteAndBudget({
        activeType: "materiales",
        selsectedPhase: budget_details_materials[0].id_phase || 0,
      });
    } else if (budget_details_items && budget_details_items.length > 0) {
      budget_details_items.sort((a, b) => a.id_phase - b.id_phase);
      setPropsQuoteAndBudget({
        activeType: budget_details_items[0].type as
          | "mano de obra"
          | "subcontratos"
          | "otros",
        selsectedPhase: budget_details_items[0].id_phase || 0,
      });
      navigate(`projects/${id}/budget/items`);
    } else {
      setPropsQuoteAndBudget({
        activeType: "materiales",
        selsectedPhase:
          phases_project && phases_project.length > 0
            ? phases_project[0].id
            : 0,
      });
    }
  };
  return (
    <QuotesAndBudgetLayout phases={phases_project} type="budget">
      <Outlet />
    </QuotesAndBudgetLayout>
  );
}
