import { useForm, FormProvider } from "react-hook-form";
import DatosOportunidad from "../../components/Oportunidad/DatosOportunidad";
import EtapasOportunidad from "../../components/Oportunidad/EtapasOportunidad";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Buttons";
import { SeparateForm } from "../../components/Containers/SepareteForms";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
function FormularioOportunidad({
  defaultValues,
  isEditable,
  children,
  onSubmit,
  onError,
  setResetForm,
}) {
  const { user } = useAuth();
  const methods = useForm({
    defaultValues: defaultValues || {
      nombre: "",
      cliente: "",
      etapas: [],
      usuario: user.nombre_usuario,
    },
  });
  const {
    formState: { dirtyFields },
  } = methods;

  const getUpdateValues = (values) => {
    return { values, dirtyFields };
  };
  useEffect(() => {
    if (setResetForm) {
      setResetForm(() => methods.reset);
    }
  }, [setResetForm, methods.reset]);
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
                onSubmit={methods.handleSubmit()}
              >
                Guardar
              </Button>
            </div>
          </Footer>
        </fieldset>
      </form>
    </FormProvider>
  );
}

export default FormularioOportunidad;
