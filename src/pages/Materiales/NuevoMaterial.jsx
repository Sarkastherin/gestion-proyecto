import Header from "../../components/Generals/Header";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import FormularioOportunidad from "../../templates/Oportunidad/FormularioOportunidad";
import { useModal } from "../../context/ModalContext";
import {
  ModalLoading,
  ModalSuccess,
} from "../../components/Generals/ModalsTypes";
import { Button } from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import FormularioMateriales from "../../templates/Materiales/FormularioMaterial";
export default function NuevoMaterial() {
  const { handleModalShow, handleModalClose } = useModal();
  const navigate = useNavigate();

  const onSubmit = ({ allValues }) => {
    console.log(allValues);
    handleModalShow(idsModal.loading);
    setTimeout(() => {
      handleModalClose();
      handleModalShow(idsModal.success);
    }, 2000);
  };
  /* const handleIrAOportunidad = () => {
    const id = 12345; // Aquí se obtiene el id de la oportunidad creada
    handleModalClose();
    navigate(`/oportunidad/${id}/resumen`)
  } */
  const onError = (data) => console.log("Error:", data);
  const idsModal = { loading: "id-modal-loading", success: "id-modal-success" };
  return (
    <>
      <Header text={"Creando Material"}>
        <BoxComponentScrolling title="Creando Material"  height='calc(100vh - 10rem)'>
          <FormularioMateriales
            isEditable={true}
            onSubmit={onSubmit}
            onError={onError}
          />
          <ModalLoading
            id={idsModal.loading}
            title={"Guardando nuevo material"}
          />
          <ModalSuccess
            id={idsModal.success}
            title={"Material creado exitosamente"}
          >
            <div className="mt-10 text-center">
            <Button
            className={"min-w-40"}
            type="button"
            variant="green"
            text="..."
          />
          </div>
          </ModalSuccess>
        </BoxComponentScrolling>
      </Header>
    </>
  );
}
