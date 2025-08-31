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
export type EmployeesDataType = {
  id: number;
  contacto_id: number;
  legajo: string;
  puesto: string;
  fecha_ingreso: string;
  fecha_egreso: string;
  tipo_contrato: string;
  categoria: string;
  salario_basico: number;
  fecha_nacimiento: string;
  estado_civil: string;
  nivel_estudios: string;
  contacto_emergencia: string;
  banco: string;
  cbu: string;
  alias_cbu: string;
  observaciones: string;
  created_at: string;
  updated_at: string;
  contacto_nombre: string;
  contacto_cuit: string;
  contacto_email: string;
  contacto_telefono: string;
  is_precarga: boolean;

}
type ContactsContextType = {
  clients: ContactsDataType[] | null;
  suppliers: ContactsDataType[] | null;
  isLoadedContacts: boolean | null;
  setIsLoadedContacts: (value: boolean | null) => void;
  employees: EmployeesDataType[] | null;
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
  const [employees, setEmployees] = useState<Array<EmployeesDataType> | null>(
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
  const getEmployees = async () => {
    const myEmployeeData = [];
    try {
      let page = 1;
      const page_size = 100;
      let has_more = true;
      while (has_more) {
        const response = await fetch("/.netlify/functions/empleados", {
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
        myEmployeeData.push(...data.data);
        has_more = data.has_more;
        page++;
      }
      setEmployees(myEmployeeData);
      return {success: true}
    } catch (error) {
      //alert(error);
      return {success: false, error: error}
    }
  };
  useEffect(() => {
    const fetching = async () => {
      const {error: errorClient} = await getClients();
      if(errorClient) {
        setIsLoadedContacts(false)
      return
      }
      const {error: errorSuppliers} = await getSuppliers();
      if(errorSuppliers) {
        setIsLoadedContacts(false)
      return
      }
      const {error: errorEmployees} = await getEmployees();
      if(errorEmployees) {
        setIsLoadedContacts(false)
      return
      }
      setIsLoadedContacts(true)
    }
    fetching()
  }, []);
  return (
    <ContactsContext.Provider value={{ clients, suppliers, isLoadedContacts, setIsLoadedContacts, employees }}>
      {children}
    </ContactsContext.Provider>
  );
};
