import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import FormularioCotizacion from "../../templates/Oportunidad/FormularioCotizacion";
import { PlusIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { Button } from "../../components/Buttons";
import { useModal } from "../../context/ModalContext";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import NoCotizacionComponent from "../../components/Cotizacion/NoCotizacionComponent";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
import ContainerOportunidades from "../../components/Containers/ContainerOportunidades";
export default function Cotizacion() {
  const [response, setResponse] = useState(null);
  const { id } = useParams();
  const {
    postDetalle,
    postCotizacion,
    resfreshCotizaciones,
    getCotizacionActiva,
    cotizacionActiva,
    getDetalleCotizacion,
    detalleCotizacion,
  } = useCotizacion();
  const { materiales } = useMateriales();
  const { handleModalShow, handleModalClose } = useModal();
  const { oportunidadData } = useOutletContext();
  const [isEditable, setIsEditable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const onSubmit = async ({ values, dirtyFields }) => {
    /* Crear cotización */
    if (!cotizacionActiva) {
      const cotizacion = {
        id_oportunidad: id,
      };
      try {
        const result = await postCotizacion(cotizacion);
        if (result.success) {
          resfreshCotizaciones();
          values.id_cotizacion = result.data[0].id;
        }
      } catch (e) {
        console.log(e);
      }
    }
    const dataPost = [];
    const { secciones } = values;
    secciones.map((seccion) => {
      seccion.items.map((item) => {
        item.id_etapa = parseInt(seccion.id_etapa);
        item.tipo = seccion.tipo;
        item.id_cotizacion = cotizacionActiva.id;
        delete item.costo_total; //
        dataPost.push(item);
      });
      delete seccion.id_etapa;
      delete seccion.tipo;
    });
    try {
      const { success, error } = await postDetalle(dataPost);
      if (success) {
        setResponse({
          message: "Detalles creados correctamente",
          type: "success",
        });
        resfreshCotizaciones();
        setIsEditable(false);
      } else {
        setResponse({
          message: "No se pudo cear los detalles",
          type: "danger",
        });
        console.error(error);
      }
    } catch (error) {
      setResponse({
        message: `Error al crear los detalles: ${error}`,
        type: "danger",
      });
    } finally {
      handleModalShow("modal-response");
    }
  };
  const onError = (data) => console.log("Error:", data);
  const handleCopyCotizacion = () => {
    handleNewCotización();
    handleModalShow("modalCotizaciones");
  };
  const handleNewCotización = () => {
    setShowForm(true);
    setIsEditable(true);
  };
  useEffect(() => {
    if (id) {
      getCotizacionActiva(id);
    }
  }, []);
  useEffect(() => {
    if (cotizacionActiva) {
      getDetalleCotizacion(cotizacionActiva.id);
    }
  }, [cotizacionActiva]);
  useEffect(() => {
    if (detalleCotizacion) {
    }
  }, [detalleCotizacion]);
  return (
    <>
      {(cotizacionActiva && detalleCotizacion?.secciones) || showForm ? (
        <>
          <ContainerOportunidades
            response={response}
            setIsEditable={setIsEditable}
            form={
              <FormularioCotizacion
                isEditable={isEditable}
                defaultValues={detalleCotizacion}
                onSubmit={onSubmit}
                onError={onError}
              />
            }
          />
        </>
      ) : (
        <NoCotizacionComponent>
          <p>Puede agregar cotizaciones haciendo click en el botón de abajo</p>

          <Button
            className={"min-w-40"}
            type="button"
            icon={<PlusIcon className="w-4" />}
            variant="pink"
            text="Agregar Cotización"
            onClick={handleNewCotización}
          />
          <p>o inicia desde una existente</p>
          <Button
            className={"min-w-40"}
            type="button"
            icon={<DocumentDuplicateIcon className="w-4" />}
            variant="blue"
            text="Duplicar Cotización"
            onClick={handleCopyCotizacion}
          />
        </NoCotizacionComponent>
      )}
    </>
  );
}
