import { FormProvider, useForm } from "react-hook-form";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Buttons";
import Margenes from "../../components/Cotizacion/Margenes";
import { useEffect, useState } from "react";
function FormularioMargenesGanancias({
  defaultValues,
  isEditable,
  children,
  onSubmit,
  onError,
}) {
  const [totals, setTotals] = useState([]);
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
  const getTotals = () => {
    const totales = {};
    defaultValues.secciones?.forEach((etapa) => {
      const tipo = etapa.tipo;
      const total = etapa.items.reduce(
        (sum, item) => sum + parseFloat(item.costo_total),
        0
      );
      const incpercent = 0

      if (totales[tipo]) {
        totales[tipo] += total;
      } else {
        totales[tipo] = total;
      }
    });
    const result = Object.entries(totales).map(([tipo, total]) => ({
      tipo,
      total,
    }));
    const total = result.reduce((sum, item) => sum + parseFloat(item.total), 0)
    result.map(item => {
      item.incpercent = ((item.total / total) * 100).toFixed(2);
      return item;
    })
    setTotals(result);
  };

  useEffect(() => {
    getTotals();
  }, []);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(() => {
          onSubmit(getUpdateValues());
        }, onError)}
      >
        <fieldset disabled={!isEditable}>
          <Margenes totals={totals}/>
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
