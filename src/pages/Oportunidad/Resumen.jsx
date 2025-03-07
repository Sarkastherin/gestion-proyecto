import { DataField } from "../../components/DataField";
import { Card } from "../../components/Cards";
import { useOutletContext } from "react-router-dom";
export default function Resumen() {
  const { oportunidadData } = useOutletContext();
  console.log("oportunidad: ",oportunidadData)
  return (
    <>
      <div className="flex flex-col gap-4">
        <Card>
          <DataField
            label={"Nombre de Oportunidad"}
            value={oportunidadData?.nombre}
          />
          <DataField label={"Cliente"} value={oportunidadData?.cliente.name} />
          <DataField label={"Alcance"} value={oportunidadData?.alcance} />
        </Card>        
      </div>
    </>
  );
}
