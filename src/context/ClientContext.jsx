import { createContext, useState, useContext } from "react";
const ClienteContext = createContext();
export const useClientes = () => useContext(ClienteContext);
export const ClienteContextProvider = ({ children }) => {
    const [clientes, setClientes] = useState([]);
    const getClientes = async () => {
        try {
          const response = await fetch(
            "https://fakerapi.it/api/v2/companies?_quantity=100"
          );
          const { status, code, data } = await response.json();
          setClientes(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
  return (
    <ClienteContext.Provider
      value={{ clientes, getClientes }}
    >
      {children}
    </ClienteContext.Provider>
  );
};