import ModalBase from "../ModalBase";
import { EntityTable } from "~/components/Generals/EntityTable";
import { useState, useEffect } from "react";
import { useData } from "~/context/DataContext";
import type { TableColumn } from "react-data-table-component";
import type { StatusType } from "~/types/database";
import { setEntities } from "~/services/fetchers/fetchEntitiesWithClient";
import { BadgeStatus } from "~/components/Specific/Badge";
import { useUIModals } from "~/context/ModalsContext";
import {
  validateOpportunityDuplication,
  createNewQuote,
  duplicateItems,
  duplicateMaterials,
  duplicatePhases,
  getQuoteById,
  mapPhases,
} from "~/utils/duplicateQuote";
import type { OpportunityAndQuotesUI } from "~/types/opportunitiesType";
import type { Step } from "~/context/ModalsContext";
export type ViewType = {
  id_opportunity: number;
  quote_id: number;
  opportunity_name: string;
  opportunity_status: StatusType;
  total_materials: number;
  total_labor: number;
  total_subcontracting: number;
  total_others: number;
  gain_materials: number;
  gain_labor: number;
  gain_subcontracting: number;
  gain_others: number;
  total_quote: number;
};
const columns: TableColumn<ViewType>[] = [
  {
    name: "Id",
    selector: (row) => row.id_opportunity,
    width: "80px",
  },
  {
    name: "Nombre de la Oportunidad",
    selector: (row) => row.opportunity_name,
  },
  {
    name: "Monto cotizado",
    selector: (row) =>
      (row.total_quote ?? 0).toLocaleString("es-AR", {
        style: "currency",
        currency: "USD",
      }),
    sortable: true,
  },
  {
    name: "Status",
    cell: (row) => (
      <BadgeStatus variant={row.opportunity_status}>
        {row.opportunity_status}
      </BadgeStatus>
    ),
    width: "120px",
  },
];
export default function DuplicateQuoteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { getOpportunityById, selectedOpportunity } = useData();
  const { openModal, setProgressiveSteps, updateStep } = useUIModals();
  const [data, setData] = useState<ViewType[] | null>(null);
  const [filterData, setFilterData] = useState<ViewType[]>([]);
  useEffect(() => {
    getViewOpportunities();
  }, []);
  useEffect(() => {
    if (data) {
      setFilterData(data.filter((item) => item.total_quote > 0));
    }
  }, [data]);
  const getViewOpportunities = async (): Promise<void> => {
    setEntities({
      table: "view_resume_totals",
      select: "*",
      setData: setData,
      id_name: "id_opportunity",
    });
  };
  const initialSteps: Step[] = [
    { label: "Obteniendo datos de cotización a duplicar", status: "pending" },
    { label: "Insertando nuevas fases", status: "pending" },
    { label: "Creando nueva cotización", status: "pending" },
    { label: "Duplicando detalles de cotización", status: "pending" },
    { label: "Duplicando materiales", status: "pending" },
  ];
  const handleRowClicked = (data: ViewType) => {
    console.log(data);
    openModal("CONFIRMATION", {
      title: "Confirmar Duplicación",
      message: (
        <div className="text-start">
          <p>
            Está seleccionando la Oportunidad: <br />
            💼{" "}
            <em className="">
              {data.opportunity_name} [{data.id_opportunity}]
            </em>
          </p>
          <ul className="mt-2 list-inside list-disc">
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
          <p className="mt-2 rounded-sm text-center text-yellow-600 font-bold">
            Esta acción tambien reemplazará las etapas del flujo actual.
          </p>
        </div>
      ),
      onConfirm: async () => {
        setProgressiveSteps(initialSteps);
        openModal("PROGRESSIVE");
        if (!selectedOpportunity) return;
        await duplicateQuoteFromOpportunity({
          quote_id: data.quote_id,
          id_opportunity: data.id_opportunity,
          selectedOpportunity: selectedOpportunity,
        });
        openModal("SUCCESS", {
          title: "✅ Cotización duplicada con éxito",
          message: "La cotización se ha duplicado correctamente.",
        });
      },
    });
  };
  async function duplicateQuoteFromOpportunity({
    quote_id,
    id_opportunity,
    selectedOpportunity,
  }: {
    quote_id: number;
    id_opportunity: number;
    selectedOpportunity: OpportunityAndQuotesUI;
  }) {
    try {
      const original = await getOpportunityById(id_opportunity, true);
      if (!original) throw new Error("No se encontró la oportunidad original.");
      validateOpportunityDuplication(original, selectedOpportunity);

      //const quoteActive = getQuoteById(original, quote_id);
      const { phases, details_items, details_materials } = original;

      const oldItems = details_items.filter((i) => i.id_quote === quote_id);
      const oldMaterials = details_materials.filter(
        (m) => m.id_quote === quote_id
      );
      updateStep(0, "done");

      const insertedPhases = await duplicatePhases({
        oldPhases: phases,
        oldItems,
        oldMaterials,
        id_opportunity: selectedOpportunity.id,
      });
      updateStep(1, "done");
      
      const createdQuote = await createNewQuote(selectedOpportunity);
      updateStep(2, "done");
      const phaseMap = mapPhases(phases, insertedPhases);

      await duplicateItems(oldItems, phaseMap, createdQuote.id);
      updateStep(3, "done");
      await duplicateMaterials(oldMaterials, phaseMap, createdQuote.id);
      updateStep(4, "done");/*  */

      openModal("SUCCESS", {
        title: "¡Todo OK!",
        message: "Cotización duplicada correctamente",
      });
    } catch (e) {
      openModal("ERROR", {
        title: "Error al duplicar cotización",
        message: e instanceof Error ? e.message : "Error desconocido",
      });
    }
  }
  return (
    <ModalBase
      title="Listado de Cotizaciones"
      open={open}
      zIndex={40}
      onClose={onClose}
      width="max-w-4xl"
      footer={{
        btnSecondary: {
          label: "Cancelar",
          handleOnClick: onClose,
        },
      }}
    >
      <div
        className="px-6 pt-6 overflow-y-auto"
        style={{ height: "calc(100vh - 270px)" }}
      >
        <EntityTable
          columns={columns}
          data={filterData}
          onRowClick={handleRowClicked}
          filterFields={[
            { key: "opportunity_name", label: "Buscar por descripción" },
          ]}
        />
      </div>
    </ModalBase>
  );
}
