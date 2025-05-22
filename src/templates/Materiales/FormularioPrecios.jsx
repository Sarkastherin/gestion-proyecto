import { useFormContext, useFieldArray } from "react-hook-form";
import { InputXS } from "../../components/Generals/Inputs";
import { Button } from "../../components/Buttons";
import { PlusIcon } from "@heroicons/react/16/solid";
import { TrashIcon, CheckIcon } from "@heroicons/react/16/solid";
import { Proveedor } from "../../components/Proveedor";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
export default function FormularioPrecios({
  onlyPrices,
  defaultValues,
  handleChangePrice,
}) {
  const { activeMaterial } = useMateriales();
  const { user } = useAuth();
  const {
    register,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useFormContext();
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
    <fieldset>
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
              {/* borra */}
              {onlyPrices && (
                <th>
                  <CheckIcon className="w-4" />
                </th>
              )}
              {/* borra */}
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
                    /* borra */
                    disabled={onlyPrices}
                    /* borra */
                    {...register(`precios.${index}.fecha`, {
                      required: { value: true, message: "Fecha requerida" },
                    })}
                  />
                </td>
                <td className="pt-1 px-0.5">
                  <Proveedor
                    index={index}
                    /* borra */ disabled={onlyPrices} /* borra */
                  />
                </td>
                <td className="pt-1 px-0.5">
                  <InputXS
                    /* borra */
                    disabled={onlyPrices}
                    /* borra */
                    label="Precio"
                    no_label
                    type={"text"}
                    {...register(`precios.${index}.precio`, {
                      required: { value: true, message: "Precio requerido" },
                    })}
                  />
                </td>
                <td className="flex items-center justify-center h-full pt-1 px-0.5">
                  <label
                    htmlFor={`precios.${index}.default`}
                    className="relative inline-block h-8 w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
                  >
                    <input
                      /* borra */
                      disabled={onlyPrices}
                      /* borra */
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
                  <Button
                    variant={"danger_outline"}
                    /* borra */
                    disabled={onlyPrices}
                    /* borra */
                    text="Eliminar Precio"
                    size="xs"
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    {<TrashIcon className="w-4" />}
                  </Button>
                </td>
                {onlyPrices && (
                  <td className="pt-1 px-0.5">
                    <Button
                      rounded="rounded-full"
                      variant={"blue_outline"}
                      title="Seleccionar precio"
                      onClick={() => {
                        const selectedPrice = watch(`precios.${index}`);
                        handleChangePrice(selectedPrice);
                      }}
                    >
                      <CheckIcon className="w-4" />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          {errors.precios && errors.precios.length > 0 && (
            <tfoot className="text-sm text-red-500 h-8">
              <tr>
                <td></td>
                <td>
                  {errors.precios.some((item) => item.fecha) &&
                    errors.precios.filter((item) => item.fecha)[0]?.fecha
                      .message}
                </td>
                <td>
                  {errors.precios.some((item) => item.proveedor) &&
                    errors.precios.filter((item) => item.proveedor)[0]
                      ?.proveedor.message}
                </td>
                <td>
                  {errors.precios.some((item) => item.precio) &&
                    errors.precios.filter((item) => item.precio)[0]?.precio
                      .message}
                </td>
              </tr>
            </tfoot>
          )}
        </table>

        <div className="flex justify-center mt-4">
          {!onlyPrices && (
            <Button
              className={"min-w-40"}
              variant={"success"}
              title="Agregar Precio"
              size="xs"
              onClick={() => {
                append({
                  id: fields.length + 1,
                  fecha: "",
                  precio: "",
                  default: fields.length === 0,
                  usuario: user.nombre_usuario,
                });
              }}
            >
              Agregar Precio <PlusIcon className="w-4" />
            </Button>
          )}
        </div>
      </div>
    </fieldset>
  );
}
