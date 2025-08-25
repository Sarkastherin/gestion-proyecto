import type { Route } from "../../+types/root";
import { ContainerToForms } from "~/components/Generals/Containers";
import { InformationForms } from "~/templates/Projects/InformationForms";
import { useData } from "~/context/DataContext";
import { Outlet } from "react-router";
import { Select } from "~/components/Forms/Inputs";
import { useUI } from "~/context/UIContext";
import { useState, type ChangeEventHandler } from "react";
import { typesQuotes } from "../opportunity/quotes";
import type { PropsType } from "../opportunity/quotes";
import { Button } from "~/components/Forms/Buttons";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
// 📌 Meta
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Presupuesto" },
    { name: "description", content: "Presupuesto del proyecto" },
  ];
}
// 🧩 Página principal
export default function Budget() {
  const { selectedProject } = useData();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState<
      "materiales" | "mano de obra" | "subcontratos" | "otros" | ""
    >("materiales");
  const {
    selectedPhase,
    setSelectedPhase,
    isFieldsChanged,
    setIsFieldsChanged,
  } = useUI();
  if (!selectedProject) return null;
  const { phases_project, budget_items, budget_materials, client, ...project } =
    selectedProject;
  const handleChangePhases: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const target = e.target;
    const value = target.value;
    setSelectedPhase(Number(value));
  };
  const handleNavigate = (t: PropsType) => {
    const href = `project/${id}/budget/${
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
  return (
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
            {phases_project?.map((phase) => (
              <option key={phase.id} value={phase.id}>
                {`[${phase.id}] ${phase.name}`}
              </option>
            ))}
          </Select>
        </div>
        <div className="w-full flex gap-2">
          {typesQuotes.map((t) => (
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
      <Outlet />
    </div>
  );
}
