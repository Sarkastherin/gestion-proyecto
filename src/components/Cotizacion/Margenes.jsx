import { useEffect } from "react";
import { CardToggle, Card } from "../Cards";
import Table from "../Generals/Table";
import { InputGroup } from "../Generals/Inputs";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useCotizacion } from "../../context/Cotizaciones/CotizacionesContext";
import { useParams } from "react-router-dom";

export default function Margenes() {
  const { totales, getTotales, getCotizacionActiva, cotizacionActiva } = useCotizacion();
  const { register, control, watch } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: "margenes",
  });
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getCotizacionActiva(id);
    }
  }, []);
  useEffect(() => {
    if(cotizacionActiva) {getTotales(cotizacionActiva.id);}
  }, [cotizacionActiva]);

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
    return sum + (1 + porcentaje / 100) * (totales?.find((total) => total.tipo === item.tipo)?.total || 0);
  }, 0);
  const margenFinal = watch("margen_general") || 0;
  const precioFinal = totalMargen * (1 + margenFinal / 100);
  return (
    <>
      {(fields.length > 0 && totales?.length>0) ? (
        <>
          <CardToggle title={"Margenes de Ganancias"}>
            <Table cells={cells}>
              {fields?.map((item, index) => {
                const porcentaje = watch(`margenes.${index}.margen`) || 0;
                const total =totales.find((total) => total.tipo === item.tipo)?.total || 0
                const percent = totales.find((total) => total.tipo === item.tipo)?.porcentaje || 0
                return (
                  <tr
                    key={item.tipo}
                    className="flex px-6 py-2 text-sm text-neutral-700 text-left items-center"
                  >
                    <th className="px-1 w-full flex-1">{item.tipo}</th>
                    <td className="px-1 w-30">
                      
                      {total.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "USD",
                      }) || "$ 0"}
                    </td>
                    <td className="px-1 w-30">
                    {percent}{" %"}
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
                        (1 + porcentaje / 100) * total || 0
                      ).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "USD",
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
                    currency: "USD",
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
                    currency: "USD",
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
