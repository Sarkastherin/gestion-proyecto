import { useUI } from "~/context/UIContext";
import PricesForm from "~/templates/PricesForm";
import type { PricesType } from "~/backend/dataBase";
import { LayoutModal } from "../Generals/Modals";
type PricesModalType = {
  activeIndex: number | null;
  onSelectPrice?: (price: { id: number; price: PricesType }) => void;
};
export default function ModalPrice({
  activeIndex,
  onSelectPrice,
}: PricesModalType) {
  const { propsPriceModal, setOpenPriceModal } = useUI();
  const handlerCloseModal = () => {
    setOpenPriceModal({ open: false, data: null, idMaterial: null });
  };
  return (
    <LayoutModal
      open={propsPriceModal.open}
      title="Precios"
      handleOpen={handlerCloseModal}
    >
      <div className="mt-4">
        {propsPriceModal.data && (
          <PricesForm
            defaultValues={{ prices: propsPriceModal.data }}
            idMaterial={propsPriceModal?.idMaterial ?? undefined}
            modalMode={true}
            onSelectPrice={onSelectPrice}
          />
        )}
      </div>
    </LayoutModal>
  );
}
