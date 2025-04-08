import { useFormContext, useFieldArray, useForm } from "react-hook-form";
import { Input, InputXS } from "../../components/Generals/Inputs";
import { Button, ButtonXS } from "../../components/Buttons";
import { PlusIcon } from "@heroicons/react/16/solid";
import Table from "../../components/Generals/Table";
import { TrashIcon, CheckIcon } from "@heroicons/react/16/solid";
import { Proveedor } from "../../components/Proveedor";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import { use } from "react";
export default function FormularioPrecios({
  onlyPrices,
  defaultValues,
  handleChangePrice,
}) {
  const { activeMaterial } = useMateriales();
  const { user } = useAuth();
  const { register, setValue, watch, reset, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "precios",
  });
  useEffect(() => {
    if (onlyPrices) {
      if (defaultValues) {
        reset(defaultValues);
      }
    }
  }, [defaultValues, reset]);

  return (
      <fieldset >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200">
            <thead className="">
              <tr className="">
                <th className="">Id</th>
                <th className="w-30">Fecha</th>
                <th>Proveedor</th>
                <th className="w-30">Precio</th>
                <th className="w-20">Default</th>
                <th>
                  <TrashIcon className="w-4" />
                </th>
                {onlyPrices && (
                  <th>
                    <CheckIcon className="w-4" />
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="">
              {fields.map((item, index) => (
                <tr key={`precios.${index}.id`}>
                  <th className="pt-1 px-0.5">{index + 1}</th>
                  <td className="pt-1 px-0.5">
                    <InputXS
                      label="Fecha"
                      no_label
                      type={"date"}
                      disabled={onlyPrices}
                      {...register(`precios.${index}.fecha`, {
                        required: true,
                      })}
                    />
                  </td>
                  <td className="pt-1 px-0.5">
                    <Proveedor index={index} disabled={onlyPrices}/>
                  </td>
                  <td className="pt-1 px-0.5">
                    <InputXS
                    disabled={onlyPrices}
                      label="Precio"
                      no_label
                      type={"text"}
                      {...register(`precios.${index}.precio`, {
                        required: true,
                      })}
                    />
                  </td>
                  <td className="flex items-center justify-center h-full pt-1 px-0.5">
                    <label
                      htmlFor={`precios.${index}.default`}
                      className="relative inline-block h-8 w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
                    >
                      <input
                      disabled={onlyPrices}
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

                      <span className="absolute inset-y-0 start-0  size-5.5 m-[5px] rounded-full bg-white transition-all peer-checked:start-4"></span>
                    </label>
                  </td>
                  <td className="pt-1 px-0.5">
                    <ButtonXS
                      icon={<TrashIcon className="w-4" />}
                      variant={"redOutline"}
                      hidden_text
                      disabled={onlyPrices}
                      text="Eliminar Etapa"
                      onClick={() => {
                        remove(index);
                      }}
                    />
                  </td>
                  {onlyPrices && (
                    <td className="pt-1 px-0.5">
                      <ButtonXS
                        rounded="rounded-full"
                        icon={<CheckIcon className="w-4" />}
                        variant={"blueOutline"}
                        hidden_text
                        text="Seleccionar precio"
                        onClick={() => {
                          const selectedPrice = watch(
                            `precios.${index}.precio`
                          );
                          handleChangePrice(selectedPrice);
                        }}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {!onlyPrices && (
              <ButtonXS
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
            )}
          </div>
        </div>
      </fieldset>
  );
}
