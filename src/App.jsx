import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CrearProyecto from "./pages/CrearProyecto";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/crear-proyecto", element: <CrearProyecto/> },
      ],
    },
    { path: "*", element: <h1>Error</h1> },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;