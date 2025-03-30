import { createContext, useState, useContext } from "react";
import dataClientes from "../API/clientes";
const ClienteContext = createContext();
export const useClientes = () => useContext(ClienteContext);
export const ClienteContextProvider = ({ children }) => {
    const [clientes, setClientes] = useState([]);
    const [activeCliente, setActiveCliente] = useState(null);
    const getClientes = async () => {
        try {
         /*  const response = await fetch(
            "https://fakerapi.it/api/v2/companies?_quantity=100"
          );
          const { status, code, data } = await response.json(); */
          setClientes(dataClientes);
        } catch (error) {
          console.error("Error:", error);
        }
      };
    const getClienteById = async (id) => {
      try {
        const cliente = dataClientes.find(item => item.id=== id)
        setActiveCliente(cliente)
      }
      catch (error) {
        console.error("Error:", error);
      }
    }
  return (
    <ClienteContext.Provider
      value={{ clientes, getClientes, getClienteById, activeCliente, setActiveCliente }}
    >
      {children}
    </ClienteContext.Provider>
  );
};