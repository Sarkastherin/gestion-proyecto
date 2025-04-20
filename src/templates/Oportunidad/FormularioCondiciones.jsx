import { FormProvider, useForm } from "react-hook-form";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Buttons";
import DatosPagos from "../../components/Condiciones/DatosPagos";
function FormularioCondicion({
  defaultValues,
  isEditable,
  children,
  onSubmit,
  onError,
}) {
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
          <DatosPagos />
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
export default FormularioCondicion;
