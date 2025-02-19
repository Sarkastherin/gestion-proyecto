import { useFormContext } from "react-hook-form";
import { CardToggle } from "../Cards";
import { Label, Input, TextInvalidate, Textarea } from "../Inputs";
import { Cliente } from "../Cliente";

function DatosOportunidad() {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  return (
    <CardToggle title={"Datos de la Oportunidad"}>
      <div className="md:columns-2">
        <div className="w-full">
          <Input
            label={"Nombre del proyecto"}
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
          <Cliente />
        </div>
      </div>
      <div className="w-full mt-2">
        <Textarea label={"Alcance"} {...register("alcance")} placeholder="Alcance" />
      </div>
    </CardToggle>
  );
}

export default DatosOportunidad;
