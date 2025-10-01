import { useForm, useFieldArray } from "react-hook-form";
import type { DailyReportUI, ReportEmployeeDB } from "~/types/projectsType";
import { useContacts, type EmployeesDataType } from "~/context/ContactsContext";
import { Input, Select } from "~/components/Forms/Inputs";
import { useMemo, useState, useEffect } from "react";
import { ButtonAdd, ButtonDeleteIcon } from "~/components/Specific/Buttons";
import { Button } from "~/components/Forms/Buttons";
import ContactsModal from "~/components/modals/particularsModals/ContactsModal";
import { useModalState } from "~/components/modals/particularsModals/useModalState";
import { useUI } from "~/context/UIContext";
import { reportEmployeesApi } from "~/backend/cruds";
import { useUIModals } from "~/context/ModalsContext";
import { updatesArrayFields } from "~/utils/updatesArraysFields";
import { Badge } from "~/components/Specific/Badge";
import { dailyReportsApi } from "~/backend/cruds";
import { useData } from "~/context/DataContext";
import { useTasksRealtime, useProjectRealtime } from "~/backend/realTime";

type ReportEmployeeFormProps = {
  idDailyReport: number;
  idsEmployees: number[];
  onSuccess: () => void;
  type: "new" | "edit";
  data?: DailyReportUI;
};
type ReportEmployeeForm = {
  reportEmployees: (ReportEmployeeDB & { name_employee: string })[];
};
export function ReportEmployeeForm({
  idDailyReport,
  idsEmployees,
  type,
  data,
  onSuccess,
}: ReportEmployeeFormProps) {
  useProjectRealtime();
  const { selectedProject } = useData();
  const { openModal } = useUIModals();
  const employeeModal = useModalState<EmployeesDataType>();
  const { employees } = useContacts();
  const { setSelectedEmployee, selectedEmployee } = useUI();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { report_employees } = data || {};
  const isFinished = data?.status === "finalizado";
  const idsInReportEmployees =
    report_employees?.map((re) => re.id_employee) ?? [];
  const joinsIds = isFinished
    ? idsInReportEmployees
    : [...idsEmployees, ...idsInReportEmployees];
  const allIdsEmployees = [...new Set(joinsIds)];
  const getOldDataReportEmployees = (id: number) => {
    return report_employees?.find((re) => re.id_employee === id);
  };
  const defaultValues = {
    reportEmployees: allIdsEmployees.map((id) => ({
      id: getOldDataReportEmployees(id)?.id || null,
      id_daily_report: idDailyReport,
      id_employee: id,
      hour_start: getOldDataReportEmployees(id)?.hour_start || "",
      hour_end: getOldDataReportEmployees(id)?.hour_end || "",
      observation: getOldDataReportEmployees(id)?.observation || "",
      absent: getOldDataReportEmployees(id)?.absent || false,
    })) as ReportEmployeeDB[],
  };
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isDirty, dirtyFields, errors },
  } = useForm<ReportEmployeeForm>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray<ReportEmployeeForm>({
    control,
    name: "reportEmployees",
  });

  const employeesById = useMemo(
    () => new Map(employees?.map((e) => [e.id, e.contacto_nombre])),
    [employees]
  );
  const handleRemove = (index: number) => {
    remove(index);
  };
  const handleAddEmployee = () => {
    append({
      id_employee: 0,
      hour_start: "",
      hour_end: "",
      observation: "",
      id_daily_report: idDailyReport,
      absent: false,
      name_employee: "",
    } as ReportEmployeeForm["reportEmployees"][0]);
  };
    useEffect(() => {
    if (selectedEmployee && activeIndex !== null) {
      // Solo actualiza si el valor realmente cambió
      setValue(
        `reportEmployees.${activeIndex}.id_employee`,
        selectedEmployee.id,
        { shouldDirty: false }
      );
      setValue(
        `reportEmployees.${activeIndex}.name_employee`,
        selectedEmployee.contacto_nombre,
        { shouldDirty: false }
      );
    }
  }, [selectedEmployee, activeIndex, setValue]);
  useEffect(() => {
    if (fields.length > 0) {
      fields.map((field, index) => {
        const employeeInput = document.getElementById(
          `reportEmployees.${index}.name_employee`
        ) as HTMLInputElement | null;
        if (employeeInput) {
          employeeInput.value = employeesById.get(field.id_employee) || "";
        }
      });
    }
  }, [fields]);
  const handlerEmployee = (index: number) => {
    setActiveIndex(index);
    setSelectedEmployee(null);
    employeeModal.openModal();
  };
  const onSubmit = async (data: ReportEmployeeForm) => {
    try {
      const { reportEmployees } = data;
      if (type === "new") {
        openModal("LOADING", {
          message: "Procesando requerimiento",
        });
        const cleanedReportEmployees = reportEmployees.map((re) => {
          const { id, ...rest } = re;
          return rest;
        });
        const { data: createdData, error } = await reportEmployeesApi.insert(
          cleanedReportEmployees
        );
        if (error) throw new Error(error.message);
        const isUpdated = await updateStatusDailyReport(idDailyReport);
        if (createdData) {
          onSuccess();
          openModal("INFORMATION", {
            title: "⏱️ Horas cargadas",
            message: (
              <>
                <p>✅ Las horas trabajadas han sido cargadas correctamente</p>
                {isUpdated && (
                  <p>
                    ➡️ El status del parte diario se ha actualizado a{" "}
                    <Badge variant="green">Finalizado</Badge>
                  </p>
                )}
              </>
            ),
          });
        }
      } else {
        if (Object.keys(dirtyFields).length > 0) {
          const cleanedReportEmployees = reportEmployees.map((re) => {
            // Extrae id y name_employee, y deja el resto
            const { id, name_employee, ...rest } = re;
            // Si es nuevo, no envíes id
            if (id === null) {
              return rest;
            } else {
              // Si existe, agrega id de vuelta
              return { id, ...rest };
            }
          });
          await updatesArrayFields({
            fieldName: "reportEmployees",
            dirtyFields: dirtyFields,
            fieldsArray: cleanedReportEmployees as ReportEmployeeDB[],
            fieldsDelete: [],
            onInsert: reportEmployeesApi.insertOne,
            onRemove: (id: number) => reportEmployeesApi.remove({ id }),
            onUpdate: reportEmployeesApi.update,
          });
          const isUpdated = await updateStatusDailyReport(idDailyReport);
          openModal("INFORMATION", {
            title: "⏱️ Horas actualizadas",
            message: (
              <>
                <p>
                  ✅ Las horas trabajadas han sido actualizadas correctamente
                </p>
                {isUpdated && (
                  <p>
                    ➡️ El status del parte diario se ha actualizado a{" "}
                    <Badge variant="green">Finalizado</Badge>
                  </p>
                )}
              </>
            ),
          });
        } else {
          const isUpdated = await updateStatusDailyReport(idDailyReport);
          if (isUpdated) {
            openModal("INFORMATION", {
              title: "Parte diario Actualizado",
              message: (
                <p>
                  ➡️ El status del parte diario se ha actualizado a{" "}
                  <Badge variant="green">Finalizado</Badge>
                </p>
              ),
            });
          }
        }
        onSuccess();
      }
    } catch (e) {
      openModal("ERROR", {
        message: "Error al procesar el requerimiento",
      });
    }
  };
  const updateStatusDailyReport = async (id: number) => {
    const dailyReports = selectedProject?.phases_project.flatMap(
      (phase) => phase.daily_reports
    );
    const report = dailyReports?.find((dr) => dr.id === idDailyReport);
    const hasReportTasks =
      report?.report_tasks && report.report_tasks.length > 0;
    const hasReportEmployees =
      report?.report_employees && report.report_employees.length > 0;
    if (!hasReportTasks || !hasReportEmployees) return;
    if (isFinished) return;
    const { error } = await dailyReportsApi.update({
      id,
      values: { status: "finalizado" },
    });
    if (error) {
      throw new Error("Problemas al actualizar el status del reporte:", {
        cause: error,
      });
    }
    return true;
  };
  const onError = (errors: any) => {
    console.log(dirtyFields);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <fieldset disabled={isFinished}>
          <table className="w-full text-sm table-auto divide-zinc-200 dark:divide-zinc-700">
            <colgroup>
              <col />
              <col className="w-[1%]" />
              <col className="w-[1%]" />
              <col className="w-[1%]" />
              <col className="w-[30%]" />
              <col className="w-[1%]" />
            </colgroup>
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="py-1 px-1"> Operario</th>
                <th className="py-1 px-1">Entrada</th>
                <th className="py-1 px-1">Salida</th>
                <th className="py-1 px-1">Ausente</th>
                <th className="py-1 px-1">Observaciones</th>
                <th className="px-1 py-1">🗑️</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="px-1 py-0.5 whitespace-nowrap">
                    <Input
                      className="sr-only"
                      {...register(`reportEmployees.${index}.id_employee`, {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                    <Input
                      id={`reportEmployees.${index}.name_employee`}
                      placeholder="Seleccionar operario"
                      {...register(`reportEmployees.${index}.name_employee`)}
                      onClick={() => handlerEmployee(index)}
                    />
                  </td>
                  <td className="px-1 py-0.5 whitespace-nowrap">
                    <Input
                      type="time"
                      {...register(`reportEmployees.${index}.hour_start`, {
                        required: watch(`reportEmployees.${index}.absent`)
                          ? false
                          : "La hora de entrada es obligatoria",
                      })}
                      disabled={watch(`reportEmployees.${index}.absent`)}
                    />
                  </td>
                  <td className="px-1 py-0.5 whitespace-nowrap">
                    <Input
                      type="time"
                      {...register(`reportEmployees.${index}.hour_end`, {
                        required: watch(`reportEmployees.${index}.absent`)
                          ? false
                          : "La hora de entrada es obligatoria",
                      })}
                      disabled={watch(`reportEmployees.${index}.absent`)}
                    />
                  </td>
                  <td className="px-1 py-0.5 whitespace-nowrap">
                    <label
                      htmlFor={`reportEmployees.${index}.absent`}
                      className="relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-blue-500 dark:bg-gray-600 dark:has-checked:bg-blue-600"
                    >
                      <input
                        type="checkbox"
                        id={`reportEmployees.${index}.absent`}
                        className="peer sr-only"
                        checked={watch(`reportEmployees.${index}.absent`)}
                        onChange={() => {
                          setValue(
                            `reportEmployees.${index}.absent`,
                            !watch(`reportEmployees.${index}.absent`)
                          );
                          setValue(`reportEmployees.${index}.hour_start`, null);
                          setValue(`reportEmployees.${index}.hour_end`, null);
                        }}
                      />
                      <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-white transition-all ring-inset peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent dark:bg-gray-600 dark:ring-gray-900 dark:peer-checked:bg-gray-900"></span>
                    </label>
                  </td>
                  <td className="px-1 py-0.5 whitespace-nowrap">
                    <Input
                      {...register(`reportEmployees.${index}.observation`, {
                        required: watch(`reportEmployees.${index}.absent`)
                          ? "La observación es obligatoria si el operario está ausente"
                          : false,
                      })}
                      error={
                        errors.reportEmployees?.[index]?.observation
                          ?.message as string
                      }
                    />
                  </td>

                  <td className="px-1 py-0.5 whitespace-nowrap">
                    <ButtonDeleteIcon onClick={() => handleRemove(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <ButtonAdd
              aria-label="Agregar actividad no planificada"
              onClick={handleAddEmployee}
            />
          </div>
        </fieldset>

        <div className="mt-4 float-end">
          <Button variant="outlineGreen" type="submit" size="sm">
            {isFinished ? "Cerrar" : "Guardar"}
          </Button>
        </div>
      </form>
      <ContactsModal
        open={employeeModal.open}
        onClose={employeeModal.closeModal}
        type="employee"
      />
    </>
  );
}
