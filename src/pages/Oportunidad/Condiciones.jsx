import FormularioCondicion from "../../templates/Oportunidad/FormularioCondiciones";
import { useState, useEffect } from "react";
import NoCotizacionComponent from "../../components/Cotizacion/NoCotizacionComponent";
import { Button } from "../../components/Buttons";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
import { useModal } from "../../context/ModalContext";
import ContainerOportunidades from "../../components/Containers/ContainerOportunidades";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";
import { useParams } from "react-router-dom";
export default function Condiciones() {
  const { getOportunidadById, activeOportunidad, refreshOportunidades } =
    useOportunidad();
  const { id } = useParams();
  useEffect(() => {
    getOportunidadById(parseInt(id));
  }, []);
  const [state, setState] = useState({
    response: null,
    isEditable: false,
    showForm: false,
  });
  const { postCotizacion, refreshCotizaciones, updateCotizacion } =
    useCotizacion();
  const [isNew, setIsNew] = useState(null);
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
        result = await updateCotizacion(
          insert,
          activeOportunidad.id_cotizacion
        );
      }
      if (result.success) {
        setState((prev) => ({
          ...prev,
          response: {
            message: "Condiciones guardada correctamente",
            type: "success",
          },
        }));
        refreshCotizaciones();
        refreshOportunidades();
        setState((prev) => ({ ...prev, isEditable: false }));
      } else {
        setState((prev) => ({
          ...prev,
          response: {
            message: "No se pudo guardar las condiciones",
            type: "danger",
          },
        }));
        console.error(result.error);
      }
    } catch (e) {
    } finally {
      handleModalShow("modal-response");
    }
  };
  const onError = (data) => console.log("Error:", data);
  const handleNewCotizacion = () => {
    setState((prev) => ({ ...prev, showForm: true }));
    setState((prev) => ({ ...prev, isEditable: true }));
    setIsNew(true);
  };
  return (
    <>
      {activeOportunidad.id_cotizacion || state.showForm ? (
        <>
          <ContainerOportunidades
            state={state}
            setState={setState}
            form={
              <FormularioCondicion
                isEditable={state.isEditable}
                defaultValues={activeOportunidad}
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
            variant="yellow"
            text=""
            onClick={handleNewCotizacion}
          >
            Iniciar Cotización <PlusIcon className="w-4" />
          </Button>
        </NoCotizacionComponent>
      )}
    </>
  );
}
