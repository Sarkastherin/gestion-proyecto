import { Button } from "./Buttons";
import DataTable from "react-data-table-component";
import { PlusIcon } from "@heroicons/react/16/solid";
import { createTheme } from "react-data-table-component";

const customStyles = {
  headCells: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  },
  cells: {
    style: {
      fontSize: "0.95rem",
    },
  },
};
const options = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
};
createTheme(
	'default',
	{
		
		background: {
			default: 'transparent',
		},
	},
	'light',
);
const NoDataComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center text-neutral-700 gap-4 my-6">
      <p className="text-xl font bold">No hay Oportunidades.</p>
      <p>Puede agregar Oportunidades haciendo clic en el botón de abajo</p>
      <Button text={'Agregar Oportunidad'} icon={<PlusIcon className="w-4" />} variant={'primary'}/>
    </div>
  );
};
export default function TableComponent({
  columns,
  data,
  handleOnRowClick,
  conditionalRowStyles,
}) {
  return (
    <DataTable
      className="custom-element"
      columns={columns}
      data={data}
      customStyles={customStyles}
      pagination
      paginationPerPage={10}
      paginationComponentOptions={options}
      pointerOnHover
      highlightOnHover
      onRowClicked={handleOnRowClick}
      conditionalRowStyles={conditionalRowStyles}
      noDataComponent={<NoDataComponent />}
      theme="default"
    />
  );
}
