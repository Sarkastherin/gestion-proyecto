import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Input, Textarea, CurrencyTypeInput } from "../Inputs";
import { Button } from "../Buttons";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import Table from "../Generals/Table";

export const Item = ({ tipo, seccionIndex }) => {
  const { register, control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `secciones.${seccionIndex}.items`,
  });
  useEffect(() => {
    if (fields.length === 0 && tipo != "") {
      append(
        {
          id_material: "",
          descripcion_material: "",
          mano_obra: "",
          actividad: "",
          item: "",
          indicaciones: "",
          observaciones: "",
          cantidad: "",
          costo_unitario: "",
          total: "0",
        },
        { shouldFocus: false }
      );
    }
  }, [fields, append, tipo]);
  const handleCostoTotalItem = (value, index) => {
    const quantity =
      parseFloat(watch(`secciones.${seccionIndex}.items.${index}.cantidad`)) ||
      0;
    const costo_unitario = parseFloat(value) || 0;
    setValue(
      `secciones.${seccionIndex}.items.${index}.costo_unitario`,
      costo_unitario
    );
    setValue(
      `secciones.${seccionIndex}.items.${index}.costo_total`,
      quantity * costo_unitario.toFixed(2)
    );
  };
  const cells = [
    { element: "Nro", w: "w-20" },
    { element: "Detalle", w: "w-full", flex: "flex-1" },
    { element: "Cantidad", w: "w-30" },
    { element: "Costo unitario", w: "w-30" },
    { element: "Total", w: "w-30" },
    { element: <TrashIcon className="w-4.5" />, w: "w-10" },
  ];
  return (
    <>
      <Table cells={cells}>
        {fields.map((field, index) => (
          <tr
            key={field.id}
            className={`flex px-6 py-2 text-sm text-neutral-700 text-left ${
              index !== fields.length - 1 ? "border-b border-neutral-200" : ""
            }`}
          >
            <td className="w-20 flex-none px-1">{index + 1}</td>
            <td className="w-full flex-1 px-1">
              {tipo === "Materiales" && (
                <Input
                label = "Descripción"
                no_label
                  className="mb-1.5"
                  type="text"
                  placeholder="Descripción"
                  {...register(
                    `secciones.${seccionIndex}.items.${index}.descripcion_material`
                  )}
                />
              )}
              {tipo === "Mano de Obra" && (
                <Input
                label = "Operario"
                no_label
                  className="mb-1.5"
                  type="text"
                  placeholder="Operario"
                  {...register(
                    `secciones.${seccionIndex}.items.${index}.mano_obra`
                  )}
                />
              )}
              {tipo === "Subcontratos" && (
                <Input
                label = "Actividad"
                no_label
                  className="mb-1.5"
                  type="text"
                  placeholder="Actividad"
                  {...register(
                    `secciones.${seccionIndex}.items.${index}.actividad`
                  )}
                />
              )}
              {tipo === "Otros" && (
                <Input
                label = "Otros"
                no_label
                  className="mb-1.5"
                  type="text"
                  placeholder="..."
                  {...register(`secciones.${seccionIndex}.items.${index}.item`)}
                />
              )}
              <Textarea
              label = "Indicaciones"
              no_label
                placeholder="Indicaciones"
                rows="2"
                {...register(
                  `secciones.${seccionIndex}.items.${index}.indicaciones`
                )}
              />
              <Textarea
              label = "Observaciones"
              no_label
                placeholder="Observaciones"
                rows="2"
                {...register(
                  `secciones.${seccionIndex}.items.${index}.observaciones`
                )}
              />
            </td>
            <td className="w-30 flex-none px-1">
              <Input
              label = "Cantidad"
              no_label
                type="number"
                {...register(
                  `secciones.${seccionIndex}.items.${index}.cantidad`
                )}
              />
            </td>
            <td className="w-30 flex-none px-1">
              <CurrencyTypeInput
                type="number"
                value={
                  watch(
                    `secciones.${seccionIndex}.items.${index}.costo_unitario`
                  ) || ""
                }
                onValueChange={(value) => handleCostoTotalItem(value, index)}
              />
            </td>
            <td className="w-30 flex-none px-1">
              <CurrencyTypeInput
                type="number"
                readOnly={true}
                value={
                  watch(`secciones.${seccionIndex}.items.${index}.costo_total`) ||
                  "0.00"
                }
              />
            </td>
            <td className="flex-none px-1">
              <Button
                tooltip="tooltip-test"
                icon={<TrashIcon className="w-4" />}
                variant={"redOutline"}
                hidden_text
                text="Eliminar Etapa"
                onClick={() => {
                  remove(index);
                }}
              />
            </td>
          </tr>
        ))}
      </Table>

      <div className="p-2 border-t border-neutral-300">
        <Button
          text={"Agregar Item"}
          icon={<PlusCircleIcon className="w-5" />}
          variant={"primary_no_border"}
          disabled={tipo === ""}
          onClick={() =>
            append(
              {
                material: "",
                mano_obra: "",
                actividad: "",
                item: "",
                indicaciones: "",
                observaciones: "",
                cantidad: "",
                costo_unitario: "",
                costo_total: "0",
              },
              { shouldFocus: false }
            )
          }
        />
      </div>
    </>
  );
};
