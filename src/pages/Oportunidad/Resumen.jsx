import { DataField } from "../../components/DataField";
import { Card } from "../../components/Cards";
import { useParams } from "react-router-dom";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";
import { useEffect } from "react";
import { Button } from "../../components/Buttons";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import { CSVLink } from "react-csv";
import { useState } from "react";
import { SpinnerCircular } from "spinners-react";
import { CloudArrowDownIcon } from "@heroicons/react/24/solid";
import Badge from "../../components/Generals/Badge";
import TableComponent from "../../components/TableComponent";
export default function Resumen() {
  const { getConsolidado, consolidados } = useMateriales();
  const { getOportunidadById, activeOportunidad } = useOportunidad();
  const [states, setStates] = useState({ csvData: [], loading: null });
  const { id } = useParams();
  useEffect(() => {
    getConsolidado();
    getOportunidadById(parseInt(id));
  }, []);
  const handleConsolidado = () => {
    setStates((prev) => ({ ...prev, loading: true }));
    if (consolidados.length > 0) {
      const consolidado = consolidados.filter(
        (item) => item.id_cotizacion === activeOportunidad.id_cotizacion
      );
      if (consolidado.length > 0) {
        setStates((prev) => ({ ...prev, csvData: consolidado }));
      } else {
        alert("No hay cotizaciones para esta oportunidad");
      }
    }
    else {
      alert("No hay cotizaciones para esta oportunidad");
    }
    setStates((prev) => ({ ...prev, loading: false }));
  };
  return (
    <>
      {activeOportunidad && (
        <div className="flex flex-col gap-4">
          <Card>
            <DataField
              label={"Nombre de Oportunidad"}
              value={activeOportunidad?.nombre}
            />
            <DataField
              label={"Cliente"}
              value={activeOportunidad?.cliente?.nombre}
            />
            <DataField label={"Alcance"} value={activeOportunidad?.alcance} />
          </Card>
          <Card>
            <DataField
              label={"Monto Total de Cotización"}
              value={
                activeOportunidad.total_monto?.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "USD",
                }) || "$ 0.00"
              }
            />
            <div className="flex justify-between mb-2 gap-4 text-neutral-700 text-sm">
              <span className="flex-none flex items-center font-semibold">
                {"Status"}:
              </span>
              <span className="px-5 py-0.5 w-full">
                {<Badge variant="blue">{activeOportunidad.status}</Badge>}
              </span>
            </div>
          </Card>
          <div>
            <div className="flex gap-10 justify-between">
              <Button
                className={"w-40"}
                icon={
                  states.loading ? (
                    <SpinnerCircular color="white" size={20} />
                  ) : null
                }
                variant={"primary"}
                text={states.loading ? "Cargando..." : "Consolidado"}
                iconPosition="left"
                onClick={handleConsolidado}
              />
              {states.csvData.length > 0 && (
                <Button
                  className={"w-40"}
                  icon={<CloudArrowDownIcon className="w-5" />}
                  variant={"green_csv"}
                  text={
                    <CSVLink
                      filename={`Consolidado-${activeOportunidad.nombre}`}
                      data={states.csvData}
                      separator={";"}
                    >
                      Descargar
                    </CSVLink>
                  }
                  iconPosition="left"
                />
              )}
            </div>
            {states.csvData.length > 0 &&(
              <TableComponent
              data={states.csvData}
            columns={[
              {
                name: "Código",
                selector: (row) => row.codigo,
                width: "170px"
              },
              {
                name: "Descripcion",
                selector: (row) => row.material
              },
              {
                name: "Cantidad",
                selector: (row) => row.cantidad_total,
                width: "100px"
              },
              {
                name: "Costo unitario",
                selector: (row) => row.costo_unitario.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "USD",
                }) || "US$ 0.00",
                width: "150px"
              },
              {
                name: "Costo total",
                selector: (row) => row.costo_total.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "USD",
                }) || "US$ 0.00",
                width: "150px"
              },
              {
                name: "Proveedor",
                selector: (row) => row.nombre_proveedor,
                width: "150px"
              }
            ]}
            
              />
            )}
            
          </div>
        </div>
      )}
    </>
  );
}
