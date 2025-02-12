import { DataField } from "../../components/DataField";
import { Card } from "../../components/Cards";
import { useOutletContext } from "react-router-dom";
export default function Resumen() {
  const { oportunidadData } = useOutletContext();
  return (
    <>
      <div>
        <Card>
          <DataField
            label={"Nombre de Oportunidad"}
            value={oportunidadData?.nombre_oportunidad}
          />
          <DataField label={"Cliente"} value={oportunidadData?.cliente} />
          <DataField label={"Alcance"} value={oportunidadData?.alcance} />
        </Card>
        
      </div>
    </>
  );
}
