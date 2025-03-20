import { createContext, useState, useContext } from "react";
const ProveedoresContext = createContext();
export const useProveedores = () => useContext(ProveedoresContext);
export const ProveedoresProvider = ({ children }) => {
    const [proveedores, setProveedores] = useState([]);
    const getProveedores = async () => {
        try {
          const response = await fetch(
            "https://fakerapi.it/api/v2/companies?_quantity=100"
          );
          const { status, code, data } = await response.json();
          setProveedores(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
  return (
    <ProveedoresContext.Provider
      value={{ proveedores, getProveedores }}
    >
      {children}
    </ProveedoresContext.Provider>
  );
};