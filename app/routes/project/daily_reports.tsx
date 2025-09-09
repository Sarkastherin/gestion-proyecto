import type { Route } from "../../+types/root";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { useData } from "~/context/DataContext";
import { useProjectRealtime } from "~/backend/realTime";
import { Card } from "~/components/Generals/Cards";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import type { DailyReportDB } from "~/types/projectsType";
import { useContacts } from "~/context/ContactsContext";
import { useModalState } from "~/components/modals_temp/particularsModals/useModalState";
import DailyReportModal from "~/components/modals_temp/particularsModals/DailyReportModal";
import { Button } from "~/components/Forms/Buttons";
// 📌 Meta
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Parte Diario" },
    { name: "description", content: "Parte Diario" },
  ];
}
// 🧩 Página principal
export default function DailyReport() {
  useProjectRealtime();
  const dailyReportModal = useModalState();
  const { employees } = useContacts();
  const { selectedProject } = useData();
  if (!selectedProject) return null;
  const { phases_project } = selectedProject;
  const [dailyReports, setDailyReports] = useState<DailyReportDB[]>([]);
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
          <Button type="button" onClick={() => dailyReportModal.openModal()}>
            Nuevo Parte Diario
          </Button>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {dailyReports.map((report, index) => (
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
              </ul>
              <button
                type="button"
                className="mt-4 bg-indigo-500 text-white dark:bg-indigo-400 dark:text-zinc-800 w-full text-sm font-semibold rounded py-1 cursor-pointer"
              >
                Ver detalles
              </button>
            </Card>
          ))}
        </div>
      </ContainerWithTitle>
      <DailyReportModal
        open={dailyReportModal.open}
        onClose={dailyReportModal.closeModal}
      />
    </>
  );
}
