import { CardToggle } from "../../components/Cards";
import { Label, Input, Textarea, InputGroup } from "../../components/Inputs";
import { Cliente } from "../../components/Cliente";
import { Button } from "../../components/Buttons";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Footer } from "../../components/Footer";
import { useFieldArray } from "react-hook-form";
import { useState } from "react";
export function FormOportunidad({
  register,
  handleSubmit,
  errors,
  watch,
  setValue,
  onSubmit,
  onError,
  control,
  isDisabled,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "etapas",
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <fieldset disabled={isDisabled}>
        <CardToggle title={"Datos de la Oportunidad"}>
          <div className="md:columns-2">
            <div className="w-full">
              <Label
                label={"Nombre del proyecto"}
                htmlFor={"nombre_oportunidad"}
              />
              <Input
                {...register("nombre_oportunidad", {
                  required: {
                    value: true,
                    message: "Debe ingresar el nombre de la oportunidad",
                  },
                })}
                placeholder="Nombre del proyecto"
              />
              {errors.nombre_oportunidad && (
                <TextInvalidate message={errors.nombre_oportunidad.message} />
              )}
            </div>
            <div className="w-full sm:mt-1.5">
              <Cliente
                register={register}
                setValue={setValue}
                errors={errors}
              />
            </div>
          </div>
          <div className="w-full mt-2">
            <Label label={"Alcance"} htmlFor={"alcance"} />
            <Textarea {...register("alcance")} placeholder="Alcance" />
          </div>
        </CardToggle>
        <CardToggle title={"Etapas"} className={"mt-8"}>
          <Label label={"Nueva Etapa"} htmlFor={"addEtapa"} />
          <div className="flex gap-2">
            <Input
              {...register("addEtapa")}
              placeholder="Describa la etapa y agreguela en el botón ➕"
            />
            <Button
              name={"Agregar Etapa"}
              icon={<PlusIcon className="w-4" />}
              variant={"success"}
              hidden_name
              title="Agregar Etapa"
              onClick={() => {
                console.log("handle");
                append({
                  etapa: watch("addEtapa"),
                });
                setValue("addEtapa", "");
              }}
            />
          </div>
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
              <tbody className="">
                {fields.map((item, index) => (
                  <tr key={index}>
                    <th className="whitespace-nowrap p-0.5 text-gray-900">
                      {index + 1}
                    </th>
                    <td className="whitespace-nowrap p-0.5 text-gray-900">
                      <Input
                        type={"text"}
                        readOnly={true}
                        {...register(`etapas.${index}.etapa`, {
                          required: true,
                        })}
                      />
                    </td>
                    <td className="whitespace-nowrap p-0.5 font-medium text-gray-900">
                      <Button
                        name={"Eliminar Etapa"}
                        icon={<TrashIcon className="w-5" />}
                        variant={"dangerOutline"}
                        hidden_name
                        title="Eliminar Etapa"
                        onClick={() => remove(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {errors.formaPago && (
              <TextInvalidate
                message={"Debe agregar un nuevo valor al atributo a cambiar"}
              />
            )}
          </div>
        </CardToggle>
        <Footer>
          <div className="flex gap-2 justify-end">
            
            <Button
              className={"min-w-40"}
              type="submit"
              variant="primary"
              title="Guardar Etapa"
              name="Guardar"
              onSubmit={handleSubmit(onSubmit, onError)}
            />
          </div>
        </Footer>
      </fieldset>
    </form>
  );
}
