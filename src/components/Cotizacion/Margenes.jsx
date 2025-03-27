import { useEffect } from "react";
import { CardToggle, Card } from "../Cards";
import Table from "../Generals/Table";
import { Input, InputGroup } from "../Inputs";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";

export default function Margenes() {
  const { totales } = useCotizacion();
  const { register, control, watch, setValue, getValues } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: "margenes",
  });
  useEffect(() => {
    if (totales) {
      totales.forEach((item, index) => {
        setValue(`margenes.${index}.tipo`, item.tipo); // Asigna el tipo en cada margen
      });
    }
  }, [totales, setValue]);
  useEffect(() => {}, []);
  const cells = [
    { element: "Componente", w: "w-full", flex: "flex-1" },
    { element: "Total", w: "w-30" },
    { element: "INC %", w: "w-30" },
    { element: "Margen/Comp", w: "w-50" },
    { element: "Total con M/S", w: "w-30" },
  ];

  const cellsTotal = [
    { element: "Total", w: "w-full", flex: "flex-1" },
    { element: "Margen Final", w: "w-50" },
    { element: "Precio Final", w: "w-30" },
  ];
  const totalMargen = watch("margenes")?.reduce((sum, item, index) => {
    const porcentaje = watch(`margenes.${index}.margen`) || 0;
    return sum + (1 + porcentaje / 100) * (item.totales?.total || 0);
  }, 0);
  const margenFinal = watch("margen_general") || 0;
  const precioFinal = totalMargen * (1 + margenFinal / 100);

  return (
    <>
      {fields.length > 0 ? (
        <>
          <CardToggle title={"Margenes de Ganancias"}>
            <Table cells={cells}>
              {fields?.map((item, index) => {
                const porcentaje = watch(`margenes.${index}.margen`) || 0;
                return (
                  <tr
                    key={item.tipo}
                    className="flex px-6 py-2 text-sm text-neutral-700 text-left items-center"
                  >
                    <th className="px-1 w-full flex-1">{item.tipo}</th>
                    <td className="px-1 w-30">
                      {item.totales?.total.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      }) || "$ 0"}
                    </td>
                    <td className="px-1 w-30">
                      {item.totales?.porcentaje || 0}
                    </td>
                    <td className="px-1 w-50">
                      <InputGroup
                        type="number"
                        defaultValue={0}
                        {...register(`margenes.${index}.margen`, {
                          valueAsNumber: true,
                        })}
                      >
                        %
                      </InputGroup>
                    </td>
                    <td className="px-1 w-30">
                      {(
                        (1 + porcentaje / 100) * item.totales?.total || 0
                      ).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </td>
                  </tr>
                );
              })}
            </Table>
          </CardToggle>

          <Card className="mt-6">
            <Table cells={cellsTotal}>
              <tr className="flex px-6 py-2 text-sm text-neutral-700 text-left items-center">
                <th className="px-1 w-full flex-1">
                  {totalMargen?.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </th>
                <th className="px-1 w-50">
                  <InputGroup
                    defaultValue={0}
                    {...register("margen_general", { valueAsNumber: true })}
                  >
                    %
                  </InputGroup>
                </th>
                <th className="px-1 w-30">
                  {precioFinal.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </th>
              </tr>
            </Table>
          </Card>
        </>
      ): <p className="text-center mt-4 text-lg">No hay datos en cotización</p>}
    </>
  );
}
