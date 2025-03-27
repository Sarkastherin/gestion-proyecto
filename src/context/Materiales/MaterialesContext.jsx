import { createContext, useContext, useReducer, useEffect } from "react";
import { MaterialesReducer } from "./MaterialesReducer";
import { supabase } from "../../API/supabaseClient";
const MaterialesContext = createContext();
export const useMateriales = () => useContext(MaterialesContext);

export const MaterialesProvider = ({ children }) => {
  const initialState = {
    materiales: [],
    listaMaterial: [],
    listaTipo: [],
    listaEspesor: [],
    listaNorma: [],
    listaMedida: [],
    listaUnion: [],
    listaCaracteristica: [],
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
      const { data: tipo, error } = await supabase.from("tipo").select("*");
      // console.log(tipo)
      dispatch({ type: "GET_TIPO", payload: tipo });
    } catch (error) {
      console.error("Error fetching tipo:", error);
    }
  };
  const getListaEspesor = async () => {
    try {
      const { data: espesor, error } = await supabase
        .from("espesores")
        .select("*");
      dispatch({ type: "GET_ESPESOR", payload: espesor });
    } catch (error) {
      console.error("Error fetching espesor:", error);
    }
  };
  const getListaNorma = async () => {
    try {
      const { data: norma, error } = await supabase.from("norma").select("*");
      dispatch({ type: "GET_NORMA", payload: norma });
    } catch (error) {
      console.error("Error fetching norma:", error);
    }
  };
  const getListaMedida = async () => {
    try {
      const { data: medida, error } = await supabase
        .from("medidas")
        .select("*");
      dispatch({ type: "GET_MEDIDA", payload: medida });
    } catch (error) {
      console.error("Error fetching medida:", error);
    }
  };
  const getListaUnion = async () => {
    try {
      const { data: union, error } = await supabase.from("union").select("*");
      dispatch({ type: "GET_UNION", payload: union });
    } catch (error) {
      console.error("Error fetching union:", error);
    }
  };
  const getListaCaracteristica = async () => {
    try {
      const { data: caracteristica, error } = await supabase
        .from("caracteristica")
        .select("*");
      dispatch({ type: "GET_CARACTERISTICA", payload: caracteristica });
    } catch (error) {
      console.error("Error fetching caracteristica:", error);
    }
  };
  const postMaterial = async (values) => {
    try {
      const { data, error } = await supabase.from("materiales").insert(values);
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
  const updateMaterial = async (values, id) => {
    try {
      const { data, error, status } = await supabase
        .from("materiales")
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
  const refreshMateriales = async () => {
    await getMateriales();
  };
  useEffect(() => {
    getMateriales();
    getListaMaterial();
    getListaTipo();
    getListaEspesor();
    getListaNorma();
    getListaMedida();
    getListaUnion();
    getListaCaracteristica();
  }, []);
  return (
    <MaterialesContext.Provider
      value={{
        materiales: state.materiales,
        listaMaterial: state.listaMaterial,
        listaTipo: state.listaTipo,
        listaEspesor: state.listaEspesor,
        listaNorma: state.listaNorma,
        listaMedida: state.listaMedida,
        listaUnion: state.listaUnion,
        listaCaracteristica: state.listaCaracteristica,
        postMaterial,
        updateMaterial,
        refreshMateriales,
      }}
    >
      {children}
    </MaterialesContext.Provider>
  );
};
