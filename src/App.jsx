import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CrearOportunidad from "./pages/Oportunidad/CrearOportunidad";
import { ModalContextProvider } from "./context/ModalContext";
import Resumen from "./pages/Oportunidad/Resumen";
import Oportunidad from "./pages/Oportunidad/Oportunidad";
import Informacion from "./pages/Oportunidad/Informacion";
import Cotizacion from "./pages/Oportunidad/Cotizacion";
import Condiciones from "./pages/Oportunidad/Condiciones";
import { Oportunidades } from "./pages/Oportunidad/Oportunidades";
import { OportunidadProvider } from "./context/Oportunidades/OportunidadContext";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/oportunidades", element: <Oportunidades /> },
        { path: "/nueva-oportunidad", element: <CrearOportunidad /> },
        {
          path: "/oportunidad/:id",
          element: <Oportunidad />,
          children: [
            { path: "/oportunidad/:id/resumen", element: <Resumen /> },
            { path: "/oportunidad/:id/informacion", element: <Informacion /> },
            { path: "/oportunidad/:id/cotizacion", element: <Cotizacion /> },
            { path: "/oportunidad/:id/condiciones", element: <Condiciones /> },

          ],

        },
      ],
    },

    { path: "*", element: <h1>Error</h1> },
  ]);

  return (
    <ModalContextProvider>
      <OportunidadProvider>
        <RouterProvider router={router} />
      </OportunidadProvider >
    </ModalContextProvider>
  );
}

export default App;
