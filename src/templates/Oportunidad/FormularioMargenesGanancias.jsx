import { FormProvider, useForm } from "react-hook-form";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Buttons";
import Margenes from "../../components/Cotizacion/Margenes";
function FormularioMargenesGanancias({
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
    getValues,
    formState: { dirtyFields },
  } = methods;
  const getUpdateValues = () => {
    const allValues = getValues();
    return { allValues, dirtyFields };
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(() => {
          onSubmit(getUpdateValues());
        }, onError)}
      >
        <fieldset disabled={!isEditable}>
          <Margenes />
          <Footer>
            {children}
            <div className="flex gap-2 justify-end">
              <Button
                className={"min-w-40"}
                type="submit"
                variant="blue"
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
export default FormularioMargenesGanancias;
