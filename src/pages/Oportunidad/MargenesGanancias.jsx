import FormularioMargenesGanancias from "../../templates/Oportunidad/FormularioMargenesGanancias";
import ButtonEdit from "../../components/Generals/ButtonEdit";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
import { useParams } from "react-router-dom";
export default function MargenesGanancias() {
  /* const {
    getDetalleCotizacion,
    detalleCotizacion,
    getTotales,
    totales,
    getCotizacionActiva,
    cotizacionActiva,
  } = useCotizacion(); */
  
  const [isEditable, setIsEditable] = useState(false);
  const { oportunidadData } = useOutletContext();
  const onSubmit = ({ allValues, dirtyFields }) => {
    console.log(allValues);
  };
  const onError = (data) => console.log("Error:", data);
  /* const { id } = useParams();
  useEffect(() => {
    if (id) {
      getCotizacionActiva(id);
    }
  }, []);
  useEffect(() => {
    if(cotizacionActiva) {getTotales(cotizacionActiva.id);}
  }, [cotizacionActiva]);
  useEffect(() => {
    if (totales) console.log(totales);
  }, [totales]);
  console.log(oportunidadData) */
  return (
    <>
      <FormularioMargenesGanancias
        isEditable={isEditable}
        defaultValues={oportunidadData}
        onSubmit={onSubmit}
        onError={onError}
      />
      <div className="absolute bottom-[-70px] left-8">
        <ButtonEdit
          func={() => {
            setIsEditable(true);
          }}
        />
      </div>
    </>
  );
}
