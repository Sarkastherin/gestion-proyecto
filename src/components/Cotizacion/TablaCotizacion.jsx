import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
export default function TablaCotizacion({ defaultValues }) {
  const [data, setData] = useState([]);
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Tipo",
      selector: (row) => row.tipo,
      sortable: true,
      width: "150px",
    },
    {
      name: "Descripción",
      selector: (row) => {
        const descripcion =
          row.tipo === "Materiales"
            ? row.material
            : row.tipo === "Mano de Obra"
            ? row.mano_obra
            : row.tipo === "Subcontratos"
            ? row.actividad : row.otro_item;
        return descripcion;
      },
      sortable: true,
    },
    {
      name: "Cantidad",
      selector: (row) => row.cantidad,
      sortable: true,
      width: "120px",
    },
    {
      name: "Costo U",
      selector: (row) => row.costo_unitario,
      sortable: true,
      width: "120px",
    },
    {
      name: "Costo Total",
      selector: (row) => row.costo_total,
      sortable: true,
      width: "120px",
    },
  ];

  useEffect(() => {
    const dataCotizacion = [];
    const { secciones } = defaultValues;
    secciones.map((seccion) => {
      seccion.items.map((item) => {
        item.id_etapa = parseInt(seccion.id_etapa);
        item.tipo = seccion.tipo;
        delete item.costo_total;
        dataCotizacion.push(item);
      });
      delete seccion.id_etapa;
      delete seccion.tipo;
    });
    setData(dataCotizacion);
  }, []);

  return <DataTable columns={columns} data={data} />;
}
