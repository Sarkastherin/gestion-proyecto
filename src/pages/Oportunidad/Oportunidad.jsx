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
import { useEffect } from "react";

function Oportunidad() {
  const { getOportunidadById, activeOportunidad } = useOportunidad();
  const { id } = useParams();
  useEffect(() => {
    getOportunidadById(parseInt(id));
  }, []);
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
      {activeOportunidad && (
        <Container
          text={"Oportunidades"}
          to={"/oportunidades"}
          hasSubheader={true}
          menuItems={menuItems}
          name={activeOportunidad.nombre}
          icon={<BanknotesIcon className="w-5 text-white" />}
        >
          <BoxComponentScrolling title="...">
            <Outlet />
          </BoxComponentScrolling>
        </Container>
      )}
    </>
  );
}
export default Oportunidad;
