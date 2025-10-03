import type { Route } from "../+types/home";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { ALLOWED_RRHH } from "~/components/auth/allowedRoles";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { Permission } from "~/components/auth/Permission";
import { NavLink } from "react-router";
import { PiUsersDuotone } from "react-icons/pi";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recursos Humanos" },
    { name: "description", content: "Recursos Humanos" },
  ];
}
type LinkCardProps = {
  to: string;
  title?: string;
  icon?: React.ReactNode;
};
const menu = [
  {
    title: "Reporte de asistencias",
    to: "/rrhh/reports_assistance",
    permission: ALLOWED_RRHH,
    icon: <PiUsersDuotone className="size-10 text-blue-600" />,
  },
];

export default function RRHH() {
  const LinkCard = ({ to, icon, title }: LinkCardProps) => {
    return (
      <NavLink
        to={to}
        rel="noopener noreferrer"
        className="inline-flex items-center justify-between w-full p-5 text-zinc-500 bg-white border-2 border-zinc-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-zinc-700 hover:text-zinc-600 dark:peer-checked:text-zinc-300 peer-checked:text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:bg-zinc-900/80 dark:hover:bg-zinc-700"
      >
        <div className="block">
          {icon}
          <div className="w-full text-md font-semibold">{title}</div>
        </div>
      </NavLink>
    );
  };
  return (
    <ProtectedRoute allowed={ALLOWED_RRHH}>
      <ContainerWithTitle title={"Recursos Humanos"} width="w-full">
        <nav>
          <ul className="grid w-full gap-6 md:grid-cols-3">
            {menu.map((link) => (
              <Permission key={link.title} roles={link.permission}>
                <li>
                  <LinkCard to={link.to} icon={link.icon} title={link.title}/>
                </li>
              </Permission>
            ))}
          </ul>
        </nav>
      </ContainerWithTitle>
    </ProtectedRoute>
  );
}
