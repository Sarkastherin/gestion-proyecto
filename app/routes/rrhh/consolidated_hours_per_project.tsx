import type { Route } from "../+types/home";
import { EntityTable } from "~/components/Generals/EntityTable";
import { useData } from "~/context/DataContext";
import type { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { formatDateUStoES } from "~/utils/functionsDays";
import { ALLOWED_REPORTS_EMPLOYEES } from "~/components/auth/allowedRoles";
import { Receipt } from "lucide-react";
import { LoaderComponent } from "~/components/Generals/LoaderComponent";
import { useForm } from "react-hook-form";
import type { LiquidationReport } from "~/types/projectsType";
import { Input } from "~/components/Forms/Inputs";
import { Button } from "~/components/Forms/Buttons";
import { Funnel } from "lucide-react";
import { MdPictureAsPdf } from "react-icons/md";
import { Subtitle } from "~/components/Generals/Containers";
import { useNavigate } from "react-router";
import { FaBusinessTime } from "react-icons/fa";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Consolidado de horas por proyecto" },
    { name: "description", content: "Consolidado de horas por proyecto" },
  ];
}
export type ConsolidatedDataPerProject = {
  project_name: string;
  total_equivalent_hours: number;
  total_viaticum: number;
  total_equivalent_days: number;
  alimentation: number;
  employees: {
    employee_name?: string;
    equivalent_hours: number;
    viaticum: number;
    equivalent_days: number;
    alimentation: number;
    dayReport: LiquidationReport[];
  }[];
};
export type GlobalBalance = {
  total_equivalent_hours: number;
  total_viaticum: number;
  total_equivalent_days: number;
  alimentation: number;
};
const columns: TableColumn<ConsolidatedDataPerProject>[] = [
  {
    name: "Empleado",
    selector: (row) => row.project_name || "",
    sortable: true,
  },
  {
    name: "Horas equivalentes",
    selector: (row) => row.total_equivalent_hours,
    sortable: true,
    width: "150px",
  },
  {
    name: "Días equivalentes",
    selector: (row) => row.total_equivalent_days,
    sortable: true,
    width: "150px",
  },
  {
    name: "Viáticos",
    selector: (row) => row.total_viaticum,
    sortable: true,
    width: "120px",
  },
  {
    name: "Comidas",
    selector: (row) => row.alimentation,
    sortable: true,
    width: "120px",
  },
];
type FormFilter = { project_name: string; from: string; to: string };

export default function ConsolidatedHoursPerProject() {
  const navigate = useNavigate();
  const { getLiquidationReport, liquidationReport } = useData();
  const { register, handleSubmit, getValues } = useForm<FormFilter>();

  useEffect(() => {
    if (!liquidationReport) getLiquidationReport();
  }, []);
  const [filtered, setFiltered] = useState<ConsolidatedDataPerProject[] | null>(
    null,
  );
  const [globalBalance, setGlobalBalance] = useState<GlobalBalance>({
    total_equivalent_hours: 0,
    total_viaticum: 0,
    total_equivalent_days: 0,
    alimentation: 0,
  });

  const getConsolidatedData = (opt?: { filters?: FormFilter }) => {
    const consolidated: Record<string, ConsolidatedDataPerProject> = {};
    if (!liquidationReport) return;
    let dataLiquidationReport = liquidationReport;
    // filtrar por nombre de empleado
    if (opt?.filters?.project_name) {
      dataLiquidationReport = dataLiquidationReport.filter((report) =>
        report.project_name
          ?.toLowerCase()
          .includes(opt.filters!.project_name.toLowerCase()),
      );
    }
    if (opt?.filters?.from) {
      const from = new Date(opt.filters!.from).getTime();
      const to = opt.filters!.to
        ? new Date(opt.filters!.to).getTime()
        : Infinity;
      dataLiquidationReport = dataLiquidationReport.filter(
        (report) =>
          new Date(report.date_report).getTime() >= from &&
          new Date(report.date_report).getTime() <= to,
      );
    }

    dataLiquidationReport.forEach((report) => {
      const projectName = report.project_name || "Desconocido";
      if (!consolidated[projectName]) {
        consolidated[projectName] = {
          project_name: projectName,
          total_equivalent_hours: 0,
          total_viaticum: 0,
          total_equivalent_days: 0,
          alimentation: 0,
          employees: [],
        };
      }
      consolidated[projectName].total_equivalent_hours +=
        report.equivalent_hours ?? 0;
      //redondear a 2 decimales      consolidated[projectName].total_equivalent_hours = parseFloat(
      consolidated[projectName].total_equivalent_hours = parseFloat(
        consolidated[projectName].total_equivalent_hours.toFixed(2),
      );
      if (report.viaticum) {
        consolidated[projectName].total_viaticum += 1;
      }
      if (report.equivalent_hours) {
        consolidated[projectName].total_equivalent_days +=
          report.equivalent_hours / 9;
      }
      consolidated[projectName].total_equivalent_days = parseFloat(
        consolidated[projectName].total_equivalent_days.toFixed(2),
      );
      // sumar 1 a alimentación por cada día presentes en el reporte
      if (!report.absent) {
        consolidated[projectName].alimentation += 1;
      }
      // Datos por empleado
      const existingEmployee = consolidated[projectName].employees.find(
        (emp) => emp.employee_name === report.employee?.contacto_nombre,
      );
      if (existingEmployee) {
        existingEmployee.equivalent_hours += report.equivalent_hours ?? 0;
        existingEmployee.equivalent_days += report.equivalent_hours
          ? parseFloat(((report.equivalent_hours ?? 0) / 9).toFixed(2))
          : 0;
        existingEmployee.alimentation += report.absent ? 0 : 1;
        if (report.viaticum) {
          existingEmployee.viaticum += 1;
        }
        existingEmployee.dayReport.push(report);
      }
      else {
        consolidated[projectName].employees.push({
          employee_name: report.employee?.contacto_nombre || "Desconocido",
          equivalent_hours: report.equivalent_hours ?? 0,
          equivalent_days: report.equivalent_hours
            ? parseFloat(((report.equivalent_hours ?? 0) / 9).toFixed(2))
            : 0,
          viaticum: report.viaticum ? 1 : 0,
          alimentation: report.absent ? 0 : 1,
          dayReport: [report],
        });
      }
      
    });
    // Global balance
    const global: GlobalBalance = {
      total_equivalent_hours: 0,
      total_viaticum: 0,
      total_equivalent_days: 0,
      alimentation: 0,
    };
    Object.values(consolidated).forEach((project) => {
      global.total_equivalent_hours += project.total_equivalent_hours;
      global.total_viaticum += project.total_viaticum;
      global.total_equivalent_days += project.total_equivalent_days;
      global.alimentation += project.alimentation;
    });
    setGlobalBalance(global);
    setFiltered(Object.values(consolidated));
  };
  useEffect(() => {
    if (liquidationReport) {
      getConsolidatedData();
    }
  }, [liquidationReport]);

  const ExpandedComponent = ({
    data,
  }: {
    data: ConsolidatedDataPerProject;
  }) => (
    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40">
      <h3 className="text-lg font-semibold mb-2">
        Horas de {data.project_name}
      </h3>
       {data.employees.map((employee) => (
        <div key={employee.employee_name} className="mb-4">
          <h4 className="text-md font-medium mb-1">{employee.employee_name}</h4>
          <p>Horas equivalentes: {employee.equivalent_hours}</p>
          <p>Viáticos: {employee.viaticum}</p>
          <details className="mt-2 text-sm">
            <summary className="text-blue-700 dark:text-blue-300">Detalles</summary>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="font-medium">
                  <th className="border-b border-zinc-300 dark:border-zinc-700/60 px-4 py-2">
                    Fecha
                  </th>
                  <th className="border-b border-zinc-300 dark:border-zinc-700/60 px-4 py-2">
                    HS-EQ
                  </th>
                  <th className="border-b border-zinc-300 dark:border-zinc-700/60 px-4 py-2">
                    Días EQ
                  </th>
                  <th className="border-b border-zinc-300 dark:border-zinc-700/60 px-4 py-2">
                    Viático
                  </th>
                  <th className="border-b border-zinc-300 dark:border-zinc-700/60 px-4 py-2">
                    Comida
                  </th>
                </tr>
              </thead>
              <tbody>
                {employee.dayReport.map((report) => (
                  <tr key={report.id}>
                    <td className="border-b border-zinc-300 dark:border-zinc-700/60 px-4 py-2">
                      {formatDateUStoES(report.date_report)}
                    </td>
                    <td className="border-b border-zinc-300 dark:border-zinc-700/60 px-4 py-2">
                      {report.equivalent_hours?.toFixed(2) || "0"}
                    </td>
                    <td className="border-b border-zinc-300 dark:border-zinc-700/60 px-4 py-2">
                      {(report.equivalent_hours
                        ? report.equivalent_hours / 9
                        : 0
                      ).toFixed(2)}
                    </td>
                    <td className="border-b border-zinc-300 dark:border-zinc-700/60 px-4 py-2">
                      {report.viaticum ? "Sí" : "No"}
                    </td>
                    <td className="border-b border-zinc-300 dark:border-zinc-700/60 px-4 py-2">
                      {!report.absent ? "Sí" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>
      ))}
    </div>
  );
  const onSubmit = (data: FormFilter) => {
    getConsolidatedData({ filters: data });
  };
  const handleExport = () => {
    navigate("/rrhh/consolidated_hours_per_project/pdf", {
      state: {
        data: filtered,
        globalBalance,
        periodo: { from: getValues("from"), to: getValues("to") },
      },
    });
  };
  if (!filtered) return <LoaderComponent />;
  return (
    <ProtectedRoute allowed={ALLOWED_REPORTS_EMPLOYEES}>
      <div className="flex flex-1 min-h-[calc(100vh-64px)]">
        {/* Table */}
        <div className="w-full overflow-x-auto py-4 px-4 lg:px-10">
          <div className="my-4">
            <Subtitle
              title={"Consolidado de horas por proyecto"}
              back_path="/rrhh"
              IconComponent={{
                component: FaBusinessTime,
                color: "text-purple-600",
              }}
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-stretch lg:items-end w-full"
          >
            <div className="w-full">
              <Input
                label="Filtrar por proyecto"
                {...register("project_name")}
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex gap-2 items-center">
                <Input label="Desde" type="date" {...register("from")} />
                <span className="text-sm">a</span>
                <Input type="date" label="Hasta" {...register("to")} />
              </div>
              <Button type="submit" icon={{ component: Funnel, color: "" }}>
                Filtrar
              </Button>
            </div>
            <div className="w-full lg:w-auto hidden">
              <Button type="submit" icon={{ component: Funnel, color: "" }}>
                Filtrar
              </Button>
            </div>
          </form>
          <EntityTable
            data={filtered}
            columns={columns}
            expandableRows
            disableRowClick
            ExpandedComponent={ExpandedComponent}
            buttonOnClick={{
              title: "Reporte en PDF",
              color: "red",
              onClick: handleExport,
              icon: { component: MdPictureAsPdf, color: "text-white" },
            }}
          />
        </div>
        {/* Sidebar */}
        <div className="hidden md:flex flex-col items-center w-54 pt-10 border-r border-zinc-300 bg-white dark:border-zinc-700/60 dark:bg-zinc-900/70 px-4 shadow">
          <h3 className="text-xl font-bold mb-4 text-yellow-700 dark:text-yellow-500 flex items-center">
            <span>Balance global</span>
          </h3>
          <div className="flex flex-col gap-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 flex flex-col items-center shadow-sm">
              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400 mb-1">
                Horas equivalentes
              </span>
              <span className="text-2xl font-semibold">
                {globalBalance.total_equivalent_hours.toFixed(2)}
              </span>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 flex flex-col items-center shadow-sm">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                Días equivalentes
              </span>
              <span className="text-2xl font-semibold">
                {globalBalance.total_equivalent_days.toFixed(2)}
              </span>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 flex flex-col items-center shadow-sm">
              <span className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                Viáticos
              </span>
              <span className="text-2xl font-semibold">
                {globalBalance.total_viaticum}
              </span>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/30 rounded-lg p-4 flex flex-col items-center shadow-sm">
              <span className="text-sm font-medium text-pink-700 dark:text-pink-300 mb-1">
                Alimentación
              </span>
              <span className="text-2xl font-semibold">
                {globalBalance.alimentation}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
