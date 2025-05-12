import { createContext, useState, useContext, useEffect } from "react";
import { useModal } from "./ModalContext";
const ProveedoresContext = createContext();
export const useProveedores = () => useContext(ProveedoresContext);
export const ProveedoresProvider = ({ children }) => {
  const { handleModalShow, handleModalClose } = useModal();
    const [proveedores, setProveedores] = useState([]);
    const getProveedores = async () => {
      try {
        const response = await fetch("/.netlify/functions/proveedores");
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }
         // Verifica si la respuesta es válida antes de convertirla a JSON
         if (!response.headers.get("content-type")?.includes("application/json")) {
            throw new Error("Respuesta no válida");
          }
         // Si la respuesta es válida, convierte a JSON
        const data = await response.json();
        setProveedores(data?.data); // depende de cómo venga la estructura
      } catch (error) {
        handleModalShow("general-modal");
        console.error(error);
      }
      };
      useEffect(() => {getProveedores()},[])
  return (
    <ProveedoresContext.Provider
      value={{ proveedores, getProveedores }}
    >
      {children}
    </ProveedoresContext.Provider>
  );
};