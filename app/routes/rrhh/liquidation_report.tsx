import type { Route } from "../+types/home";
import { EntityTable } from "~/components/Generals/EntityTable";
import { useData } from "~/context/DataContext";
import type { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import type { ReportsEmployeesUIView } from "~/types/projectsType";
import { formatDateUStoES } from "~/utils/functionsDays";
import FooterUITables from "~/components/Generals/FooterUITable";
import { ButtonExport } from "~/components/Specific/Buttons";
import { ALLOWED_REPORTS_EMPLOYEES } from "~/components/auth/allowedRoles";
import { Receipt } from "lucide-react";
import { calculatePaidHours } from "~/utils/payFactors";
import { LoaderComponent } from "~/components/Generals/LoaderComponent";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Asistencias" },
    { name: "description", content: "Asistencias" },
  ];
}
type LiquidationReport = ReportsEmployeesUIView & {
  equivalent_hours?: number;
};
const columns: TableColumn<LiquidationReport>[] = [
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
    name: "Total horas",
    selector: (row) => row.hours_worked?.toFixed(2) || "0",
    sortable: true,
    width: "150px",
  },
  {
    name: "Horas equiv",
    selector: (row) => row.equivalent_hours ?? 0,
    sortable: true,
    width: "150px",
  },
  {
    name: "Proyecto",
    selector: (row) => row.project_name || "",
    sortable: true,
  },
];

export default function LiquidationReport() {
  const { getReportsEmployees, reportsEmployees, holidays, getHolidays } =
    useData();

  useEffect(() => {
    if (!reportsEmployees) getReportsEmployees();
    if (!holidays) getHolidays();
  }, []);
  const [filtered, setFiltered] = useState(reportsEmployees ?? []);
  useEffect(() => {
    if (reportsEmployees && holidays) {
      const updatedReports = reportsEmployees.map((report) => {
        const hoursWorked = calculatePaidHours(
          report.hours_worked ?? 0,
          report.date_report,
          holidays,
        );
        return { ...report, equivalent_hours: hoursWorked };
      });
      setFiltered(updatedReports);
    }
  }, [reportsEmployees, holidays]);
  const headers = [
    { label: "ID", key: "id" },
    { label: "Fecha", key: "date_report" },
    { label: "Empleado", key: "employee.contacto_nombre" },
    { label: "Asistencia", key: "absent" },
    { label: "Entrada", key: "hour_start" },
    { label: "Salida", key: "hour_end" },
    { label: "Proyecto", key: "project_name" },
  ];
  if (!reportsEmployees || !holidays) return <LoaderComponent />;
  return (
    <ProtectedRoute allowed={ALLOWED_REPORTS_EMPLOYEES}>
      <ContainerWithTitle
        title={"Liquidación de sueldos"}
        width="w-full"
        back_path="/rrhh"
        IconComponent={{ component: Receipt, color: "text-green-600" }}
      >
        <EntityTable
          data={filtered}
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
            {
              key: "date_report",
              label: "Fecha",
              type: "dateRange",
              autoFilter: true,
            },
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
