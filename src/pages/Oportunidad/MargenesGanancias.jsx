import FormularioMargenesGanancias from "../../templates/Oportunidad/FormularioMargenesGanancias";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ContainerOportunidades from "../../components/Containers/ContainerOportunidades";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
import { useModal } from "../../context/ModalContext";
export default function MargenesGanancias() {
  const {handleModalShow, handleModalClose} = useModal();
  const {updateCotizacion, refreshCotizaciones, cotizacionActiva} = useCotizacion();
  const [isEditable, setIsEditable] = useState(false);
  const { oportunidadData } = useOutletContext();
  const [response, setResponse] = useState(null);
  const onSubmit = async ({ values, dirtyFields }) => {
    const margenes = {};
    for (let item in dirtyFields) {
      if (dirtyFields[item]) {
        margenes[item] = values[item];
      }
    }
    console.log(cotizacionActiva.id)
    try {
      const { success, error } = await updateCotizacion(
        margenes,
        cotizacionActiva.id
      );
      if (success) {
        setResponse({
          message: "Márgenes actualizados correctamente",
          type: "success",
        });
        refreshCotizaciones();
        setIsEditable(false);
      } else {
        setResponse({
          message: "No se pudo actualizar los márgenes",
          type: "danger",
        });
        console.error(error);
      }
    } catch (error) {
      setResponse({
        message: `Error al actualizar los márgenes: ${error}`,
        type: "danger",
      });
    } finally {
      handleModalShow("modal-response");
    }
    /* Editar Cotización y setear margen_general */
    console.log(margenes);
  };
  const onError = (data) => console.log("Error:", data);
  return (
    <>
      <ContainerOportunidades
        response={response}
        setIsEditable={setIsEditable}
        form={
          <FormularioMargenesGanancias
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
