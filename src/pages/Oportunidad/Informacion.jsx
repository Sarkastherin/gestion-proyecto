import { useState, useEffect } from "react";
import FormularioOportunidad from "../../templates/Oportunidad/FormularioOportunidad";
import { useModal } from "../../context/ModalContext";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";
import { useParams } from "react-router-dom";
import ContainerOportunidades from "../../components/Containers/ContainerOportunidades";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
export default function Informacion() {
  const { updateCotizacion, refreshCotizaciones } = useCotizacion();
  const {
    getOportunidadById,
    activeOportunidad,
    updateOportunidad,
    refreshOportunidades,
  } = useOportunidad();
  const { id } = useParams();
  useEffect(() => {
    getOportunidadById(parseInt(id));
  }, []);
  const [state, setState] = useState({
    response: null,
    isEditable: false,
  });
  const { handleModalShow } = useModal();
  const onSubmit = async ({ values, dirtyFields }) => {
    handleModalShow("modal-loading");
    const updates = {};
    if (dirtyFields.cliente?.name) {
      updates.id_cliente = values.cliente.id;
    }
    delete dirtyFields.cliente;
    delete dirtyFields.margenes;

    for (let item in dirtyFields) {
      if (dirtyFields[item]) {
        updates[item] = values[item];
      }
    }
    if (values.status === "Nuevo") {
      updates.status = "En proceso";
    }
    try {
      console.log(activeOportunidad)
      if (updates.status_cotizacion) {
        const { success, error, data } = await updateCotizacion(
          { status: updates.status_cotizacion },
          activeOportunidad.id_cotizacion
        );
        if(success) {
          delete updates.status_cotizacion
        }
        
      }
      const { success, error } = await updateOportunidad(
        updates,
        activeOportunidad.id
      );
      if (success) {
        setState((prev) => ({
          ...prev,
          response: {
            message: "Oportunidad actualizada correctamente",
            type: "success",
          },
        }));
        refreshOportunidades();
        refreshCotizaciones();
        getOportunidadById(parseInt(id));
        setState((prev) => ({ ...prev, isEditable: false }));
      } else {
        setState((prev) => ({
          ...prev,
          response: {
            message: (
              <>
                <p>No se pudo actualizar la oportunidad</p>
                <code>{error.message}</code>
              </>
            ),
            type: "danger",
          },
        }));
        console.error(error);
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        response: {
          message: `Error al actualizar la oportunidad: ${error}`,
          type: "danger",
        },
      }));
    } finally {
      handleModalShow("modal-response");
    }
    setState((prev) => ({ ...prev, isEditable: false }));
  };
  const onError = (data) => console.log("Error:", data);
  return (
    <>
      <ContainerOportunidades
        state={state}
        setState={setState}
        form={
          <FormularioOportunidad
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
