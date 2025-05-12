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
    activeOportunidad: null,
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
        console.log(clientes);
      if (oportunidades && clientes) {
        if (clientes.length > 0 && oportunidades.length > 0) {
          oportunidades.forEach((oportunidad) => {
            oportunidad.cliente = clientes.find(
              (cliente) => cliente.id === oportunidad.id_cliente
            );
          });
        }
        dispatch({ type: "GET_OPORTUNIDADES", payload: oportunidades });
      }
    } catch (error) {
      console.error("Error fetching oportunidades:", error);
    }
  };
  const postOportunidad = async (values) => {
    try {
      const { data, error } = await supabase
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
  const getOportunidadById = async (id) => {
    if (state.oportunidades.length > 0) {
      const oportunidad = state.oportunidades.find(
        (oportunidad) => oportunidad.id === id
      );
      if (oportunidad) {
        dispatch({ type: "GET_OPORTUNIDAD", payload: oportunidad });
        return { success: true, data: oportunidad };
      }
    }
  };
  const updateOportunidad = async (values, id) => {
    try {
      const { data, error, status } = await supabase
        .from("oportunidades")
        .update(values)
        .eq("id", id)
        .select();
      if (error) {
        // Retorna el error para que sea manejado en el componente que llama a esta función
        return { success: false, error };
      }
      return { success: true, data };
    } catch (e) {
      console.log(e);
      // Atrapa errores inesperados y los retorna
      return { success: false, error: e };
    }
  }
  return (
    <OportunidadContext.Provider
      value={{
        getOportunidades,
        oportunidades: state.oportunidades,
        activeOportunidad: state.activeOportunidad,
        postOportunidad,
        refreshOportunidades,
        getOportunidadById,
        updateOportunidad
      }}
    >
      {children}
    </OportunidadContext.Provider>
  );
};
