import DataTable from "react-data-table-component";
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
export default function TableComponent({
  columns,
  data,
  handleOnRowClick,
  conditionalRowStyles,
  subHeaderComponent,
  noDataComponent = <p>No hay datos</p>,
  subHeader=false,
  onRowMouseEnter
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
      noDataComponent={noDataComponent}
      theme="default"
      subHeaderComponent={subHeaderComponent}
      subHeader={subHeader}
      onRowMouseEnter={onRowMouseEnter}
    />
  );
}
