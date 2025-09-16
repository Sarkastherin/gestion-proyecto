import type { Route } from "../../+types/root";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { useData } from "~/context/DataContext";
import { Card } from "~/components/Generals/Cards";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import type { DailyReportUI } from "~/types/projectsType";
import { useContacts } from "~/context/ContactsContext";
import { useModalState } from "~/components/modals_temp/particularsModals/useModalState";
import DailyReportModal from "~/components/modals_temp/particularsModals/DailyReportModal";
import { Button } from "~/components/Forms/Buttons";
import { Badge } from "~/components/Specific/Badge";

// 📌 Meta
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Parte Diario" },
    { name: "description", content: "Parte Diario" },
  ];
}

// 🧩 Página principal
export default function DailyReport() {
  const dailyReportModal = useModalState<{
    type: "new" | "edit";
    data?: DailyReportUI;
  }>();
  const { employees } = useContacts();
  const { selectedProject } = useData();
  if (!selectedProject) return null;
  const { phases_project } = selectedProject;
  const [dailyReports, setDailyReports] = useState<DailyReportUI[]>([]);
  useEffect(() => {
    if (!phases_project) return;
    const dr = phases_project.flatMap((phase) => phase.daily_reports);
    const sortableDailyReports = dr.sort((a, b) =>
      a.date_report.localeCompare(b.date_report)
    );
    setDailyReports(sortableDailyReports);
  }, [phases_project]);
  const phasesById = useMemo(
    () => new Map(phases_project.map((phase) => [phase.id, phase])),
    [phases_project]
  );
  const employeesById = useMemo(
    () => new Map(employees?.map((e) => [e.id, e.contacto_nombre])),
    [employees]
  );
  const supervisorsById = (id_phase: number) => {
    const phase = phases_project.find((phase) => phase.id === id_phase);
    return phase?.id_supervisor
      ? employeesById.get(phase.id_supervisor)
      : "No asignado";
  };
  return (
    <>
      <ContainerWithTitle title="" width="w-full">
        <div className="w-48 -mt-10 mb-4 ms-auto">
          <Button
            type="button"
            variant="yellow"
            onClick={() => dailyReportModal.openModal({ type: "new" })}
          >
            Nuevo Parte Diario
          </Button>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {dailyReports
            .sort((a, b) => (a.date_report < b.date_report ? 1 : -1))
            .map((report, index) => (
              <Card key={report.id}>
                <div className="flex gap-2 items-center font-bold text-xl mb-4">
                  <DocumentTextIcon className="size-6 text-indigo-400" />{" "}
                  <h2 className="">Parte Diario # {index + 1}</h2>
                </div>

                <ul className="text-sm space-y-1.5">
                  <li>
                    <strong>Proyecto:</strong> {selectedProject.name}
                  </li>
                  <li>
                    <strong>Fecha:</strong> {report.date_report}
                  </li>
                  <li>
                    <strong>Etapa:</strong>{" "}
                    {phasesById.get(report.id_phase)?.name}
                  </li>
                  <li>
                    <strong>Responsable:</strong>{" "}
                    {supervisorsById(report.id_phase)}
                  </li>
                  <li>
                    <strong>Status:</strong>{" "}
                    {
                      <Badge
                        variant={
                          report.status === "borrador" ? "yellow" : "green"
                        }
                      >
                        {report.status.slice(0, 1).toUpperCase() +
                          report.status.slice(1)}
                      </Badge>
                    }
                  </li>
                </ul>
                <div className="mt-6 text-center">
                  <Button
                    type="button"
                    size="sm"
                    variant="light"
                    onClick={() =>
                      dailyReportModal.openModal({ type: "edit", data: report })
                    }
                  >
                    Ver detalles
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      </ContainerWithTitle>
      {dailyReportModal.data?.type && (
        <DailyReportModal
          open={dailyReportModal.open}
          onClose={dailyReportModal.closeModal}
          type={dailyReportModal.data.type}
          report={dailyReportModal.data.data}
        />
      )}
    </>
  );
}
