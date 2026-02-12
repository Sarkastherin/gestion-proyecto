import { NavLink, useNavigate } from "react-router";
import { useUI } from "~/context/UIContext";
import { useAuth } from "~/context/AuthContext";
import {
  BuildingOffice2Icon,
  LightBulbIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { Permission } from "../auth/Permission";
import type { Roles } from "~/context/AuthContext";
import {
  ALLOWED_SETTINGS,
  ALLOWED_MATERIALS,
  ALLOWED_OPPORTUNITIES,
  ALLOWED_PROJECTS,
  ALLOWED_RRHH,
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
    name: "RRHH",
    to: "/rrhh",
    permission: ALLOWED_RRHH,
  },
];
export default function Header() {
  const { user, signOut } = useAuth();
  const { toggleTheme, theme } = useUI();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };
  const MyLink = ({ to, children }: MyLinkProps) => {
    return (
      <NavLink
        className={({ isActive }) =>
          `${
            isActive
              ? "text-primary-text font-medium"
              : "text-zinc-800 dark:text-zinc-400 hover:text-primary-text hover:font-medium"
          }`
        }
        to={to}
      >
        {children}
      </NavLink>
    );
  };
  return (
    <header className="sticky top-0 border-b border-zinc-100/70 dark:border-zinc-800/70 bg-gradient-to-bl from-primary/50 via-zinc-300 to-white dark:from-primary-hover/30 dark:via-zinc-900 dark:to-zinc-950 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/70 text-white dark:text-zinc-200 dark:bg-zinc-900">
              <BuildingOffice2Icon className="w-5" />
            </span>
            Gestion Industrial
          </NavLink>

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
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-2 rounded-full border border-transparent dark:border-zinc-800 bg-primary/70 dark:bg-zinc-900/60 px-3 py-1 text-xs text-white dark:text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-green-300 dark:bg-green-400 " />
            Hola, {user?.name ?? "Usuario"}
          </span>
          <button
            type="button"
            className="hidden sm:inline-flex items-center rounded-full border border-primary-text dark:border-zinc-800 px-3 py-1 text-xs text-primary-text dark:text-zinc-300 hover:text-red-600 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 dark:hover:text-red-400 dark:hover:border-red-400"
            onClick={handleLogout}
          >
            Salir
          </button>
          <button
            title="toggle-button-theme"
            className="rounded-full border border-primary-text dark:border-zinc-800 p-2 text-primary-text hover:text-primary-hover  dark:hover:text-zinc-300"
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
    </header>
  );
}
