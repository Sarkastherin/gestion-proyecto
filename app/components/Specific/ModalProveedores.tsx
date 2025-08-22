import { Button } from "../Forms/Buttons";
import { useState, useEffect } from "react";
import type { ClientDataType } from "~/context/ContactsContext";
import type { TableColumn } from "react-data-table-component";
import { useContacts } from "~/context/ContactsContext";
import DataTable from "react-data-table-component";
import { customStyles } from "../Generals/EntityTable";
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
    name: "Proveedor",
    selector: (row) => row.nombre,
    wrap: true,
  },
  {
    name: "CUIT",
    selector: (row) => row.cuit || "",
    width: "150px",
  },
];

export default function ModalProveedores() {
  const [suppliersData, setSuppliersData] = useState<ClientDataType[]>([]);
  const {
    theme,
    openSupplierModal,
    setOpenSupplierModal,
    setSelectedSupplier,
  } = useUI();
  const { suppliers } = useContacts();
  const onFilter = () => {
    const inputElement = document.getElementById(
      "searchText"
    ) as HTMLInputElement | null;
    const searchText = inputElement
      ? inputElement.value.toLocaleLowerCase()
      : "";
    const filterData = suppliers?.filter((supplier) => {
      const nombres = supplier.nombre.toLocaleLowerCase().includes(searchText);
      const cuit = supplier.cuit?.toLocaleLowerCase().includes(searchText);
      return nombres || cuit;
    });
    setSuppliersData(filterData ?? [])
  };
  useEffect(() => {
    if (suppliers && suppliers.length > 0) {
      setSuppliersData(suppliers);
    }
  }, [suppliers]);
  const handleRowClicked = (data: ClientDataType) => {
    setSelectedSupplier(data);
    setOpenSupplierModal(false);
  };
  return (
    <>
      <LayoutModal
        open={openSupplierModal}
        title="Listado de Proveedores"
        handleOpen={() => setOpenSupplierModal(false)}
      >
        <div className="mt-4">
          <Input
            type="search"
            placeholder="Buscar por nombre o CUIT"
            id="searchText"
            onChange={onFilter}
          />
          {suppliersData.length > 0 && (
            <div
              className="overflow-y-auto"
              style={{ height: "calc(100vh - 270px)" }}
            >
              <DataTable
                columns={columns}
                data={suppliersData}
                pagination
                customStyles={customStyles}
                theme={theme}
                onRowClicked={handleRowClicked}
                pointerOnHover
                highlightOnHover
                paginationPerPage={10}
              />
            </div>
          )}
        </div>
        <footer className="mt-6 flex justify-end">
          <div className="w-38">
            <Button
              type="button"
              onClick={() => setOpenSupplierModal(false)}
              variant="secondary"
            >
              Cerrar
            </Button>
          </div>
        </footer>
      </LayoutModal>
    </>
  );
}
