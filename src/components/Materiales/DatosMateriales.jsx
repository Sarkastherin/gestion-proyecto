import { useFormContext } from "react-hook-form";
import { CardToggle, Card } from "../Cards";
import { Input, TextInvalidate, Select } from "../Generals/Inputs";
import { DataField } from "../DataField";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
export default function DatosMateriales({ isNuevo }) {
  const { user } = useAuth();
  const {
    materiales,
    listaMaterial,
    listaTipo,
    listaEspesor,
    listaNorma,
    listaMedida,
    listaUnion,
    listaCaracteristica,
    listaUnidades,
  } = useMateriales();
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext();
  useEffect(() => {
    if (isNuevo) {
      const codigo = `${watch("cod_material")}-${watch("cod_tipo")}-${
        watch("espesor") === null ? "" : watch("espesor")
      }-${watch("sequence")}`;
      const descripcion = `${watch("tipo")}-${watch("material")}-${
        watch("medida") === null ? "" : watch("medida")
      }-${watch("espesor") === null ? "" : watch("espesor")}-${
        watch("norma") === null ? "" : watch("norma")
      }-${watch("tipo_union") === null ? "" : watch("tipo_union")}-${
        watch("caracteristica") === null ? "" : watch("caracteristica")
      }`;
      setValue("codigo", codigo);
      setValue("descripcion", descripcion);
      setValue("usuario", user.nombre_usuario);
    }
  }, [
    watch("cod_material"),
    watch("cod_tipo"),
    watch("espesor"),
    watch("tipo"),
    watch("material"),
    watch("medida"),
    watch("norma"),
    watch("tipo_union"),
    watch("caracteristica"),
    watch("sequence"),
  ]);
  useEffect(() => {
    if (isNuevo) {
      const sequences = materiales.map((item) => item.sequence);
      const sequence = Math.max(...sequences) + 1;
      setValue("sequence", sequence);
    }
  }, [watch("material"), watch("tipo"), watch("espesor")]);
  return (
    <>
      {listaMaterial.length > 0 &&
        listaTipo.length > 0 &&
        listaEspesor.length > 0 &&
        listaNorma.length > 0 &&
        listaMedida.length > 0 &&
        listaUnion.length > 0 &&
        listaCaracteristica.length > 0 &&
        listaUnidades.length > 0 && (
          <>
            <Card>
              <div className="flex flex-col gap-4">
                <DataField label={"Código"} value={watch("codigo")} />
                <div>
                  <DataField
                    label={"Descripción"}
                    value={watch("descripcion")}
                  />
                  {errors.descripcion && (
                    <TextInvalidate message={errors.descripcion.message} />
                  )}
                </div>
              </div>
            </Card>

            <CardToggle title={"Especificaciones"}>
              <fieldset>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="">
                    <Select
                      label={"Material"}
                      placeholder={"Seleccione un Material"}
                      disabled={!isNuevo}
                      {...register("material", {
                        required: { value: true },
                        onChange: (e) => {
                          const value = e.target.value;
                          const cod = listaMaterial.find(
                            (item) => item.descripcion === value
                          ).cod;
                          setValue("cod_material", cod);
                        },
                      })}
                    >
                      {listaMaterial.map((material) => (
                        <option key={material.id} value={material.descripcion}>
                          {`[${material.cod}] ${material.descripcion}`}
                        </option>
                      ))}
                    </Select>
                    {errors.material && (
                      <TextInvalidate message={"Campo requerido"} />
                    )}
                  </div>
                  <div className="">
                    <Select
                      label={"Tipo"}
                      placeholder={"Seleccione un Tipo"}
                      disabled={!isNuevo}
                      {...register("tipo", {
                        required: true,
                        onChange: (e) => {
                          const value = e.target.value;
                          const cod = listaTipo.find(
                            (item) => item.descripcion === value
                          ).cod;
                          setValue("cod_tipo", cod);
                        },
                      })}
                    >
                      {listaTipo.map((tipo) => (
                        <option key={tipo.id} value={tipo.descripcion}>
                          {`[${tipo.cod}] ${tipo.descripcion}`}
                        </option>
                      ))}
                    </Select>

                    {errors.tipo && (
                      <TextInvalidate message={"Campo requerido"} />
                    )}
                  </div>
                  <div className="">
                    <Select
                      label={"Unidad"}
                      placeholder={"Seleccione la unidad"}
                      {...register("unidad")}
                    >
                      {listaUnidades.map((unidad) => (
                        <option key={unidad.id} value={unidad.abreviatura}>
                          {`[${unidad.abreviatura}] ${unidad.descripcion}`}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="">
                    <Select
                      label={"Espesor"}
                      placeholder={"Seleccione un Espesor"}
                      disabled={!isNuevo}
                      {...register("espesor")}
                    >
                      {listaEspesor.map((tipo) => (
                        <option key={tipo.id} value={tipo.descripcion}>
                          {tipo.descripcion}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="">
                    <Select
                      label={"Norma"}
                      placeholder={"Seleccione la norma o calidad"}
                      disabled={!isNuevo}
                      {...register("norma")}
                    >
                      {listaNorma.map((tipo) => (
                        <option key={tipo.id} value={tipo.descripcion}>
                          {tipo.descripcion}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="">
                    <Select
                      label={"Medida"}
                      placeholder={"Seleccione la medida"}
                      disabled={!isNuevo}
                      {...register("medida")}
                    >
                      {listaMedida.map((tipo) => (
                        <option key={tipo.id} value={tipo.descripcion}>
                          {tipo.descripcion}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="">
                    <Select
                      label={"Tipo de union"}
                      placeholder={"Seleccione el tipo de unión"}
                      disabled={!isNuevo}
                      {...register("tipo_union")}
                    >
                      {listaUnion.map((tipo) => (
                        <option key={tipo.id} value={tipo.descripcion}>
                          {tipo.descripcion}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="">
                    <Select
                      label={"Característica especial"}
                      placeholder={"Seleccione una característica"}
                      disabled={!isNuevo}
                      {...register("caracteristica")}
                    >
                      {listaCaracteristica.map((tipo) => (
                        <option key={tipo.id} value={tipo.descripcion}>
                          {tipo.descripcion}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="">
                    <Input
                      type="number"
                      label="Peso"
                      placeholder="Kg"
                      defaultValue={0}
                      {...register("peso")}
                    />
                  </div>
                </div>
              </fieldset>
              <div className="flex sr-only">
                <Input
                  className="mt-2"
                  label={"Descripción"}
                  disabled={true}
                  {...register("descripcion", {
                    required: true,
                    validate: {
                      validateDescription: (value) => {
                        if (isNuevo) {
                          const desc = materiales.some(
                            (item) => item.descripcion === value
                          );
                          return !desc ? true : "La descripción ya existe";
                        }
                      } /*  */,
                    },
                  })}
                />

                <Input
                  className="mt-2"
                  label={"Código"}
                  disabled={true}
                  {...register("codigo")}
                />
              </div>
            </CardToggle>
          </>
        )}
    </>
  );
}
