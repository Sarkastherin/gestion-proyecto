import { NavLink } from "react-router";
import { useUI } from "~/context/UIContext";
import { useAuth } from "~/context/AuthContext";
import { LightBulbIcon, MoonIcon } from "@heroicons/react/24/outline";

type MyLinkProps = {
  to: string;
  children: React.ReactNode;
};
export default function Header() {
  const { user } = useAuth();
  const { toggleTheme, theme } = useUI();
  const MyLink = ({ to, children }: MyLinkProps) => {
    return (
      <NavLink
        className={({ isActive }) =>
          `${
            isActive ? "text-indigo-400" : "text-zinc-400 hover:text-indigo-400"
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
        <MyLink to="/">Inicio</MyLink>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <MyLink to="/opportunities">Oportunidades</MyLink>
              </li>
              <li>
                <MyLink to="/projects">✨ Proyectos</MyLink>
              </li>
              <li>
                <MyLink to="/daily_reports">📰 Partes Diarios</MyLink>
              </li>

              <li>
                <MyLink to="/materials">Materiales</MyLink>
              </li>

              <li>
                <MyLink to="/settings">Configuraciones</MyLink>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <p className="text-pink-300">Hola, {user?.name}</p>
            <button
              title="toggle-button-theme"
              className="rounded-full p-2 text-zinc-400 hover:text-indigo-400 cursor-pointer"
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
