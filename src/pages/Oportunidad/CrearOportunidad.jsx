import FormularioOportunidad from "../../templates/Oportunidad/FormularioOportunidad";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import LayoutSaveElement from "../../components/Containers/LayoutSaveElements";
import { useState } from "react";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";
export default function CrearOportunidad() {
  const { handleModalShow, handleModalClose } = useModal();
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const {postOportunidad, refreshOportunidades} = useOportunidad();
  const [resetForm, setResetForm] = useState(null);
  const [id, setId] = useState(null);

  const onSubmit = async ({ values }) => {
   values.id_cliente = values.cliente.id;
   delete values.cliente
   if(values.etapas.length === 0) {
    values.etapas = [{id: '1', nombre: values.nombre }];
   }
    handleModalShow("modal-loading");
     try {
      const { success, error, data } = await postOportunidad(values);
      if (success) {
        setId(data[0].id)
        setResponse({
          message: "Oportunidad guardada correctamente",
          type: "success",
        });
        refreshOportunidades();
        if (resetForm) resetForm(); // Resetea el formulario si la función está disponible
      } else {
        setResponse({
          message: (
            <>
              <p>No se pudo guardar la oportunidad</p>
              <code>{error.message}</code>
            </>
          ),
          type: "danger",
        });
        console.error(error);
      }
    } catch (error) {
      setResponse({
        message: `Error al crear la oportunidad: ${error}`,
        type: "danger",
      });
    } finally {
      handleModalShow("modal-response");
    }
  };
  const handleIrAOportunidad = () => {
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
        modalResponsetextButton={"Ir a la Oportunidad"}
        handleResponseButtonClick={handleIrAOportunidad}
        modalLoadingTitle={"Guardando nueva oportunidad"}
        form={
          <FormularioOportunidad
            isEditable={true}
            onSubmit={onSubmit}
            onError={onError}
            setResetForm={setResetForm}
          />
        }
      />
    </>
  );
}
