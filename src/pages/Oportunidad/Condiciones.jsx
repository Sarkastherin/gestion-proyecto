import FormularioCondicion from "../../templates/Oportunidad/FormularioCondiciones";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import NoCotizacionComponent from "../../components/Cotizacion/NoCotizacionComponent";
import { Button } from "../../components/Buttons";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
import { useModal } from "../../context/ModalContext";
import ContainerOportunidades from "../../components/Containers/ContainerOportunidades";
export default function Condiciones() {
  const { postCotizacion, refreshCotizaciones, updateCotizacion } =
    useCotizacion();
  const { oportunidadData } = useOutletContext();
  const [isEditable, setIsEditable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isNew, setIsNew] = useState(null);
  const [response, setResponse] = useState(null);
  const { handleModalShow, handleModalClose } = useModal();
  const onSubmit = async ({ values, dirtyFields }) => {
    handleModalShow("modal-loading");
    const insert = {};
    for (let item in dirtyFields) {
      if (dirtyFields[item]) {
        insert[item] = values[item];
      }
    }
    try {
      let result;
      if (isNew) {
        insert["id_oportunidad"] = values.id;
        result = await postCotizacion(insert);
      } else {
        result = await updateCotizacion(insert, oportunidadData.id_cotizacion);
      }
      if (result.success) {
        setResponse({
          message: "Condiciones guardada correctamente",
          type: "success",
        });
        refreshCotizaciones();
        setIsEditable(false);
      } else {
        setResponse({
          message: "No se pudo guardar las condiciones",
          type: "danger",
        });
        console.error(result.error);
      }
    } catch (e) {
    } finally {
      handleModalShow("modal-response");
    }
  };
  const onError = (data) => console.log("Error:", data);
  const handleNewCotización = () => {
    setShowForm(true);
    setIsEditable(true);
    setIsNew(true);
  };
  return (
    <>
      {oportunidadData.id_cotizacion || showForm ? (
        <>
          <ContainerOportunidades
            response={response}
            setIsEditable={setIsEditable}
            form={
              <FormularioCondicion
                isEditable={isEditable}
                defaultValues={oportunidadData}
                onSubmit={onSubmit}
                onError={onError}
              />
            }
          />
        </>
      ) : (
        <NoCotizacionComponent>
          <p>
            Las <strong>Condiciones</strong> estas sujetas a las{" "}
            <strong>Cotizaciones</strong>
          </p>
          <p>
            Si desea inicializar una nueva cotización haga click en el botón de
            abajo
          </p>

          <Button
            className={"min-w-40"}
            type="button"
            icon={<PlusIcon className="w-4" />}
            variant="yellow"
            text="Iniciar Cotización"
            onClick={handleNewCotización}
          />
        </NoCotizacionComponent>
      )}
    </>
  );
}
