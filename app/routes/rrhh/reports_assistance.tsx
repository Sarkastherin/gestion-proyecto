import type { Route } from "../+types/home";
import { EntityTable } from "~/components/Generals/EntityTable";
import { useData } from "~/context/DataContext";
import { useNavigate } from "react-router";
import type { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import type { ReportsEmployeesUIView } from "~/types/projectsType";
import { formatDateUStoES } from "~/utils/functionsDays";
import { Badge } from "~/components/Specific/Badge";
import FooterUITables from "~/components/Generals/FooterUITable";
import { ButtonExport } from "~/components/Specific/Buttons";
import { ALLOWED_REPORTS_EMPLOYEES } from "~/components/auth/allowedRoles";
import { LoaderComponent } from "~/components/Generals/LoaderComponent";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Asistencias" },
    { name: "description", content: "Asistencias" },
  ];
}
const columns: TableColumn<ReportsEmployeesUIView>[] = [
  { name: "Id", selector: (row) => row.id, width: "80px", sortable: true },
  {
    name: "Fecha",
    selector: (row) => formatDateUStoES(row.date_report) || "",
    sortable: true,
    width: "130px",
  },
  {
    name: "Empleado",
    selector: (row) => row.employee?.contacto_nombre || "",
    sortable: true,
  },
  {
    name: "Asistencia",
    cell: (row) => (
      <Badge variant={row.absent ? "red" : "green"}>
        {row.absent ? "Ausente" : "Presente"}
      </Badge>
    ),
    sortable: true,
    width: "130px",
  },
  {
    name: "Entrada",
    selector: (row) => row.hour_start || "",
    sortable: true,
    width: "120px",
  },
  {
    name: "Salida",
    selector: (row) => row.hour_end || "",
    sortable: true,
    width: "120px",
  },
  {
    name: "Proyecto",
    selector: (row) => row.project_name || "",
    sortable: true,
  },
];

export default function ReportEmployees() {
  const { getReportsEmployees, reportsEmployees } = useData();

  useEffect(() => {
    if (!reportsEmployees) getReportsEmployees();
  }, []);
  const [filtered, setFiltered] = useState(reportsEmployees ?? []);
  useEffect(() => {
    setFiltered(reportsEmployees ?? []);
  }, [reportsEmployees]);
  const headers = [
    { label: "ID", key: "id" },
    { label: "Fecha", key: "date_report" },
    { label: "Empleado", key: "employee.contacto_nombre" },
    { label: "Asistencia", key: "absent" },
    { label: "Entrada", key: "hour_start" },
    { label: "Salida", key: "hour_end" },
    { label: "Proyecto", key: "project_name" },
  ];
  if (!reportsEmployees) return <LoaderComponent />;
  return (
    <ProtectedRoute allowed={ALLOWED_REPORTS_EMPLOYEES}>
      <ContainerWithTitle title={"Asistencias"} width="w-full">
        <EntityTable
          data={reportsEmployees}
          columns={columns}
          onFilteredChange={setFiltered}
          filterFields={[
            {
              key: "employee.contacto_nombre",
              label: "Nombre del empleado",
              autoFilter: true,
            },
            {
              key: "absent",
              label: "Asistencia",
              type: "select",
              options: (
                <>
                  <option value={"true"}>Ausente</option>
                  <option value={"false"}>Presente</option>
                </>
              ),
              autoFilter: true,
            },
            { key: "project_name", label: "Proyecto", autoFilter: true },
            { key: "date_report", label: "Fecha", type: "dateRange", autoFilter: true },
          ]}
        />
      </ContainerWithTitle>
      <FooterUITables justify="justify-between">
        <div className="flex gap-4">
          <ButtonExport
            data={filtered}
            headers={headers}
            filename="Asistencias"
            type="absents"
          />
        </div>
      </FooterUITables>
    </ProtectedRoute>
  );
}
