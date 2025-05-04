import { useForm, FormProvider } from "react-hook-form";
import { Seccion } from "../../components/Cotizacion/Seccion";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Buttons";
import { ModalCotizaciones } from "../../components/ModalCotizaciones";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function FormularioCotizacion({
  defaultValues,
  isEditable,
  children,
  onSubmit,
  onError,
  setState,
}) {
  const { getOportunidadById, activeOportunidad } = useOportunidad();
  const { id } = useParams();

  const methods = useForm({
    defaultValues: defaultValues || {},
  });
  const {
    formState: { dirtyFields },
  } = methods;

  const getUpdateValues = (values) => {
    return { values, dirtyFields };
  };
  useEffect(() => {
    getOportunidadById(parseInt(id));
  }, []);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((values) => {
          onSubmit(getUpdateValues(values));
        }, onError)}
      >
        <fieldset disabled={!isEditable}>
          <fieldset disabled={activeOportunidad.status_cotizacion === "Cerrada"}>
            <Seccion etapas={activeOportunidad?.etapas} />
            <Footer>
              {children}
              <div className="flex gap-2 justify-end">
                <Button
                  className={"min-w-40"}
                  type="submit"
                  variant="primary"
                  onSubmit={methods.handleSubmit()}
                >
                  Guardar
                </Button>
              </div>
            </Footer>
          </fieldset>
        </fieldset>
      </form>
      <ModalCotizaciones setState={setState} />
    </FormProvider>
  );
}

export default FormularioCotizacion;
