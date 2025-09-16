import type { TaskDB, ReportTaskDB } from "~/types/projectsType";
import { tasksApi } from "~/backend/cruds";
type CreatedNewTask = {
  task: ReportTaskDB & { description: string };
  selectedPhase: number;
};
export const createdNewTask = async ({ task, selectedPhase }: CreatedNewTask) => {
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
