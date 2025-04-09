import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Input, Textarea, CurrencyTypeInput, Select } from "../Generals/Inputs";
import { Button } from "../Buttons";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import Table from "../Generals/Table";
import { Material } from "../Material";
import { PrecioMaterialInput } from "../PrecioMaterialInput";


export const Item = ({ tipo, seccionIndex }) => {
  const [selectMaterial, setSelectMaterial] = useState({});
  const { register, control, watch, setValue, formState: {isDirty} } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `secciones.${seccionIndex}.items`,
  });
  useEffect(() => {
    if (fields.length === 0 && tipo != "") {
      append(
        {
          id:"",
          material: null,
          mano_obra: null,
          actividad: null,
          otro_item: null,
          cantidad: "",
          costo_unitario: "",
          costo_total: "",
        },
        { shouldFocus: false }
      );
    }
  }, [fields, append, tipo]);
  const handleCostoTotalItem = (value, index) => {
    const quantity =
      parseFloat(watch(`secciones.${seccionIndex}.items.${index}.cantidad`)) ||
      0;
    const costo_unitario = value || "0";
    setValue(
      `secciones.${seccionIndex}.items.${index}.costo_unitario`,
      costo_unitario
    );
    setValue(
      `secciones.${seccionIndex}.items.${index}.costo_total`,
      quantity * costo_unitario
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
  /* const validated = (index) => {
    const validatedElement = {...register(`secciones.${seccionIndex}.items.${index}.valid`,{required: true})}
    const mano_obra = watch(`secciones.${seccionIndex}.items.${index}.mano_obra`)
    const material = watch(`secciones.${seccionIndex}.items.${index}.material`)
    const actividad = watch(`secciones.${seccionIndex}.items.${index}.actividad`)
    const otro_items = watch(`secciones.${seccionIndex}.items.${index}.otro_item`)
    const values = [mano_obra, material, actividad, otro_items];
    const hasElement = values.some(item => item != undefined && item != '');
    setValue(`secciones.${seccionIndex}.items.${index}.valid`, hasElement)
  } */
    const validarItem = (index) => {
      const item = watch(`secciones.${seccionIndex}.items.${index}`);
      const { material, mano_obra, actividad, otro_item } = item || {};
      return (
        (material && material !== "") ||
        (mano_obra && mano_obra !== "") ||
        (actividad && actividad !== "") ||
        (otro_item && otro_item !== "")
      ) || "Debe completar al menos un campo de detalle";
    };
    
  
  return (
    <>
      <Table cells={cells}>
        {fields.map((field, index) => (
          <tr
            key={field.id}
            className={`flex px-3 py-1.5 text-sm text-neutral-700 text-left ${
              index !== fields.length - 1 ? "border-b border-neutral-200" : ""
            }`}
          >
            <td className="w-20 flex-none px-1">{index + 1}</td>
            <td className="w-full flex-1 px-1">
              {tipo === "Materiales" && (
                <>
                  <Material
                    seccionIndex={seccionIndex}
                    index={index}
                    selectMaterial={selectMaterial}
                    setSelectMaterial={setSelectMaterial}
                  />
                </>
              )}
              {tipo === "Mano de Obra" && (
                <Input
                  label="Operario"
                  no_label
                  className=""
                  type="text"
                  placeholder="Operario"
                  {...register(
                    `secciones.${seccionIndex}.items.${index}.mano_obra`
                  )}
                />
              )}
              {tipo === "Subcontratos" && (
                <Input
                  label="Actividad"
                  no_label
                  className=""
                  type="text"
                  placeholder="Actividad"
                  {...register(
                    `secciones.${seccionIndex}.items.${index}.actividad`
                  )}
                />
              )}
              {tipo === "Otros" && (
                <Input
                  label="Otros"
                  no_label
                  className=""
                  type="text"
                  placeholder="..."
                  {...register(`secciones.${seccionIndex}.items.${index}.otro_item`)}
                />
              )}
              <Textarea
                label="Indicaciones"
                no_label
                className="sr-only"
                placeholder="Indicaciones"
                rows="2"
                {...register(
                  `secciones.${seccionIndex}.items.${index}.indicaciones`
                )}
              />
              <Textarea
              className="sr-only"
                label="Observaciones"
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
                label="Cantidad"
                no_label
                type="number"
                {...register(
                  `secciones.${seccionIndex}.items.${index}.cantidad`,{required:true, validate: () => validarItem(index)}
                )}
              />
            </td>
            <td className="w-30 flex-none px-1">
              {tipo === "Materiales" ? (
                <>
                  <PrecioMaterialInput
                    seccionIndex={seccionIndex}
                    index={index}
                    selectMaterial={selectMaterial}
                    handleCostoTotalItem={handleCostoTotalItem}
                  />
                </>
              ) : (
                <CurrencyTypeInput
                  value={
                    watch(
                      `secciones.${seccionIndex}.items.${index}.costo_unitario`
                    ) || "0"
                  }
                  onValueChange={(value) => handleCostoTotalItem(value, index)}
                />
              )}
            </td>
            <td className="w-30 flex-none px-1">
              <CurrencyTypeInput
                readOnly={true}
                value={
                  watch(
                    `secciones.${seccionIndex}.items.${index}.costo_total`
                  ) || "0.00"
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
          onClick={() => {
            append({
              id:"",
              material: null,
              mano_obra: null,
              actividad: null,
              otro_item: null,
              cantidad: "",
              costo_unitario: "",
              costo_total: "",
            });
          }}
        />
      </div>
      
    </>
  );
};
