import FormularioMargenesGanancias from "../../templates/Oportunidad/FormularioMargenesGanancias";
import { useState, useEffect } from "react";
import ContainerOportunidades from "../../components/Containers/ContainerOportunidades";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
import { useModal } from "../../context/ModalContext";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";
import { useParams } from "react-router-dom";
export default function MargenesGanancias() {
  const { getOportunidadById, activeOportunidad, refreshOportunidades } = useOportunidad();
  const { id } = useParams();
  useEffect(() => {
    getOportunidadById(parseInt(id));
  }, []);
  const [state, setState] = useState({
    response: null,
    isEditable: false,
  });
  const { handleModalShow } = useModal();
  const { updateCotizacion, refreshCotizaciones, cotizacionActiva } =
    useCotizacion();
  const onSubmit = async ({ values, dirtyFields }) => {
    const margenes = {};
    for (let item in dirtyFields) {
      if (dirtyFields[item]) {
        margenes[item] = values[item];
      }
    }
    try {
      const { success, error } = await updateCotizacion(
        margenes,
        cotizacionActiva.id
      );
      if (success) {
        setState((prev) => ({
          ...prev,
          response: {
            message: "Márgenes actualizados correctamente",
            type: "success",
          },
        }));
        refreshCotizaciones();
        refreshOportunidades();
        setState((prev) => ({ ...prev, isEditable: false }));
      } else {
        setState((prev) => ({
          ...prev,
          response: {
            message: "No se pudo actualizar los márgenes",
            type: "danger",
          },
        }));
        console.error(error);
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        response: {
          message: `Error al actualizar los márgenes: ${error}`,
          type: "danger",
        },
      }));
    } finally {
      handleModalShow("modal-response");
    }
  };
  const onError = (data) => console.log("Error:", data);
  return (
    <>
      <ContainerOportunidades
        state={state}
        setState={setState}
        form={
          <FormularioMargenesGanancias
            isEditable={state.isEditable}
            defaultValues={activeOportunidad}
            onSubmit={onSubmit}
            onError={onError}
          />
        }
      />
    </>
  );
}
