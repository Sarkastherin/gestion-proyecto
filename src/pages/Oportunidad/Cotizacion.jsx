import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import FormularioCotizacion from "../../templates/Oportunidad/FormularioCotizacion";
export default function Cotizacion() {
    const { oportunidadData } = useOutletContext();
    const [isEditable, setIsEditable] = useState(false);
    const onSubmit = ({allValues, dirtyFields}) => {
        
      };
      const onError = (data) => console.log("Error:", data);
  return (
    <>
      <FormularioCotizacion
        isEditable={isEditable}
        defaultValues={oportunidadData}
        onSubmit={onSubmit}
        onError={onError}
      />
    </>
  );
}
