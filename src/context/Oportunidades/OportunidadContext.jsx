import { createContext, useContext, useReducer, useEffect } from "react";
import { OportunidadReducer } from "./OportunidadReducer";
import { supabase } from "../../API/supabaseClient";
import { useClientes } from "../ClientContext";
const OportunidadContext = createContext();
export const useOportunidad = () => useContext(OportunidadContext);
export const OportunidadProvider = ({ children }) => {
  const { getClientes, clientes } = useClientes();
  const initialState = {
    oportunidades: [],
  };
  useEffect(() => {
    getClientes();
  }, []);
  const [state, dispatch] = useReducer(OportunidadReducer, initialState);
  const getOportunidades = async () => {
    try {
      const { data: oportunidades, error } = await supabase
        .from("view_oportunidades")
        .select("*");
      dispatch({ type: "GET_OPORTUNIDADES", payload: oportunidades });
    } catch (error) {
      console.error("Error fetching oportunidades:", error);
    }
  };
  return (
    <OportunidadContext.Provider
      value={{ getOportunidades, oportunidades: state.oportunidades }}
    >
      {children}
    </OportunidadContext.Provider>
  );
};
