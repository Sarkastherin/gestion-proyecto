import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
/* Contextos */
import { AuthProvider } from "./context/AuthContext";
import { ModalContextProvider } from "./context/ModalContext";
import { OportunidadProvider } from "./context/Oportunidades/OportunidadContext";
import { ClienteContextProvider } from "./context/ClientContext";
import { CotizacionProvider } from "./context/Cotizaciones/CotizacionesContext";
import { MaterialesProvider } from "./context/Materiales/MaterialesContext";
import { ProveedoresProvider } from "./context/ProveedoresContext";
/* Pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Oportunidades } from "./pages/Oportunidad/Oportunidades";
import CrearOportunidad from "./pages/Oportunidad/CrearOportunidad";
import Materiales from "./pages/Materiales/Materiales";
import Configuraciones from "./pages/Configuraciones/Configuraciones";
/* Oporttunidad */
import Oportunidad from "./pages/Oportunidad/Oportunidad";
import Resumen from "./pages/Oportunidad/Resumen";
import Informacion from "./pages/Oportunidad/Informacion";
import Cotizacion from "./pages/Oportunidad/Cotizacion";
import MargenesGanancias from "./pages/Oportunidad/MargenesGanancias";
import Condiciones from "./pages/Oportunidad/Condiciones";
import NuevoMaterial from "./pages/Materiales/NuevoMaterial";
import MaterialID from "./pages/Materiales/Material";
import Instructivos from "./pages/Instructivos";
import Error from "./pages/Error";
/* Configuraciones */
import Material from "./pages/Configuraciones/Material";
import Tipo from "./pages/Configuraciones/Tipo";
import Unidad from "./pages/Configuraciones/Unidad"
import Espesor from "./pages/Configuraciones/Espesor"
import Norma from "./pages/Configuraciones/Norma"
import Medida from "./pages/Configuraciones/Medida"
import TipoUnion from "./pages/Configuraciones/TipoUnion"
import Caracteristica from "./pages/Configuraciones/Caracteristica"
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/oportunidades", element: <Oportunidades /> },
        { path: "/materiales", element: <Materiales />, children: [,] },
        { path: "/instructivos", element: <Instructivos /> },
        {
          path: "/configuraciones",
          element: <Configuraciones />,
          children: [
            { path: "/configuraciones/material", element: <Material /> },
            { path: "/configuraciones/tipo", element: <Tipo /> },
            { path: "/configuraciones/unidad", element: <Unidad /> },
            { path: "/configuraciones/espesor", element: <Espesor /> },
            { path: "/configuraciones/norma", element: <Norma /> },
            { path: "/configuraciones/medida", element: <Medida /> },
            { path: "/configuraciones/tipo_union", element: <TipoUnion /> },
            { path: "/configuraciones/caracteristica", element: <Caracteristica /> },
          ],
        },
        { path: "/nuevo-material", element: <NuevoMaterial /> },
        { path: "/nueva-oportunidad", element: <CrearOportunidad /> },
        { path: "/material/:id", element: <MaterialID /> },
        {
          path: "/oportunidad/:id",
          element: (
            <CotizacionProvider>
              <Oportunidad />
            </CotizacionProvider>
          ),
          children: [
            { path: "/oportunidad/:id/resumen", element: <Resumen /> },
            { path: "/oportunidad/:id/informacion", element: <Informacion /> },
            { path: "/oportunidad/:id/cotizacion", element: <Cotizacion /> },
            {
              path: "/oportunidad/:id/margenes",
              element: <MargenesGanancias />,
            },
            { path: "/oportunidad/:id/condiciones", element: <Condiciones /> },
          ],
        },
        
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "*", element: <Error /> },
  ]);

  return (
    <AuthProvider>
      <ClienteContextProvider>
        <ModalContextProvider>
          <ProveedoresProvider>
            <MaterialesProvider>
              <OportunidadProvider>
                <RouterProvider router={router} />
              </OportunidadProvider>
            </MaterialesProvider>
          </ProveedoresProvider>
        </ModalContextProvider>
      </ClienteContextProvider>
    </AuthProvider>
  );
}

export default App;
