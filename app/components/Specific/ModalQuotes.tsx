import { Button } from "../Forms/Buttons";
import { useUI } from "~/context/UIContext";
import type { HandleRowClicked } from "~/templates/OpportunitiesTable";
import { LayoutModal } from "../Generals/Modals";
import { OpportunitiesTable } from "~/templates/OpportunitiesTable";

export default function ModalQuotes() {
  const { openQuotesModal, setOpenQuotesModal, showModal, closeModal } =
    useUI();
  const handleRowClicked: HandleRowClicked = (data) => {
    if (data.total_quote <= 0) return;
    showModal({
      title: "Confirmar",
      message: (
        <div className="text-sm dark:text-zinc-300 text-zinc-600">
          <p className="mb-2">
            Está seleccionando la Oportunidad: <br />
            <span className="font-medium">
              {data.opportunity_name} [{data.id_opportunity}]
            </span>
          </p>
          <ul className="list-inside list-disc">
            <li>
              Materiales:{" "}
              {data.total_materials.toLocaleString("es-AR", {
                style: "currency",
                currency: "USD",
              })}
            </li>
            <li>
              Mano de Obra:{" "}
              {data.total_labor.toLocaleString("es-AR", {
                style: "currency",
                currency: "USD",
              })}
            </li>
            <li>
              Subcontratos:{" "}
              {data.total_subcontracting.toLocaleString("es-AR", {
                style: "currency",
                currency: "USD",
              })}
            </li>
            <li>
              Otros:{" "}
              {data.total_others.toLocaleString("es-AR", {
                style: "currency",
                currency: "USD",
              })}
            </li>
          </ul>
          <p className="font-bold mt-2">
            Total:{" "}
            {data.total_quote.toLocaleString("es-AR", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="bg-yellow-500/30 rounded-sm p-1">
            Esta acción tambien reemplazará las etapas del flujo actual.
          </p>
        </div>
      ),
      variant: "warning",
      handleAccept: () => {
        closeModal();
        alert("Ya casi está lista la funcionalidad para duplicar. Seguimos trabajando en ello. 👩🏻‍💻")
      },
    });
  };
  return (
    <LayoutModal
      open={openQuotesModal}
      title="Listado de Cotizaciones"
      handleOpen={() => setOpenQuotesModal(false)}
      justifyStyle="justify-end"
      buttonsGroup={
        <div className="w-32">
          <Button
            type="button"
            onClick={() => setOpenQuotesModal(false)}
            variant="secondary"
          >
            Cerrar
          </Button>
        </div>
      }
    >
      <div className="mt-4">
        <OpportunitiesTable handleRowClicked={handleRowClicked} />
      </div>
    </LayoutModal>
  );
}
