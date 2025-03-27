import { useForm, FormProvider } from "react-hook-form";
import DatosOportunidad from "../../components/Oportunidad/DatosOportunidad";
import EtapasOportunidad from "../../components/Oportunidad/EtapasOportunidad";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Buttons";
import { SeparateForm } from "../../components/Containers/SepareteForms";

function FormularioOportunidad({
  defaultValues,
  isEditable,
  children,
  onSubmit,
  onError,
}) {
  const methods = useForm({
    defaultValues: defaultValues || {
      nombre: "",
      cliente: "",
      avance: "",
      etapas: [],
    },
  });
  const {
    getValues,
    formState: { dirtyFields },
  } = methods;

  const getUpdateValues = (values) => {
    const allValues = getValues();
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
          <SeparateForm>
            <DatosOportunidad />
            <EtapasOportunidad />
          </SeparateForm>
          <Footer>
            {children}
            <div className="flex gap-2 justify-end">
              <Button
                className={"min-w-40"}
                type="submit"
                variant="primary"
                text="Guardar"
                onSubmit={methods.handleSubmit()}
              />
            </div>
          </Footer>
        </fieldset>
      </form>
    </FormProvider>
  );
}

export default FormularioOportunidad;
