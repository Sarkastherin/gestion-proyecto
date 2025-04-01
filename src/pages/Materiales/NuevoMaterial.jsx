import LayoutSaveElement from "../../components/Containers/LayoutSaveElements";
import { useModal } from "../../context/ModalContext";
import FormularioMateriales from "../../templates/Materiales/FormularioMaterial";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function NuevoMaterial() {
  const { postMaterial, refreshMateriales } = useMateriales();
  const { handleModalShow } = useModal();
  const [response, setResponse] = useState(null);
  const [resetForm, setResetForm] = useState(null); // Estado para almacenar reset()
  const navigate = useNavigate();
  const onSubmit = async ({ values }) => {
    for (const item in values) {
      if (values[item] === "") {
        values[item] = null;
      }
    }
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
  const onError = (data) => console.log("Error:", data);
  return (
    <>
      <LayoutSaveElement
        hedearTitle={"Creando Material"}
        backTo={"/materiales"}
        response={response}
        modalResponsetextButton={"Ir al Materiales"}
        handleResponseButtonClick={() => navigate(`/materiales`)}
        modalLoadingTitle={"Guardando nuevo material"}
        form={
          <FormularioMateriales
            isEditable={true}
            onSubmit={onSubmit}
            onError={onError}
            setResetForm={setResetForm} // Pasamos la función para obtener reset()
          />
        }
      />
    </>
  );
}
