import FormularioPrecios from "../../templates/Materiales/FormularioPrecios";
import { Modal } from "../Modal";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
export default function ModalPrecios() {
  const { activeMaterial } = useMateriales();
  return (
    <>
      {activeMaterial && (
        <Modal
          modalId={"modal-precio"}
          title={activeMaterial?.descripcion}
          variant="primary"
          width = 'w-5xl'
        >
          <div className="mt-4">
            <FormularioPrecios onlyPrices={true} defaultValues={activeMaterial}/>
          </div>
        </Modal>
      )}
    </>
  );
}
