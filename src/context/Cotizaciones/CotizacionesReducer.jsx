import {
  GET_COTIZACIONES,
  GET_DETALLE_COTIZACION,
  GET_TOTALES,
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
    default:
      return state;
  }
};
