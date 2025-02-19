import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import {
  BoxComponentScrolling,
} from "../../components/BoxComponent";
import {
  PresentationChartBarIcon,
  InboxIcon,
  BanknotesIcon,
  ReceiptPercentIcon,
  ExclamationCircleIcon
} from "@heroicons/react/16/solid";
import { useParams } from "react-router-dom";
function Oportunidad() {
  const { id } = useParams();
  const oportunidadData = JSON.parse(localStorage.getItem("oportunidadData")) || {};
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
  return (
    <>
      <Header
        text={"Oportunidades"}
        hasSubheader={true}
        menuItems={menuItems}
        name={oportunidadData.nombre_oportunidad}
        icon={<BanknotesIcon className="w-5 text-white" />}
      >
        <BoxComponentScrolling title="Creando Oportunidad">
          <Outlet context={{ oportunidadData }}/>
        </BoxComponentScrolling>
      </Header>
    </>
  );
}
export default Oportunidad;