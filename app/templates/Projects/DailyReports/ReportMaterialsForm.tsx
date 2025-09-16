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
type ReportMaterialsFormProps = {
  idDailyReport: number;
  onSuccess: () => void;
};
type ReportMaterialsForm = {
  reportMaterials: any[];
};
export function ReportMaterialsForm({
  idDailyReport,
  onSuccess,
}: ReportMaterialsFormProps) {
  const { openModal } = useUIModals();
  const employeeModal = useModalState<EmployeesDataType>();
  const { employees } = useContacts();
  const { setSelectedEmployee, selectedEmployee } = useUI();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const defaultValues = {
    reportMaterials: [] as any[],
  };
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isDirty, dirtyFields },
  } = useForm<ReportMaterialsForm>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray<ReportMaterialsForm>({
    control,
    name: "reportMaterials",
  });

  const employeesById = useMemo(
    () => new Map(employees?.map((e) => [e.id, e.contacto_nombre])),
    [employees]
  );
  const handleRemove = (index: number) => {
    remove(index);
  };
  const handleAddMaterial = () => {};
  const handlerMaterials = (index: number) => {};
  const onSubmit = async (data: ReportMaterialsForm) => {
    openModal("LOADING", {
      message: "Procesando requerimiento",
    });
    try {
      console.log(data);
      onSuccess();
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg font-medium text-red-500">
          Reporte de Materiales
        </h2>
        <div className="mt-4 float-end">
          <Button variant="outlineGreen" type="submit">Finalizar</Button>
        </div>
      </form>
    </>
  );
}
