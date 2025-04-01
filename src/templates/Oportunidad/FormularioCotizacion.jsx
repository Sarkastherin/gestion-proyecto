import { useForm, FormProvider } from "react-hook-form";
import { Seccion } from "../../components/Cotizacion/Seccion";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Buttons";
import { ModalCotizaciones } from "../../components/ModalCotizaciones";
import { useOutletContext } from "react-router-dom";

function FormularioCotizacion({
  defaultValues,
  isEditable,
  children,
  onSubmit,
  onError,
}) {
  const { oportunidadData } = useOutletContext();
  const methods = useForm({
    defaultValues: defaultValues || {},
  });
  const {
    formState: { dirtyFields },
  } = methods;

  const getUpdateValues = (values) => {
    return { values, dirtyFields };
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((values) => {
          onSubmit(getUpdateValues(values));
        }, onError)}
      >
        <fieldset disabled={!isEditable}>
          <Seccion etapas={oportunidadData?.etapas}/>
          <Footer>
            {children}
            <div className="flex gap-2 justify-end">
              <Button
                className={"min-w-40"}
                type="submit"
                variant="pink"
                text="Guardar"
                onSubmit={methods.handleSubmit()}
              />
            </div>
          </Footer>
        </fieldset>
      </form>
      <ModalCotizaciones/>
    </FormProvider>
  );
}

export default FormularioCotizacion;
