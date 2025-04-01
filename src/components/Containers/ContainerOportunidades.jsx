import { ModalLoading } from "../Generals/ModalsTypes";
import ButtonEdit from "../Generals/ButtonEdit";
import { Button } from "../Buttons";
import { Modal } from "../Modal";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import { Select } from "../Generals/Inputs";
export default function ContainerOportunidades({
  form,
  response,
  setIsEditable,
}) {
  const { handleModalClose } = useModal();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Select
          label="Cotización"
        >
          {['Abierta'].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </div>
      <div className="">{form}</div>
      <ModalLoading id={"modal-loading"} title={"Guardando..."} />
      <div className="absolute bottom-[-90px] left-8">
        <ButtonEdit
          func={() => {
            setIsEditable(true);
          }}
        />
      </div>
      {response && (
        <Modal
          modalId={"modal-response"}
          title={
            response.type === "success" ? "¡Todo marcha bien!" : "Algo anda mal"
          }
          variant={response.type}
        >
          <div className="flex flex-col gap-4">
            {response.message}
            <div className="flex gap-2 mt-2">
              <Button
                className="w-full"
                text={"Cerrar"}
                variant={"secondary"}
                onClick={handleModalClose}
              />
              <Button
                className="w-full"
                text={"Ir oportunidades"}
                variant={"primary"}
                onClick={() => navigate(`/oportunidades`)}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
