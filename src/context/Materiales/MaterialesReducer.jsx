import { GET_MATERIALES, GET_MATERIAL, GET_TIPO } from "../types";
export const MaterialesReducer = (state, action) => {
  const { type, payload } = action;
  switch (action.type) {
    case GET_MATERIALES:
      return { ...state, materiales: payload };
    case GET_MATERIAL:
      return { ...state, listaMaterial: payload };
    case GET_TIPO:
      return { ...state, listaTipo: payload };
    // Add more cases as needed
    default:
      return state;
  }
};
