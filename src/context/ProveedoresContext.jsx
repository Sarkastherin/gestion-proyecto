import { createContext, useState, useContext, useEffect } from "react";
import dataProveedores from "../API/proveedores";
const ProveedoresContext = createContext();
export const useProveedores = () => useContext(ProveedoresContext);
export const ProveedoresProvider = ({ children }) => {
    const [proveedores, setProveedores] = useState([]);
    const getProveedores = async () => {
        try {
          /* const response = await fetch(
            "https://fakerapi.it/api/v2/companies?_quantity=100"
          );
          console.log(response)
          const { status, code, data } = await response.json(); */
          setProveedores(dataProveedores);
        } catch (error) {
          console.error("Error:", error);
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