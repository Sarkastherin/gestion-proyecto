import { useFormContext, useFieldArray, useForm } from "react-hook-form";
import { Input } from "../../components/Generals/Inputs";
import { Button } from "../../components/Buttons";
import { PlusIcon } from "@heroicons/react/16/solid";
import Table from "../../components/Generals/Table";
import { TrashIcon, CheckIcon } from "@heroicons/react/16/solid";
import { Proveedor } from "../../components/Proveedor";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import { use } from "react";
export default function FormularioPrecios({ onlyPrices, defaultValues, handleChangePrice }) {
  const { activeMaterial } = useMateriales();
  const { user } = useAuth();
  const { register, setValue, watch, reset, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "precios",
  });

  const cells = [
    { element: "#", w: "w-10" },
    { element: "Fecha", w: "w-35" },
    { element: "Proveedor", w: "w-full", flex: "flex-1" },
    { element: "Precio", w: "w-30" },
    { element: "Default", w: "w-20" },
    { element: <TrashIcon className="w-4" />, w: "w-20" },
    { element: <CheckIcon className="w-4" />, w: "w-10" },
  ];
  useEffect(() => {
    if (onlyPrices) {
      if (defaultValues) {
        reset(defaultValues);
      }
    }
  }, [defaultValues, reset]);
  return (
    <>
      <Table cells={cells}>
        {fields.map((item, index) => (
          <div key={item.id}>
            <tr
              key={`precios.${index}.id`}
              className="flex px-6 py-2 text-sm text-neutral-700 text-left items-center"
            >
              <th className="px-1 w-10">{index + 1}</th>
              <td className="px-1 w-35">
                <Input
                  label="Fecha"
                  no_label
                  type={"date"}
                  {...register(`precios.${index}.fecha`, {
                    required: true,
                  })}
                />
              </td>
              <td className="px-1 w-full flex-1">
                <Proveedor index={index} />
              </td>
              <td className="px-1 w-30">
                <Input
                  label="Precio"
                  no_label
                  type={"text"}
                  {...register(`precios.${index}.precio`, {
                    required: true,
                  })}
                />
              </td>
              <td className="px-1 w-20">
                <label
                  htmlFor={`precios.${index}.default`}
                  className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
                >
                  <input
                    type="checkbox"
                    id={`precios.${index}.default`}
                    checked={watch(`precios.${index}.default`) || false}
                    className="peer sr-only"
                    {...register(`precios.${index}.default`, {
                      onChange: () => {
                        fields.forEach((_, i) =>
                          setValue(`precios.${i}.default`, i === index)
                        );
                      },
                    })}
                  />

                  <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
                </label>
              </td>
              <td className="px-1 w-20">
                <Button
                  icon={<TrashIcon className="w-4" />}
                  variant={"redOutline"}
                  hidden_text
                  text="Eliminar Etapa"
                  onClick={() => {
                    remove(index);
                  }}
                />
              </td>
              <td className="px-1 w-10">
                <Button
                  rounded="rounded-full"
                  icon={<CheckIcon className="w-4" />}
                  variant={"blueOutline"}
                  hidden_text
                  text="Seleccionar precio"
                  onClick={() => {
                    /* Cambiar precio por el seleccionado */
                    const selectedPrice = watch(`precios.${index}.precio`);
                    handleChangePrice(selectedPrice)
                  }}
                />
              </td>
            </tr>
          </div>
        ))}
      </Table>
      <div className="flex justify-center mt-4">
        <Button
          className={"min-w-40"}
          icon={<PlusIcon className="w-4" />}
          variant={"green"}
          text="Agregar Precio"
          onClick={() => {
            append({
              id: fields.length + 1,
              fecha: "",
              precio: "",
              default: fields.length === 0,
              usuario: user.nombre_usuario,
            });
          }}
        />
      </div>
    </>
  );
}
