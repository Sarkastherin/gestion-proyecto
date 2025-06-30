import { Input, Select, Textarea } from "~/components/Forms/Inputs";
import { StatusOptions } from "~/components/Specific/StatusOptions";
import { CardToggle } from "~/components/Generals/Cards";
import { useForm } from "react-hook-form";
import { useUI } from "~/context/UIContext";
import ModalClientes from "~/components/Specific/ModalClientes";
import { useEffect } from "react";
import { opportunityApi } from "~/backend/dataBase";
import type { OpportunityInput, OpportunityType } from "~/types/database";
import FooterForms from "./FooterForms";
import { useNavigate } from "react-router";
import { updateSingleRow } from "~/utils/updatesSingleRow";
import { useFieldsChange } from "~/utils/fieldsChange";
export default function OpportunityForm({
  defaultValues,
  mode,
}: {
  defaultValues: OpportunityInput | OpportunityType;
  mode: "create" | "view";
}) {
  const navigate = useNavigate();
  const {
    setOpenClientModal,
    selectedClient,
    showModal,
    isModeEdit,
    handleSetIsFieldsChanged,
  } = useUI();
  const {
    register,
    watch,
    formState: { errors, dirtyFields, isSubmitSuccessful, isDirty },
    setValue,
    handleSubmit,
  } = useForm<OpportunityInput | OpportunityType>({
    defaultValues: defaultValues ?? {
      name: "",
      id_client: undefined,
      status: "",
      created_by: "",
    },
  });
  useFieldsChange({isSubmitSuccessful, isDirty})
  useEffect(() => {
    if (selectedClient && selectedClient.id !== watch("id_client")) {
      setValue("id_client", selectedClient.id, { shouldDirty: true });
    }
  }, [selectedClient]);
  const onSubmit = async (formData: OpportunityInput | OpportunityType) => {
    showModal({
      title: "⌛ Procesando...",
      message: `Procesando requerimiento`,
    });
    if (mode === "create") {
      try {
        const { data, error } = await opportunityApi.insertOne(formData);
        if (error) throw new Error(String(error));

        if (!data || !("id" in data)) {
          throw new Error("No se pudo obtener el id de la oportunidad creada");
        }
        const { id } = data;
        navigate(`/opportunity/${id}/resumen`);
        showModal({
          title: "Guardado con exito",
          message: `Se ha guardado la oportunidad`,
          variant: "success",
        });
      } catch (e) {
        showModal({
          title: "Error al guardar",
          message: "No se pudo guardar la oportunidad. Error:",
          code: String(e),
          variant: "error",
        });
      }
    }
    if (mode === "view" && isModeEdit) {
      try {
        await updateSingleRow({
          dirtyFields: Object.fromEntries(
            Object.entries(dirtyFields).filter(
              ([_, v]) => typeof v === "boolean"
            )
          ),
          formData: formData as OpportunityType,
          onUpdate: opportunityApi.update,
        });
        showModal({
          title: "Actualizado con exito",
          message: `Se ha actualizado la oportunidad`,
          variant: "success",
        });
      } catch (e) {
        showModal({
          title: "Error al actualizar",
          message: `No se pudo actualizar la oportunidad. Error:`,
          code: String(e),
          variant: "error",
        });
      }
    }
  };
  const isLost = watch("status") === "Perdida";
  
  return (
    <>
      <form className=" flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={!isModeEdit}>
          <CardToggle title="Datos de la Oportunidad">
            <div className="flex flex-col gap-4">
              <Input
                label="Nombre de Oportunidad"
                placeholder="Ingresa un nombre para la oportunidad"
                {...register("name", { required: "Campo requerido" })}
                error={errors.name?.message}
              />
              <Input
                label="Cliente"
                placeholder="Seleccione un cliente"
                readOnly
                value={selectedClient?.nombre || ""}
                onClick={() => setOpenClientModal(true)}
                error={errors.id_client?.message}
              />
              <Input
                type="hidden"
                {...register("id_client", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
              <Textarea label="Alcance" {...register("scope")} />
              <Select
                label="Status"
                selectText="Selecciona un status"
                defaultValue={"Nuevo"}
                {...register("status", { required: true })}
                error={errors.status?.message}
              >
                <StatusOptions />
              </Select>
              <Textarea
                disabled={watch("status") !== "Perdida"}
                label="Razón de pérdida"
                {...register("loss_reason", {
                  required: {
                    value: isLost,
                    message: "Campo requerido",
                  },
                })}
                error={errors.loss_reason?.message}
              />
            </div>
          </CardToggle>
        </fieldset>
        <FooterForms mode={mode} />
      </form>
      <ModalClientes />
    </>
  );
}
