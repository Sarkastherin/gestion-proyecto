import { NavLink } from "react-router";
import { useUI } from "~/context/UIContext";
import { useAuth } from "~/context/AuthContext";
import { LightBulbIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Permission } from "../auth/Permission";
import type { Roles } from "~/context/AuthContext";
import {
  ALLOWED_SETTINGS,
  ALLOWED_MATERIALS,
  ALLOWED_OPPORTUNITIES,
  ALLOWED_PROJECTS,
} from "../auth/allowedRoles";

type MyLinkProps = {
  to: string;
  children: React.ReactNode;
};
const all = [
  "administrador",
  "dueño",
  "coordinador",
  "supervisor",
  "invitado",
] as Roles[];
const menuBar = [
  { name: "Inicio", to: "/", permission: all },
  {
    name: "Oportunidades",
    to: "/opportunities",
    permission: ALLOWED_OPPORTUNITIES,
  },
  {
    name: "Proyectos",
    to: "/projects",
    permission: ALLOWED_PROJECTS,
  },
  {
    name: "Partes Diarios",
    to: "/daily_reports",
    permission: [],
  },
  {
    name: "Materiales",
    to: "/materials",
    permission: ALLOWED_MATERIALS,
  },
  {
    name: "Configuraciones",
    to: "/settings",
    permission: ALLOWED_SETTINGS,
  },
  {
    name: "✨RRHH",
    to: "/rrhh",
    permission: ["administrador"],
  },
];
export default function Header() {
  const { user } = useAuth();
  const { toggleTheme, theme } = useUI();
  const MyLink = ({ to, children }: MyLinkProps) => {
    return (
      <NavLink
        className={({ isActive }) =>
          `${
            isActive
              ? "text-primary-text"
              : "text-zinc-400 hover:text-primary-text"
          }`
        }
        to={to}
      >
        {children}
      </NavLink>
    );
  };
  return (
    <header className="bg-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {menuBar.map((link) => (
                <Permission key={link.name} roles={link.permission}>
                  <li>
                    <MyLink to={link.to}>{link.name}</MyLink>
                  </li>
                </Permission>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <p className="text-pink-300">Hola, {user?.name}</p>
            <button
              title="toggle-button-theme"
              className="rounded-full p-2 text-zinc-400 hover:text-primary-text cursor-pointer"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <LightBulbIcon className="w-5" />
              ) : (
                <MoonIcon className="w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
