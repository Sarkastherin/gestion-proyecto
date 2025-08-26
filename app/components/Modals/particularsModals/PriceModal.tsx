import ModalBase from "../ModalBase";
import PricesForm from "~/templates/PricesForm";
import type { PricesDB } from "~/types/materialsType";
export default function PriceModal({
  open,
  onClose,
  onSelectPrice,
  prices,
  idMaterial
}: {
  open: boolean;
  onClose: () => void;
  onSelectPrice?: (price: { id: number; price: PricesDB }) => void;
  prices: PricesDB[] | [];
  idMaterial: number;
}) {
  return (
    <ModalBase
      title={`Listado de Precios ${idMaterial ? `- ID: ${idMaterial}` : ""}`}
      open={open}
      zIndex={40}
      onClose={onClose}
      width="max-w-4xl"
    >
      <div
        className="px-6 pt-6 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 270px)" }}
      >
        {prices && idMaterial && (
          <PricesForm
            defaultValues={{ prices: prices }}
            idMaterial={idMaterial}
            modalMode={true}
            onSelectPrice={onSelectPrice}
          />
        )}
      </div>
    </ModalBase>
  );
}
