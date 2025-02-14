import { useFormContext, useFieldArray } from "react-hook-form";
import { CardToggle } from "../Cards";
import { Label, Input, TextInvalidate } from "../Inputs";
import { Button } from "../Buttons";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
function EtapasOportunidad() {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    watch,
    control,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "etapas",
  });

  return (
    <CardToggle title={"Etapas"} className={"mt-8"}>
      <Label label={"Nueva Etapa"} htmlFor={"addEtapa"} />
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y-2 divide-gray-400 text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="w-10 whitespace-nowrap p-0.5 font-medium text-gray-900 ">
                #
              </th>
              <th className="whitespace-nowrap p-0.5 font-medium text-gray-900">
                Etapas
              </th>
              <th className="w-10 whitespace-nowrap p-0.5 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((item, index) => (
              <tr key={`etapas.${index}.id_etapa`}>
                <th className="whitespace-nowrap p-0.5 text-gray-900">
                  {index + 1}
                </th>
                <td className="whitespace-nowrap p-0.5 text-gray-900">
                  <Input
                    type={"text"}
                    {...register(`etapas.${index}.etapa`, {
                      required: true,
                    })}
                  />
                </td>
                <td className="whitespace-nowrap p-0.5 font-medium text-gray-900">
                  <Button
                    icon={<TrashIcon className="w-4" />}
                    variant={"redOutline"}
                    hidden_text
                    text="Eliminar Etapa"
                    onClick={() => {
                      remove(index)
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <Button
            className={"min-w-40"}
            icon={<PlusIcon className="w-4" />}
            variant={"success"}
            text="Agregar Etapa"
            onClick={() => {
              append({ etapa: "", id_etapa:'' });
            }}
          />
        </div>
        {errors.etapas && (
          <TextInvalidate
            message={"Debe agregar un nuevo valor al atributo a cambiar"}
          />
        )}
      </div>
    </CardToggle>
  );
}

export default EtapasOportunidad;
