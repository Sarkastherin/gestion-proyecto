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
/* Oporttunidad */
import Oportunidad from "./pages/Oportunidad/Oportunidad";
import Resumen from "./pages/Oportunidad/Resumen";
import Informacion from "./pages/Oportunidad/Informacion";
import Cotizacion from "./pages/Oportunidad/Cotizacion";
import MargenesGanancias from "./pages/Oportunidad/MargenesGanancias";
import Condiciones from "./pages/Oportunidad/Condiciones";
import NuevoMaterial from "./pages/Materiales/NuevoMaterial";
import MaterialID from "./pages/Materiales/Material";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/oportunidades", element: <Oportunidades /> },
        { path: "/materiales", element: <Materiales />, children: [
          ,
        ] },
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
    { path: "*", element: <h1>Error</h1> },
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
