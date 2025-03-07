import { GET_COTIZACIONES, GET_DETALLE_COTIZACION } from '../types';

export const CotizacionesReducer = (state, action) => {
    const { type, payload } = action;
    switch (action.type) {
        case GET_COTIZACIONES:
            return {...state, cotizaciones: payload}
        case GET_DETALLE_COTIZACION:
            return {...state, detalleCotizacion: payload}
        default:
            return state;

    }
}