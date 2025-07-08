import { Button } from "../Forms/Buttons";
import { useUI } from "~/context/UIContext";
import { MaterialTable } from "~/templates/MaterialTable";
import type { HandleRowClicked } from "~/templates/MaterialTable";
import type { MaterialTypeDB } from "~/context/UIContext";
import { LayoutModal } from "../Generals/Modals";
type ModalPriceProps = {
  activeIndex: number | null;
  onSelectMaterial: (index: number, material: MaterialTypeDB) => void;
};
export default function ModalMateriales({
  activeIndex,
  onSelectMaterial,
}: ModalPriceProps) {
  const { openMaterialsModal, setOpenMaterialsModal } = useUI();
  const handleRowClicked: HandleRowClicked = (data) => {
    if (activeIndex !== null) {
      onSelectMaterial(activeIndex, data);
      setOpenMaterialsModal(false);
    }
  };
  return (
    <LayoutModal
      open={openMaterialsModal}
      title="Listado de Materiales"
      handleOpen={() => setOpenMaterialsModal(false)}
      justifyStyle="justify-end"
      buttonsGroup={
        <div className="w-32">
          <Button
            type="button"
            onClick={() => setOpenMaterialsModal(false)}
            variant="secondary"
          >
            Cerrar
          </Button>
        </div>
      }
    >
      <div className="mt-4 overflow-y-auto" style={{ height: "calc(100vh - 270px)" }}>
        <MaterialTable
          handleRowClicked={handleRowClicked}
          paginationPerPage={10}
        />
      </div>
    </LayoutModal>
  );
}
