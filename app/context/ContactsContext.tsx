import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
export type ContactsDataType = {
  cuenta_deud_venta2_id?: number;
  cuenta_deud_venta_id?: number;
  cuenta_proveedores2_id?: number;
  cuenta_proveedores_id?: number;
  cuit?: string;
  direccion?: string;
  email?: string;
  fecha_baja?: string;
  id: number;
  id_tributario_extranjero?: number;
  image?: string;
  is_disabled?: boolean;
  nombre: string;
  nombre_fantasia?: string;
  observacion?: string;
  pais?: string;
  responsabilidad_afip?: string;
  telefono?: string;
  tipo?: string;
};
type ContactsContextType = {
  clients: ContactsDataType[] | null;
  suppliers: ContactsDataType[] | null;
  isLoadedContacts: boolean | null;
  setIsLoadedContacts: (value: boolean | null) => void;
};
type ContactsProviderProps = {
  children: ReactNode;
};
const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined
);
export const useContacts = (): ContactsContextType => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts must be used within ContactsProvider");
  }
  return context;
};
export const ContactsProvider = ({ children }: ContactsProviderProps) => {
  const [clients, setClients] = useState<Array<ContactsDataType> | null>(null);
  const [suppliers, setSuppliers] = useState<Array<ContactsDataType> | null>(
    null
  );
  const [isLoadedContacts, setIsLoadedContacts] = useState<boolean | null>(null)
  const getClients = async () => {
    const myClientData = [];
    try {
      let page = 1;
      const page_size = 100;
      let has_more = true;
      while (has_more) {
        const response = await fetch("/.netlify/functions/contactos", {
          method: "POST",
          body: JSON.stringify({ page, page_size }),
        });
        if (!response.ok)
          throw new Error(
            `⛔ Problemas obteniendo contactos de base de datos extena 🗄️. Mensaje: ${
              response.statusText
            }. | Status: ${500}`
          );
        const data = await response.json();
        myClientData.push(...data.data);
        has_more = data.has_more;
        page++;
      }
      setClients(myClientData);
      return {success: true}
    } catch (error) {
      return {success: false, error: error}
    }
  };
  const getSuppliers = async () => {
    const mySupplierData = [];
    try {
      let page = 1;
      const page_size = 100;
      let has_more = true;
      while (has_more) {
        const response = await fetch("/.netlify/functions/proveedores", {
          method: "POST",
          body: JSON.stringify({ page, page_size }),
        });
        if (!response.ok)
          throw new Error(
            `⛔ Problemas obteniendo contactos de base de datos extena 🗄️. Mensaje: ${
              response.statusText
            }. | Status: ${500}`
          );
        const data = await response.json();
        mySupplierData.push(...data.data);
        has_more = data.has_more;
        page++;
      }
      setSuppliers(mySupplierData);
      return {success: true}
    } catch (error) {
      //alert(error);
      return {success: false, error: error}
    }
  };
  useEffect(() => {
    const fetching = async () => {
      const {success: successClients, error: errorClient} = await getClients();
      if(errorClient) {
        setIsLoadedContacts(false)
      return
      }
      const {success: successSuppliers, error: errorSuppliers} = await getSuppliers();
      if(errorSuppliers) {
        setIsLoadedContacts(false)
      return
      }
      setIsLoadedContacts(true)
    }
    fetching()
  }, []);
  return (
    <ContactsContext.Provider value={{ clients, suppliers, isLoadedContacts, setIsLoadedContacts }}>
      {children}
    </ContactsContext.Provider>
  );
};
