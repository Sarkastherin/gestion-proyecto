import Header from "../components/Header";
import { BoxComponent } from "../components/BoxComponent";
import {
  Label,
  Input,
  Textarea,
  InputGroup,
  TextInvalidate,
} from "../components/Inputs";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "../components/Buttons";
import {
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { CardToggle } from "../components/Cards";
import { Cliente } from "../components/Cliente";
import { Footer } from "../components/Footer";
export default function CrearOportunidad() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const onError = (errors) => console.error("Error:", errors);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "etapas",
  });
  return (
    <>
      <Header text={"Creando Oportunidad"} />
      <BoxComponent title="Creando Oportunidad">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <CardToggle title={"Datos de la Oportunidad"}>
            <div className="">
              <div className="md:columns-2">
                <div className="w-full">
                  <Label
                    label={"Nombre del proyecto"}
                    htmlFor={"nombreProyecto"}
                  />
                  <Input
                    className="mt-1"
                    {...register("nombreProyecto", {
                      required: {
                        value: true,
                        message: "Debe ingresar el nombre de la oportunidad",
                      },
                    })}
                    placeholder="Nombre del proyecto"
                  />
                  {errors.nombreProyecto && (
                    <TextInvalidate message={errors.nombreProyecto.message} />
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
              <div className="w-full mt-3">
                <Label label={"Alcance"} htmlFor={"alcance"} />
                <Textarea
                  className="mt-1"
                  {...register("alcance")}
                  placeholder="Alcance"
                />
              </div>
            </div>
          </CardToggle>
          <CardToggle title={"Etapas"} className={"mt-8"}>
            <Label label={"Nueva Etapa"} htmlFor={"addEtapa"} />
            <InputGroup
              {...register("addEtapa")}
              placeholder="Describa la etapa y agreguela en el botón ➕"
            >
              <Button
                variant="success"
                onClick={() => {
                  append({
                    etapa: watch("addEtapa"),
                  });
                  setValue("addEtapa", "");
                }}
              >
                <PlusIcon className="w-5" />
              </Button>
            </InputGroup>
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
                          variant="dangerOutline"
                          onClick={() => remove(index)}
                        >
                          <TrashIcon className="w-5" />
                        </Button>
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
            <Button
              className={"float-end w-35"}
              type="submit"
              variant="primary"
              title="Guardar Proyecto"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              Guardar
            </Button>
          </Footer>
        </form>
        </BoxComponent>
    </>
  );
}
