import { useEffect } from "react";
import { CardToggle, Card } from "../Cards";
import Table from "../Generals/Table";
import { Input, InputGroup } from "../Inputs";
import { useFormContext, useFieldArray } from "react-hook-form";

export default function Margenes({ totals }) {
  const { register, control, watch, setValue } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: "margenes",
  });
  useEffect(() => {
    totals.forEach((item, index) => {
      setValue(`margenes.${index}.tipo`, item.tipo); // Asigna el tipo en cada margen
    });
  }, [totals, setValue]);
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

  const totalMargen = totals.reduce((sum, item, index) => {
    const porcentaje = watch(`margenes.${index}.porcentaje`) || 0;
    return sum + (1 + porcentaje / 100) * item.total;
  }, 0);

  const margenFinal = watch("margen_final") || 0;
  const precioFinal = totalMargen * (1 + margenFinal / 100);

  return (
    <>
      <CardToggle title={"Margenes de Ganancias"}>
        <Table cells={cells}>
          {totals.map((item, index) => {
            const porcentaje = watch(`margenes.${index}.porcentaje`) || 0;
            return (
              <tr
                key={item.tipo}
                className="flex px-6 py-2 text-sm text-neutral-700 text-left items-center"
              >
                <th className="px-1 w-full flex-1">{item.tipo}</th>
                <td className="px-1 w-30">
                  {item.total.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </td>
                <td className="px-1 w-30">{item.incpercent}</td>
                <td className="px-1 w-50">
                  <InputGroup
                    type="number"
                    defaultValue={0}
                    {...register(`margenes.${index}.porcentaje`, {
                      valueAsNumber: true,
                    })}
                  >
                    %
                  </InputGroup>
                </td>
                <td className="px-1 w-30">
                  {((1 + porcentaje / 100) * item.total).toLocaleString(
                    "es-AR",
                    {
                      style: "currency",
                      currency: "ARS",
                    }
                  )}
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
              {totalMargen.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </th>
            <th className="px-1 w-50">
              <InputGroup
                defaultValue={0}
                {...register("margen_final", { valueAsNumber: true })}
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
  );
}
