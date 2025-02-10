import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { BoxComponent } from "../../components/BoxComponent";
import { PresentationChartBarIcon, InboxIcon, BanknotesIcon } from "@heroicons/react/16/solid";
function Oportunidad() {
  const menuItems = [
    {
      title: "Resumen",
      href: "/oportunidad/resumen",
      icon: <PresentationChartBarIcon className="w-4" />,
    },
    {
      title: "Información",
      href: "/oportunidad/informacion",
      icon: <InboxIcon className="w-4" />,
    },
    {
      title: "Cotización",
      href: "/oportunidad/cotizacion",
      icon: <BanknotesIcon className="w-4" />,
    },
    {
      title: "Condiciones y más",
      href: "/oportunidad/condiciones",
      icon: <BanknotesIcon className="w-4" />,
    },
  ];
  return (
    <div className="">
      <Header
        text={"Oportunidades"}
        hasSubheader={true}
        menuItems={menuItems}
        icon={<BanknotesIcon className="w-5 text-white" />}
      />
      <BoxComponent title="Creando Oportunidad">
        <Outlet />
      </BoxComponent>
    </div>
  );
}
export default Oportunidad;
