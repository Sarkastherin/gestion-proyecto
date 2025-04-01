import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import FormularioOportunidad from "../../templates/Oportunidad/FormularioOportunidad";
import { useModal } from "../../context/ModalContext";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";
import { useNavigate } from "react-router-dom";
import ContainerOportunidades from "../../components/Containers/ContainerOportunidades";
export default function Informacion() {
  const navigate = useNavigate();
  const { updateOportunidad, refreshOportunidades } = useOportunidad();
  const { handleModalShow } = useModal();
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
      <ContainerOportunidades
        response={response}
        setIsEditable={setIsEditable}
        form={
          <FormularioOportunidad
            isEditable={isEditable}
            defaultValues={oportunidadData}
            onSubmit={onSubmit}
            onError={onError}
          />
        }
      />
    </>
  );
}
