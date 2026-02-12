import type { Route } from "./+types/home";
import { appVersion } from "~/utils/functions";
import {
  BoltIcon,
  BriefcaseIcon,
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  CubeIcon,
  UsersIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { useData } from "~/context/DataContext";
import { useEffect, useState, type JSX } from "react";
import { NavLink } from "react-router";
import { useModalState } from "~/components/modals/particularsModals/useModalState";
import OpportunitiesHomeModal from "~/components/modals/particularsModals/OpportunitiesHomeModal";
import { LoaderComponent } from "~/components/Generals/LoaderComponent";
import type { HolidaysDB } from "~/types/projectsType";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bienvenido" },
    { name: "description", content: "Bienvenido" },
  ];
}
export type PipelineStage = {
  key: PipelineKey;
  title: string;
  value: number;
  items: { name: string; id: number }[];
  tone: string;
};
type KpiOpportunity = {
  key: KpiKey;
  label: string;
  value: string;
  tone: string;
  icon: JSX.Element;
};

type KpiKey = "won" | "closed" | "pending";
type PipelineKey = "new" | "sent" | "inReview";
export default function Home() {
  const oportunitiesModal = useModalState<PipelineStage>();
  const {
    getOpportunities,
    opportunities,
    getProjects,
    projects,
    holidays,
    getHolidays,
    reportsEmployees,
    getReportsEmployees,
  } = useData();

  const kpiBase: Array<KpiOpportunity> = [
    {
      key: "won",
      label: "Oportunidades ganadas",
      value: "0",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200",
      icon: <BoltIcon className="w-4" />,
    },
    {
      key: "closed",
      label: "Oportunidades perdidas",
      value: "0",
      tone: "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-500/30 dark:bg-slate-500/10 dark:text-slate-200",
      icon: <ClipboardDocumentCheckIcon className="w-4" />,
    },
    {
      key: "pending",
      label: "Oportunidades pendientes",
      value: "0",
      tone: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200",
      icon: <ClockIcon className="w-4" />,
    },
  ];
  const pipelineBase: Array<PipelineStage> = [
    {
      key: "new",
      title: "Nuevas",
      value: 0,
      items: [],
      tone: "border-blue-400/50 dark:border-blue-600/50 bg-blue-50 dark:bg-blue-600/10 text-blue-700 dark:text-blue-300",
    },
    {
      key: "sent",
      title: "Enviadas",
      value: 0,
      items: [],
      tone: "border-purple-400/50",
    },
    {
      key: "inReview",
      title: "En proceso y revisión",
      value: 0,
      items: [],
      tone: "border-orange-400/50",
    },
  ];
  const [kpiOpportunities, setKpiOpportunities] =
    useState<KpiOpportunity[]>(kpiBase);
  const [pipeline, setPipeline] = useState<PipelineStage[]>(pipelineBase);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${now.getFullYear()}-${month}`;
  });
  const [recenlyHolidays, setRecentlyHolidays] = useState<HolidaysDB[] | null>(
    null,
  );
  const [mayorHoursProjects, setMayorHoursProjects] = useState<
    | {
        project: string;
        hours: string;
      }[]
    | null
  >(null);
  useEffect(() => {
    if (!opportunities) getOpportunities();
    if (!projects) getProjects();
    if (!holidays) getHolidays();
    if (!reportsEmployees) getReportsEmployees();
  }, []);
  useEffect(() => {
    if (!opportunities) return;
    const [year, month] = selectedMonth.split("-").map(Number);
    if (!year || !month) return;
    const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const end = new Date(year, month, 0, 23, 59, 59, 999);
    const filtered = opportunities.filter((opportunity) => {
      const createdAt = new Date(opportunity.created_at);
      return createdAt >= start && createdAt <= end;
    });
    const counts = filtered.reduce(
      (acc, opportunity) => {
        const status = opportunity.status;
        if (status === "Ganada") {
          acc.won += 1;
          return acc;
        }
        if (
          status === "Perdida" ||
          status === "Vencida" ||
          status === "Desestimada"
        ) {
          acc.closed += 1;
          return acc;
        }
        /* Nuevo | En proceso | Enviada | Revisión  */
        acc.pending += 1;
        return acc;
      },
      { won: 0, closed: 0, pending: 0 },
    );
    setKpiOpportunities(
      kpiBase.map((kpi) => ({
        ...kpi,
        value: String(counts[kpi.key]),
      })),
    );
  }, [opportunities, selectedMonth]);

  // Nuevo useEffect para setear el pipeline agrupando oportunidades pendientes por estatus
  useEffect(() => {
    if (!opportunities) return;
    // Filtrar solo las oportunidades pendientes (sin importar periodo)
    const filtered = opportunities.filter(
      (opportunity) =>
        !["Ganada", "Perdida", "Vencida", "Desestimada"].includes(
          opportunity.status,
        ),
    );
    // Agrupar por estado
    const stages = {
      new: [] as { name: string; id: number }[],
      sent: [] as { name: string; id: number }[],
      inReview: [] as { name: string; id: number }[],
    };
    filtered.forEach((opportunity) => {
      if (opportunity.status === "Nuevo") {
        stages.new.push({
          name: opportunity.name || "Sin nombre",
          id: opportunity.id || 0,
        });
      } else if (opportunity.status === "Enviada") {
        stages.sent.push({
          name: opportunity.name || "Sin nombre",
          id: opportunity.id || 0,
        });
      } else if (
        opportunity.status === "En proceso" ||
        opportunity.status === "Revisión"
      ) {
        stages.inReview.push({
          name: opportunity.name || "Sin nombre",
          id: opportunity.id || 0,
        });
      }
    });
    setPipeline(
      pipelineBase.map((stage) => ({
        ...stage,
        value: stages[stage.key as keyof typeof stages].length,
        items: stages[stage.key as keyof typeof stages],
      })),
    );
  }, [opportunities]);
  useEffect(() => {
    if (!reportsEmployees) return;
    // agrupar por proyecto y sumar horas
    const rrhhData: { [project: string]: number } = {};
    reportsEmployees.forEach((report) => {
      const projectName = report.project_name || "Sin proyecto";
      const hours = report.hours_worked || 0;
      if (!rrhhData[projectName]) {
        rrhhData[projectName] = hours;
      } else {
        rrhhData[projectName] += hours;
      }
    });
    // transformar a formato de proyecto con horas
    const rrhhFormatted = Object.entries(rrhhData).map(([project, hours]) => ({
      project,
      hours: `${hours.toFixed(0)} HH`,
    }));
    const sorted = rrhhFormatted.sort((a, b) => {
      const hoursA = parseFloat(a.hours);
      const hoursB = parseFloat(b.hours);
      return hoursB - hoursA;
    });
    setMayorHoursProjects(sorted.slice(0, 3));
    //setMayorHoursProject(sor)
  }, [reportsEmployees]);
  const quickActions = [
    {
      title: "Nueva oportunidad",
      description: "Crear y calificar prospectos",
      icon: <BriefcaseIcon className="w-5" />,
      tone: "bg-green-500/10 text-green-600 dark:text-green-400",
      to: "/opportunities/new-opportunity",
    },
    {
      title: "Registrar parte diario",
      description: "Actividad y avances del día",
      icon: <ClipboardDocumentCheckIcon className="w-5" />,
      tone: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      to: "/projects/new-daily-report",
    },
    {
      title: "Nuevo material",
      description: "Agregar insumos al catálogo",
      icon: <CubeIcon className="w-5" />,
      tone: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
      to: "/materials/new-material",
    },
    {
      title: "Agregar feriado",
      description: "Registrar días no laborables",
      icon: <CalendarDaysIcon className="w-5" />,
      tone: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      to: "/settings/calendar",
    }
  ];
  useEffect(() => {
    if (!holidays) return;
    const filteredHolidays = holidays.filter(
      (date) => new Date(date.date) >= new Date(),
    );
    const sortedHolidays = filteredHolidays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    setRecentlyHolidays(sortedHolidays.slice(0, 3));
  }, [holidays]);

  if (!opportunities || !projects || !recenlyHolidays || !reportsEmployees) {
    return <LoaderComponent content="Cargando indicadores" />;
  }

  return (
    <>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-zinc-50 via-zinc-50 to-zinc-100 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    Centro operativo
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Tablero de oportunidades
                  </h1>
                  <p className="mt-3 text-zinc-500 dark:text-zinc-400">
                    Visualiza los status de las oportunidades por periodo.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 dark:border-zinc-700 dark:bg-zinc-900/60">
                  <span className="uppercase tracking-[0.2em]">Mes</span>
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(event) => setSelectedMonth(event.target.value)}
                    className="bg-transparent text-xs text-zinc-700 focus:outline-none dark:text-zinc-200"
                  />
                </div>
                <span>Indicadores del periodo seleccionado</span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {kpiOpportunities.map((kpi) => (
                  <div
                    key={kpi.label}
                    className={`rounded-xl border p-4 ${kpi.tone}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                        {kpi.label}
                      </p>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-zinc-500 dark:bg-zinc-900/40 dark:text-zinc-200">
                        {kpi.icon}
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {kpi.value}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        total
                      </span>
                    </div>
                  </div>
                ))}
                
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                <ChartBarSquareIcon className="w-5" />
                Acciones rápidas
              </div>
              <div className="mt-4 grid gap-3">
                {quickActions.map((action) => (
                  <NavLink
                    key={action.title}
                    to={action.to}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950/40"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.tone}`}
                      >
                        {action.icon}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                          {action.title}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-400">Ir</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 ">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Pipeline
            </p>
            <h1 className="mt-2 mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Oportunidades
            </h1>
            <div className="grid gap-6 lg:grid-cols-3">
              {pipeline.map((stage) => (
                <div
                  key={stage.title}
                  className={`rounded-2xl border ${stage.tone} bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300 uppercase tracking-wide">
                      {stage.title}
                    </p>
                    <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-200/70 dark:bg-zinc-700/70 px-3 py-1 rounded-full">
                      {stage.value}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {stage.items.slice(0, 3).map((item) => (
                      <li key={item.id} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                        {item.name}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary-text hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 mt-4 rounded-full px-3 py-1 transition"
                    onClick={() => {
                      oportunitiesModal.openModal(stage);
                    }}
                  >
                    Ver mas
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                <UsersIcon className="w-5" />
                RRHH · HH por proyecto
              </div>
              <div className="mt-5 space-y-3">
                {mayorHoursProjects?.map((item) => (
                  <div
                    key={item.project}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800"
                  >
                    <span className="text-zinc-600 dark:text-zinc-300">
                      {item.project}
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {item.hours}
                    </span>
                  </div>
                ))}
                {mayorHoursProjects?.length === 0 && (
                  <div className="text-center text-zinc-400 dark:text-zinc-600 py-4 text-xs">
                    No hay datos disponibles
                  </div>
                )}
              </div>
              <NavLink
                to={"/rrhh/reports_assistance"}
                className="block text-xs font-medium text-primary-text hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 mt-4 rounded-full px-3 py-1 transition w-fit"
              >
                Ver analiticas RRHH
              </NavLink>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2">
                <CalendarDaysIcon className="w-5 text-blue-500 dark:text-blue-400" />
                Próximos feriados
              </div>
              <div className="mt-3 space-y-3">
                {recenlyHolidays?.map((holiday) => {
                  // Ajustar la fecha para evitar desfase por zona horaria
                  const dateParts = holiday.date.split("-");
                  // holiday.date debe estar en formato YYYY-MM-DD
                  const dateObj = new Date(
                    Number(dateParts[0]),
                    Number(dateParts[1]) - 1,
                    Number(dateParts[2]),
                    12,
                    0,
                    0,
                  );
                  const day = dateObj.toLocaleDateString(undefined, {
                    weekday: "short",
                  });
                  const dateStr = dateObj.toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  return (
                    <div
                      key={holiday.name + holiday.date}
                      className="flex items-center gap-3 rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50/60 dark:bg-blue-900/30 px-4 py-3 text-sm shadow-sm"
                    >
                      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-200/60 dark:bg-blue-800/60 text-blue-700 dark:text-blue-200 font-bold">
                        <CalendarDaysIcon className="w-5" />
                      </span>
                      <div className="flex-1">
                        <span className="block font-medium text-blue-900 dark:text-blue-100">
                          {holiday.name}
                        </span>
                        <span className="block text-xs text-blue-700 dark:text-blue-300">
                          {day}, {dateStr}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {recenlyHolidays?.length === 0 && (
                  <div className="text-center text-zinc-400 dark:text-zinc-600 py-4 text-xs">
                    No hay feriados próximos
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
      {oportunitiesModal.data && (
        <OpportunitiesHomeModal
          open={oportunitiesModal.open}
          onClose={oportunitiesModal.closeModal}
          stage={oportunitiesModal.data}
        />
      )}

      <div className="fixed bottom-0 w-full bg-zinc-200 dark:bg-zinc-900 py-2 px-4">
        <p className="text-end text-xs text-zinc-400 dark:text-zinc-600">
          Versión: <span className="font-mono">{appVersion}</span>
        </p>
      </div>
    </>
  );
}
