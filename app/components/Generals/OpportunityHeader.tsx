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
import ItemsHeader from "./ItemsHeader";

export function OpportunityHeader({
  setHidden,
  selectedQuoteId,
}: {
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  selectedQuoteId: number | null;
}) {
  const { selectedOpportunity } = useData();
  const navigate = useNavigate();
  const id = selectedOpportunity?.id;
  
  const menuItems = (id: number) => {
    return [
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
  };
  const menu = menuItems(Number(id));
  return (
    <>
      {selectedOpportunity && (
        <ItemsHeader
          iconTitle={
            <BanknotesIcon className="w-5 text-white dark:text-zinc-900" />
          }
          color="bg-blue-500"
          title={selectedOpportunity?.name}
          menu={menu}
          rightSection={
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
                  <div
                    className="flex items-center gap-1"
                    onClick={() =>
                      navigate(
                        `/project/${selectedOpportunity.id_project}/resumen`
                      )
                    }
                  >
                    <BriefcaseIcon className="w-5" /> Ver Proyecto{" "}
                  </div>
                </Button>
              )}
            </div>
          }
        />
      )}
    </>
  );
}
