import { Button } from "../Forms/Buttons";
import { useUI } from "~/context/UIContext";
import { LayoutModal } from "../Generals/Modals";
import { useOpportunityRealtime } from "~/backend/realTime";
import { useData } from "~/context/DataContext";
import type { QuotesProps } from "~/types/opportunitiesType";
import type { HandleRowClickedOpp } from "~/templates/OpportunitiesTable";
import { OpportunityDB } from "~/templates/OpportunitiesTable"; //table
import {
  phasesApi,
  quotesApi,
  details_itemsApi,
  details_materialsApi,
} from "~/backend/cruds";

export default function ModalQuotes() {
  useOpportunityRealtime()
  const {
    openQuotesModal,
    setOpenQuotesModal,
    showModal,
    closeModal,
  } = useUI();
  const {getOpportunityById, selectedOpportunity} = useData();
  const handleRowClicked: HandleRowClickedOpp = (data) => {
    if (data.total_quote <= 0) return;
    showModal({
      title: "Confirmar",
      message: (
        <div className="text-sm dark:text-zinc-300 text-zinc-600">
          <p className="mb-2">
            Está seleccionando la Oportunidad: <br />
            <span className="font-medium">
              {data.opportunity_name} [{data.id_opportunity}]
            </span>
          </p>
          <ul className="list-inside list-disc">
            <li>
              Materiales:{" "}
              {data.total_materials.toLocaleString("es-AR", {
                style: "currency",
                currency: "USD",
              })}
            </li>
            <li>
              Mano de Obra:{" "}
              {data.total_labor.toLocaleString("es-AR", {
                style: "currency",
                currency: "USD",
              })}
            </li>
            <li>
              Subcontratos:{" "}
              {data.total_subcontracting.toLocaleString("es-AR", {
                style: "currency",
                currency: "USD",
              })}
            </li>
            <li>
              Otros:{" "}
              {data.total_others.toLocaleString("es-AR", {
                style: "currency",
                currency: "USD",
              })}
            </li>
          </ul>
          <p className="font-bold mt-2">
            Total:{" "}
            {data.total_quote.toLocaleString("es-AR", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="bg-yellow-500/30 rounded-sm p-1">
            Esta acción tambien reemplazará las etapas del flujo actual.
          </p>
        </div>
      ),
      variant: "warning",
      handleAccept: async () => {
        closeModal();

        showModal({
          title: "Procesando",
          message: "Duplicando cotización, por favor espere",
          variant: "loanding",
        });

        try {
          const { quote_id, id_opportunity } = data;
          const original = await getOpportunityById(id_opportunity, true);
          if (!original)
            throw new Error("No se encontró la oportunidad original.");
          if (!selectedOpportunity)

            
            throw new Error("No hay oportunidad seleccionada.");

          const {
            phases: oldPhases,
            details_items,
            details_materials,
          } = original;
          const oldItems = details_items.filter(
            (oldItem) => oldItem.id_quote === quote_id
          );
          const oldMaterials = details_materials.filter(
            (oldMaterial) => oldMaterial.id_quote === quote_id
          );
          // 1. Crear nuevas fases
          const quotePhaseIds = new Set([...oldItems, ...oldMaterials].map(d => d.id_phase));
          const filteredOldPhases = oldPhases.filter(p => quotePhaseIds.has(p.id));

          const newPhases = filteredOldPhases.map((p) => ({
            name: p.name,
            id_opportunity: selectedOpportunity.id,
          }));

          const { data: insertedPhases, error: phasesError } =
            await phasesApi.insert(newPhases);
          if (phasesError)
            throw new Error(`Error al duplicar fases: ${phasesError.message}`);
          if (insertedPhases && insertedPhases.length !== oldPhases.length)
            throw new Error("Cantidad de fases duplicadas no coincide.");

          // 2. Nueva cotización
          //2.1 Desactivar cotizacion actual, si existe:
          if (
            selectedOpportunity.quotes &&
            selectedOpportunity.quotes.length > 0
          ) {
            const activeQuote = selectedOpportunity.quotes.find(
              (q) => q.active === true
            );
            if (!activeQuote) return;
            const { error: updateError } = await quotesApi.update({
              id: activeQuote?.id,
              values: { active: false },
            });
            if (updateError) throw new Error(updateError.message);
          }
          //2.2 Crear cotización vacía
          const newQuote: QuotesProps = {
            id_opportunity: selectedOpportunity.id,
            status: "Abierta",
            active: true,
          };

          const { data: createdQuote, error: quoteError } =
            await quotesApi.insertOne(newQuote);
          if (quoteError)
            throw new Error(
              `Error al crear la nueva cotización: ${quoteError.message}`
            );
          if (!createdQuote)
            throw new Error("No se pudo obtener la nueva cotización creada.");

          // 3. Mapear fases originales a las nuevas
          if (!insertedPhases)
            throw new Error("No se pudieron insertar las nuevas fases.");
          const phaseMap = filteredOldPhases.reduce<Record<number, number>>(
            (map, oldPhase, index) => {
              map[oldPhase.id] = insertedPhases[index].id;
              return map;
            },
            {}
          );
          // 4. Copiar ítems
          if (oldItems.length > 0) {
            const itemsToInsert = oldItems.map(
              ({ id, created_at, ...item }) => ({
                ...item,
                id_phase: phaseMap[item.id_phase],
                id_quote: createdQuote.id,
              })
            );
            const { error: itemError } = await details_itemsApi.insert(
              itemsToInsert
            );
            if (itemError)
              throw new Error(`Error al duplicar ítems: ${itemError.message}`);
          }

          // 5. Copiar materiales
          if (oldMaterials.length > 0) {
            const materialsToInsert = oldMaterials.map(
              ({ id, created_at, materials, prices,...mat }) => ({
                ...mat,
                id_phase: phaseMap[mat.id_phase],
                id_quote: createdQuote.id,
              })
            );
            const { error: matError } = await details_materialsApi.insert(
              materialsToInsert
            );
            if (matError)
              throw new Error(
                `Error al duplicar materiales: ${matError.message}`
              );
          }

          // 6. Finalizar
          showModal({
            title: "¡Todo OK!",
            message: "Cotización duplicada correctamente",
            variant: "success",
          });
        } catch (e) {
          showModal({
            title: "Error al duplicar",
            message: "Ocurrió un problema durante el proceso",
            code: String(e),
            variant: "error",
          });
        }
      },
    });
  };
  return (
    <LayoutModal
      open={openQuotesModal}
      title="Listado de Cotizaciones"
      handleOpen={() => setOpenQuotesModal(false)}
      justifyStyle="justify-end"
      buttonsGroup={
        <div className="w-32">
          <Button
            type="button"
            onClick={() => setOpenQuotesModal(false)}
            variant="secondary"
          >
            Cerrar
          </Button>
        </div>
      }
    >
      <div className="overflow-y-auto" style={{ height: "calc(100vh - 270px)" }}>
        <OpportunityDB />
      </div>
    </LayoutModal>
  );
}
