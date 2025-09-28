import { useForm, useFieldArray } from "react-hook-form";
import { useContacts, type EmployeesDataType } from "~/context/ContactsContext";
import { useMemo, useState } from "react";
import { Button } from "~/components/Forms/Buttons";
import { useModalState } from "~/components/modals/particularsModals/useModalState";
import { useUI } from "~/context/UIContext";
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
  const { employees } = useContacts();
  const defaultValues = {
    reportMaterials: [] as any[],
  };
  const {
    control,
    handleSubmit,
    formState: { isDirty, dirtyFields },
  } = useForm<ReportMaterialsForm>({
    defaultValues,
  });
  
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
