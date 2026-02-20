import type { Route } from "../+types/home";
import { EntityTable } from "~/components/Generals/EntityTable";
import { useData } from "~/context/DataContext";
import type { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { formatDateUStoES } from "~/utils/functionsDays";
import { ALLOWED_REPORTS_EMPLOYEES } from "~/components/auth/allowedRoles";
import { FileClock } from "lucide-react";
import { LoaderComponent } from "~/components/Generals/LoaderComponent";
import type { LiquidationReport } from "~/types/projectsType";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Horas Equivalentes y viáticos" },
    { name: "description", content: "Horas Equivalentes y viáticos" },
  ];
}
const daysOfWeek = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];
const columns: TableColumn<LiquidationReport>[] = [
  { name: "Id", selector: (row) => row.id, width: "80px", sortable: true },
  {
    name: "Empleado",
    selector: (row) => row.employee?.contacto_nombre || "",
    sortable: true,
  },
  {
    name: "Fecha",
    selector: (row) => formatDateUStoES(row.date_report) || "",
    sortable: true,
    width: "130px",
  },
  {
    name: "Día de la semana",
    selector: (row) => {
      const dateSplit = row.date_report.split("-");
      const dateString = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`;
      const day = daysOfWeek[new Date(dateString).getDay()];
      return `${day}`;
    },
    sortable: true,
    width: "150px",
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
    name: "Tipo de día",
    selector: (row) =>
      row.day_type === "weekday"
        ? "Día laborable"
        : row.day_type === "saturday"
          ? "Sábado"
          : row.day_type === "sundayOrHoliday"
            ? "Domingo/Feriado"
            : "",
    sortable: true,
    width: "150px",
  },
  {
    name: "Proyecto",
    selector: (row) => row.project_name || "",
    sortable: true,
  },
  {
    name: "Viatico",
    cell: (row) => (row.viaticum ? "Sí" : "No"),
    sortable: true,
    width: "120px",
  },
];

export default function LiquidationReport() {
  const { getLiquidationReport, liquidationReport } = useData();

  useEffect(() => {
    if (!liquidationReport) getLiquidationReport();
  }, []);
  const [filtered, setFiltered] = useState<LiquidationReport[] | null>(liquidationReport);
  useEffect(() =>{
    if (liquidationReport) setFiltered(liquidationReport);
  },[liquidationReport])

  const headers = [
    { label: "ID", key: "id" },
    { label: "Fecha", key: "date_report" },
    { label: "Empleado", key: "employee.contacto_nombre" },
    { label: "Asistencia", key: "absent" },
    { label: "Entrada", key: "hour_start" },
    { label: "Salida", key: "hour_end" },
    { label: "Proyecto", key: "project_name" },
    { label: "Total horas", key: "hours_worked" },
    { label: "Horas equivalentes", key: "equivalent_hours" },
    { label: "Viatico", key: "viaticum" },
  ];
  if (!filtered) return <LoaderComponent />;
  return (
    <ProtectedRoute allowed={ALLOWED_REPORTS_EMPLOYEES}>
      <ContainerWithTitle
        title={"Horas Equivalentes y viáticos"}
        width="w-full"
        back_path="/rrhh"
        IconComponent={{ component: FileClock, color: "text-green-600" }}
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
          buttonExport={{
            headers,
            filename: "Liquidación de sueldos",
            type: "liquidation",
          }}
        />
      </ContainerWithTitle>
    </ProtectedRoute>
  );
}
