import { GET_OPORTUNIDADES } from '../types';

export const OportunidadReducer = (state, action) => {
    const { type, payload } = action;
    switch (action.type) {
        case GET_OPORTUNIDADES:
            return {...state, oportunidades: payload}
        default:
            return state;
    }
}