import ModalBase from "../ModalBase";
import type { EmployeesDataType } from "~/context/ContactsContext";
import { EntityTable } from "~/components/Generals/EntityTable";
import type { TableColumn } from "react-data-table-component";
import { useState, useEffect } from "react";
import { useUI } from "~/context/UIContext";
import { useContacts } from "~/context/ContactsContext";

const columnsEmployees: TableColumn<EmployeesDataType>[] = [
  {
    name: "Id",
    selector: (row) => row.id,
    width: "80px",
  },
  {
    name: "Empleado",
    selector: (row) => row.contacto_nombre,
    wrap: true,
  },
  {
    name: "Puesto",
    selector: (row) => row.puesto || "",
    width: "150px",
  },
];

export default function EmployeesModal({
  open,
  onClose,
  excludeIds = [],
}: {
  open: boolean;
  onClose: () => void;
  excludeIds?: number[];
}) {
  const { setSelectedEmployee } = useUI();
  const { employees } = useContacts();
  const [filterData, setFilterData] = useState<EmployeesDataType[]>([]);

  const handleRowClicked = (data: EmployeesDataType) => {
    setSelectedEmployee({ ...data });
    onClose();
  };

  useEffect(() => {
    if (employees && employees.length > 0) {
      const filteredEmployees = employees.filter(
        (emp) => !excludeIds.includes(emp.id)
      );
      setFilterData(filteredEmployees);
    }
  }, [employees, excludeIds]);

  return (
    <ModalBase
      title="Listado de Empleados"
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
          columns={columnsEmployees}
          data={filterData}
          onRowClick={handleRowClicked}
          filterFields={[
            {
              key: "contacto_nombre",
              label: "Empleado",
              autoFilter: true,
            },
            {
              key: "puesto",
              label: "Puesto",
              autoFilter: true,
            },
          ]}
        />
      </div>
    </ModalBase>
  );
}