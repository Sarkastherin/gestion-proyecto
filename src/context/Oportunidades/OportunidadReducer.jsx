import { GET_OPORTUNIDADES, GET_OPORTUNIDAD } from '../types';

export const OportunidadReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_OPORTUNIDADES:
            return {...state, oportunidades: payload}
        case GET_OPORTUNIDAD:
            return {...state, activeOportunidad: payload}
        default:
            return state;
    }
}