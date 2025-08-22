import { Input, Select, Textarea } from "~/components/Forms/Inputs";
import { StatusOptions } from "~/components/Specific/StatusOptions";
import { CardToggle } from "~/components/Generals/Cards";
import { useForm } from "react-hook-form";
import { useUI } from "~/context/UIContext";
import ModalClientes from "~/components/Specific/ModalClientes";
import { useEffect } from "react";
import { opportunityApi } from "~/backend/dataBase";
//import type { OpportunityInput, OpportunityType } from "~/types/database";
import FooterForms from "./FooterForms";
import { useNavigate } from "react-router";
import { updateSingleRow } from "~/utils/updatesSingleRow";
import { useFieldsChange } from "~/utils/fieldsChange";
import type {  } from "~/context/UIContext";
import { ButtonNavigate } from "~/components/Specific/Buttons";
import { ProjectCreationError } from "~/utils/errors";
import { useData } from "~/context/DataContext";
import {
  validateQuoteAndOpportunity,
  buildProjectPayload,
  createPhasesAndMap,
  createProjectAndLinkToOpportunity,
  insertBudgetItems,
  insertBudgetMaterials,
} from "~/utils/projectUtils";
import type { OpportunityAndQuotesUI, OpportunityProps, OpportunityDB } from "~/types/opportunitiesType";

/* Modals */
import { useUIModals, ModalType } from "~/context/ModalsContext";

export default function OpportunityForm({
  defaultValues,
  mode,
  selectedQuoteId,
}: {
  defaultValues: OpportunityDB | Omit<OpportunityDB, "id" | "created_at">;
  mode: "create" | "view";
  selectedQuoteId?: number | null;
}) {
  const { openModal, closeModal, progressive, alert } = useUIModals();
  const navigate = useNavigate();
  const {
    setOpenClientModal,
    selectedClient,
    isModeEdit,
    editByStatus
  } = useUI();
  const {selectedOpportunity, getOpportunities  } = useData();
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
  useFieldsChange({ isSubmitSuccessful, isDirty });
  useEffect(() => {
    if (selectedClient && selectedClient.id !== watch("id_client")) {
      setValue("id_client", selectedClient.id, { shouldDirty: true });
    }
  }, [selectedClient]);
  const onSubmit = async (formData: OpportunityDB) => {
    try {
      progressive?.setSteps([
        { label: "Guardando oportunidad", status: "in-progress" },
      ]);
      openModal(ModalType.PROGRESSIVE);
      if (mode === "create") {
        const { data, error } = await opportunityApi.insertOne(formData);
        if (error || !data || !("id" in data)) {
          throw new Error("Error al crear oportunidad");
        }
        progressive?.updateStep(0, "done");
        alert?.setAlert("Oportunidad creada con éxito", "success");
        getOpportunities();
        navigate(`/opportunity/${data.id}/resumen`);
      }
      if (mode === "view" && isModeEdit) {
        progressive?.setSteps([
          { label: "Actualizando oportunidad", status: "in-progress" },
        ]);
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
          progressive?.setSteps([
            { label: "Creando proyecto", status: "in-progress" },
            { label: "Creando fases", status: "pending" },
            { label: "Agregando ítems", status: "pending" },
            { label: "Agregando materiales", status: "pending" },
          ]);

          if ("id" in formData && "created_at" in formData) {
            const projectId = await createdProject({
              formData: formData,
              selectedOpportunity,
            });
            alert?.setAlert(
            <>
              <div className="mb-4">
                <p>El proyecto se ha creado con éxito.</p>
                <p>Puede ver los detalles en la sección de proyectos.</p>
              </div>
              <div className="w-48 mx-auto">
                <ButtonNavigate route={`/project/${projectId}/resumen`} variant="green">
                  Ir al Proyecto
                </ButtonNavigate>
              </div>
            </>,
            "success"
          )
          } else {
            throw new Error(
              "Los datos de la oportunidad no son válidos para crear un proyecto"
            );
          }
        } else {
          alert?.setAlert("Oportunidad actualizada", "success");
        }
      }
    } catch (e) {
      alert?.setAlert(String(e), "error");
    }
  };
  interface CreatedProjectType {
    formData: OpportunityDB;
    selectedOpportunity: OpportunityAndQuotesUI;
  }
  async function createdProject({
    formData,
    selectedOpportunity,
  }: CreatedProjectType)  {
    try {
      progressive?.updateStep(0, "done"); // Creando proyecto

      const quoteActive = validateQuoteAndOpportunity(
        selectedQuoteId,
        selectedOpportunity
      );
      const payload = buildProjectPayload(formData, quoteActive);
      const projectId = await createProjectAndLinkToOpportunity(
        payload,
        formData
      );
      progressive?.updateStep(1, "in-progress"); // Creando fases

      const phaseMap = await createPhasesAndMap(
        selectedOpportunity.phases,
        selectedOpportunity.details_items,
        selectedOpportunity.details_materials,
        projectId
      );

      progressive?.updateStep(1, "done");
      progressive?.updateStep(2, "in-progress"); // Ítems

      const itemsQuoteActive = selectedOpportunity.details_items.filter(
        (i) => i.id_quote === selectedQuoteId
      );
      await insertBudgetItems(itemsQuoteActive, phaseMap, projectId);

      progressive?.updateStep(2, "done");
      progressive?.updateStep(3, "in-progress"); // Materiales

      const materialsQuoteActive = selectedOpportunity.details_materials.filter(
        (m) => m.id_quote === selectedQuoteId
      );
      await insertBudgetMaterials(materialsQuoteActive, phaseMap, projectId);

      progressive?.updateStep(3, "done");
      alert?.setAlert(
        `Proyecto creado con ID: ${projectId}`,
        "success"
      );
      return projectId;
    } catch (e) {
      if (e instanceof ProjectCreationError) {
        alert?.setAlert(`Error en ${e.step}: ${e.message}`, "error");
      } else if (e instanceof Error) {
        alert?.setAlert(`Error inesperado: ${e.message}`, "error");
      } else {
        alert?.setAlert("Ocurrió un error desconocido", "error");
      }
      return null;
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
      <ModalClientes />
    </>
  );
}
