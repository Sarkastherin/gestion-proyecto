import { Label, Input, TextInvalidate } from "./Generals/Inputs";
import { Modal } from "./Modal";
import { UserGroupIcon, CurrencyDollarIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { useFormContext, useForm } from "react-hook-form";
import { useOportunidad } from "../context/Oportunidades/OportunidadContext";
import { useCotizacion } from "../context/Cotizaciones/CotizacionesContext";
import Badge from "./Generals/Badge";
export const ModalCotizaciones = () => {
  const { oportunidades } = useOportunidad();
  const { cotizaciones, getCotizaciones } = useCotizacion();
  const { handleModalShow, handleModalClose } = useModal();
  const [filteredData, setFilteredData] = useState([]);
  const [state, setState] = useState({
    cotizacion: [],
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
        item.nombre_oportunidad = oportunidades.find(
          (elem) => elem.id === item.id_oportunidad
        ).nombre;
        return item;
      });
    }
    setFilteredData(cotizaciones);
  }, [oportunidades, cotizaciones]);
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
                onClick={() => {
                  //setSelectCotizacion(cotizacion);
                  handleModalClose();
                  alert("En desarrollo")
                }}
              >
                <span className="flex">
                  <span className="basis-2/3">{cotizacion.nombre_oportunidad}</span>
                  <span className="flex basis-1/3">
                    <Badge variant="yellow" className={'w-2/3'}>
                    Monto: 
                      {cotizacion.total_monto.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </Badge>
                    <Badge variant="blue" className={'w-1/3'}>{cotizacion.status}</Badge>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};
