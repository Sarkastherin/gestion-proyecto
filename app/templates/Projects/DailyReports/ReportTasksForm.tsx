import { useForm, useFieldArray } from "react-hook-form";
import { Input, Select } from "~/components/Forms/Inputs";
import { Button } from "~/components/Forms/Buttons";
import { reportTasksApi, tasksApi } from "~/backend/cruds";
import { createdNewTask } from "~/utils/dailyReport";
import type {
  ReportTaskDB,
  ViewTasks,
  DailyReportUI,
} from "~/types/projectsType";
import { ButtonAdd, ButtonDeleteIcon } from "~/components/Specific/Buttons";
import { useUIModals } from "~/context/ModalsContext";
import { updatesArrayFields } from "~/utils/updatesArraysFields";
import { useState } from "react";
import { useTasksRealtime, useProjectRealtime } from "~/backend/realTime";

type ReportTasksFormProps = {
  idDailyReport: number;
  selectedPhase: number;
  filteredTasks: ViewTasks[];
  onSuccess: (tasksTouched: number[]) => void;
  type: "new" | "edit";
  data?: DailyReportUI;
};
export type ReportTaskForm = {
  reportTasks: (ReportTaskDB & { description: string })[];
};
export function ReportTasksForm({
  idDailyReport,
  filteredTasks,
  selectedPhase,
  onSuccess,
  type,
  data,
}: ReportTasksFormProps) {
  useTasksRealtime();
  useProjectRealtime();
  const { openModal, closeModal } = useUIModals();
  const [tasksToDelete, setTasksToDelete] = useState<number[]>([]); // ✅ nuevo
  const isFinished = data?.status === "finalizado";
  const values = isFinished
    ? filteredTasks.filter((t) => t.progress_total > 0)
    : filteredTasks;
  const defaultValues = {
    reportTasks: values.map((t) => ({
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
  const onSubmit = async (formData: ReportTaskForm) => {
    try {
      const { reportTasks } = formData;
      let tasksTouched: number[] = [];
      if (type === "new") {
        if (!isDirty && tasksToDelete.length === 0) {
          openModal("CONFIRMATION", {
            title: "⚠️ Sin cambios",
            message: (
              <>
                <p>No hay datos para agregar</p>
                <p>¿Desea continuar con el proceso de carga de personal?</p>
              </>
            ),
            onConfirm: () => {
              onSuccess([]);
              closeModal();
            },
          });
          return;
        }
        openModal("LOADING", {
          message: "Procesando requerimiento",
        });

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
              const newTask = await createdNewTask({
                task: report,
                selectedPhase,
              });
              if (newTask && "id" in newTask) {
                const reportTask = {
                  id_task: newTask.id,
                  id_daily_report: idDailyReport,
                  progress: report.progress,
                };
                const { error: errorReport } =
                  await reportTasksApi.insertOne(reportTask);
                if (errorReport) throw new Error(errorReport.message);
              }
            }
          })
        );
        setTasksToDelete([]); // ✅ limpiar tareas a eliminar
        openModal("INFORMATION", {
          title: "📝 Avance de actividades creado",
          message: (
            <>
              <p>✅ Las actividades han sido creadas correctamente</p>
              <p>➡️ continue con la carga de horas del personal.</p>
            </>
          ),
        });
      } else {
        if (Object.keys(dirtyFields).length > 0) {
          const { reportTasks: reportTasksDirty } = dirtyFields;
          await Promise.all(
            reportTasksDirty?.map(async (dirty, index) => {
              if (dirty) {
                const reportTaskDirty = reportTasks[index];
                const original = data?.report_tasks.find(
                  (rt) =>
                    rt.id_task === reportTaskDirty.id_task &&
                    rt.id_daily_report === reportTaskDirty.id_daily_report
                );
                if (original) {
                  reportTasks[index] = { ...reportTaskDirty, id: original.id };
                }
                if (reportTaskDirty.id_task === 0) {
                  const newTask = await createdNewTask({
                    task: reportTaskDirty,
                    selectedPhase,
                  });
                  if (newTask && "id" in newTask) {
                    reportTasks[index] = {
                      ...reportTaskDirty,
                      id_task: newTask.id,
                    };
                  }
                }
              }
            }) ?? []
          );
          const cleanedData = reportTasks
            .filter((rt) => rt.progress > 0)
            .map((t) => {
              tasksTouched.push(t.id_task);
              const { description, ...rest } = t;
              return rest;
            });

          await updatesArrayFields<ReportTaskDB>({
            fieldName: "reportTasks",
            fieldsArray: cleanedData as ReportTaskDB[],
            dirtyFields: dirtyFields,
            fieldsDelete: tasksToDelete,
            onInsert: reportTasksApi.insertOne,
            onRemove: (id: number) => reportTasksApi.remove({ id }),
            onUpdate: reportTasksApi.update,
          });
          openModal("INFORMATION", {
            title: "📝 Avance de actividades actualizado",
            message: (
              <>
                <p>
                  ✅ El avance de actividades ha sido actualizado correctamente
                </p>
                <p>➡️ continue con las actividades.</p>
              </>
            ),
          });
        } else {
          reportTasks.map((t) => tasksTouched.push(t.id_task));
        }
      }

      onSuccess(tasksTouched);
    } catch (e) {
      openModal("ERROR", {
        message: "Error al procesar el requerimiento",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isFinished}>
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
      </fieldset>

      <div className="mt-4 float-end">
        <Button variant="outlineBlue" type="submit" size="sm">
          Ir a Personal
        </Button>
      </div>
    </form>
  );
}
