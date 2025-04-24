import { Outlet } from "react-router-dom"
import Container from "../../components/Generals/Container"
import { BoxComponentScrolling } from "../../components/BoxComponent"
import { NavLink } from "react-router-dom"
export default function Configuraciones() {
    return (
        <Container
          text={"Configuraciones"}
          to={"/"}
        >
          <NavLink to={'/configuraciones/material'}>Material</NavLink>
          <BoxComponentScrolling>
            <Outlet />
          </BoxComponentScrolling>
        </Container>
    )
}