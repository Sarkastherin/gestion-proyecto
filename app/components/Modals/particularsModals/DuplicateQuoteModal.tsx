import ModalBase from "../ModalBase";
import { columnsMaterials } from "~/routes/materials";
import { EntityTable } from "~/components/Generals/EntityTable";
import { useState, useEffect } from "react";
import type { MaterialsUI } from "~/types/materialsType";
import { useData } from "~/context/DataContext";
import type { TableColumn } from "react-data-table-component";
import type { StatusType } from "~/types/database";
import { setEntities } from "~/services/fetchers/fetchEntitiesWithClient";
import { BadgeStatus } from "~/components/Specific/Badge";
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
  const [data, setData] = useState<ViewType[] | null>(null);
  const [filterData, setFilterData] = useState<ViewType[]>([]);
  const handleRowClicked = (data: ViewType) => {};
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
