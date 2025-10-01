import { useForm, useFieldArray } from "react-hook-form";
import { Input, Select } from "~/components/Forms/Inputs";
import { Button } from "~/components/Forms/Buttons";
import { reportTasksApi } from "~/backend/cruds";
import { createdNewTask } from "~/utils/dailyReport";
import type {
  ReportTaskDB,
  DailyReportUI,
  TaskDB,
  TaskProps,
} from "~/types/projectsType";
import { ButtonAdd, ButtonDeleteIcon } from "~/components/Specific/Buttons";
import { useUIModals } from "~/context/ModalsContext";
import { updatesArrayFields } from "~/utils/updatesArraysFields";
import { useState } from "react";
import { useTasksRealtime, useProjectRealtime } from "~/backend/realTime";
import { useData } from "~/context/DataContext";
import {
  getMaxProgressUntil,
  hasPosteriorProgress,
  isReportedHere,
  getProgressInThisReport,
  getReportTasksFormValues,
} from "~/utils/dailyReportTasks";
import { Tooltip } from "~/components/Generals/Tooltip";

type ReportTasksFormProps = {
  idDailyReport: number;
  selectedPhase: number;
  filteredTasks: (TaskDB & { progress: number })[];
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
  const { selectedProject } = useData();
  const { phases_project } = selectedProject || {};
  if (!phases_project) return null;
  const dailyReports = phases_project.flatMap((phase) => phase.daily_reports);
  const reportTasks = dailyReports.flatMap((dr) => dr.report_tasks);
  const { openModal, closeModal } = useUIModals();
  const [tasksToDelete, setTasksToDelete] = useState<number[]>([]); // ✅ nuevo
  const isFinished = data?.status === "finalizado";
  const isEditMode = type === "edit" || data?.status === "borrador";
  // Mostrar solo tareas planificadas o reportadas en este parte
  const values = getReportTasksFormValues({
    filteredTasks,
    reportTasks,
    idDailyReport,
    data,
    isEditMode,
  });
  // ...form setup...
  const defaultValues = {
    reportTasks: values,
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
    // Busca el id real del avance en la data original
    const original = data?.report_tasks.find(
      (rt) =>
        rt.id_task === task.id_task &&
        rt.id_daily_report === task.id_daily_report
    );
    if (original && original.id) {
      setTasksToDelete((prev) => [...prev, original.id]);
    }
    remove(index);
  };
  /**
   * Filtra y prepara tareas para guardar: solo tareas con progreso > 0.
   * REGLA: No guardar tareas con progreso 0%
   * Si se pasa un array de dirtyFields, también lo filtra en el mismo orden.
   */
  function prepareTasksForSave<T extends { progress: number }>(
    tasks: T[],
    dirtyFields?: any[]
  ): { tasks: T[]; dirtyFields?: any[] } {
    if (!dirtyFields) {
      return { tasks: tasks.filter((t) => t.progress > 0) }; // REGLA: No guardar tareas con progreso 0%
    }
    const filtered: { tasks: T[]; dirtyFields: any[] } = {
      tasks: [],
      dirtyFields: [],
    };
    tasks.forEach((t, i) => {
      if (t.progress > 0) {
        filtered.tasks.push(t);
        filtered.dirtyFields.push(dirtyFields[i]);
      }
    });
    return filtered;
  }
  // --- Lógica de guardado para "new"
  const saveNewTasks = async (
    reportTasks: ReportTaskForm["reportTasks"],
    dirtyArray: any[],
    tasksTouched: number[]
  ) => {
    // REGLA: No guardar tareas con progreso 0%
    const { tasks: filteredTasks, dirtyFields: filteredDirty } =
      prepareTasksForSave(reportTasks, dirtyArray);
    await Promise.all(
      filteredTasks.map(async (report, i) => {
        const hasId = report.id_task > 0;
        const dirty = filteredDirty ? (filteredDirty[i] ?? {}) : {};
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
  };
  // --- Lógica de guardado para "edit"
  const saveEditTasks = async (
    reportTasks: ReportTaskForm["reportTasks"],
    reportTasksDirty: any[],
    tasksTouched: number[]
  ) => {
    // REGLA: No guardar tareas con progreso 0%
    const { tasks: filteredTasks, dirtyFields: filteredDirty } =
      prepareTasksForSave(reportTasks, reportTasksDirty);

    await Promise.all(
      (filteredDirty ?? []).map(async (dirty, i) => {
        if (!dirty) return;
        const report = filteredTasks[i];
        if (!report) return;
        const hasId = report.id_task > 0;
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

    // Solo tareas realmente modificadas y con progreso > 0
    // REGLA: No guardar tareas con progreso 0%
    const cleanedData = (reportTasksDirty ?? [])
      .map((dirty, index) => {
        if (!dirty) return null;
        if (!reportTasks[index]) return null;
        const t = reportTasks[index];
        if (t.progress === 0) return null; // <-- filtro clave
        const original = data?.report_tasks.find(
          (rtDb) =>
            rtDb.id_task === t.id_task &&
            rtDb.id_daily_report === t.id_daily_report
        );
        const withId = original ? { ...t, id: original.id } : t;
        tasksTouched.push(withId.id_task);
        const { description, ...rest } = withId;
        return rest;
      })
      .filter((rt): rt is ReportTaskDB => !!rt);

    await updatesArrayFields<ReportTaskDB>({
      fieldName: "reportTasks",
      fieldsArray: cleanedData,
      dirtyFields: { reportTasks: reportTasksDirty ?? [] },
      fieldsDelete: tasksToDelete,
      onInsert: reportTasksApi.insertOne,
      onRemove: (id: number) => reportTasksApi.remove({ id }),
      onUpdate: reportTasksApi.update,
    });

    openModal("INFORMATION", {
      title: "📝 Avance de actividades actualizado",
      message: (
        <>
          <p>✅ El avance de actividades ha sido actualizado correctamente</p>
          <p>➡️ continue con las actividades.</p>
        </>
      ),
    });
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
        await saveNewTasks(reportTasks, dirtyArray, tasksTouched);
      } else {
        if (Object.keys(dirtyFields).length > 0) {
          const reportTasksDirty = dirtyFields.reportTasks ?? [];
          await saveEditTasks(reportTasks, reportTasksDirty, tasksTouched);
        } else {
          reportTasks.map((t) => tasksTouched.push(t.id_task));
        }
      }
      onSuccess(tasksTouched);
    } catch (e: any) {
      console.error(e);
      openModal("ERROR", {
        message: `Error al procesar el requerimiento: ${e.message || e}`,
      });
    }
  };
  const onError = (errors: any) => {
    console.error("Errors:", errors);
    openModal("ERROR", {
      message: `Error en el formulario, verifique los datos ingresados.`,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <fieldset disabled={isFinished}>
        <table className="w-full text-sm table-auto divide-zinc-200 dark:divide-zinc-700">
          <colgroup>
            <col />
            <col className="w-[1%]" />
            <col className="w-[10%]" />
            <col className="w-[1%]" />
          </colgroup>
          <thead>
            <tr>
              <th className="py-1 px-1">Descripción</th>
              <th className="py-1 px-1">Progreso actual</th>
              <th className="py-1 px-1">Nuevo avance</th>
              <th className="px-1 py-1">🗑️</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => {
              // Progreso acumulado real hasta este parte
              const currentProgress = getMaxProgressUntil({
                reportTasks,
                id_task: field.id_task,
                idDailyReport,
              });

              // Avance reportado en este parte (puede ser 0)
              const progressInThisReport = getProgressInThisReport({
                reportTasks,
                id_task: field.id_task,
                idDailyReport,
              });

              // ¿Fue reportada en este parte?
              const isReported = isReportedHere({
                reportTasks,
                id_task: field.id_task,
                idDailyReport,
              });

              // ¿Hay avance posterior?
              const hasPosterior = hasPosteriorProgress({
                reportTasks,
                id_task: field.id_task,
                idDailyReport,
                progress: progressInThisReport, // ¡Usa el progreso reportado en este parte!
              });

              // Opciones válidas para el select
              const stepOptions = [25, 50, 75, 100].filter(
                (step) => step >= currentProgress
              );

              return (
                <tr
                  key={field.id}
                  className={isReported ? "bg-green-50 dark:bg-green-900" : ""}
                >
                  <td className="relative px-1 py-0.5 whitespace-nowrap">
                    <Input
                      {...register(`reportTasks.${index}.description`, {
                        required: true,
                      })}
                      defaultValue={field.description}
                      readOnly={false}
                    />
                    {isReported && (
                      <div
                        className="absolute w-full top-0 -left-2 h-full flex items-center justify-end pr-1"
                        title="Reportada en este parte"
                      >
                        <span className="text-xs rounded px-1 py-0.5 bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100">
                          📝 Reportada aquí
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-1 py-0.5 whitespace-nowrap">
                    <Input disabled value={currentProgress + "%"} />
                  </td>
                                    <td className="relative px-1 py-0.5 whitespace-nowrap">
                    <Select
                      {...register(`reportTasks.${index}.progress`, {
                        valueAsNumber: true,
                        validate: (value) =>
                          value >= currentProgress ||
                          "El avance no puede ser menor al actual",
                      })}
                      defaultValue={progressInThisReport}
                      disabled={hasPosterior}
                    >
                      <option value={progressInThisReport}>
                        {progressInThisReport}%
                      </option>
                      {stepOptions
                        .filter((step) => step !== progressInThisReport)
                        .map((step) => (
                          <option key={step} value={step}>
                            {step}%
                          </option>
                        ))}
                    </Select>
                    {hasPosterior && (
                      <div className="absolute w-full top-0 -left-2 h-full flex items-center justify-end pr-1">
                        <Tooltip message="No editable: existe un avance posterior registrado">
                          <span className="text-xs text-red-600 ml-2" role="img" aria-label="No editable">
                            🔒
                          </span>
                        </Tooltip>
                      </div>
                    )}
                  </td>
                  <td className="px-1 py-0.5 whitespace-nowrap">
                    <ButtonDeleteIcon
                      onClick={() => handleRemove(index)}
                      disabled={hasPosterior}
                    />
                  </td>
                </tr>
              );
            })}
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
} //No editable: existe un avance posterior registrado
