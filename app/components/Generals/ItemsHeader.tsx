import type React from "react";
import type { JSX } from "react";
import { useUI } from "~/context/UIContext";
import { NavLink, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
type MenuHeaderProps = {
  icon: JSX.Element;
  title: string;
  href: string;
};
type ItemsHeaderProps = {
  iconTitle: JSX.Element;
  color: "bg-blue-500" | "bg-green-500" | "bg-fuchsia-500";
  title: string;
  menu: MenuHeaderProps[];
  rightSection?: React.ReactNode;
  back_path?: string;
};

export default function ItemsHeader({
  iconTitle,
  color,
  title,
  menu,
  rightSection,
  back_path,
}: ItemsHeaderProps) {
  const { isFieldsChanged, setIsFieldsChanged } = useUI();
  const navigate = useNavigate();
  const handleNavigate = (href: string) => {
    if (isFieldsChanged) {
      if (confirm("Tienes cambios sin guardar, ¿deseas continuar?")) {
        setIsFieldsChanged(false);
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };
  const MyNavLink = ({
    href,
    icon,
    title,
  }: {
    href: string;
    icon: JSX.Element;
    title: string;
  }) => {
    const isActive = location.pathname === href;
    return (
      <button
        type="button"
        className={`cursor-pointer ${
          isActive
            ? "font-semibold text-primary-text"
            : "text-zinc-500 hover:text-primary-text"
        }`}
        onClick={() => handleNavigate(href)}
      >
        <div className="flex gap-1">
          {icon}
          <p>{title}</p>
        </div>
      </button>
    );
  };
  return (
    <div className="px-4 sm:px-6 md:px-10 pb-2 border-b border-zinc-100 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-700/25">
      {/* Título */}
      <div className="flex flex-wrap items-center gap-2 py-4">
        {back_path && (
          <NavLink
            to={back_path}
            className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-purple-100 dark:hover:bg-zinc-700 rounded-full transition-all duration-200"
            title="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
          </NavLink>
        )}
        <span className={`rounded-sm p-1.5 ${color}`}>{iconTitle}</span>
        <h3 className="text-base sm:text-lg font-medium">{title}</h3>
      </div>

      {/* Menú de navegación */}
      <div className="flex justify-between gap-4">
        <div className="flex gap-4 overflow-x-auto max-w-full scrollbar-hide ">
          {menu.map((item, index) => (
            <MyNavLink
              key={index}
              href={item.href}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </div>
        {rightSection}
      </div>
    </div>
  );
}
