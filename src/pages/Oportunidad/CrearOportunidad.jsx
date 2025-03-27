import Container from "../../components/Generals/Container";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import FormularioOportunidad from "../../templates/Oportunidad/FormularioOportunidad";
import { useModal } from "../../context/ModalContext";
import {
  ModalLoading,
  ModalSuccess,
} from "../../components/Generals/ModalsTypes";
import { Button } from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import LayoutSaveElement from "../../templates/Generales/LayoutSaveElements";
import { useState } from "react";
export default function CrearOportunidad() {
  const { handleModalShow, handleModalClose } = useModal();
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async ({ values }) => {
    /* for (const item in values) {
      if (values[item] === "") {
        values[item] = null;
      }
    } */
    handleModalShow("modal-loading");
    try {
      const { success, error } = await postMaterial(values);
      if (success) {
        setResponse({
          message: "Material guardado correctamente",
          type: "success",
        });
        refreshMateriales();
        if (resetForm) resetForm(); // Resetea el formulario si la función está disponible
      } else {
        setResponse({
          message: "No se pudo guardar el material",
          type: "danger",
        });
        console.error(error);
      }
    } catch (error) {
      setResponse({
        message: `Error al crear el material: ${error}`,
        type: "danger",
      });
    } finally {
      handleModalShow("modal-response");
    }
  };
  const handleIrAOportunidad = () => {
    const id = 12345; // Aquí se obtiene el id de la oportunidad creada
    handleModalClose();
    navigate(`/oportunidad/${id}/resumen`);
  };
  const onError = (data) => console.log("Error:", data);
  return (
    <>
      <LayoutSaveElement
        hedearTitle={"Creando Oportunidad"}
        backTo={"/oportunidades"}
        response={response}
        modalResponsetextButton={"Ir al Oportunidades"}
        handleResponseButtonClick={handleIrAOportunidad}
        modalLoadingTitle={"Guardando nueva oportunidad"}
        form={
          <FormularioOportunidad
            isEditable={true}
            defaultValues={{}}
            onSubmit={onSubmit}
            onError={onError}
          />
        }
      />
    </>
  );
}
