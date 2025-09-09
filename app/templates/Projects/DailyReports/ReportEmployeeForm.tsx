import { useForm, useFieldArray } from "react-hook-form";
import type { ReportEmployeeDB } from "~/types/projectsType";
import { useContacts, type EmployeesDataType } from "~/context/ContactsContext";
import { Input, Select } from "~/components/Forms/Inputs";
import { useMemo, useState, useEffect } from "react";
import { ButtonAdd, ButtonDeleteIcon } from "~/components/Specific/Buttons";
import { Button } from "~/components/Forms/Buttons";
import ContactsModal from "~/components/modals_temp/particularsModals/ContactsModal";
import { useModalState } from "~/components/modals_temp/particularsModals/useModalState";
import { useUI } from "~/context/UIContext";
import { reportEmployeesApi } from "~/backend/cruds";
import { useUIModals } from "~/context/ModalsContext";
type ReportEmployeeFormProps = {
  idDailyReport: number;
  selectedPhase: number;
  idsEmployees: number[];
  onSuccess: () => void;
};
type ReportEmployeeForm = {
  reportEmployees: ReportEmployeeDB[];
};
export function ReportEmployeeForm({
  idDailyReport,
  selectedPhase,
  idsEmployees,
  onSuccess,
}: ReportEmployeeFormProps) {
  const { openModal } = useUIModals();
  const employeeModal = useModalState<EmployeesDataType>();
  const { employees } = useContacts();
  const { setSelectedEmployee, selectedEmployee } = useUI();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const defaultValues = {
    reportEmployees: idsEmployees.map((id) => ({
      id_daily_report: idDailyReport,
      id_employee: id,
      hour_start: "",
      hour_end: "",
      observation: "",
    })) as ReportEmployeeDB[],
  };
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isDirty, dirtyFields },
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
    } as ReportEmployeeDB);
  };
  useEffect(() => {
    if (selectedEmployee && activeIndex !== null) {
      setValue(
        `reportEmployees.${activeIndex}.id_employee`,
        selectedEmployee.id,
        {
          shouldDirty: true,
        }
      );
      const employeeInput = document.getElementById(
        `reportEmployees.${activeIndex}.name_employee`
      ) as HTMLInputElement | null;
      if (employeeInput) {
        employeeInput.value = selectedEmployee.contacto_nombre;
      }
    }
  }, [selectedEmployee]);
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
    const { reportEmployees } = data;
    openModal("LOADING", {
      message: "Procesando requerimiento",
    });
    try {
      const { data: createdData, error } =
        await reportEmployeesApi.insert(reportEmployees);
      if (error) throw new Error(error.message);
      if (createdData) {
        onSuccess();
        openModal("SUCCESS", { message: "Operarios guardados correctamente" });
      }
    } catch (e) {
      openModal("ERROR", {
        message: "Error al procesar el requerimiento",
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="w-full text-sm table-auto divide-zinc-200 dark:divide-zinc-700">
          <colgroup>
            <col />
            <col className="w-[10%]" />
            <col className="w-[10%]" />
            <col className="w-[30%]" />
            <col className="w-[1%]" />
          </colgroup>
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="py-1 px-1"> Operario</th>
              <th className="py-1 px-1">Entrada</th>
              <th className="py-1 px-1">Salida</th>
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
                    defaultValue={field.id_employee}
                  />
                  <Input
                    id={`reportEmployees.${index}.name_employee`}
                    placeholder="Seleccionar operario"
                    onClick={() => handlerEmployee(index)}
                  />
                  {/* <Input
                    defaultValue={employeesById.get(field.id_employee) || ""}
                    readOnly
                  /> */}
                </td>
                <td className="px-1 py-0.5 whitespace-nowrap">
                  <Input
                    type="time"
                    {...register(`reportEmployees.${index}.hour_start`, {
                      required: true,
                    })}
                    defaultValue={field.hour_start}
                  />
                </td>
                <td className="px-1 py-0.5 whitespace-nowrap">
                  <Input
                    type="time"
                    {...register(`reportEmployees.${index}.hour_end`, {
                      required: true,
                    })}
                    defaultValue={field.hour_end}
                  />
                </td>
                <td className="px-1 py-0.5 whitespace-nowrap">
                  <Input
                    {...register(`reportEmployees.${index}.observation`)}
                    defaultValue={field.observation}
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

        <div className="mt-4 w-28 float-end">
          <Button type="submit">Siguiente</Button>
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
