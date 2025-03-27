import { createContext, useContext, useReducer, useEffect } from "react";
import { OportunidadReducer } from "./OportunidadReducer";
import { supabase } from "../../API/supabaseClient";
import { useClientes } from "../ClientContext";
const OportunidadContext = createContext();
export const useOportunidad = () => useContext(OportunidadContext);
export const OportunidadProvider = ({ children }) => {
  const { getClientes } = useClientes();
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
  const postOportunidad = async (values) => {
    try {
      const {data, error} = await supabase
        .from("oportunidades")
        .insert(values)
        .select();
      if (error) {
        // Retorna el error para que sea manejado en el componente que llama a esta función
        return { success: false, error };
      }
      return { success: true, data };
    } catch (e) {
      // Atrapa errores inesperados y los retorna
      return { success: false, error: e };
    }
  };
  const refreshOportunidades = async () => {
    await getOportunidades();
  };
  return (
    <OportunidadContext.Provider
      value={{
        getOportunidades,
        oportunidades: state.oportunidades,
        postOportunidad,
        refreshOportunidades
      }}
    >
      {children}
    </OportunidadContext.Provider>
  );
};
