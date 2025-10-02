import type { TaskDB, ReportTaskDB, DailyReportUI } from "~/types/projectsType";
import { tasksApi } from "~/backend/cruds";

/**
 * Devuelve el mayor progreso registrado para una tarea hasta un parte diario específico (inclusive).
 */
export function getMaxProgressUntil({
  reportTasks,
  id_task,
  idDailyReport,
}: {
  reportTasks: ReportTaskDB[];
  id_task: number;
  idDailyReport: number;
}): number {
  const maxProgress = Math.max(
    ...reportTasks
      .filter(
        (rt) => rt.id_task === id_task && rt.id_daily_report <= idDailyReport
      )
      .map((rt) => rt.progress),
    0
  );
  return maxProgress;
}

/**
 * Devuelve true si existe un parte diario posterior con mayor avance para la tarea.
 */
export function hasPosteriorProgress({
  reportTasks,
  id_task,
  idDailyReport,
  progress,
}: {
  reportTasks: ReportTaskDB[];
  id_task: number;
  idDailyReport: number;
  progress: number;
}): boolean {
  return reportTasks.some(
    (rt) =>
      rt.id_task === id_task &&
      rt.id_daily_report > idDailyReport &&
      rt.progress > progress
  );
}

/**
 * Devuelve true si la tarea fue reportada en el parte diario actual.
 */
export function isReportedHere({
  reportTasks,
  id_task,
  idDailyReport,
}: {
  reportTasks: ReportTaskDB[];
  id_task: number;
  idDailyReport: number;
}): boolean {
  return reportTasks.some(
    (rt) => rt.id_task === id_task && rt.id_daily_report === idDailyReport
  );
}

/**
 * Devuelve el progreso reportado en este parte diario para una tarea.
 */
export function getProgressInThisReport({
  reportTasks,
  id_task,
  idDailyReport,
}: {
  reportTasks: ReportTaskDB[];
  id_task: number;
  idDailyReport: number;
}): number {
  const found = reportTasks.find(
    (rt) => rt.id_task === id_task && rt.id_daily_report === idDailyReport
  );
  return found?.progress ?? 0;
}

/**
 * Arma el array de tareas para el formulario, haciendo merge entre planificadas y reportadas.
 * Solo incluye tareas con progreso < 100 o reportadas en este parte diario.
 */
export function getReportTasksFormValues({
  filteredTasks,
  reportTasks,
  idDailyReport,
  data,
  isEditMode,
}: {
  filteredTasks: (TaskDB & { progress: number })[];
  reportTasks: ReportTaskDB[];
  idDailyReport: number;
  data?: DailyReportUI;
  isEditMode: boolean;
}): (ReportTaskDB & { description: string })[] {
  return filteredTasks
    .map((t) => {
      const reported = reportTasks.find(
        (rt) => rt.id_task === t.id && rt.id_daily_report === idDailyReport
      );
      if (reported) {
        return {
          ...reported,
          description: t.name,
        };
      }
      return {
        id: 0,
        created_at: "",
        id_task: t.id,
        description: t.name,
        id_daily_report: idDailyReport,
        progress: 0,
      };
    })
    .filter((task) => {
      // Mostrar solo si:
      // - El avance acumulado hasta este parte es < 100
      // - O fue reportada en este parte (para edición/histórico)
      const maxProgress = Math.max(
        ...reportTasks
          .filter(
            (rt) =>
              rt.id_task === task.id_task && rt.id_daily_report <= idDailyReport
          )
          .map((rt) => rt.progress),
        0
      );
      return (
        maxProgress < 100 ||
        reportTasks.some(
          (rt) =>
            rt.id_task === task.id_task && rt.id_daily_report === idDailyReport
        )
      );
    });
}
type CreatedNewTask = {
  task: ReportTaskDB & { description: string };
  selectedPhase: number;
};
export const createdNewTask = async ({
  task,
  selectedPhase, 
}: CreatedNewTask) => {
  const newTask = {
    name: task.description,
    id_phase: selectedPhase,
    duration: 0,
    planned: false,
  };
  const { data, error } = await tasksApi.insertOne(newTask);
  if (error) throw new Error(error.message);
  return data as TaskDB;
};
