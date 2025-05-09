import {
  GET_MATERIALES,
  GET_MATERIAL,
  GET_TIPO,
  GET_ESPESOR,
  GET_NORMA,
  GET_MEDIDA,
  GET_UNION,
  GET_CARACTERISTICA,
  GET_UNIDADES,
  SET_ACTIVE_MATERIAL,
  SET_CHECK_PRICE,
  GET_CONSOLIDADO
} from "../types";
export const MaterialesReducer = (state, action) => {
  const { type, payload } = action;
  switch (action.type) {
    case GET_MATERIALES:
      return { ...state, materiales: payload };
    case GET_MATERIAL:
      return { ...state, listaMaterial: payload };
    case GET_TIPO:
      return { ...state, listaTipo: payload };
    case GET_ESPESOR:
      return { ...state, listaEspesor: payload };
    case GET_NORMA:
      return { ...state, listaNorma: payload };
    case GET_MEDIDA:
      return { ...state, listaMedida: payload };
    case GET_UNION:
      return { ...state, listaUnion: payload };
    case GET_CARACTERISTICA:
      return { ...state, listaCaracteristica: payload };
    case GET_UNIDADES:
      return { ...state, listaUnidades: payload };
    case SET_ACTIVE_MATERIAL:
      return { ...state, activeMaterial: payload };
    case SET_CHECK_PRICE:
      return {...state, checkPrice: payload };
    case GET_CONSOLIDADO:
      return { ...state, consolidados: payload };
    // Add more cases as needed
    default:
      return state;
  }
};
