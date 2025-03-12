import { createContext, useContext, useReducer, useEffect } from "react";
import { CotizacionesReducer } from "./CotizacionesReducer";
import { supabase } from "../../API/supabaseClient";
const CotizacionesContext = createContext();
export const useCotizacion = () => useContext(CotizacionesContext);
export const CotizacionProvider = ({ children }) => {
  const initialState = {
    cotizaciones: [],
    detalleCotizacion: null,
    totales: null
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
  const getDetalleCotizacion = async (id) => {
    try {
      const  { data: detalle, error }  = await supabase
        .from("view_detalle_cotizacion")
       .select("*")
       .eq("id_cotizacion", id);
       const newDetalle = convertDetalle(detalle)
      dispatch({ type: "GET_DETALLE_COTIZACION", payload: {secciones: newDetalle} });
    } catch (error) {
      console.error("Error fetching cotización:", error);
    }
  }
  const convertDetalle = (data) => {
    return data.reduce((secciones, item) => {
      let section = secciones.find(s => s.id_etapa === item.id_etapa && s.tipo === item.tipo);
      if(!section) {
        section = {id_etapa: item.id_etapa, tipo: item.tipo, items: []};
        secciones.push(section);
      }
      section.items.push(item);
      return secciones
    },[])
  };
  const getTotales = async (id) => {
    try {
      const  { data: totales, error }  = await supabase
        .from("view_totales_por_tipo")
       .select("*")
       .eq("id_cotizacion", id);
      dispatch({ type: "GET_TOTALES", payload: totales });
    } catch (error) {
      console.error("Error fetching cotización:", error);
    }
  }
  return (
    <CotizacionesContext.Provider
      value={{ getCotizaciones, cotizaciones: state.cotizaciones, getDetalleCotizacion, detalleCotizacion: state.detalleCotizacion, getTotales, totales: state.totales }}
    >
      {children}
    </CotizacionesContext.Provider>
  );
};
