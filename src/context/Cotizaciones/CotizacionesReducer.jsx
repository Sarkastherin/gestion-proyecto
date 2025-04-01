import {
  GET_COTIZACIONES,
  GET_DETALLE_COTIZACION,
  GET_TOTALES,
  GET_COTIZACION_ACTIVA
} from "../types";

export const CotizacionesReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_COTIZACIONES:
      return { ...state, cotizaciones: payload };
    case GET_DETALLE_COTIZACION:
      return { ...state, detalleCotizacion: payload };
    case GET_TOTALES:
        return {...state, totales: payload }
    case GET_COTIZACION_ACTIVA:
      return {...state, cotizacionActiva: payload };
    // Add more cases as needed
    default:
      return state;
  }
};
