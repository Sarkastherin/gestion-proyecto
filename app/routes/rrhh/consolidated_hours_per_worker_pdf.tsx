import type { Route } from "../+types/home";
import PDFConsolidatedPerWorker from "~/PDF/PDFConsolidatedPerWorker";
import type { ConsolidatedData } from "../rrhh/consolidated_hours_per_worker";
import { useLocation } from "react-router";
import type { GlobalBalance } from "../rrhh/consolidated_hours_per_worker";
import { ContainerWithTitle } from "~/components/Generals/Containers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Consolidados por Trabajador" },
    { name: "description", content: "Consolidados por Trabajador [Informes]" },
  ];
}

export default function Report() {
  const location = useLocation();
  const { data, periodo, globalBalance } = location.state as {
    data: ConsolidatedData[];
    periodo: { from: string; to: string };
    globalBalance: GlobalBalance;
  };

  return (
    <ContainerWithTitle
      title="Consolidado de horas por trabajadores"
      back_path="/rrhh/consolidated_hours_per_worker"
    >
      <div className="w-full mt-8 mx-auto flex gap-6 px-8">
        <div className="w-full">
          <PDFConsolidatedPerWorker
            title={"Consolidado de horas por trabajadores"}
            data={data}
            periodo={periodo}
            globalBalance={globalBalance}
          />
        </div>
      </div>
    </ContainerWithTitle>
  );
}
