import { ModalLoading } from "../Generals/ModalsTypes";
import ButtonEdit from "../Generals/ButtonTypes";
import { Button } from "../Buttons";
import { Modal } from "../Modal";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import { Select } from "../Generals/Inputs";
export default function ContainerOportunidades({ form, state, setState }) {
  const { handleModalClose } = useModal();
  const navigate = useNavigate();
  const handleOnClick = () => navigate(`/oportunidades`);
  return (
    <>
      <div className="">{form}</div>
      <ModalLoading id={"modal-loading"} title={"Guardando..."} />
      <div className="absolute bottom-[-90px] left-8">
        <ButtonEdit
          func={() => {
            setState((prev) => ({ ...prev, isEditable: true }));
          }}
        />
      </div>
      {state.response && (
        <Modal
          modalId={"modal-response"}
          title={
            state.response.type === "success"
              ? "¡Todo marcha bien!"
              : "Algo anda mal"
          }
          variant={state.response.type}
        >
          <div className="flex flex-col gap-4">
            {state.response.message}
            <div className="flex gap-2 mt-2 justify-center">
              <Button
                className="min-w-40"
                variant={"secondary"}
                onClick={handleModalClose}
              >Cerrar</Button>
              <Button
                className="min-w-40"
                variant={"primary"}
                onClick={handleOnClick}
              >Ir a Oportunidades</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
