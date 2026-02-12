import type { Route } from "../+types/home";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { ALLOWED_RRHH } from "~/components/auth/allowedRoles";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { Permission } from "~/components/auth/Permission";
import { NavLink } from "react-router";
import { MonitorCog, Columns3Cog, Calendar } from "lucide-react";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Configuraciones" },
    { name: "description", content: "Configuraciones" },
  ];
}
type LinkCardProps = {
  to: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
};
const menu = [
  {
    title: "Generales",
    description:
      "Gestione unidades, familias, categorias y subcategorias de materiales.",
    to: "/settings/generals",
    permission: ALLOWED_RRHH,
    icon: <Columns3Cog className="w-10 h-10 text-orange-600" />,
  },
  {
    title: "Calendario",
    description:
      "Administre feriados, eventos y fechas importantes para la organización.",
    to: "/settings/calendar",
    permission: ALLOWED_RRHH,
    icon: <Calendar className="w-10 h-10 text-green-600" />,
  },
];
export default function Configurations() {
  const LinkCard = ({ to, icon, title, description }: LinkCardProps) => {
    return (
      <NavLink
        to={to}
        rel="noopener noreferrer"
        className="group relative inline-flex w-full overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/85 p-5 text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 dark:border-zinc-700/70 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-zinc-600"
      >
        <div className="absolute right-0 top-0 h-20 w-20 -translate-y-6 translate-x-6 rounded-full bg-gradient-to-br from-blue-500/10 to-emerald-500/10 blur-2xl" />
        <div className="flex w-full items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 ring-1 ring-zinc-200 transition group-hover:bg-white dark:group-hover:bg-zinc-700 dark:bg-zinc-800 dark:ring-zinc-700">
            {icon}
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </div>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </div>
          <div className="text-zinc-300 transition group-hover:text-zinc-500 dark:text-zinc-600">
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </NavLink>
    );
  };
  return (
    <ProtectedRoute allowed={ALLOWED_RRHH}>
      <ContainerWithTitle
        title={"Configuraciones"}
        back_path="/"
        IconComponent={{ component: MonitorCog, color: "text-pink-500" }}
        description="Accede rapidamente a los modulos clave del area"
      >
        <nav className="relative">
          <ul className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {menu.map((link) => (
              <Permission key={link.title} roles={link.permission}>
                <li>
                  <LinkCard
                    to={link.to}
                    icon={link.icon}
                    title={link.title}
                    description={link.description}
                  />
                </li>
              </Permission>
            ))}
          </ul>
        </nav>
      </ContainerWithTitle>
    </ProtectedRoute>
  );
}
