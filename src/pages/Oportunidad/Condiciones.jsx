import FormularioCondicion from "../../templates/Oportunidad/FormularioCondiciones";
import ButtonEdit from "../../components/Generals/ButtonEdit";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import NoCotizacionComponent from "../../components/Cotizacion/NoCotizacionComponent";
import { Button } from "../../components/Buttons";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
import { Modal } from "../../components/Modal";
import { ModalLoading } from "../../components/Generals/ModalsTypes";
import { useModal } from "../../context/ModalContext";
export default function Condiciones() {
  const { postCotizacion, resfreshCotizaciones, updateCotizacion } =
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
      let result ;
      if (isNew) {
        insert["id_oportunidad"] = values.id;
        insert["active"] = true;
        result = await postCotizacion(insert);
      } else {
        result = await updateCotizacion(
          insert,
          oportunidadData.id_cotizacion
        );
      }
      if (result.success) {
        setResponse({
          message: "Condiciones guardada correctamente",
          type: "success",
        });
        resfreshCotizaciones();
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
          <FormularioCondicion
            isEditable={isEditable}
            defaultValues={oportunidadData}
            onSubmit={onSubmit}
            onError={onError}
          />
          <ModalLoading id={"modal-loading"} title={"Guardando cambios"} />
          <div className="absolute bottom-[-70px] left-8">
            <ButtonEdit
              func={() => {
                setIsEditable(true);
              }}
            />
          </div>
          {response && (
            <Modal
              modalId={"modal-response"}
              title={
                response.type === "success"
                  ? "¡Todo marcha bien!"
                  : "Algo anda mal"
              }
              variant={response.type}
            >
              <div className="flex flex-col gap-4">
                {response.message}
                <div className="flex gap-2 mt-2">
                  <Button
                    className="w-full"
                    text={"Cerrar"}
                    variant={"secondary"}
                    onClick={handleModalClose}
                  />
                  <Button
                    className="w-full"
                    text={"Ir oportunidades"}
                    variant={"primary"}
                    onClick={() => console.log("something")}
                  />
                </div>
              </div>
            </Modal>
          )}
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
