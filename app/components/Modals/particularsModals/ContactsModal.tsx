import ModalBase from "../ModalBase";
import type { ContactsDataType } from "~/context/ContactsContext";
import { EntityTable } from "~/components/Generals/EntityTable";
import type { TableColumn } from "react-data-table-component";
import { useState, useEffect } from "react";
import { useUI } from "~/context/UIContext";
import { useContacts } from "~/context/ContactsContext";

const columns: TableColumn<ContactsDataType>[] = [
  {
    name: "Id",
    selector: (row) => row.id,
    width: "80px",
  },
  {
    name: "Cliente",
    selector: (row) => row.nombre,
    wrap: true,
  },
  {
    name: "CUIT",
    selector: (row) => row.cuit || "",
    width: "150px",
  },
];

export default function ContactsModal({
  open,
  onClose,
  type
}: {
  open: boolean;
  onClose: () => void;
  type: "client" | "supplier";
}) {
  const { setSelectedClient, setSelectedSupplier } = useUI();
  const { clients, suppliers } = useContacts();
  const [filterData, setFilterData] = useState<ContactsDataType[]>([]);
  const handleRowClicked = (data: ContactsDataType) => {
    if(type === "client") setSelectedClient(data);
    if(type === "supplier") setSelectedSupplier(data);
    onClose();
  };
  useEffect(() => {
    if(type === "client" && clients && clients.length > 0) {
      setFilterData(clients);
    }
    if (type === "supplier" && suppliers && suppliers.length > 0) {
      setFilterData(suppliers);
    }
  }, [clients, suppliers]);
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
      <div className="px-6 pt-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 270px)" }}>
        <EntityTable
          columns={columns}
          data={filterData}
          onRowClick={handleRowClicked}
          filterFields={[
            { key: "nombre", label: `${type === "client" ? "Cliente" : "Proveedor"}`, autoFilter: true },
            { key: "cuit", label: "CUIT", autoFilter: true },
          ]}
        />
      </div>
    </ModalBase>
  );
}
