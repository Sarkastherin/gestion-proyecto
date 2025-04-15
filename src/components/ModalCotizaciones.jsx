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
export const ModalCotizaciones = () => {
  const {
    oportunidades,
    getOportunidadById,
    activeOportunidad,
    updateOportunidad,
  } = useOportunidad();
  const { cotizaciones, getCotizaciones, postCotizacion, getDetalleById } =
    useCotizacion();
  const { handleModalShow, handleModalClose } = useModal();
  const [filteredData, setFilteredData] = useState([]);
  const [state, setState] = useState({
    cotizacion: null,
  });
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
      cotizaciones.forEach((item) => {
        const oportunidad = oportunidades.find(
          (elem) => elem.id === item.id_oportunidad
        );
        if (oportunidad) {
          item.nombre_oportunidad = oportunidad.nombre;
        }
        return item;
      });
    }
    setFilteredData(cotizaciones.filter((item) => item.nombre_oportunidad));
  }, [oportunidades, cotizaciones]);

  const handleCopyCotizacion = async (values) => {
    setState((prev) => ({ ...prev, cotizacion: values }));
    handleModalClose();
    handleModalShow("modal-confirm");
  };
  const copyCotizacion = () => {
alert('EN DESARROLLO')
  }
  const copyCotizacion2 = async () => {
    handleModalShow("modal-loading");
    //Copiar Etapas de Oprtunidades
    try {
      const { success, data, error } = await getOportunidadById(
        state.cotizacion.id_oportunidad
      );
      if (success) {
        const { etapas } = data;
        const { success, error } = await updateOportunidad(
          { etapas: etapas },
          activeOportunidad.id
        );
        if (success) {
          //Copiar Cotización
          const copy = {...(cotizaciones.find(
            (item) => item.id_oportunidad === state.cotizacion.id_oportunidad
          ))};
          copy.id_oportunidad = activeOportunidad.id;
          delete copy.id;
          delete copy.created_at;
          delete copy.nombre_oportunidad;
          delete copy.total_monto;
          const { success, error, data } = await postCotizacion(copy);
          if(success) {
            const {id} = data[0];
            /* const { success, error, data } = await getDetalleById(state.cotizacion.id);
            if(success) {
             console.log("Detalle copiada", data); 
            } */
          }
        }
      }
      //Buscar las etapas de la cotización
    } catch (error) {
      console.error("🧟 Error", error);
    } finally {
      handleModalClose();
    }

    //Copiar Detalle de Cotización
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
                        currency: "ARS",
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
              text={"Dejame pensarlo"}
              variant={"secondary"}
              onClick={handleModalClose}
            />
            <Button
              className="min-w-40"
              text={"Si, lo estoy"}
              variant={"green"}
              onClick={copyCotizacion}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
