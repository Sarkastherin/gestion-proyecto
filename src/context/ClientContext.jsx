import { createContext, useState, useContext } from "react";
const ClienteContext = createContext();
export const useClientes = () => useContext(ClienteContext);
export const ClienteContextProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [activeCliente, setActiveCliente] = useState(null);

  const getClientes = async () => {
    try {
      const response = await fetch("/.netlify/functions/contactos");
      const data = await response.json();
      setClientes(data?.data); // depende de cómo venga la estructura
    } catch (error) {
      console.error("Error al obtener clientes desde función:", error);
    }
  };
  
  return (
    <ClienteContext.Provider
      value={{
        clientes,
        getClientes,
        activeCliente,
        setActiveCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};
