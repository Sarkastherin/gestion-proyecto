import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FormularioCotizacion from "../../templates/Oportunidad/FormularioCotizacion";
import { NoDataComponent } from "../../components/DataField";
import { PlusIcon, DocumentDuplicateIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Button } from "../../components/Buttons";
import { useModal } from "../../context/ModalContext";
import ButtonEdit from "../../components/Generals/ButtonEdit";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
export default function Cotizacion() {
  //const {getDetalleCotizacion, detalleCotizacion} = useCotizacion();
  const { handleModalShow, handleModalClose } = useModal();
  const { oportunidadData } = useOutletContext();
  const [isEditable, setIsEditable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  //const [data, setData] = useState(oportunidadData);
  const onSubmit = ({ allValues, dirtyFields }) => {
    console.log(allValues);
  };
  const onError = (data) => console.log("Error:", data);
  const handleCopyCotizacion =() => {
    handleNewCotización()
    handleModalShow('modalCotizaciones')
  }
  const handleNewCotización =() => {
    setShowForm(true);
    setIsEditable(true);
  }
  /* useEffect(() => {
    getDetalleCotizacion(oportunidadData.id_cotizacion)
  }, []) */
  return (
    <>
      {oportunidadData.secciones || showForm ? (
        <>
        <FormularioCotizacion
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
      ) : (
        <NoDataComponent
          title={"No hay Cotizaciones."}
          text={
            "Puede agregar cotizaciones haciendo click en el botón de abajo"
          }
        >
          <Button
            className={"min-w-40"}
            type="button"
            icon={<PlusIcon className="w-4" />}
            variant="pink"
            text="Agregar Cotización"
            onClick={handleNewCotización}
          />
          <p>o inicia desde una existente</p>
          <Button
            className={"min-w-40"}
            type="button"
            icon={<DocumentDuplicateIcon className="w-4" />}
            variant="blue"
            text="Duplicar Cotización"
            onClick={handleCopyCotizacion}
          />
          
        </NoDataComponent>
        
      )}
    </>
  );
}
