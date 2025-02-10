import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CrearOportunidad from "./pages/CrearOportunidad";
import { ModalContextProvider } from "./context/ModalContext";
import Resumen from "./pages/Oportunidad/Resumen";
import Oportunidad from "./pages/Oportunidad/Oportunidad";
import Informacion from "./pages/Oportunidad/Informacion";
import Cotizacion from "./pages/Oportunidad/Cotizacion";
import Condiciones from "./pages/Oportunidad/Condiciones";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        /* { path: "/", element: <Home /> },
        { path: "/crear-oportunidad", element: <CrearOportunidad /> },
        { path: "/resumen", element: <Resumen /> }, */
        {
          path: "/oportunidad",
          element: <Oportunidad />,
          children: [
            { path: "/oportunidad/resumen", element: <Resumen /> },
            { path: "/oportunidad/informacion", element: <Informacion /> },
            { path: "/oportunidad/cotizacion", element: <Cotizacion /> },
            { path: "/oportunidad/condiciones", element: <Condiciones /> },

          ],

        },
      ],
    },

    { path: "*", element: <h1>Error</h1> },
  ]);

  return (
    <ModalContextProvider>
      <RouterProvider router={router} />
    </ModalContextProvider>
  );
}

export default App;
