import type { TaskDB, ReportTaskDB } from "~/types/projectsType";
import { tasksApi } from "~/backend/cruds";
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

export type TaskProgressGroup = TaskDB & { progress: number };

export type PhaseProgress = {
  id_phase: number;
  progress: number;
};

export function calculatePhaseProgress(
  tasks: TaskProgressGroup[]
): PhaseProgress[] {
  // agrupar por fase
  const grouped: Record<number, TaskProgressGroup[]> = tasks.reduce(
    (acc, task) => {
      if (!acc[task.id_phase]) acc[task.id_phase] = [];
      acc[task.id_phase].push(task);
      return acc;
    },
    {} as Record<number, TaskProgressGroup[]>
  );

  // calcular promedio por fase
  return Object.entries(grouped).map(([phaseId, phaseTasks]) => {
    const sum = phaseTasks.reduce((acc, t) => acc + t.progress, 0);
    const avg = sum / phaseTasks.length;
    return {
      id_phase: Number(phaseId),
      progress: Math.round(avg), // redondeo para UI
    };
  });
}
export function calculateGlobalProgress(tasks: TaskProgressGroup[]): number {
  if (tasks.length === 0) return 0;

  const sum = tasks.reduce((acc, t) => acc + t.progress, 0);
  const avg = sum / tasks.length;

  return Math.round(avg); // redondeo para UI
}
