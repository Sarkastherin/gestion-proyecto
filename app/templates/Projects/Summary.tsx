import { Button } from "~/components/Forms/Buttons";
import type { Route } from "../../+types/root";
import { Card } from "~/components/Generals/Cards";
import type { DailyReportUI, ProjectAndBudgetUI } from "~/types/projectsType";
import { useMemo, useEffect, useState } from "react";
import { useContacts } from "~/context/ContactsContext";
import { useData } from "~/context/DataContext";
import { useModalState } from "~/components/modals_temp/particularsModals/useModalState";
import {
  calculatePhaseProgress,
  calculateGlobalProgress,
} from "~/utils/dailyReport";
import type { TaskProgressGroup, PhaseProgress } from "~/utils/dailyReport";
import DailyReportModal from "~/components/modals_temp/particularsModals/DailyReportModal";
import { ButtonNavigate } from "~/components/Specific/Buttons";
import { networkdaysIntl } from "~/utils/functionsDays";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumen" },
    { name: "description", content: "Resumen del proyecto" },
  ];
}

type ProjectSummaryProps = ProjectAndBudgetUI;

export default function ProjectSummary({
  project,
}: {
  project: ProjectSummaryProps;
}) {
  const dailyReportModal = useModalState<{
      type: "new" | "edit";
      data?: DailyReportUI;
    }>();
  const [allProgress, setAllProgress] = useState<PhaseProgress[] | null>(null);
  const [globalProgress, setGlobalProgress] = useState<number | null>(null);
  const [daysUsed, setDaysUsed] = useState<number | null>(null);
  const { getTasksByIdPhase } = useData();
  const { employees } = useContacts();
  const { phases_project } = project;
  if (!phases_project) return;
  const dr = phases_project.flatMap((phase) => phase.daily_reports);
  const employeesById = useMemo(
    () => new Map(employees?.map((e) => [e.id, e.contacto_nombre])),
    [employees]
  );
  const phasesById = useMemo(
    () => new Map(phases_project.map((phase) => [phase.id, phase])),
    [phases_project]
  );
  const supervisorsById = (id_phase: number) => {
    const phase = phases_project.find((phase) => phase.id === id_phase);
    return phase?.id_supervisor
      ? employeesById.get(phase.id_supervisor)
      : "No asignado";
  };
  useEffect(() => {
    if (!phases_project) return;
    (async () => {
      const allTasks = await Promise.all(
        phases_project.map(async (phase) => await getTasksByIdPhase(phase.id))
      );
      const progress = calculatePhaseProgress(
        allTasks
          .flatMap((t) => t)
          .filter((task): task is TaskProgressGroup => task !== null)
      );
      const global = calculateGlobalProgress(
        allTasks
          .flatMap((t) => t)
          .filter((task): task is TaskProgressGroup => task !== null)
      );
      setGlobalProgress(global);
      setAllProgress(progress);
    })();
  }, [phases_project]);
  const getProgress = useMemo(
    () => new Map(allProgress?.map((p) => [p.id_phase, p.progress])),
    [allProgress]
  );
  useEffect(() => {
    if(project.plan_duration && project.plan_duration> 0) {
      const start = project.plan_start_date
      const end = new Date().toLocaleDateString("sv-SE")
      const mode = project.mode
      if(!start || !mode) return;
      const daysCount = networkdaysIntl(start, end, mode);
      setDaysUsed(daysCount);
      console.log(Math.round(daysCount/project.plan_duration * 100));
      
    }
  },[project])
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">{project.name}</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Cliente: {project.client.nombre}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Inicio: {project.start_date}{" "}
              {project.end_date && `• Fin: ${project.end_date}`}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="primary" onClick={() => dailyReportModal.openModal({ type: "new" })}>Crear Parte Diario</Button>
            <ButtonNavigate variant="light" route={`/project/${project.id}/planning`}>Ver Planificación</ButtonNavigate>
          </div>
        </div>

        {/* Indicadores principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Avance Global">
            <span className="text-2xl font-bold">{globalProgress ?? 0}%</span>
            <div className="mt-2 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${globalProgress ?? 0}%` }}
              />
            </div>
          </Card>

          <Card title="Días consumidos">
            <span className="text-2xl font-bold">
              {daysUsed} d{" "}
              <span className="text-sm text-zinc-500">
                / {project.plan_duration} d
              </span>
            </span>
            <div className="mt-2 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
              <div
                className="bg-lime-500 h-2 rounded-full"
                style={{ width: `${project.plan_duration ? Math.round(((daysUsed ?? 0)/project.plan_duration) * 100) : 0}%` }}
              />
            </div>
          </Card>
        </div>

        <div className="rounded-xl shadow-md p-6 border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900/70">
          <h3 className="text-lg font-semibold mb-4">Avance de etapas</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b text-zinc-500 dark:text-zinc-400">
                <tr>
                  <th className="py-2">Etapa</th>
                  <th className="py-2">Supervisor</th>
                  <th className="py-2">Avance</th>
                </tr>
              </thead>
              <tbody>
                {phases_project.map((phase, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-0 text-zinc-700 dark:text-zinc-200"
                  >
                    <td className="py-2">{phasesById.get(phase.id)?.name}</td>
                    <td className="py-2">{supervisorsById(phase.id)}</td>
                    <td className="py-2">{getProgress.get(phase.id) ?? 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
