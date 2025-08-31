import { useForm } from "react-hook-form";
import { CardToggle, Card } from "~/components/Generals/Cards";
import { Input, Textarea, Select } from "~/components/Forms/Inputs";
import FooterForms from "../FooterForms";
import type { ProjectsDB, ProjectAndBudgetUI } from "~/types/projectsType";
import { useState } from "react";
import { useUI } from "~/context/UIContext";
import { useModalState } from "~/components/modals_temp/particularsModals/useModalState";
import type { ContactsDataType } from "~/context/ContactsContext";
import { formaPago } from "../ConditionsForm";
import { MarginsForm } from "../MarginsForm";
import { useUIModals } from "~/context/ModalsContext";
import { updateSingleRow } from "~/utils/updatesSingleRow";
import { projectsApi } from "~/backend/cruds";
export function InformationForms({
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
    <form className=" flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={!isEditMode}>
        <CardToggle title="Datos del Proyecto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre del Proyecto"
              {...register("name", { required: "Campo requerido" })}
              error={errors.name?.message}
            />
            <Input
              label="Cliente"
              placeholder="Seleccione un cliente"
              readOnly
              value={selectedClient?.nombre || ""}
              onClick={() => {
                clientModal.openModal();
              }}
              error={errors.id_client?.message}
            />
            <input
              type="hidden"
              {...register("id_client", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <div className="col-span-2">
              <Textarea label="Alcance" {...register("scope")} />
            </div>
          </div>
        </CardToggle>
      </fieldset>
      <fieldset disabled={!isEditMode}>
        <CardToggle title="Detalles adicionales">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-3">
              <Select
                label="Forma de pago"
                {...register("method_payment", {
                  required: true,
                })}
              >
                {formaPago.map((item) => (
                  <option key={item["description"]} value={item["description"]}>
                    {item["description"]}
                  </option>
                ))}
              </Select>
            </div>
            <div className="col-span-3">
              <Input
                label="Garantía"
                {...register("guarantee")}
                error={errors.guarantee?.message}
              />
            </div>
            <Input
              label="Fecha de inicio [Plan]"
              type="date"
              {...register("plan_start_date")}
              error={errors.plan_start_date?.message}
            />
            <Input
              label="Fecha de fin [Plan]"
              type="date"
              {...register("plan_end_date")}
              error={errors.plan_end_date?.message}
            />
            <Input
              label="Duración [Plan]"
              type="date"
              {...register("plan_duration")}
              error={errors.plan_duration?.message}
            />
          </div>
        </CardToggle>
      </fieldset>
      <MarginsForm
        watch={watch}
        register={register}
        setValue={setValue}
        disabled={!isEditMode}
      />
      <FooterForms
        isNew={false}
        isEditMode={isEditMode}
        onToggleEdit={() => setIsEditMode((prev) => !prev)}
      />
    </form>
  );
}
