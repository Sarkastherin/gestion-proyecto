import { useForm, useFieldArray } from "react-hook-form";
import { Input, Select } from "~/components/Forms/Inputs";
import { Button } from "~/components/Forms/Buttons";
import { reportTasksApi, tasksApi } from "~/backend/cruds";
import type {
  TaskProps,
  TaskAssignmentDB,
  ReportTaskDB,
  ViewTasks,
} from "~/types/projectsType";
import type { CommonPropsDB } from "~/types/sharedTypes";
import { ButtonAdd, ButtonDeleteIcon } from "~/components/Specific/Buttons";
import { useUIModals } from "~/context/ModalsContext";
import { updatesArrayFields } from "~/utils/updatesArraysFields";
import { useState } from "react";

type ReportTasksFormProps = {
  idDailyReport: number;
  selectedPhase: number;
  filteredTasks: ViewTasks[];
  onSuccess: (tasksTouched: number[]) => void;
};
type ReportTaskForm = {
  reportTasks: (ReportTaskDB & { description: string })[];
};
export function ReportTasksForm({
  idDailyReport,
  filteredTasks,
  selectedPhase,
  onSuccess,
}: ReportTasksFormProps) {
  const { openModal } = useUIModals();
  const [tasksToDelete, setTasksToDelete] = useState<number[]>([]); // ✅ nuevo
  const defaultValues = {
    reportTasks: filteredTasks.map((t) => ({
      id_task: t.id,
      description: t.name,
      id_daily_report: idDailyReport,
      progress: t.progress_total,
    })) as (ReportTaskDB & { description: string })[],
  };
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty, dirtyFields },
  } = useForm<ReportTaskForm>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray<ReportTaskForm>({
    control,
    name: "reportTasks",
  });

  const handleAddTask = () => {
    append({
      id_task: 0,
      description: "",
      progress: 0,
      id_daily_report: idDailyReport,
    } as ReportTaskDB & { description: string });
  };
  const handleRemove = (index: number) => {
    const currentTasks = watch("reportTasks");
    const task = currentTasks[index];
    if (task && "id" in task && task.id !== undefined) {
      setTasksToDelete((prev) => [...prev, task.id]); // ✅ guardar id para delete
    }
    remove(index);
  };
  const onSubmit = async (data: ReportTaskForm) => {
    if (!isDirty && tasksToDelete.length === 0) {
      openModal("INFORMATION", { message: "No hay cambios para actualizar" });
      return;
    }
    openModal("LOADING", {
      message: "Procesando requerimiento",
    });
    try {
      let tasksTouched: number[] = [];
      const { reportTasks } = data;
      const dirtyArray = dirtyFields.reportTasks ?? [];
      await Promise.all(
        reportTasks.map(async (report, i) => {
          const hasId = report.id_task > 0;
          const dirty = dirtyArray[i] ?? {};
          const hasFieldChanged = Object.values(dirty).some((v) => v);
          if (hasId && hasFieldChanged) {
            const reportTask = {
              id_task: report.id_task,
              id_daily_report: idDailyReport,
              progress: report.progress,
            };
            tasksTouched.push(report.id_task);
            const { error } = await reportTasksApi.insertOne(reportTask);
            if (error) throw new Error(error.message);
          } else if (!hasId) {
            const newTask = {
              name: report.description,
              id_phase: selectedPhase,
              duration: 0,

              planned: false,
            };
            console.log("newTask", newTask);
            const { data, error } = await tasksApi.insertOne(newTask);
            if (error) throw new Error(error.message);
            if (data && "id" in data) {
              const reportTask = {
                id_task: data.id,
                id_daily_report: idDailyReport,
                progress: report.progress,
              };
              console.log("reportTask", reportTask);
              const { error: errorReport } =
                await reportTasksApi.insertOne(reportTask);
              if (errorReport) throw new Error(errorReport.message);
            }
          }
        })
      );
      setTasksToDelete([]); // ✅ limpiar tareas a eliminar
      onSuccess(tasksTouched);
      openModal("SUCCESS", {
        message: "Requerimiento procesado con éxito",
      });
    } catch (e) {
      openModal("ERROR", {
        message: "Error al procesar el requerimiento",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="w-full text-sm table-auto divide-zinc-200 dark:divide-zinc-700">
        <colgroup>
          <col />
          <col className="w-[15%]" />
          <col className="w-[1%]" />
        </colgroup>
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="py-1 px-1"> Descripción</th>
            <th className="py-1 px-1">Progreso %</th>
            <th className="px-1 py-1">🗑️</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td className="px-1 py-0.5 whitespace-nowrap">
                <Input
                  {...register(`reportTasks.${index}.description`, {
                    required: true,
                  })}
                  defaultValue={field.description}
                  readOnly={watch(`reportTasks.${index}.id_task`) > 0}
                />
              </td>
              <td className="px-1 py-0.5 whitespace-nowrap">
                <Select
                  {...register(`reportTasks.${index}.progress`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={field.progress}
                >
                  <option value="0">0%</option>
                  <option value="25">25%</option>
                  <option value="50">50%</option>
                  <option value="75">75%</option>
                  <option value="100">100%</option>
                </Select>
              </td>
              <td className="px-1 py-0.5 whitespace-nowrap">
                <ButtonDeleteIcon
                  onClick={() => handleRemove(index)}
                  disabled={watch(`reportTasks.${index}.id_task`) > 0}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <ButtonAdd
          aria-label="Agregar actividad no planificada"
          onClick={handleAddTask}
        />
      </div>

      <div className="mt-4 w-28 float-end">
        <Button type="submit">Siguiente</Button>
      </div>
    </form>
  );
}
