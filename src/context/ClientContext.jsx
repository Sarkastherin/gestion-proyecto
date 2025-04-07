import { createContext, useState, useContext } from "react";
import dataClientes from "../API/clientes";
const ClienteContext = createContext();
export const useClientes = () => useContext(ClienteContext);
export const ClienteContextProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [activeCliente, setActiveCliente] = useState(null);

  const getClientes = async () => {
    try {
       const access_token = await obtenerToken();
       const data = await obtenerContactos(access_token)
      setClientes(data)
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getClienteById = async (id) => {
    try {
      const cliente = dataClientes.find((item) => item.id === id);
      setActiveCliente(cliente);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const usuario = "compras@imindustrial.com.ar";
  const password = "febr2025A3.";
  const BASE_URL = import.meta.env.VITE_API_URL || '/api';
  async function obtenerToken() {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "password",
          username: usuario,
          password: password,
          scope: "",
          client_id: "string",
          client_secret: "string",
        }),
      })
      const {access_token} = await response.json();
      return access_token
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function obtenerContactos(accessToken) {
    try {
      const response = await fetch(`${BASE_URL}/contactos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          include_archived: false,
          include_cliente: true,
          include_proveedor: false,
          page: 1,
          page_size: 100
        })
      });
  
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  
      const {data} = await response.json();
      return data;
    } catch (error) {
      console.error('🚨 Error al obtener contactos:', error);
    }
  }
  return (
    <ClienteContext.Provider
      value={{
        clientes,
        getClientes,
        getClienteById,
        activeCliente,
        setActiveCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};
