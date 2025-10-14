import type { Route } from "./+types/home";
import { EntityTable } from "~/components/Generals/EntityTable";
import { useData } from "~/context/DataContext";
import { useNavigate } from "react-router";
import { StatusOptions } from "~/components/Specific/StatusOptions";
import type { ProjectsUITable } from "~/types/projectsType";
import type { TableColumn } from "react-data-table-component";
import { useEffect } from "react";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import CardReport from "~/components/dayly_report/CardReport";
import { useAuth } from "~/context/AuthContext";
import { Input, Select } from "~/components/Forms/Inputs";
import DailyReportModal from "~/components/modals/particularsModals/DailyReportModal";
import { useModalState } from "~/components/modals/particularsModals/useModalState";
import type { DailyReportsView, DailyReportUI } from "~/types/projectsType";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Partes Diarios" },
    { name: "description", content: "Partes Diarios" },
  ];
}
const columns: TableColumn<ProjectsUITable>[] = [
  { name: "Id", selector: (row) => row.id, width: "80px", sortable: true },
  {
    name: "Fecha",
    selector: (row) =>
      new Date(row.created_at).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    width: "170px",
    sortable: true,
  },
  {
    name: "Nombre de la Oportunidad",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Cliente",
    selector: (row) => row.client?.nombre || "",
    width: "270px",
    sortable: true,
  },
  {
    name: "Creado por",
    selector: (row) => row.users?.user_name || "",
    width: "120px",
    sortable: true,
  },
];

export default function DailyReport() {
  const { user } = useAuth();
  const { getReportsBySupervisor, dailyReportsView, getDailyReportById, getProjectById, selectedProject } = useData();
  const navigate = useNavigate();
  const dailyReportModal = useModalState<{
    type: "new" | "edit";
    data?: DailyReportUI;
  }>();

  useEffect(() => {
    if (!user) return;
    if (user.id_supervisor) {
      getReportsBySupervisor(user.id_supervisor);
    }
  }, []);
  useEffect(() => {
    if (dailyReportsView && dailyReportsView.length > 0) {
    }
  }, [dailyReportsView]);
const handleOpenModal = async (id: number, id_project: number) => {
  const report = await getDailyReportById(id);
  console.log("report", report);
  //dailyReportModal.openModal({ type: "edit", data: undefined });
}
  return (
    <>
      {dailyReportsView && (
        <>
          <ContainerWithTitle title={"Partes Diarios"} width="w-full">
            <form className="flex gap-4 mb-4">
              <Input type="date" label="Fecha" />
              <Input type="text" label="Proyecto" />
              <Input type="text" label="Etapa" />
              <Select label="Estado">
                <option value="">Todos</option>
                <option value="borrador">Borrador</option>
                <option value="finalizado">Finalizado</option>
              </Select>
            </form>
            {dailyReportsView && dailyReportsView.length > 0 ? (
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {dailyReportsView.map((report) => (
                  <CardReport key={report.id} report={report} onOpenModal={() => handleOpenModal(report.id, report.id_project)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                No hay partes diarios asignados.
              </div>
            )}
          </ContainerWithTitle>
          {dailyReportModal.data?.type && (
            <DailyReportModal
              open={dailyReportModal.open}
              onClose={dailyReportModal.closeModal}
              type={dailyReportModal.data.type}
              report={dailyReportModal.data.data}
            />
          )}
        </>
      )}
    </>
  );
}
