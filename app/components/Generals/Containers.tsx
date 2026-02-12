import type React from "react";
import type { LucideProps } from "lucide-react";
import { NavLink } from "react-router";
import { ArrowLeft } from "lucide-react";
import { getIcon } from "../IconComponent";
export type IconType = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

export const Subtitle = ({
  back_path,
  title,
  IconComponent,
}: {
  back_path?: string;
  title: string;
  IconComponent?: { component: IconType; color: string };
}) => {
  return (
    <div className="flex items-center gap-3">
      {back_path && (
        <NavLink
          to={back_path}
          className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-purple-100 dark:hover:bg-zinc-700 rounded-full transition-all duration-200"
          title="Volver"
        >
          <ArrowLeft className="w-5 h-5" />
        </NavLink>
      )}
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        {IconComponent
          ? getIcon({
              icon: IconComponent.component,
              color: IconComponent.color,
            })
          : null}
        {title}
      </h2>
    </div>
  );
};

export const ContainerWithTitle = ({
  title,
  width,
  children,
  back_path,
  IconComponent,
  description,
}: {
  title: string;
  width?: string | "w-full";
  children: React.ReactNode;
  back_path?: string;
  IconComponent?: { component: IconType; color: string };
  description?: string;
}) => {
  return (
    <div className={`mx-auto w-full`}>
      <main className={`pt-12 pb-18 lg:px-8 px-6 mx-auto `}>
        <Subtitle
          back_path={back_path}
          title={title}
          IconComponent={IconComponent}
          />
        {description && (
          <p className="mt-3 ps-2 text-lg text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        )}
        <div className={`mx-auto ${width} mt-6`}>{children}</div>
      </main>
    </div>
  );
};
export const ContainerToForms = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full max-w-7xl px-10 mt-8 mx-auto pb-18">{children}</div>
  );
};
