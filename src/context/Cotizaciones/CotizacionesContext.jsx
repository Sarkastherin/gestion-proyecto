import { createContext, useContext, useReducer } from "react";
import { CotizacionesReducer } from "./CotizacionesReducer";
import { supabase } from "../../API/supabaseClient";
const CotizacionesContext = createContext();
export const useCotizacion = () => useContext(CotizacionesContext);
export const CotizacionProvider = ({ children }) => {
  const initialState = {
    cotizaciones: [],
    detalleCotizacion: null,
    totales: null,
    cotizacionActiva: null,
  };
  const [state, dispatch] = useReducer(CotizacionesReducer, initialState);
  const getCotizaciones = async () => {
    try {
      const { data: cotizaciones, error } = await supabase
        .from("cotizaciones")
        .select("*");
      dispatch({ type: "GET_COTIZACIONES", payload: cotizaciones });
    } catch (error) {
      console.error("Error fetching cotizaciones:", error);
    }
  };
  const getCotizacionesToDuplicity = async () => {
    try {
      const { data: cotizaciones, error } = await supabase
        .from("view_cotizaciones")
        .select("*");
      return cotizaciones;
    } catch (error) {
      console.error("Error fetching cotizaciones:", error);
    }
  };
  const getDetalleCotizacion = async (id) => {
    try {
      const { data: detalle, error } = await supabase
        .from("detalle_cotizacion")
        .select("*")
        .eq("id_cotizacion", id);
      const newDetalle = convertDetalle(detalle);
      dispatch({
        type: "GET_DETALLE_COTIZACION",
        payload: { secciones: newDetalle },
      });
    } catch (error) {
      console.error("Error fetching cotización:", error);
    }
  };
  const getDetalleById = async (id) => {
    try {
      const { data: detalle, error } = await supabase
        .from("detalle_cotizacion")
        .select("*")
        .eq("id_cotizacion", id);
        if (error) {
          // Retorna el error para que sea manejado en el componente que llama a esta función
          return { success: false, error };
        }
        return { success: true, data: detalle };
    } catch (error) {
      return { success: false, error };
    }
  };
  const getCotizacionActiva = async (id_oportunidad) => {
    try {
      const { data: cotizacion, error } = await supabase
        .from("cotizaciones")
        .select("*")
        .eq("id_oportunidad", id_oportunidad)
        .eq("active", true);
      dispatch({
        type: "GET_COTIZACION_ACTIVA",
        payload: cotizacion[0],
      });
    } catch (error) {
      console.error("Error fetching cotización:", error);
    }
  };
  const convertDetalle = (data) => {
    return data.reduce((secciones, item) => {
      let section = secciones.find(
        (s) => s.id_etapa === item.id_etapa && s.tipo === item.tipo
      );
      if (!section) {
        section = { id_etapa: item.id_etapa, tipo: item.tipo, items: [] };
        secciones.push(section);
      }
      section.items.push(item);
      return secciones;
    }, []);
  };
  const getTotales = async (id) => {
    try {
      const { data: totales, error } = await supabase
        .from("view_totales_por_tipo")
        .select("*")
        .eq("id_cotizacion", id);
      dispatch({ type: "GET_TOTALES", payload: totales });
    } catch (error) {
      console.error("Error fetching cotización:", error);
    }
  };
  const postCotizacion = async (values) => {
    try {
      const { data, error } = await supabase
        .from("cotizaciones")
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
  const postDetalle = async (values) => {
    try {
      const { data, error } = await supabase
        .from("detalle_cotizacion")
        .insert(values)
        .select();
      if (error) {
        console.log(error)
        // Retorna el error para que sea manejado en el componente que llama a esta función
        return { success: false, error };
      }
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e };
    }
  };
  const deleteDetalle = async (id) => {
    try {
      const { data, error } = await supabase
        .from("detalle_cotizacion")
        .delete()
        .eq("id", id)
        .select();
      if (error) {
        // Retorna el error para que sea manejado en el componente que llama a esta función
        return { success: false, error };
      }
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e };
    }
  };
  const updateDetalle = async (values,id) => {
    try {
      const { data, error } = await supabase
        .from("detalle_cotizacion")
        .update(values)
        .eq("id", id)
        .select();
      if (error) {
        // Retorna el error para que sea manejado en el componente que llama a esta función
        //return { success: false, error };
        throw new Error(error.message);
      }
      return { success: true, data }
    } catch (e) {
      console.log(e)
      return { success: false, error: e };
    }
  };
  const updateCotizacion = async (values, id) => {
    try {
      const { data, error, status } = await supabase
        .from("cotizaciones")
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
  };
  const refreshCotizaciones = () => {
    getCotizaciones();
  };
  return (
    <CotizacionesContext.Provider
      value={{
        postCotizacion,
        getCotizaciones,
        cotizaciones: state.cotizaciones,
        getDetalleCotizacion,
        detalleCotizacion: state.detalleCotizacion,
        getTotales,
        totales: state.totales,
        refreshCotizaciones,
        updateCotizacion,
        getCotizacionActiva,
        cotizacionActiva: state.cotizacionActiva,
        postDetalle,
        deleteDetalle,
        updateDetalle,
        getDetalleById,
        getCotizacionesToDuplicity
      }}
    >
      {children}
    </CotizacionesContext.Provider>
  );
};
