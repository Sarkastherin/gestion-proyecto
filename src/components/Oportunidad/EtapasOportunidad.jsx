import { useFormContext, useFieldArray } from "react-hook-form";
import { CardToggle } from "../Cards";
import { Input, TextInvalidate } from "../Generals/Inputs";
import { Button } from "../Buttons";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Table from "../Generals/Table";
function EtapasOportunidad() {
  const {
    register,
    watch,
    formState: { errors },
    control,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "etapas",
  });
  const cells = [
    { element: "#", w: "w-10" },
    { element: "Etapas", w: "w-full", flex: 'flex-1' },
    { element: <TrashIcon className="w-4" />, w: "w-10" }
  ];
  return (
    <CardToggle title={"Etapas"}>
      <Table cells={cells}>
        {fields.map((item, index) => (
          <tr key={`etapas.${index}.id_etapa`} className="flex px-6 py-2 text-sm text-neutral-700 text-left items-center"
          >
            <th className="px-1 w-10">
              {index + 1}
            </th>
            <td className="px-1 w-full">
              <Input
                label="etapa"
                no_label
                type={"text"}
                {...register(`etapas.${index}.nombre`, {
                  required: true,
                })}
              />
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
            text="Agregar Etapa"
            onClick={() => {
              const ids = watch("etapas").map(item => item.id);
              const id = ids.length > 0 ? Math.max(...ids) + 1 : 1;
              append({ id: id, nombre:"" });
            }}
          />
        </div>
        {errors.etapas && (
          <TextInvalidate
            message={"Debe agregar un nuevo valor al atributo a cambiar"}
          />
        )}
    </CardToggle>
  );
}

export default EtapasOportunidad;
