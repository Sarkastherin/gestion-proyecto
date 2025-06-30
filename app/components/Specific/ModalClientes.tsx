import { Button } from "../Forms/Buttons";
import { useState, useEffect } from "react";
import type { ClientDataType } from "~/context/ContactsContext";
import type { TableColumn } from "react-data-table-component";
import { useContacts } from "~/context/ContactsContext";
import DataTable from "react-data-table-component";
import { customStyles } from "../Generals/Tables";
import { useUI } from "~/context/UIContext";
import { Input } from "../Forms/Inputs";
import { LayoutModal } from "../Generals/Modals";
const columns: TableColumn<ClientDataType>[] = [
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

export default function ModalClientes() {
  const [clientsData, setClientsData] = useState<ClientDataType[]>([]);
  const { theme, openClientModal, setOpenClientModal, setSelectedClient } =
    useUI();
  const { clients } = useContacts();
  const onFilter = () => {
    const inputElement = document.getElementById(
      "searchText"
    ) as HTMLInputElement | null;
    const searchText = inputElement
      ? inputElement.value.toLocaleLowerCase()
      : "";
    const filterData = clients.filter((client) => {
      const nombres = client.nombre.toLocaleLowerCase().includes(searchText);
      const cuit = client.cuit?.toLocaleLowerCase().includes(searchText);
      return nombres || cuit;
    });
    setClientsData(filterData);
  };
  useEffect(() => {
    if (clients.length > 0) {
      setClientsData(clients);
    }
  }, [clients]);
  const handleRowClicked = (data: ClientDataType) => {
    setSelectedClient(data);
    setOpenClientModal(false);
  };
  return (
    <LayoutModal
      open={openClientModal}
      title="Listado de Clientes"
      handleOpen={() => setOpenClientModal(false)}
      justifyStyle="justify-end"
      buttonsGroup={
        <Button
          type="button"
          onClick={() => setOpenClientModal(false)}
          variant="secondary"
        >
          Cerrar
        </Button>
      }
    >
      <div className="mt-4">
        <Input
          type="search"
          placeholder="Buscar por nombre o CUIT"
          id="searchText"
          onChange={onFilter}
        />
        {clientsData.length > 0 && (
          <>
            <DataTable
              columns={columns}
              data={clientsData}
              pagination
              customStyles={customStyles}
              theme={theme}
              onRowClicked={handleRowClicked}
              pointerOnHover
              highlightOnHover
            />
          </>
        )}
      </div>
    </LayoutModal>
  );
}
