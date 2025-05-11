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
import { Subheader } from "../../components/SubHeader";

function Oportunidad() {
  const { getOportunidadById, activeOportunidad, getOportunidades } = useOportunidad();
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
        <Container text={"Oportunidades"} to={"/oportunidades"}>
          <Subheader
            name={activeOportunidad.nombre}
            menuItems={menuItems}
            icon={<BanknotesIcon className="w-5 text-white" />}
            id={id}
          />
          <BoxComponentScrolling title="..." height='calc(100vh - 15rem)'>
            <Outlet />
          </BoxComponentScrolling>
        </Container>
      )}
    </>
  );
}
export default Oportunidad;
