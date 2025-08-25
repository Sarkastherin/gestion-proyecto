import type {
  OpportunityAndQuotesUI,
  PhasesDB,
  DetailsItemsDB,
  DetailsMaterialsDB,
  QuotesProps,
  DetailsMaterialsUI,
} from "~/types/opportunitiesType";
import {
  phasesApi,
  quotesApi,
  details_itemsApi,
  details_materialsApi,
} from "~/backend/cruds";
export function validateOpportunityDuplication(
  original: OpportunityAndQuotesUI | null,
  selected: OpportunityAndQuotesUI | null
) {
  if (!original) throw new Error("No se encontró la oportunidad original.");
  if (!selected) throw new Error("No hay oportunidad seleccionada.");
}
export function getQuoteById(
  opportunity: OpportunityAndQuotesUI,
  quoteId: number
) {
  const quote = opportunity.quotes?.find((q) => q.id === quoteId);
  if (!quote) throw new Error("No se encontró la cotización original.");
  return quote;
}
export async function duplicatePhases({
  oldPhases,
  oldItems,
  oldMaterials,
  id_opportunity,
}: {
  oldPhases: PhasesDB[];
  oldItems: DetailsItemsDB[];
  oldMaterials: DetailsMaterialsDB[];
  id_opportunity: number;
}) {
  const quotePhaseIds = new Set(
    [...oldItems, ...oldMaterials].map((d) => d.id_phase)
  );
  const filtered = oldPhases.filter((p) => quotePhaseIds.has(p.id));

  const newPhases = filtered.map((p) => ({
    name: p.name,
    id_opportunity,
  }));

  const { data, error } = await phasesApi.insert(newPhases);
  if (error) throw new Error(`Error al duplicar fases: ${error.message}`);
  if (!data || data.length !== filtered.length)
    throw new Error("Cantidad de fases duplicadas no coincide.");

  return data;
}
export async function createNewQuote(opportunity: OpportunityAndQuotesUI) {
  const activeQuote = opportunity.quotes?.find((q) => q.active);
  if (activeQuote) {
    const { error } = await quotesApi.update({
      id: activeQuote.id,
      values: { active: false },
    });
    if (error) throw new Error(error.message);
  }

  const newQuote: QuotesProps = {
    id_opportunity: opportunity.id,
    status: "Abierta",
    active: true,
  };

  const { data, error } = await quotesApi.insertOne(newQuote);
  if (error)
    throw new Error(`Error al crear la nueva cotización: ${error.message}`);
  if (!data) throw new Error("No se pudo obtener la nueva cotización creada.");

  return data;
}
export function mapPhases(
  oldPhases: PhasesDB[],
  insertedPhases: PhasesDB[]
): Record<number, number> {
  return oldPhases.reduce<Record<number, number>>((map, old, i) => {
    map[old.id] = insertedPhases[i].id;
    return map;
  }, {});
}
export async function duplicateItems(
  items: DetailsItemsDB[],
  phaseMap: Record<number, number>,
  quoteId: number
) {
  if (items.length === 0) return;

  const newItems = items.map(({ id, created_at, ...item }) => ({
    ...item,
    id_phase: phaseMap[item.id_phase],
    id_quote: quoteId,
  }));

  const { error } = await details_itemsApi.insert(newItems);
  if (error) throw new Error(`Error al duplicar ítems: ${error.message}`);
}
export async function duplicateMaterials(
  materials: DetailsMaterialsUI[],
  phaseMap: Record<number, number>,
  quoteId: number
) {
  if (materials.length === 0) return;

  const newMaterials = materials.map(
    ({ id, created_at, materials, prices, ...mat }) => ({
      ...mat,
      id_phase: phaseMap[mat.id_phase],
      id_quote: quoteId,
    })
  );

  const { error } = await details_materialsApi.insert(newMaterials);
  if (error) throw new Error(`Error al duplicar materiales: ${error.message}`);
}
