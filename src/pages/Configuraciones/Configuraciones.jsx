import { Outlet } from "react-router-dom";
import Container from "../../components/Generals/Container";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import { NavLink } from "react-router-dom";
export default function Configuraciones() {
  const Link = ({ title, to }) => {
    return (
      <li className="w-full">
        <NavLink
          to={to}
          className={({ isActive }) =>
            `w-full inline-block text-center px-6 py-2 rounded cursor-pointer border border-indigo-600 ${
              isActive ? "bg-indigo-600 text-white" : "bg-transparent text-indigo-600 hover:bg-indigo-600 hover:text-white"
            }`
          }
        >
          {title}
        </NavLink>
      </li>
    );
  };
  return (
    <Container text={"Configuraciones"} to={"/"}>
      <nav className="px-6 mt-4">
        <ul className="grid grid-cols-8 gap-4">
          <Link to="/configuraciones/material" title={"Materiales"}/>
          <Link to="/configuraciones/tipo" title={"Tipo"}/>
          <Link to="/configuraciones/unidad" title={"Unidad"}/>
          <Link to="/configuraciones/espesor" title={"Espesor"}/>
          <Link to="/configuraciones/norma" title={"Norma/Calidad"}/>
          <Link to="/configuraciones/medida" title={"Medida"}/>
          <Link to="/configuraciones/tipo_union" title={"Tipo de union"}/>
          <Link to="/configuraciones/caracteristica" title={"Característica"}/>
        </ul>
      </nav>
      <BoxComponentScrolling size="max-w-full" height='calc(100vh - 10rem)'>
        <Outlet/>
      </BoxComponentScrolling>
    </Container>
  );
}
