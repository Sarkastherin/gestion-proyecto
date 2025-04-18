import FormularioPrecios from "../../templates/Materiales/FormularioPrecios";
import { Modal } from "../Modal";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import { useForm, FormProvider } from "react-hook-form";
export default function ModalPrecios({handleChangePrice, index, seccionIndex}) {
  const { activeMaterial } = useMateriales();
  const methods = useForm();
  return (
    <>
      {activeMaterial && (
        <Modal
          modalId={`modal-precio-${seccionIndex}-${index}`}
          title={activeMaterial?.descripcion}
          variant="primary"
          width = 'w-5xl'
        >
          <div className="mt-4">
          <FormProvider {...methods}>
            <FormularioPrecios onlyPrices={true} defaultValues={activeMaterial} handleChangePrice={handleChangePrice}/>
            </FormProvider>
          </div>
        </Modal>
      )}
    </>
  );
}
