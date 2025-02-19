import { FormProvider, useForm } from "react-hook-form";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Buttons";
import DatosPagos from "../../components/Condiciones/DatosPagos";
function FormularioCondicion(
  defaultValues,
  isEditable,
  children,
  onSubmit,
  onError
) {
  const methods = useForm({
    defaultValues: defaultValues || {},
  });
  const {
    getValues,
    formState: { dirtyFields },
  } = methods;
  const getUpdateValues = () => {
    methods.unregister("getCliente");
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
          <ul>
            <li>Fecha de vigencia</li>
            <li>Terminos y Condiciones (texto lago)</li>
            <li>Formas de pago</li>
          </ul>
          <DatosPagos />
          <Footer>
            {children}
            <div className="flex gap-2 justify-end">
              <Button
                className={"min-w-40"}
                type="submit"
                variant="yellow"
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
export default FormularioCondicion;
