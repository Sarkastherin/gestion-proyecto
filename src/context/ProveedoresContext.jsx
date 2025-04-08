import { createContext, useState, useContext, useEffect } from "react";
const ProveedoresContext = createContext();
export const useProveedores = () => useContext(ProveedoresContext);
export const ProveedoresProvider = ({ children }) => {
    const [proveedores, setProveedores] = useState([]);
    const getProveedores = async () => {
      try {
        const response = await fetch("/.netlify/functions/proveedores");
        const data = await response.json();
        setProveedores(data?.data); // depende de cómo venga la estructura
      } catch (error) {
        console.error("Error al obtener clientes desde función:", error);
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