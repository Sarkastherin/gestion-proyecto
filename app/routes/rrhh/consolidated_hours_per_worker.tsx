import type { Route } from "../+types/home";
import { EntityTable } from "~/components/Generals/EntityTable";
import { useData } from "~/context/DataContext";
import type { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { formatDateUStoES } from "~/utils/functionsDays";
import { ALLOWED_REPORTS_EMPLOYEES } from "~/components/auth/allowedRoles";
import { LoaderComponent } from "~/components/Generals/LoaderComponent";
import { useForm } from "react-hook-form";
import type { LiquidationReport } from "~/types/projectsType";
import { Input } from "~/components/Forms/Inputs";
import { Button } from "~/components/Forms/Buttons";
import { Funnel } from "lucide-react";
import { MdPictureAsPdf } from "react-icons/md";
import { Subtitle } from "~/components/Generals/Containers";
import { useNavigate } from "react-router";
import { FaUserClock } from "react-icons/fa6";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Consolidado de horas por operario" },
    { name: "description", content: "Consolidado de horas por operario" },
  ];
}
export type ConsolidatedData = {
  employee_name: string;
  total_equivalent_hours: number;
  total_viaticum: number;
  total_equivalent_days: number;
  alimentation: number;
  projects: {
    project_name: string;
    equivalent_hours: number;
    equivalent_days: number;
    alimentation: number;
    viaticum: number;
    dayReport: LiquidationReport[];
  }[];
};
export type GlobalBalance = {
  total_equivalent_hours: number;
  total_viaticum: number;
  total_equivalent_days: number;
  alimentation: number;
};
const columns: TableColumn<ConsolidatedData>[] = [
  {
    name: "Empleado",
    selector: (row) => row.employee_name || "",
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
type FormFilter = { employee_name: string; from: string; to: string };

export default function ConsolidatedHoursPerWorker() {
  const navigate = useNavigate();
  const { getLiquidationReport, liquidationReport } = useData();
  const { register, handleSubmit, getValues } = useForm<FormFilter>();

  useEffect(() => {
    if (!liquidationReport) getLiquidationReport();
  }, []);
  const [filtered, setFiltered] = useState<ConsolidatedData[] | null>(null);
  const [globalBalance, setGlobalBalance] = useState<GlobalBalance>({
    total_equivalent_hours: 0,
    total_viaticum: 0,
    total_equivalent_days: 0,
    alimentation: 0,
  });

  const getConsolidatedData = (opt?: { filters?: FormFilter }) => {
    const consolidated: Record<string, ConsolidatedData> = {};
    if (!liquidationReport) return;
    let dataLiquidationReport = liquidationReport;
    // filtrar por nombre de empleado
    if (opt?.filters?.employee_name) {
      dataLiquidationReport = dataLiquidationReport.filter((report) =>
        report.employee?.contacto_nombre
          ?.toLowerCase()
          .includes(opt.filters!.employee_name.toLowerCase()),
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
      const employeeName = report.employee?.contacto_nombre || "Desconocido";
      if (!consolidated[employeeName]) {
        consolidated[employeeName] = {
          employee_name: employeeName,
          total_equivalent_hours: 0,
          total_viaticum: 0,
          total_equivalent_days: 0,
          alimentation: 0,
          projects: [],
        };
      }
      consolidated[employeeName].total_equivalent_hours +=
        report.equivalent_hours ?? 0;
      //redondear a 2 decimales      consolidated[employeeName].total_equivalent_hours = parseFloat(
      consolidated[employeeName].total_equivalent_hours = parseFloat(
        consolidated[employeeName].total_equivalent_hours.toFixed(2),
      );
      if (report.viaticum) {
        consolidated[employeeName].total_viaticum += 1;
      }
      if (report.equivalent_hours) {
        consolidated[employeeName].total_equivalent_days +=
          report.equivalent_hours / 9;
      }
      consolidated[employeeName].total_equivalent_days = parseFloat(
        consolidated[employeeName].total_equivalent_days.toFixed(2),
      );
      // sumar 1 a alimentación por cada día presentes en el reporte
      if (!report.absent) {
        consolidated[employeeName].alimentation += 1;
      }
      const existingProject = consolidated[employeeName].projects.find(
        (p) => p.project_name === report.project_name,
      );
      if (existingProject) {
        existingProject.equivalent_hours += report.equivalent_hours ?? 0;
        existingProject.equivalent_days += report.equivalent_hours
          ? parseFloat(((report.equivalent_hours ?? 0) / 9).toFixed(2))
          : 0;
        existingProject.alimentation += report.absent ? 0 : 1;
        if (report.viaticum) {
          existingProject.viaticum += 1;
        }
        existingProject.dayReport.push(report);
      } else {
        consolidated[employeeName].projects.push({
          project_name: report.project_name || "Desconocido",
          equivalent_hours: report.equivalent_hours ?? 0,
          viaticum: report.viaticum ? 1 : 0,
          dayReport: [report],
          equivalent_days: report.equivalent_hours
            ? parseFloat(((report.equivalent_hours ?? 0) / 9).toFixed(2))
            : 0,
          alimentation: report.absent ? 0 : 1,
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
    Object.values(consolidated).forEach((employee) => {
      global.total_equivalent_hours += employee.total_equivalent_hours;
      global.total_viaticum += employee.total_viaticum;
      global.total_equivalent_days += employee.total_equivalent_days;
      global.alimentation += employee.alimentation;
    });
    setGlobalBalance(global);
    setFiltered(Object.values(consolidated));
  };
  useEffect(() => {
    if (liquidationReport) {
      getConsolidatedData();
    }
  }, [liquidationReport]);

  const ExpandedComponent = ({ data }: { data: ConsolidatedData }) => (
    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40">
      <h3 className="text-lg font-semibold mb-2">
        Proyectos de {data.employee_name}
      </h3>
      {data.projects.map((project) => (
        <div key={project.project_name} className="mb-4">
          <h4 className="text-md font-medium mb-1">{project.project_name}</h4>
          <p>Horas equivalentes: {project.equivalent_hours}</p>
          <p>Viáticos: {project.viaticum}</p>
          <details className="mt-2">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="text-blue-700 dark:text-blue-300 font-medium">
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
                {project.dayReport.map((report) => (
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
    navigate("/rrhh/consolidated_hours_per_worker/pdf", {
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
              title={"Consolidado de horas por operario"}
              back_path="/rrhh"
              IconComponent={{ component: FaUserClock, color: "text-yellow-600" }}
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-stretch lg:items-end w-full"
          >
            <div className="w-full">
              <Input
                label="Filtrar por empleado"
                {...register("employee_name")}
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
