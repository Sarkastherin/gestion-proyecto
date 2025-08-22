// components/OpportunityHeader.tsx
import {
  BanknotesIcon,
  ClipboardDocumentIcon,
  InboxIcon,
  PresentationChartBarIcon,
  ReceiptPercentIcon,
  SwatchIcon,
  BriefcaseIcon,
} from "@heroicons/react/16/solid";
import { useNavigate } from "react-router";
import { Input } from "../Forms/Inputs";
import { ButtonCreateQuote } from "../Specific/SectionCreateQuote";
import type { JSX } from "react";
import { useUI } from "~/context/UIContext";
import { Button } from "../Forms/Buttons";
import { useData } from "~/context/DataContext";

export function OpportunityHeader({
  setHidden,
  selectedQuoteId,
}: {
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  selectedQuoteId: number | null;
}) {
  const { isFieldsChanged, setIsFieldsChanged } = useUI();
  const {selectedOpportunity} = useData();
  const navigate = useNavigate();
  const id = selectedOpportunity?.id;
  const MyNavLink = ({
    href,
    icon,
    title,
  }: {
    href: string;
    icon: JSX.Element;
    title: string;
  }) => {
    const navigate = useNavigate();
    const isActive = location.pathname === href;
    return (
      <button
        type="button"
        className={`cursor-pointer ${
          isActive
            ? "font-semibold text-indigo-600 dark:text-indigo-400"
            : "text-zinc-500 hover:text-indigo-500 dark:hover:text-indigo-400"
        }`}
        onClick={() => handleNavigate(href)}
      >
        <div className="flex gap-2 ">
          {icon}
          <p>{title}</p>
        </div>
      </button>
    );
  };
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
  const menuItems = [
    {
      title: "Resumen",
      href: `/opportunity/${id}/resumen`,
      icon: <PresentationChartBarIcon className="w-4" />,
    },
    {
      title: "Información",
      href: `/opportunity/${id}/information`,
      icon: <InboxIcon className="w-4" />,
    },
    {
      title: "Etapas",
      href: `/opportunity/${id}/phases`,
      icon: <SwatchIcon className="w-4" />,
    },
    {
      title: "Cotización",
      href: `/opportunity/${id}/quotes/materials`,
      icon: <BanknotesIcon className="w-4" />,
    },
    {
      title: "Margenes y Condiciones",
      href: `/opportunity/${id}/conditions`,
      icon: <ReceiptPercentIcon className="w-4" />,
    },
    {
      title: "Informes",
      href: `/opportunity/${id}/report`,
      icon: <ClipboardDocumentIcon className="w-4" />,
    },
  ];

  return (
    <div className="px-4 sm:px-6 md:px-10 pb-2 border-b border-zinc-100 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-700/25">
      {/* Título */}
      <div className="flex flex-wrap items-center gap-4 py-4">
        <span className="rounded-sm p-1.5 bg-blue-500">
          <BanknotesIcon className="w-5 text-white dark:text-zinc-900" />
        </span>
        <h3 className="text-base sm:text-lg font-medium">
          {selectedOpportunity?.name}
        </h3>
      </div>

      {/* Menú de navegación */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex gap-4 overflow-x-auto max-w-full scrollbar-hide">
          {menuItems.map((item, index) => (
            <MyNavLink
              key={index}
              href={item.href}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </div>

        {/* Cotización activa */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          {selectedOpportunity?.quotes &&
            selectedOpportunity?.quotes?.length > 0 &&
            !selectedOpportunity.id_project && (
              <>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-zinc-700 dark:text-zinc-300">
                    Cotización activa:
                  </label>
                  <div className="w-20">
                    <Input
                      defaultValue={selectedQuoteId ?? undefined}
                      readOnly
                      onClick={() => setHidden(false)}
                    />
                  </div>
                </div>
                <ButtonCreateQuote label=" + Nueva Cotización" />
              </>
            )}
          {selectedOpportunity?.id_project && (
            <Button variant="green">
              <div className="flex items-center gap-1" onClick={() => navigate(`/project/${selectedOpportunity.id_project}/resumen`)}>
              <BriefcaseIcon className="w-5" /> Ver Proyecto{" "}</div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
