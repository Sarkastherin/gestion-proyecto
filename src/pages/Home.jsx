import { NavLink } from "react-router-dom";
import { appVersion, updatedDate } from "../version";
function Home() {
  return (
    <div className="flex flex-col items-center h-screen">
      <h2 className="text-2xl mt-10">Módulos</h2>
      <nav className="max-w-md w-full flex flex-col items-center justify-center mt-5 px-4">
        <NavLink
          className="text-center w-full border rounded-md border-neutral-400 p-4 m-2 font-medium text-neutral-600 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 cursor-pointer"
          to="/oportunidades"
        >
          Oportunidades
        </NavLink>

        <NavLink
          className="text-center w-full border rounded-md border-neutral-400 p-4 m-2 font-medium text-neutral-600 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 cursor-pointer"
          to="/materiales"
        >
          Materiales
        </NavLink>
        <NavLink
          className="text-center w-full border rounded-md border-neutral-400 p-4 m-2 font-medium text-neutral-600 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 cursor-pointer"
          to="/configuraciones"
        >
          Configuraciones
        </NavLink>
        <NavLink
          className="text-center w-full border rounded-md border-neutral-400 p-4 m-2 font-medium text-neutral-600 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 cursor-pointer"
          to="/instructivos"
        >
          Instructivos (Proximamente)
        </NavLink>
      </nav>
      <em className="absolute bottom-5 right-5 text-xs text-neutral-400 font-semibold">
        Version: {appVersion} | Date: {updatedDate}
      </em>
    </div>
  );
}
export default Home;
