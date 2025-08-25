import type { QuotesUI } from "~/types/opportunitiesType";
import {
  projectsApi,
  opportunityApi,
  phasesProjectApi,
  budgetItemsApi,
  budgetMaterialsApi,
} from "~/backend/cruds";
import { ProjectCreationError } from "./errors";
import type { ProjectsProps } from "~/types/projectsType";
import type {
  OpportunityAndQuotesUI,
  OpportunityDB,
  PhasesDB,
  DetailsItemsDB,
  DetailsMaterialsDB,
  DetailsMaterialsUI
} from "~/types/opportunitiesType";
export function validateQuoteAndOpportunity(
  selectedQuoteId: number | null | undefined,
  selectedOpportunity: OpportunityAndQuotesUI
) {
  if (!selectedQuoteId)
    throw new ProjectCreationError(
      "Validación",
      "No hay una cotización seleccionada"
    );
  if (!selectedOpportunity)
    throw new ProjectCreationError(
      "Validación",
      "No se seleccionó ninguna oportunidad"
    );
  const quoteActive = selectedOpportunity.quotes?.find(
    (q) => q.id === selectedQuoteId
  );
  if (!quoteActive)
    throw new ProjectCreationError(
      "Validación",
      "No se encontró la cotización seleccionada"
    );
  return quoteActive;
}
export function buildProjectPayload(
  formData: OpportunityDB,
  quoteActive: QuotesUI
): ProjectsProps {
  const name = formData.name?.trim();
  if (!name)
    throw new ProjectCreationError(
      "Validación",
      "El nombre del proyecto es obligatorio"
    );
  return {
    name,
    id_opportunity: formData.id,
    id_quote: quoteActive.id,
    id_client: formData.id_client,
    scope: formData.scope || "",
    method_payment: quoteActive.method_payment,
    guarantee: quoteActive.guarantee,
    materials: quoteActive.materials,
    labor: quoteActive.labor,
    subcontracting: quoteActive.subcontracting,
    others: quoteActive.others,
    general: quoteActive.general,
  };
}
export async function createProjectAndLinkToOpportunity(
  payload: ProjectsProps,
  formData: OpportunityDB
) {
  const { data: projectData, error: projectError } =
    await projectsApi.insertOne(payload);
  if (projectError || !projectData || !("id" in projectData)) {
    throw new ProjectCreationError(
      "Creación de proyecto",
      "Error al crear proyecto"
    );
  }

  const projectId = projectData.id;
  const { error: oppError } = await opportunityApi.update({
    id: formData.id,
    values: { id_project: projectId },
  });
  if (oppError)
    throw new ProjectCreationError(
      "Actualización de oportunidad",
      "Error al actualizar oportunidad"
    );

  return projectId;
}
export async function createPhasesAndMap(
  phases: PhasesDB[],
  items: DetailsItemsDB[],
  materials: DetailsMaterialsDB[],
  projectId: number
) {
  const quotePhaseIds = new Set(
    [...items, ...materials].map((d) => d.id_phase)
  );
  const filteredPhases = phases.filter((p) => quotePhaseIds.has(p.id));

  if (filteredPhases.length === 0)
    throw new ProjectCreationError(
      "Creación de fases",
      "Cantidad de fases creadas no coincide"
    );

  const newPhases = filteredPhases.map((p) => ({
    name: p.name?.trim(),
    id_project: projectId,
  }));

  const { data: insertedPhases, error: phasesError } =
    await phasesProjectApi.insert(newPhases);
  if (
    phasesError ||
    !insertedPhases ||
    insertedPhases.length !== filteredPhases.length
  ) {
    throw new ProjectCreationError("Creación de fases", "Error al crear fases");
  }

  return filteredPhases.reduce<Record<number, number>>(
    (map, oldPhase, index) => {
      map[oldPhase.id] = insertedPhases[index].id;
      return map;
    },
    {}
  );
}
export async function insertBudgetItems(
  items: DetailsItemsDB[],
  phaseMap: Record<number, number>,
  projectId: number
) {
  if (items.length === 0) return;

  const newItems = items.map(({ id, created_at, ...item }) => ({
    ...item,
    id_phase: phaseMap[item.id_phase],
    id_project: projectId,
  }));

  const { error } = await budgetItemsApi.insert(newItems);
  if (error)
    throw new ProjectCreationError(
      "Presupuesto - Ítems",
      "Error al crear ítems del presupuesto"
    );
}
export async function insertBudgetMaterials(
  materials: DetailsMaterialsUI[],
  phaseMap: Record<number, number>,
  projectId: number
) {
  if (materials.length === 0) return;

  const newMaterials = materials.map(
    ({ id, created_at, materials, prices, ...mat }) => ({
      ...mat,
      id_phase: phaseMap[mat.id_phase],
      id_project: projectId,
    })
  );

  const { error } = await budgetMaterialsApi.insert(newMaterials);
  if (error)
    throw new ProjectCreationError(
      "Presupuesto - Materiales",
      "Error al crear materiales del presupuesto"
    );
}
