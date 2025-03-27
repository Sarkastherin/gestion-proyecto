import { Outlet } from "react-router-dom";
import Container from "../../components/Generals/Container";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import {
  PresentationChartBarIcon,
  InboxIcon,
  BanknotesIcon,
  ReceiptPercentIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/16/solid";
import { useParams } from "react-router-dom";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
import { useEffect } from "react";

function Oportunidad() {
  const { getDetalleCotizacion, detalleCotizacion, getTotales, totales } =
    useCotizacion();
  const { id } = useParams();
  const oportunidadData =
    JSON.parse(localStorage.getItem("oportunidadData")) || {};
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
    getDetalleCotizacion(oportunidadData.id_cotizacion);
    getTotales(oportunidadData.id_cotizacion);
  }, []);
  useEffect(() => {
    if (detalleCotizacion?.secciones && totales) {
      oportunidadData["secciones"] = detalleCotizacion.secciones || [];
      totales.forEach((item) => {
        if (oportunidadData.margenes.some((item) => item.tipo == item.tipo)) {
          const i = oportunidadData.margenes.findIndex(
            (elem) => elem.tipo === item.tipo
          );
          oportunidadData.margenes[i]["totales"] = item;
        }
      });
      localStorage.setItem("oportunidadData", JSON.stringify(oportunidadData));
    }
  }, [detalleCotizacion, oportunidadData, totales]);
  return (
    <>
      <Container
        text={"Oportunidades"}
        to={'/oportunidades'}
        hasSubheader={true}
        menuItems={menuItems}
        name={oportunidadData.nombre}
        icon={<BanknotesIcon className="w-5 text-white" />}
      >
        <BoxComponentScrolling title="Creando Oportunidad">
          <Outlet context={{ oportunidadData }} />
        </BoxComponentScrolling>
      </Container>
    </>
  );
}
export default Oportunidad;
