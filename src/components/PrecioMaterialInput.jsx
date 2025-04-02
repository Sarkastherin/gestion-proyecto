import { TextInvalidate } from "./Generals/Inputs";
import { Modal } from "./Modal";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { CurrencyTypeInput } from "./Generals/Inputs";
import { Button } from "./Buttons";
export const PrecioMaterialInput = ({
  seccionIndex,
  index,
  selectMaterial,
  handleCostoTotalItem,
}) => {
  const [hiddePrices, setHiddePrices] = useState(true);
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  //useEffect(() => {}, [selectMaterial[index], setValue]);

  const handleSetPrecio = (e, item) => {
    setValue(
      `secciones.${seccionIndex}.items.${index}.costo_unitario`,
      item.precio
    );
    setHiddePrices(true);
    handleCostoTotalItem(item.precio, index);
  };
  return (
    <>
      <div className="flex gap-2 relative">
        <span onClick={() => setHiddePrices(false)}>
          <CurrencyTypeInput
            readOnly={true}
            value={
              watch(
                `secciones.${seccionIndex}.items.${index}.costo_unitario`
              ) || "0"
            }
            onValueChange={(value) => handleCostoTotalItem(value, index)}
          />
        </span>
        <div
          className={`absolute top-11 w-[300px] rounded-md border border-neutral-300 bg-neutral-100 py-3 px-2  ${
            hiddePrices ? "sr-only" : ""
          }`}
        >
          <ul className="overflow-y-auto h-50">
            <>
              {selectMaterial[index]?.precios.length > 0 ? (
                <>
                  {selectMaterial[index]?.precios?.map((item, index) => (
                    <li
                      key={`${item.precio}-${index}`}
                      className="mb-1 cursor-pointer hover:text-indigo-600"
                    >
                      <div
                        aria-label="precio"
                        id={item.precio}
                        className="flex gap-1 items-center"
                        onClick={(e) => {
                          handleSetPrecio(e, item);
                        }}
                      >
                        <span className="w-auto rounded-sm border-gray-300 shadow-xs text-sm border px-2 py-1 bg-indigo-50">
                          {item.precio}
                        </span>
                        <span className="w-full truncate rounded-sm border-gray-300 shadow-xs text-sm border px-2 py-1 bg-indigo-50">
                          {item.proveedor}
                        </span>
                      </div>
                    </li>
                  ))}
                </>
              ) : (<p>No hay precios</p>)}
              
            </>
          </ul>
          <div className="absolute bottom-0 right-0 pe-4 pb-2">
              <button className="rounded-full border p-0.5"><PlusIcon className="w-5" /></button>
                
              </div>
        </div>
      </div>
      {errors.proveedor && (
        <TextInvalidate message={errors.proveedor.message} />
      )}
      {/* <Modal
        modalId="modalPrecio"
        title={"Seleccionar precio"}
        variant="primary"
        icon={<UserGroupIcon width={"24px"} />}
      >
        <div className="mt-4">
          <Table cells={cells}>
            {fields.map((item, index) => (
              <tr
                key={`precios.${index}.id`}
                className="flex px-6 py-2 text-sm text-neutral-700 text-left items-center"
              >
                <th className="px-1 w-10">{index + 1}</th>
                <td className="px-1 w-50">
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
                <td className="px-1 w-50">
                  <Input
                    label="Precio"
                    no_label
                    type={"text"}
                    {...register(`precios.${index}.precio`, {
                      required: true,
                    })}
                  />
                </td>
                <td className="px-1 w-30">
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
                <td className="px-1 w-10 font-medium">
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
              </tr>
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
        </div>
      </Modal> */}
    </>
  );
};
