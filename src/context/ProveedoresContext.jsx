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
        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }
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