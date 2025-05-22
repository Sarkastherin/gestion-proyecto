import { useFormContext } from "react-hook-form";
import { CardToggle } from "../Cards";
import { Input, TextInvalidate, Textarea, Select } from "../Generals/Inputs";
import { Cliente } from "../Cliente";
import { useOportunidad } from "../../context/Oportunidades/OportunidadContext";

function DatosOportunidad() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { activeOportunidad } = useOportunidad();
  const { id_cotizacion } = activeOportunidad;
  return (
    <CardToggle title={"Datos de la Oportunidad"}>
      <fieldset disabled={watch("status_cotizacion") === "Cerrada"}>
        <div className="w-full mt-2 flex gap-2">
          <div className="w-full">
            <Input
              label={"Nombre del proyecto"}
              {...register("nombre", {
                required: {
                  value: true,
                  message: "Debe ingresar el nombre de la oportunidad",
                },
              })}
              placeholder="Nombre del proyecto"
            />
            {errors.nombre && (
              <TextInvalidate message={errors.nombre.message} />
            )}
          </div>
          <div className="w-full">
            <Cliente />
          </div>
        </div>
        <div className="w-full mt-2">
          <Textarea
            label={"Alcance"}
            {...register("alcance")}
            placeholder="Alcance"
          />
        </div>
      </fieldset>
      <div className="w-full mt-2 flex gap-2">
        <Select
          className="basis-1/3"
          label="Status"
          {...register("status", {
            required: {
              value: true,
              message: "Seleccione un status",
            },
            onChange: (e) => {
              if (id_cotizacion) {
                const cerrada = ["Desestimada", "Enviada", "Ganada", "Perdida"];
                const value = e.target.value;
                const isClose = cerrada
                  .map((item) => item.includes(value))
                  .some((item) => item === true);
                if (isClose) {
                  setValue("status_cotizacion", "Cerrada", {
                    shouldDirty: true,
                  });
                } else {
                  setValue("status_cotizacion", "Abierta", {
                    shouldDirty: true,
                  });
                }
              }
            },
          })}
        >
          <option className="bg-blue-300/50" value={"Nuevo"}>
            🆕 Nuevo{" "}
          </option>
          <option className="bg-gray-400/50" value={"Desestimada"}>
            🗑️ Desestimada
          </option>
          <option className="bg-amber-300/50" value={"En proceso"}>
            ⏳ En proceso
          </option>
          <option className="bg-indigo-300/50" value={"Enviada"}>
            📧 Enviada
          </option>
          <option className="bg-orange-300/50" value={"Revisión"}>
            ⚠️ Revisión
          </option>
          <option className="bg-green-300/50" value={"Ganada"}>
            ✅ Ganada
          </option>
          <option className="bg-red-300/50" value={"Perdida"}>
            ❌ Perdida
          </option>
        </Select>
        {watch("status") === "Perdida" && (
          <div className="basis-2/3">
            <Textarea
              label={"Razón de Perdida"}
              {...register("razon_perdida", {
                required: {
                  value: true,
                  message: "Debe ingresar la razón de perdida",
                },
              })}
              placeholder="Razón de Perdida"
            />
            {errors.razon_perdida && (
              <TextInvalidate message={errors.razon_perdida.message} />
            )}
          </div>
        )}
      </div>
    </CardToggle>
  );
}

export default DatosOportunidad;
