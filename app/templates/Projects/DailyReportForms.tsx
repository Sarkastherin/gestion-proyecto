import { useForm } from "react-hook-form";
import { CardToggle, Card } from "~/components/Generals/Cards";
import { Input, Textarea, Select } from "~/components/Forms/Inputs";
import FooterForms from "../FooterForms";
import type { ProjectsDB, ProjectAndBudgetUI } from "~/types/projectsType";
import { useState } from "react";
import { useUI } from "~/context/UIContext";
import { useModalState } from "~/components/modals/particularsModals/useModalState";
import type { ContactsDataType } from "~/context/ContactsContext";
import { formaPago } from "../ConditionsForm";
import { MarginsForm } from "../MarginsForm";
import { useUIModals } from "~/context/ModalsContext";
import { updateSingleRow } from "~/utils/updatesSingleRow";
import { projectsApi } from "~/backend/cruds";
export function DailyReportForms({
  defaultValues,
}: {
  defaultValues: ProjectsDB;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { selectedClient } = useUI();
  const clientModal = useModalState<ContactsDataType>();
  const { openModal } = useUIModals();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<ProjectAndBudgetUI>({
    defaultValues: defaultValues,
  });
  const onSubmit = async (data: ProjectsDB) => {
    openModal("LOADING");
    try {
      await updateSingleRow({
        dirtyFields: dirtyFields,
        formData: data,
        onUpdate: projectsApi.update,
      });
      openModal("SUCCESS", {
        message: `Proyecto actualizado correctamente`,
      });
    } catch (e) {
      openModal("ERROR", {
        message: `No se pudo actualizar el proyecto. Error: ${String(e)}`,
      });
    }
  };
  return (
    <div></div>

  );
}
