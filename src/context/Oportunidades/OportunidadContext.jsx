import { createContext, useContext, useReducer } from "react";
import { OportunidadReducer } from "./OportunidadReducer";
const OportunidadContext = createContext();
export const useOportunidad = () => useContext(OportunidadContext);
export const OportunidadProvider = ({ children }) => {
  const initialState = {
    oportunidades: [],
  };
  const [state, dispatch] = useReducer(OportunidadReducer, initialState);
  const getOportunidades = async () => {
    fetch("http://localhost:5000/oportunidades")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "GET_OPORTUNIDADES", payload: data });
      })
      .catch((error) => {
        console.log("Error en la petición fetch:", error);
      });
  };
  return (
    <OportunidadContext.Provider
      value={{ getOportunidades, oportunidades: state.oportunidades }}
    >
      {children}
    </OportunidadContext.Provider>
  );
};
