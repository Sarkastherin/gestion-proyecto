import { createContext, useContext, useReducer } from "react";
import { MaterialesReducer } from "./MaterialesReducer";
import { supabase } from "../../API/supabaseClient";
const MaterialesContext = createContext();
export const useMateriales = () => useContext(MaterialesContext);

export const MaterialesProvider = ({ children }) => {
  const initialState = {
    materiales: [],
    listaMaterial: [],
    listaTipo: [],
  };
  const [state, dispatch] = useReducer(MaterialesReducer, initialState);
  const getMateriales = async () => {
    try {
      const { data: materiales, error } = await supabase
        .from("materiales")
        .select("*");
      dispatch({ type: "GET_MATERIALES", payload: materiales });
    } catch (error) {
      console.error("Error fetching materiales:", error);
    }
  };
  const getListaMaterial = async () => {
    try {
      const { data: material, error } = await supabase
        .from("material")
        .select("*");
       // console.log(material)
      dispatch({ type: "GET_MATERIAL", payload: material });
    } catch (error) {
      console.error("Error fetching material:", error);
    }
  };
  const getListaTipo = async () => {
    try {
      const { data: tipo, error } = await supabase
        .from("tipo")
        .select("*");
       // console.log(tipo)
      dispatch({ type: "GET_TIPO", payload: tipo });
    } catch (error) {
      console.error("Error fetching tipo:", error);
    }
  };
  return (
    <MaterialesContext.Provider
      value={{
        materiales: state.materiales,
        getMateriales,
        listaMaterial: state.listaMaterial,
        getListaMaterial,
        listaTipo: state.listaTipo,
        getListaTipo,
      }}
    >
      {children}
    </MaterialesContext.Provider>
  );
};
