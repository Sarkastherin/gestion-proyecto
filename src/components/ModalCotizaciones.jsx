import { Label, Input, TextInvalidate } from "./Generals/Inputs";
import { Modal } from "./Modal";
import { UserGroupIcon, CurrencyDollarIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { useFormContext, useForm } from "react-hook-form";
import { useOportunidad } from "../context/Oportunidades/OportunidadContext";
import { useCotizacion } from "../context/Cotizaciones/CotizacionesContext";
import Badge from "./Generals/Badge";
import { Button } from "./Buttons";
export const ModalCotizaciones = ({setState}) => {
  const {
    oportunidades,
    getOportunidadById,
    activeOportunidad,
    updateOportunidad,
  } = useOportunidad();
  const {
    cotizaciones,
    getCotizaciones,
    postCotizacion,
    getDetalleById,
    postDetalle,
    getCotizacionActiva
  } = useCotizacion();
  const { handleModalShow, handleModalClose } = useModal();
  const [filteredData, setFilteredData] = useState([]);
  const [cotizacion, setCotizacion] = useState(null);
  
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  useEffect(() => {
    getCotizaciones();
  }, []);
  useEffect(() => {
    if (cotizaciones.length > 0) {
      const data = cotizaciones.map((itemOrigin) => {
        const item = { ...itemOrigin };
        const opotunidad = oportunidades.find(
          (elem) => elem.id === item.id_oportunidad
        );
        if (opotunidad) {
          item.nombre_oportunidad = opotunidad.nombre;
        }
        return item;
      });
      setFilteredData(data.filter((item) => item.active));
    }
  }, [oportunidades, cotizaciones]);

  const handleCopyCotizacion = async (values) => {
    setCotizacion(values)
    //setState((prev) => ({ ...prev, cotizacion: values }));
    handleModalClose();
    handleModalShow("modal-confirm");
  };

  const copyCotizacion = async () => {
    handleModalShow("modal-loading");
    const copy = {};
    try {
      //Obtener Etapas de oportunidad a copiar
      const op_original = await getOportunidadById(
        cotizacion.id_oportunidad
      );
      if (op_original.success) {
        copy.etapas = op_original.data.etapas;
        //Obtener datos de Cotización a copiar
        copy.cotizacion = {
          id_oportunidad: activeOportunidad.id,
          margenes: cotizacion.margenes,
          margen_general: cotizacion.margen_general,
        };
        //Copiar Etapas
        const { success, error } = await updateOportunidad(
          { etapas: copy.etapas },
          activeOportunidad.id
        );
        if (success) {
          const copy_cotizacion = await postCotizacion(
            copy.cotizacion
          );
          if (copy_cotizacion.success) {
            const { id } = copy_cotizacion.data[0];
            const original_detalle = await getDetalleById(
              cotizacion.id
            );
            if (original_detalle.success) {
              copy.detalle = original_detalle.data.map((itemOrigin) => {
                const item = { ...itemOrigin };
                delete item.id;
                delete item.created_at;
                delete item.costo_total;
                item.id_cotizacion = id;
                return item;
              });
              const { success, error} = await postDetalle(copy.detalle);
              if(success) {
                getCotizacionActiva(id)
                setState((prev) => ({
                  ...prev,
                  response: {
                    message: "Cotización duplicada correctamente",
                    type: "success",
                  },
                }));
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("🧟 Error", error);
    } finally {
      handleModalClose();
    }
  };
  return (
    <>
      <Modal
        modalId="modalCotizaciones"
        title={"Buscar Cotización"}
        variant="primary"
        icon={<CurrencyDollarIcon className="w-6" />}
        width="w-3xl"
      >
        <div className="mt-4">
          <p className="my-1 text-sm text-gray-700">
            Seleccione un cotización.
          </p>
          <Input
            label="Buscar Cotización"
            no_label
            type="search"
            placeholder="Buscar Cotización"
            onInput={(e) => setSearch(e.target.value)}
          />
          <ul className="mt-2 max-h-[300px] overflow-y-auto">
            {filteredData.map((cotizacion) => (
              <li
                className="mt-2 text-sm text-gray-600 rounded border border-gray-300 px-4 py-1 cursor-pointer hover:bg-indigo-100"
                key={cotizacion.id}
                onClick={() => handleCopyCotizacion(cotizacion)}
              >
                <span className="flex">
                  <span className="basis-2/3">
                    {`${cotizacion.id}: ${cotizacion.nombre_oportunidad}`}
                  </span>
                  <span className="flex basis-1/3">
                    <Badge variant="yellow" className={"w-2/3"}>
                      Monto:
                      {cotizacion.total_monto.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Badge>
                    <Badge variant="blue" className={"w-1/3"}>
                      {cotizacion.status}
                    </Badge>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
      <Modal modalId={"modal-confirm"} title={"Atención"} variant={"warning"}>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-700">
            Esta acción también reemplazará las etapas de esta oportunidad
            actual por las que se duplicará.
          </p>
          <p className="font-medium text-gray-700">
            ¿Está seguro de continuar?
          </p>
          <div className="flex gap-2 mt-2 justify-center">
            <Button
              className="min-w-40"
              variant={"secondary"}
              onClick={handleModalClose}
            >Dejame pensarlo</Button>
            <Button
              className="min-w-40"
              variant={"yellow"}
              onClick={copyCotizacion}
            >Si, lo estoy</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
