import { useForm, FormProvider } from "react-hook-form";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Buttons";
import DatosMateriales from "../../components/Materiales/DatosMateriales";
import { useEffect } from "react";
import { SeparateForm } from "../../components/Containers/SepareteForms";

export default function FormularioMateriales({
  defaultValues,
  isEditable,
  children,
  onSubmit,
  onError,
  setResetForm, // Agregar prop para exponer reset
}) {
  const methods = useForm({
    defaultValues: defaultValues || {
      material: "",
      cod_material: "",
      tipo: "",
      cod_tipo: "",
      norma: null,
      espesor: null,
      medida: null,
      sequence: "",
      tipo_union: null,
      caracteristica: null,
      codigo: "",
      descripcion: "",
      precios: [],
      usuario: null,
    },
  });
  const {
    formState: { dirtyFields },
  } = methods;

  const getUpdateValues = (values) => {
    return { values, dirtyFields };
  };
  // Exponer reset cuando el componente se monta
  useEffect(() => {
    if (setResetForm) {
      setResetForm(() => methods.reset);
    }
  }, [setResetForm, methods.reset]);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          onSubmit(getUpdateValues(data));
        }, onError)}
      >
        <fieldset disabled={!isEditable}>
          <SeparateForm>
            <DatosMateriales isNuevo={!defaultValues} />
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
