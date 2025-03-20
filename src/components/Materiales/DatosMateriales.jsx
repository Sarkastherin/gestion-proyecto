import { useFormContext, useFieldArray } from "react-hook-form";
import { CardToggle, Card } from "../Cards";
import { Input, TextInvalidate, Select } from "../Inputs";
import { DataField } from "../DataField";
import { useMateriales } from "../../context/Materiales/MaterialesContext";
import { useEffect } from "react";
import { Button } from "../Buttons";
import { PlusIcon } from "@heroicons/react/16/solid";
import Table from "../Generals/Table";
import { TrashIcon } from "@heroicons/react/16/solid";
import { Proveedor } from "../Proveedor";
import DatosPrecios from "./DatosPrecios";
export default function DatosMateriales({ isNuevo }) {
  const {
    materiales,
    listaMaterial,
    listaTipo,
  } = useMateriales();
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "precios",
  });
  useEffect(() => {
    if (isNuevo) {
      const codigo = `${watch("cod_material")}-${watch("cod_tipo")}-${watch(
        "espesor"
      )}-${watch("sequence")}`;
      const descripcion = `${watch("desc_tipo")}-${watch(
        "desc_material"
      )}-${watch("medida")}-${watch("espesor")}-${watch("norma")}-${watch(
        "tipo_union"
      )}-${watch("obs")}`;
      setValue("codigo", codigo);
      setValue("descripcion", descripcion);
    }
  }, [
    watch("cod_material"),
    watch("cod_tipo"),
    watch("espesor"),
    watch("desc_tipo"),
    watch("desc_material"),
    watch("medida"),
    watch("norma"),
    watch("tipo_union"),
    watch("obs"),
    watch("sequence"),
  ]);
  useEffect(() => {
    const id_material = watch("id_material");
    const id_tipo = watch("id_tipo");
    const espesor = watch("espesor");
    /* Evaluar si existe ya la secuencia */
    const hasSequenceCod = materiales.some(
      (material) =>
        material.id_material === id_material &&
        material.id_tipo === id_tipo &&
        material.espesor === espesor
    );
    if (hasSequenceCod) {
      const sequences = materiales.filter(
        (material) =>
          material.id_material === id_material &&
          material.id_tipo === id_tipo &&
          material.espesor === espesor
      );
      const sequence = Math.max(...sequences.map((item) => item.sequence)) + 1;
      setValue("sequence", sequence);
    } else {
      setValue("sequence", 1);
    }
  }, [watch("id_material"), watch("id_tipo"), watch("espesor")]);

  const cells = [
    { element: "#", w: "w-10" },
    { element: "Fecha", w: "w-50" },
    { element: "Proveedor", w: "w-full", flex: "flex-1" },
    { element: "Precio", w: "w-50" },
    { element: <TrashIcon className="w-4" />, w: "w-10" },
  ];
  return (
    <>
      {listaMaterial.length > 0 && listaTipo.length > 0 && (
        <>
          <div className="my-4">
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
          </div>
          <CardToggle title={"Especificaciones"}>
            <div className="md:columns-3 gap-2">
              <Select
                label={"Material"}
                {...register("id_material", {
                  required: { value: true },
                  valueAsNumber: true,
                  onChange: (e) => {
                    const value = e.target.value;
                    const desc = listaMaterial.find(
                      (item) => item.id === parseInt(value)
                    ).descripcion;
                    const cod = listaMaterial.find(
                      (item) => item.id === parseInt(value)
                    ).cod;
                    setValue("desc_material", desc);
                    setValue("cod_material", cod);
                  },
                })}
              >
                <option value="">Seleccione un material</option>
                {listaMaterial.map((material) => (
                  <option key={material.id} value={material.id}>
                    {`[${material.cod}] ${material.descripcion}`}
                  </option>
                ))}
              </Select>
              {errors.material && (
                <TextInvalidate message={errors.material.message} />
              )}
              <Select
                label={"Tipo"}
                {...register("id_tipo", {
                  required: true,
                  valueAsNumber: true,
                  onChange: (e) => {
                    const value = e.target.value;
                    const desc = listaTipo.find(
                      (item) => item.id === parseInt(value)
                    ).descripcion;
                    const cod = listaTipo.find(
                      (item) => item.id === parseInt(value)
                    ).cod;
                    setValue("desc_tipo", desc);
                    setValue("cod_tipo", cod);
                  },
                })}
              >
                <option value="">Seleccione un material</option>
                {listaTipo.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {`[${tipo.cod}] ${tipo.descripcion}`}
                  </option>
                ))}
              </Select>

              {errors.tipo && <TextInvalidate message={errors.tipo.message} />}
              <Input label={"Espesor"} {...register("espesor")} />
              {errors.espesor && (
                <TextInvalidate message={errors.espesor.message} />
              )}
            </div>
            <div className="md:columns-3 gap-2 mt-2">
              <Input label={"Norma"} {...register("norma")} />
              {errors.norma && (
                <TextInvalidate message={errors.norma.message} />
              )}

              <Input label={"Medida"} {...register("medida")} />
              {errors.medida && (
                <TextInvalidate message={errors.medida.message} />
              )}
              <Input label={"Tipo de union"} {...register("tipo_union")} />
              {errors.tipo_union && (
                <TextInvalidate message={errors.tipo_union.message} />
              )}
            </div>

            <Input
              className="mt-2"
              label={"Observacion"}
              {...register("obs")}
            />
            {errors.obs && <TextInvalidate message={errors.obs.message} />}
            <div className="flex sr-only">
              <Input
                className="mt-2"
                label={"Descripción"}
                disabled={true}
                {...register("descripcion", {
                  required: true,
                  validate: {
                    validateDescription: (value) => {
                      const desc = materiales.some(
                        (item) => item.descripcion === value
                      );
                      return !desc ? true : "La descripción ya existe";
                    },
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
          <DatosPrecios/>
          {/* <CardToggle className={"mt-4"} title={"Precios"}>
            <Table cells={cells}>
              {fields.map((item, index) => (
                <tr
                  key={`precios.${index}.id_precio`}
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
                  append();
                }}
              />
            </div>
          </CardToggle> */}
        </>
      )}
    </>
  );
}
