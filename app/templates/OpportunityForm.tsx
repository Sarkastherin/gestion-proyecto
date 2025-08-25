import { Input, Select, Textarea } from "~/components/Forms/Inputs";
import { StatusOptions } from "~/components/Specific/StatusOptions";
import { CardToggle } from "~/components/Generals/Cards";
import { useForm } from "react-hook-form";
import { useUI } from "~/context/UIContext";
import { useEffect } from "react";
import { opportunityApi } from "~/backend/cruds";
import FooterForms from "./FooterForms";
import { useNavigate } from "react-router";
import { updateSingleRow } from "~/utils/updatesSingleRow";
import { useFieldsChange } from "~/utils/fieldsChange";
import type {} from "~/context/UIContext";
import { ProjectCreationError } from "~/utils/errors";
import { useData } from "~/context/DataContext";
import type { Step } from "~/context/ModalsContext";
import { useModalState } from "~/components/modals/particularsModals/useModalState";
import type { ContactsDataType } from "~/context/ContactsContext";
import ContactsModal from "~/components/modals/particularsModals/ContactsModal";
import {
  validateQuoteAndOpportunity,
  buildProjectPayload,
  createPhasesAndMap,
  createProjectAndLinkToOpportunity,
  insertBudgetItems,
  insertBudgetMaterials,
} from "~/utils/projectUtils";
import type {
  OpportunityAndQuotesUI,
  OpportunityDB,
} from "~/types/opportunitiesType";

/* Modals */
import { useUIModals } from "~/context/ModalsContext";
export default function OpportunityForm({
  defaultValues,
  mode,
  selectedQuoteId,
}: {
  defaultValues: OpportunityDB | Omit<OpportunityDB, "id" | "created_at">;
  mode: "create" | "view";
  selectedQuoteId?: number | null;
}) {
  const clientModal = useModalState<ContactsDataType>();
  const { openModal, setProgressiveSteps, updateStep } = useUIModals();
  const navigate = useNavigate();
  const { selectedClient, isModeEdit, editByStatus } = useUI();
  const { selectedOpportunity, getOpportunities } = useData();
  const {
    register,
    watch,
    formState: { errors, dirtyFields, isSubmitSuccessful, isDirty },
    setValue,
    handleSubmit,
  } = useForm<OpportunityDB>({
    defaultValues: defaultValues ?? {
      name: "",
      id_client: undefined,
      status: "",
      created_by: "",
    },
  });
  const initialSteps: Step[] = [
    { label: "Creando proyecto", status: "pending" },
    { label: "Creando fases", status: "pending" },
    { label: "Insertando ítems", status: "pending" },
    { label: "Insertando materiales", status: "pending" },
  ];
  useFieldsChange({ isSubmitSuccessful, isDirty });
  useEffect(() => {
    if (selectedClient && selectedClient.id !== watch("id_client")) {
      setValue("id_client", selectedClient.id, { shouldDirty: true });
    }
  }, [selectedClient]);

  const onSubmit = async (formData: OpportunityDB) => {
    try {
      if (mode === "create") {
        openModal("LOADING", {
          title: "Guardando oportunidad",
          message: "Por favor, espere...",
        });
        const { data, error } = await opportunityApi.insertOne(formData);
        if (error || !data || !("id" in data)) {
          throw new Error("Error al crear oportunidad");
        }
        openModal("SUCCESS", {
          title: "Oportunidad creada con éxito",
          message: "La oportunidad se ha creado correctamente.",
        });
        getOpportunities();
        navigate(`/opportunity/${data.id}/resumen`);
      }
      if (mode === "view" && isModeEdit) {
        openModal("LOADING", {
          title: "Actualizando oportunidad",
          message: "Por favor, espere...",
        });
        await updateSingleRow({
          dirtyFields: Object.fromEntries(
            Object.entries(dirtyFields).filter(
              ([_, v]) => typeof v === "boolean"
            )
          ),
          formData: formData,
          onUpdate: opportunityApi.update,
        });
        if (
          formData.status === "Ganada" &&
          selectedQuoteId &&
          selectedOpportunity &&
          selectedOpportunity.id_project === null
        ) {
          setProgressiveSteps(initialSteps);
          openModal("PROGRESSIVE");

          if ("id" in formData && "created_at" in formData) {
            const projectId = await createdProject({
              formData: formData,
              selectedOpportunity,
            });
            openModal("SUCCESS", {
              title: "✅ Proyecto creado con éxito",
              message: "El proyecto se ha creado correctamente.",
              btnPrimary: {
                label: "Ir al Proyecto",
                handleOnClick: () => {
                  navigate(`/project/${projectId}/resumen`);
                },
                variant: "green",
              },
            });
          } else {
            throw new Error(
              "Los datos de la oportunidad no son válidos para crear un proyecto"
            );
          }
        } else {
          openModal("SUCCESS", {
            title: "Oportunidad actualizada",
            message: "La oportunidad se ha actualizado correctamente.",
          });
        }
      }
    } catch (e) {
      openModal("ERROR", {
        title: "Error al guardar oportunidad",
        message: String(e),
      });
    }
  };
  interface CreatedProjectType {
    formData: OpportunityDB;
    selectedOpportunity: OpportunityAndQuotesUI;
  }
  async function createdProject({
    formData,
    selectedOpportunity,
  }: CreatedProjectType) {
    try {
      updateStep(0, "done"); // Creando proyecto

      const quoteActive = validateQuoteAndOpportunity(
        selectedQuoteId,
        selectedOpportunity
      );
      const payload = buildProjectPayload(formData, quoteActive);
      const projectId = await createProjectAndLinkToOpportunity(
        payload,
        formData
      );
      updateStep(1, "in-progress"); // Creando fases

      const phaseMap = await createPhasesAndMap(
        selectedOpportunity.phases,
        selectedOpportunity.details_items,
        selectedOpportunity.details_materials,
        projectId
      );

      updateStep(1, "done");
      updateStep(2, "in-progress"); // Ítems

      const itemsQuoteActive = selectedOpportunity.details_items.filter(
        (i) => i.id_quote === selectedQuoteId
      );
      await insertBudgetItems(itemsQuoteActive, phaseMap, projectId);

      updateStep(2, "done");
      updateStep(3, "in-progress"); // Materiales

      const materialsQuoteActive = selectedOpportunity.details_materials.filter(
        (m) => m.id_quote === selectedQuoteId
      );
      await insertBudgetMaterials(materialsQuoteActive, phaseMap, projectId);

      updateStep(3, "done");
      return projectId;
    } catch (e) {
      let errorMessage = "Ocurrió un error desconocido";

      if (e instanceof ProjectCreationError) {
        errorMessage = `Error en ${e.step}: ${e.message}`;
      } else if (e instanceof Error) {
        errorMessage = `Error inesperado: ${e.message}`;
      }

      openModal("ERROR", {
        title: "Error al crear el proyecto",
        message: errorMessage,
      });

      return null;
    }
  }
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
                disabled={!editByStatus && mode != "create"}
                {...register("name", { required: "Campo requerido" })}
                error={errors.name?.message}
              />
              <Input
                label="Cliente"
                placeholder="Seleccione un cliente"
                readOnly
                disabled={!editByStatus && mode != "create"}
                value={selectedClient?.nombre || ""}
                onClick={() => {
                  clientModal.openModal();
                }}
                error={errors.id_client?.message}
              />
              <Input
                type="hidden"
                {...register("id_client", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
              <Textarea
                disabled={!editByStatus && mode != "create"}
                label="Alcance"
                {...register("scope")}
              />
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
      <ContactsModal
        open={clientModal.open}
        onClose={clientModal.closeModal}
        type="client"
      />
    </>
  );
}
