import { CardToggle } from "../Cards";
import { useFormContext, useFieldArray } from "react-hook-form";
import Table from "../Generals/Table";
import { TrashIcon, PlusIcon } from "@heroicons/react/16/solid";
import { Button } from "../Buttons";
import { Select } from "../Inputs";
function DatosPagos() {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
    control,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "formaPago",
  });
  const cells = [
    { element: "#", w: "w-10" },
    { element: "Forma de Pago", w: "w-full", flex: "flex-1" },
    { element: "Metodo de Pago", w: "w-full", flex: "flex-1" },
    { element: <TrashIcon className="w-4.5" />, w: "w-10" },
  ];
  const formaPago = []
  const mediosPago = []
  return (
    <CardToggle title={"Formas y metodos de pago"}>
      <Table cells={cells}>
        {fields.map((item, index) => (
          <tr key={index} className={`flex px-6 py-2 text-sm text-neutral-700 text-left `}>
            <th className="px-1 w-10 flex-none">
              {index + 1}
            </th>
            <td className="px-1 w-full flex-1">
              <Select
                placeholder={"Seleccione una formas de pago"}
                {...register(`formaPago.${index}.forma_pago`, {
                  required: true,
                })}
              >
                {formaPago.map((item) => (
                  <option key={item["descripcion"]} value={item["descripcion"]}>
                    {item["descripcion"]}
                  </option>
                ))}
              </Select>
            </td>
            <td className="px-1 w-full flex-1">
              {watch(`formaPago.${index}.forma_pago`) === "Unidad usada" ? (
                <Input
                  type={"text"}
                  placeholder={"Describa la unidad usada"}
                  {...register(`formaPago.${index}.unidad_usada`, {
                    required: true,
                  })}
                />
              ) : (
                <Select
                  placeholder={"Metodo de Pago"}
                  {...register(`formaPago.${index}.metodo_pago`, {
                    required: true,
                  })}
                >
                  {mediosPago.map((item) => (
                    <option
                      key={item["descripcion"]}
                      value={item["descripcion"]}
                    >
                      {item["descripcion"]}
                    </option>
                  ))}
                </Select>
              )}
            </td>
            <td className="px-1 w-10 flex-none">
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
      <div className="text-center mt-3">
        <Button
          className={"min-w-40"}
          icon={<PlusIcon className="w-4" />}
          variant={"success"}
          text="Agregar Etapa"
          onClick={() =>
            append({
              forma_pago: watch("selectFormaPago"),
            })
          }
        >
          <PlusIcon width={"20px"} />
        </Button>
      </div>
    </CardToggle>
  );
}
export default DatosPagos;
