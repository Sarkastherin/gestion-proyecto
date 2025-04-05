import { DataField } from "../../components/DataField";
import { Card } from "../../components/Cards";
import { useParams } from "react-router-dom";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";
import { useEffect } from "react";
export default function Resumen() {
  const { getOportunidadById, activeOportunidad } = useOportunidad();
  const { id } = useParams();
  useEffect(() => {
    getOportunidadById(parseInt(id));
  }, []);
  return (
    <>
    {activeOportunidad && (
      <div className="flex flex-col gap-4">
        <Card>
          <DataField
            label={"Nombre de Oportunidad"}
            value={activeOportunidad?.nombre}
          />
          <DataField label={"Cliente"} value={activeOportunidad?.cliente?.nombre} />
          <DataField label={"Alcance"} value={activeOportunidad?.alcance} />
        </Card>        
      </div>
    )}
      
    </>
  );
}
