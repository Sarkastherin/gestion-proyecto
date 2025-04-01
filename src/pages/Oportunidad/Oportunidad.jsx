import { Outlet } from "react-router-dom";
import Container from "../../components/Generals/Container";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";
import {
  PresentationChartBarIcon,
  InboxIcon,
  BanknotesIcon,
  ReceiptPercentIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/16/solid";
import { useParams } from "react-router-dom";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
import { useEffect, useState } from "react";
import { useClientes } from "../../context/ClientContext";

function Oportunidad() {
  const [oportunidadData, setOportunidadData] = useState(null);
  const { activeCliente } = useClientes();
  const { getOportunidadById, activeOportunidad } = useOportunidad();
  const { getDetalleCotizacion, detalleCotizacion, getTotales, totales } = useCotizacion();
  const { id } = useParams();
  const menuItems = () => {
    return [
      {
        title: "Resumen",
        href: `/oportunidad/${id}/resumen`,
        icon: <PresentationChartBarIcon className="w-4" />,
      },
      {
        title: "Información",
        href: `/oportunidad/${id}/informacion`,
        icon: <InboxIcon className="w-4" />,
      },
      {
        title: "Cotización",
        href: `/oportunidad/${id}/cotizacion`,
        icon: <BanknotesIcon className="w-4" />,
      },
      {
        title: "Margenes",
        href: `/oportunidad/${id}/margenes`,
        icon: <ReceiptPercentIcon className="w-4" />,
      },

      {
        title: "Condiciones",
        href: `/oportunidad/${id}/condiciones`,
        icon: <ExclamationCircleIcon className="w-4" />,
      },
    ];
  };
  useEffect(() => {
    getOportunidadById(parseInt(id));
  }, []);
  useEffect(() => {
   /*  if (activeOportunidad?.id_cotizacion) {
      getDetalleCotizacion(activeOportunidad?.id_cotizacion);
      getTotales(activeOportunidad?.id_cotizacion);
    } */
      setOportunidadData(activeOportunidad)
  }, [activeOportunidad]);
  /* useEffect(() => {
    if (detalleCotizacion?.secciones && totales) {
      activeOportunidad["secciones"] = detalleCotizacion.secciones || [];
      totales.forEach((item) => {
        if (activeOportunidad?.margenes?.some((item) => item.tipo == item.tipo)) {
          const i = activeOportunidad.margenes.findIndex(
            (elem) => elem.tipo === item.tipo
          );
          activeOportunidad.margenes[i]["totales"] = item;
        }
      });
    }

    if (activeOportunidad?.cliente) {
      setOportunidadData(activeOportunidad);
    }
    //
  }, [detalleCotizacion, activeOportunidad, totales, activeCliente]); */
  return (
    <>
      {oportunidadData && (
        <Container
          text={"Oportunidades"}
          to={"/oportunidades"}
          hasSubheader={true}
          menuItems={menuItems}
          name={oportunidadData.nombre}
          icon={<BanknotesIcon className="w-5 text-white" />}
        >
          <BoxComponentScrolling title="Creando Oportunidad">
            <Outlet context={{ oportunidadData }} />
          </BoxComponentScrolling>
        </Container>
      )}
    </>
  );
}
export default Oportunidad;
