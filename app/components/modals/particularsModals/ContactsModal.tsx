import ModalBase from "../ModalBase";
import type {
  ContactsDataType,
  EmployeesDataType,
} from "~/context/ContactsContext";
import { EntityTable } from "~/components/Generals/EntityTable";
import type { TableColumn } from "react-data-table-component";
import { useState, useEffect } from "react";
import { useUI } from "~/context/UIContext";
import { useContacts } from "~/context/ContactsContext";

const columnsContact: TableColumn<ContactsDataType | EmployeesDataType>[] = [
  {
    name: "Id",
    selector: (row) => row.id,
    width: "80px",
  },
  {
    name: "Cliente",
    selector: (row) => (row as ContactsDataType).nombre,
    wrap: true,
  },
  {
    name: "CUIT",
    selector: (row) => (row as ContactsDataType).cuit || "",
    width: "150px",
  },
];
const columnsEmployees: TableColumn<ContactsDataType | EmployeesDataType>[] = [
  {
    name: "Id",
    selector: (row) => row.id,
    width: "80px",
  },
  {
    name: "Cliente",
    selector: (row) => (row as EmployeesDataType).contacto_nombre,
    wrap: true,
  },
  {
    name: "Puesto",
    selector: (row) => (row as EmployeesDataType).puesto || "",
    width: "150px",
  },
];

export default function ContactsModal({
  open,
  onClose,
  type,
}: {
  open: boolean;
  onClose: () => void;
  type: "client" | "supplier" | "employee";
}) {
  const { setSelectedClient, setSelectedSupplier, setSelectedEmployee } =
    useUI();
  const { clients, suppliers, employees } = useContacts();
  const [filterData, setFilterData] = useState<
    ContactsDataType[] | EmployeesDataType[]
  >([]);
  const handleRowClicked = (data: ContactsDataType | EmployeesDataType) => {
    if (type === "client") setSelectedClient({ ...(data as ContactsDataType) });
    if (type === "supplier")
      setSelectedSupplier({ ...(data as ContactsDataType) });
    if (type === "employee")
      setSelectedEmployee({ ...(data as EmployeesDataType) });
    onClose();
  };
  useEffect(() => {
    if (type === "client" && clients && clients.length > 0) {
      setFilterData(clients);
    }
    if (type === "supplier" && suppliers && suppliers.length > 0) {
      setFilterData(suppliers);
    }
    if (type === "employee" && employees && employees.length > 0) {
      setFilterData(employees.filter((e) => e.puesto === "Operario"));
    }
  }, [clients, suppliers, employees]);
  return (
    <ModalBase
      title={`Listado de ${type === "client" ? "Clientes" : "Proveedores"}`}
      open={open}
      zIndex={40}
      onClose={onClose}
      width="max-w-4xl"
      footer={{
        btnSecondary: {
          label: "Cancelar",
          handleOnClick: onClose,
        },
      }}
    >
      <div
        className="px-6 pt-6 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 270px)" }}
      >
        <EntityTable
          columns={type === "employee" ? columnsEmployees : columnsContact}
          data={filterData}
          onRowClick={handleRowClicked}
          filterFields={[
            {
              key: type === "employee" ? "contacto_nombre" : "nombre",
              label: `${type === "client" ? "Cliente" : type === "supplier" ? "Proveedor" : "Empleado"}`,
              autoFilter: true,
            },
            //solo en type client o supplier
            ...(type !== "employee"
              ? [{ key: "cuit", label: "CUIT", autoFilter: true }]
              : []),
          ]}
        />
      </div>
    </ModalBase>
  );
}
