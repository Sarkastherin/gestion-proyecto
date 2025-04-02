import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import FormularioCotizacion from "../../templates/Oportunidad/FormularioCotizacion";
import {
  PlusIcon,
  DocumentDuplicateIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../components/Buttons";
import { useModal } from "../../context/ModalContext";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import NoCotizacionComponent from "../../components/Cotizacion/NoCotizacionComponent";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
import ContainerOportunidades from "../../components/Containers/ContainerOportunidades";
import TablaCotizacion from "../../components/Cotizacion/TablaCotizacion";
export default function Cotizacion() {
  const [response, setResponse] = useState(null);
  const { id } = useParams();
  const {
    postDetalle,
    postCotizacion,
    refreshCotizaciones,
    getCotizacionActiva,
    cotizacionActiva,
    getDetalleCotizacion,
    detalleCotizacion,
    deleteDetalle,
    updateDetalle
  } = useCotizacion();
  const { handleModalShow, handleModalClose } = useModal();
  const [isEditable, setIsEditable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const onSubmit = async ({ values, dirtyFields }) => {
    handleModalShow("modal-loading");
    /* Caso 1: No hay cotización, crea cotización y añade los detalles de los items */
    if (!cotizacionActiva) {
      const { success, id_cotizacion } = await crearCotizacion(id, values);
      if (success) await appendDetalle({ values: values, id: id_cotizacion });
      else {
        setResponse({
          message: "Hubo problemas al cargar la cotización",
          type: "danger",
        });
      }
    } else if (cotizacionActiva && detalleCotizacion.secciones.length === 0) {
      /* Caso 2: Hay Cotización, pero no hay detalle */
      await appendDetalle({ values: values, id: cotizacionActiva.id });
    } else if (cotizacionActiva && detalleCotizacion.secciones.length > 0) {
      /* Caso 3: Hay Cotización y hay detalles */
      const defaultValues = convertDataInDataBase(
        detalleCotizacion,
        cotizacionActiva.id
      );
      const actualValues = convertDataInDataBase(values, cotizacionActiva.id);
      const { append, remove, update } = getActionsInArray(
        actualValues,
        defaultValues
      );
      const responseAll = []
      if (append.length > 0) {
        append.map((item) => {
          //delete item.id;
          return item;
        });
        try {
          console.log(append)
          const { success, error } = await appendDetalle({
            values: append,
            convert: false,
          });
          if (error) {
            setResponse({
              message: `Hubo problemas al agregar el detalle: ErrorMessage: ${error.message}`,
              type: "danger",
            });
          }
          responseAll.push(success);
        } catch (e) {
          setResponse({
            message: `Hubo problemas al agregar el detalle: ErrorMessage: ${e.message}`,
            type: "danger",
          });
        }
      }
      if (remove.length > 0) {
        const response = []
        await Promise.all(
          remove.map(async (elem) => {
            const id = elem.id;
            const {success} = await removeDetalle({ id });
            response.push(success) 
          })
        );
        if(response.some(item => item===false)) {
          setResponse({
            message: "Hubo problemas al eliminar los detalles seleccionados",
            type: "danger",
          });
        }
        else {responseAll.push(true)}
      }
      if(update.length > 0) {        
        const response = []
        await Promise.all(
          update.map(async (elem) => {
            const id = elem.id;
            delete elem.id;
            delete elem.created_at
            const {success} = await modifyDetalle( elem, id );
            response.push(success) 
          })
        );
        if(response.some(item => item===false)) {
          setResponse({
            message: "Hubo problemas al actualizar los detalles seleccionados",
            type: "danger",
          });
        }
        else {responseAll.push(true)}
      }
      if (responseAll.every(item => item===true)) {
        setResponse({
          message: "Cotización guardada correctamente",
          type: "success",
        });
        setIsEditable(false);
      }
    }
    handleModalShow("modal-response");
  };
  const crearCotizacion = async (id, values) => {
    const cotizacion = {
      id_oportunidad: id,
    };
    try {
      const result = await postCotizacion(cotizacion);
      if (result.success) {
        refreshCotizaciones();
        getCotizacionActiva(id);
        return { success: true, id_cotizacion: result.data[0].id };
      } else {
        return { success: false };
      }
    } catch (e) {
      console.log(e);
    }
  };
  const appendDetalle = async ({ values, id, convert = true }) => {
    const dataPost = convert ? convertDataInDataBase(values, id) : values;
    dataPost.map(item => delete item.id)
    try {
      const { success, error } = await postDetalle(dataPost);
      return { success: success, error: error };
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeDetalle = async ({ id }) => {
    try {
      const { success, error } = await deleteDetalle(id);
      return { success: success, error: error };
    } catch (error) {
      setResponse({
        message: `Error al eliminar los detalles: ${error}`,
        type: "danger",
      });
    }
  };
  //updateDetalle
  const modifyDetalle = async ( values,id) => {
    try {
      const { success, error } = await updateDetalle(values,id);
      return { success: success, error: error };
    } catch (error) {
      setResponse({
        message: `Error al eliminar los detalles: ${error}`,
        type: "danger",
      });
    }
  };
  const getActionsInArray = (actualsValues, defaultValues = []) => {
    const arr = { append: [], remove: [], update: [] };

    // Verificar si hay elementos nuevos para agregar
    if (actualsValues?.length) {
      const hasAppend = !actualsValues.every((item) => item.id);
      if (hasAppend) {
        arr.append = actualsValues.filter((item) => item.id === "");
      }
    }

    // Si defaultValues está vacío, solo retornamos los agregados
    if (defaultValues.length === 0) return arr;

    // Verificar elementos eliminados y modificados
    defaultValues.forEach((origin) => {
      const hasRemoved = !actualsValues.some(
        (actual) => actual.id === origin.id
      );
      if (hasRemoved) arr.remove.push(origin);

      actualsValues.forEach((actual) => {
        if (
          actual.id === origin.id &&
          JSON.stringify(actual) !== JSON.stringify(origin)
        ) {
          arr.update.push(actual);
        }
      });
    });

    return arr;
  };
  const convertDataInDataBase = (values, id) => {
    const dataPost = [];
    const { secciones } = values;
    secciones.map((seccion) => {
      seccion.items.map((item) => {
        item.id_etapa = parseInt(seccion.id_etapa);
        item.tipo = seccion.tipo;
        item.id_cotizacion = id;
        delete item.costo_total;
        dataPost.push(item);
      });
      delete seccion.id_etapa;
      delete seccion.tipo;
    });
    return dataPost;
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
          <div className="sr-only">
            <Button
              className={"mb-2"}
              type="button"
              icon={<AdjustmentsHorizontalIcon className="w-4" />}
              variant="pink"
              text="Ajustes"
              hidden_text
              onClick={() => 2 + 2}
            />
          </div>
          <ContainerOportunidades
            response={response}
            setIsEditable={setIsEditable}
            //form= {<TablaCotizacion defaultValues={detalleCotizacion}/>}
            form={
              <>
                <FormularioCotizacion
                  isEditable={isEditable}
                  defaultValues={detalleCotizacion}
                  onSubmit={onSubmit}
                  onError={onError}
                />
              </>
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
