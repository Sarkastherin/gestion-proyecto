import { useForm, FormProvider } from "react-hook-form";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Buttons";
import DatosMateriales from "../../components/Materiales/DatosMateriales";

export default function FormularioMateriales({
  defaultValues,
  isEditable,
  children,
  onSubmit,
  onError,
}) {
  const methods = useForm({
    defaultValues: defaultValues || {
      id_material:'',
      desc_material:'',
      cod_material:'', 
      id_tipo: '',
      desc_tipo:'',
      cod_tipo: '',
      norma: '',
      espesor: '',
      medida: '',
      sequence: '',
      tipo_union: '',
      obs: '',
      codigo: '',
      descripcion: '',
      precios: []
    },
  });
  const { formState: { dirtyFields } } = methods;
  
  const getUpdateValues = (data) => {
    return {data, dirtyFields};
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => {onSubmit(getUpdateValues(data))}, onError)}>
        <fieldset disabled={!isEditable}>
          <DatosMateriales isNuevo={!defaultValues}/>
          <Footer>
            {children}
            <div className="flex gap-2 justify-end">
              <Button
                className={"min-w-40"}
                type="submit"
                variant='primary'
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

