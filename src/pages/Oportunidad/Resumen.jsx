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
      setStates((prev) => ({ ...prev, csvData: consolidado }));
      setStates((prev) => ({ ...prev, loading: false }));
    }
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
                >
                  Descargar
                </CSVLink>
              }
              iconPosition="left"
            />
          )}
        </div>
      )}
    </>
  );
}
