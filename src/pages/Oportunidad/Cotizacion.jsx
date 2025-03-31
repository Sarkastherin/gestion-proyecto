import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import FormularioCotizacion from "../../templates/Oportunidad/FormularioCotizacion";
import {
  PlusIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../components/Buttons";
import { useModal } from "../../context/ModalContext";
import ButtonEdit from "../../components/Generals/ButtonEdit";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import NoCotizacionComponent from "../../components/Cotizacion/NoCotizacionComponent";
export default function Cotizacion() {
  const { materiales } = useMateriales();
  const { handleModalShow, handleModalClose } = useModal();
  const { oportunidadData } = useOutletContext();
  const [isEditable, setIsEditable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const onSubmit = ({ allValues, dirtyFields }) => {
    console.log(allValues);
  };
  const onError = (data) => console.log("Error:", data);
  const handleCopyCotizacion = () => {
    handleNewCotización();
    handleModalShow("modalCotizaciones");
  };
  const handleNewCotización = () => {
    setShowForm(true);
    setIsEditable(true);
  };
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
        <NoCotizacionComponent>
          <p>Puede agregar cotizaciones haciendo click en el botón de abajo</p>

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
        </NoCotizacionComponent>
      )}
    </>
  );
}
