/* Dependencies*/
import { useEffect } from "react";
import { Outlet, useParams, useNavigate, useLocation } from "react-router";
import {
  BanknotesIcon,
  PresentationChartBarIcon,
  InboxIcon,
  ReceiptPercentIcon,
  SwatchIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/16/solid";
/* Contexts */
import { useUI } from "~/context/UIContext";
import type { JSX } from "react";
import { useOpportunityRealtime } from "~/backend/realTime";
import { useState } from "react";
import { Input } from "~/components/Forms/Inputs";
import { ButtonCreateQuote } from "~/components/Specific/SectionCreateQuote";
import { Button } from "~/components/Forms/Buttons";
import { quotesApi } from "~/backend/dataBase";
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
export default function OpportunityLayout() {
  useOpportunityRealtime();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | null>(null);
  
  const {
    selectedOpportunity,
    isFieldsChanged,
    setIsFieldsChanged,
    getOpportunityById,
    setSelectedClient,
    showModal,
    setEditByStatus
  } = useUI();
  const { id } = useParams();
  const menu = menuItems(Number(id));
  useEffect(() => {
    getOpportunityById(Number(id));
  }, []);
  useEffect(() => {
    if (selectedOpportunity && selectedOpportunity.client) {
      setSelectedClient(selectedOpportunity.client);
      const quote = selectedOpportunity?.quotes.find((q) => q.active);
      setSelectedQuoteId(quote?.id ?? null);
      const revision = ["Nuevo", "En proceso", "Revisión"];
      setEditByStatus(revision.some((r) => r === selectedOpportunity?.status));
    }
  }, [selectedOpportunity]);
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
  const [hidden, setHidden] = useState(true);
  const onClose = () => {
    setHidden(true);
  };

  return (
    <>
      <div className="px-10 pb-2 border-b border-zinc-100 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-700/25">
        <div className="flex gap-4 items-center py-4">
          <span className="rounded-sm p-1.5 bg-blue-500">
            {<BanknotesIcon className="w-5 text-white dark:text-zinc-900" />}
          </span>
          <h3 className="text-lg font-medium">{selectedOpportunity?.name}</h3>
        </div>
        <div title="menu bar" className="flex justify-between items-center">
          <div className="flex gap-10">
            {menu.map((item, index) => (
              <MyNavLink
                key={index}
                href={item.href}
                icon={item.icon}
                title={item.title}
              />
            ))}
          </div>

          {selectedOpportunity?.quotes &&
            selectedOpportunity.quotes.length > 0 && (
              <div className="flex items-baseline justify-between gap-2">
                <label className="text-sm text-zinc-700 dark:text-zinc-300 mr-2">
                  Cotización activa:
                </label>
                <div className="w-20">
                  <Input
                    defaultValue={selectedQuoteId ?? undefined}
                    readOnly
                    onClick={() => setHidden(false)}
                  />
                </div>
                <ButtonCreateQuote label=" + Nueva Cotización" />
              </div>
            )}
        </div>
      </div>
      {selectedOpportunity ? (
        <Outlet context={{ selectedQuoteId }} />
      ) : (
        <p className="text-center mt-10">Cargando Oportunidad...</p>
      )}
      <div
        className={`fixed inset-0 z-50 grid place-content-center bg-white/10 p-4 ${
          hidden && "hidden"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div
          className={`w-full max-w-lg min-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400`}
        >
          <div className="flex items-start justify-between">
            <h2 id="modalTitle" className="text-xl font-bold sm:text-2xl">
              {"Cambiar de cotización"}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="-me-4 -mt-4 rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-50 hover:text-zinc-600 focus:outline-none dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              aria-label="Cerrar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4">
            <fieldset className="space-y-3">
              <legend className="sr-only">Cambiar cotización activa</legend>
              {selectedOpportunity?.quotes.map((q) => (
                <div key={q.id}>
                  <label
                    htmlFor={q.id.toLocaleString()}
                    className="flex items-center justify-between gap-4 rounded border border-zinc-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-50 has-checked:border-indigo-600 has-checked:ring-1 has-checked:ring-indigo-600 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                  >
                    <p className="text-zinc-700 dark:text-zinc-200">
                      Id Cotización N° {q.id}
                    </p>

                    <p className="text-zinc-900 dark:text-white">
                      Monto:{" "}
                      {(q.t_mg_total ?? 0).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>

                    <input
                      id={q.id.toLocaleString()}
                      type="radio"
                      name="SelectedQuote"
                      className="sr-only"
                      value={q.id.toLocaleString()}
                      checked={q.active}
                      onChange={async () => {
                        if (q.active) return;
                        setHidden(true);
                        showModal({
                          title: "Actualizando...",
                          message: "Aplicando cambio de cotización activa.",
                          variant: "information",
                        });
                        const currentActive = selectedOpportunity?.quotes.find(
                          (q) => q.active
                        );
                        const currentId = currentActive?.id;

                        // Desactivar la actual
                        if (currentId) {
                          const { error: deactivateError } =
                            await quotesApi.update({
                              id: currentId,
                              values: { active: false },
                            });

                          if (deactivateError) {
                            showModal({
                              title: "Error",
                              message:
                                "No se pudo desactivar la cotización anterior.",
                              variant: "error",
                            });
                            return;
                          }
                        }

                        // Activar la nueva
                        const { error: activateError } = await quotesApi.update(
                          {
                            id: q.id,
                            values: { active: true },
                          }
                        );

                        if (activateError) {
                          showModal({
                            title: "Error",
                            message: "No se pudo activar la nueva cotización.",
                            variant: "error",
                          });
                        } else {
                          showModal({
                            title: "¡Todo OK!",
                            message: "Cotización cambiada.",
                            variant: "success",
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              ))}
            </fieldset>
          </div>

          <footer className="mt-6 flex justify-end">
            <Button type="button" onClick={onClose} variant="secondary">
              Cerrar
            </Button>
          </footer>
        </div>
      </div>
    </>
  );
}
