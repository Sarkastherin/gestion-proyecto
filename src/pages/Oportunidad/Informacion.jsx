import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import FormularioOportunidad from "../../templates/Oportunidad/FormularioOportunidad";
import ButtonEdit from "../../components/Generals/ButtonEdit";
import { Modal } from "../../components/Modal";
import { ModalLoading } from "../../components/Generals/ModalsTypes";
import { useModal } from "../../context/ModalContext";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";
import { Button } from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
export default function Informacion() {
  const navigate = useNavigate();
  const { updateOportunidad, refreshOportunidades } = useOportunidad();
  const { handleModalShow, handleModalClose } = useModal();
  const [isEditable, setIsEditable] = useState(false);
  const { oportunidadData } = useOutletContext();
  const [response, setResponse] = useState(null);
  const onSubmit = async ({ values, dirtyFields }) => {
    handleModalShow("modal-loading");
    const updates = {};
    if (dirtyFields.cliente?.name) {
      updates.id_cliente = values.cliente.id;
    }
    delete values.cliente;
    for (let item in dirtyFields) {
      if (dirtyFields[item]) {
        updates[item] = values[item];
      }
    }
    console.log(updates);
    try {
      const { success, error } = await updateOportunidad(
        updates,
        oportunidadData.id
      );
      if (success) {
        setResponse({
          message: "Oportunidad actualizada correctamente",
          type: "success",
        });
        refreshOportunidades();
        setIsEditable(false);
      } else {
        setResponse({
          message: "No se pudo actualizar la oportunidad",
          type: "danger",
        });
        console.error(error);
      }
    } catch (error) {
      setResponse({
        message: `Error al actualizar la oportunidad: ${error}`,
        type: "danger",
      });
    } finally {
      handleModalShow("modal-response");
    }
    setIsEditable(false);
  };
  const onError = (data) => console.log("Error:", data);

  return (
    <>
      <FormularioOportunidad
        isEditable={isEditable}
        defaultValues={oportunidadData}
        onSubmit={onSubmit}
        onError={onError}
      />
      <ModalLoading id={"modal-loading"} title={"Guardando nuevo material"} />
      <div className="absolute bottom-[-70px] left-8">
        <ButtonEdit func={() => setIsEditable(true)} />
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
