/* Dependencies*/
import { useEffect } from "react";
import { Outlet, useParams } from "react-router";
/* Contexts */
import { useUI } from "~/context/UIContext";
import { useOpportunityRealtime } from "~/backend/realTime";
import { useState } from "react";
import { Button } from "~/components/Forms/Buttons";
import { quotesApi } from "~/backend/cruds";
import { OpportunityHeader } from "~/components/Generals/OpportunityHeader";
import { useData } from "~/context/DataContext";
import { useUIModals } from "~/context/ModalsContext";

export default function OpportunityLayout() {
  useOpportunityRealtime();
  const { openModal } = useUIModals();
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | null>(null);
  const { getOpportunityById, selectedOpportunity, setSelectedOpportunity } =
    useData();
  const { setSelectedClient, setEditByStatus } = useUI();
  const { id } = useParams();
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
  const [hidden, setHidden] = useState(true);
  const onClose = () => {
    setHidden(true);
  };

  return (
    <>
      <OpportunityHeader
        setHidden={setHidden}
        selectedQuoteId={selectedQuoteId}
      />
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
          className="w-full max-w-lg min-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900 text-primary-text"
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
                    className="flex items-center justify-between gap-4 rounded border border-zinc-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-50 has-checked:border-text-primary has-checked:ring-1 has-checked:ring-text-primary dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
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
                        openModal("LOADING", {
                          title: "Actualizando...",
                          message: "Aplicando cambio de cotización activa.",
                        });
                        const currentActive = selectedOpportunity?.quotes.find(
                          (q) => q.active,
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
                            openModal("ERROR", {
                              message:
                                "No se pudo desactivar la cotización anterior.",
                            });
                            return;
                          }
                        }
                        // Activar la nueva
                        const { error: activateError } = await quotesApi.update(
                          {
                            id: q.id,
                            values: { active: true },
                          },
                        );

                        if (activateError) {
                          openModal("ERROR", {
                            message: "No se pudo activar la nueva cotización.",
                          });
                        } else {
                          openModal("SUCCESS", {
                            message: "Cotización cambiada.",
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
            <Button type="button" onClick={onClose} variant="light">
              Cerrar
            </Button>
          </footer>
        </div>
      </div>
    </>
  );
}
