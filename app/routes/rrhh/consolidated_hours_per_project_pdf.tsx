import type { Route } from "../../+types/root";
import type { ConsolidatedDataPerProject } from "./consolidated_hours_per_project";
import { useLocation } from "react-router";
import type { GlobalBalance } from "./consolidated_hours_per_worker";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import PDFConsolidatedPerProjects from "~/PDF/PDFConsolidatedPerProjects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Consolidados por Trabajador" },
    { name: "description", content: "Consolidados por Trabajador [Informes]" },
  ];
}

export default function ReportPerProject() {
  const location = useLocation();
  const { data, periodo, globalBalance } = location.state as {
    data: ConsolidatedDataPerProject[];
    periodo: { from: string; to: string };
    globalBalance: GlobalBalance;
  };

  return (
    <ContainerWithTitle
      title="Consolidado de horas por proyectos"
      back_path="/rrhh/consolidated_hours_per_project"
    >
      <div className="w-full mt-8 mx-auto flex gap-6 px-8">
        <div className="w-full">
          <PDFConsolidatedPerProjects
            title={"Consolidado de horas por proyectos"}
            data={data}
            periodo={periodo}
            globalBalance={globalBalance}
          />
        </div>
      </div>
    </ContainerWithTitle>
  );
}
