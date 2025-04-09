import { Item } from "./Item";
import { Select } from "../Generals/Inputs";
import { Button } from "../Buttons";
import {
  PlusIcon,
  ChevronDoubleDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import Badge from "../Generals/Badge";

export const Seccion = ({ etapas }) => {
  const { register, control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "secciones",
  });

  // Estado para manejar la apertura/cierre de cada sección
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    if (fields.length === 0) {
      append({ id_etapa: 1, tipo: '',items:[] }, { shouldFocus: false });
    }
  }, [fields, append]);

  // Función para manejar la apertura de cada tarjeta individualmente
  const handleToggleCard = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index], // Alterna el estado de la sección específica
    }));
  };
  return (
    <>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="rounded-lg border border-neutral-400/70 shadow-sm bg-white overflow-hidden mb-4"
        >
          {/* Encabezado de la Sección */}
          <div
            className="flex justify-between items-center gap-2 font-medium cursor-pointer px-5 py-2 text-sm bg-neutral-300 hover:bg-indigo-500/30 hover:text-white"
            onClick={() => handleToggleCard(index)}
          >
            <div className="flex items-center gap-2">
              <ChevronDoubleDownIcon className="w-5" />
              <Badge
                variant={"yellow"}
              >{`Etapa: ${watch(`secciones.${index}.id_etapa`)}`}</Badge>{" "}
              <Badge
                variant={"purple"}
              >{watch(`secciones.${index}.tipo`)}</Badge>
            </div>
            <Button
              text="Eliminar Sección"
              icon={<TrashIcon className="w-5" />}
              hidden_text
              variant="red"
              onClick={(e) => {
                e.stopPropagation();
                remove(index);
              }}
            />
          </div>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openSections[index] ? "max-h-0" : "max-h-full"
            }`}
          >
            <div className="flex justify-start items-center gap-2 p-5 bg-indigo-100/80 border-b border-indigo-200">
              <Select
                label="Etapa"
                placeholder="Seleccione una Etapa"

                {...register(`secciones.${index}.id_etapa`,{valueAsNumber:true})}
              >
                {etapas.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </Select>
              <Select
                label="Tipo de Cotización"
                placeholder="Tipo de Cotización"
                {...register(`secciones.${index}.tipo`,{required:true})}
                disabled={!!watch(`secciones.${index}.tipo`)}
              >
                <option value="Materiales">Materiales</option>
                <option value="Mano de Obra">Mano de Obra</option>
                <option value="Subcontratos">Subcontratos</option>
                <option value="Otros">Otros</option>
              </Select>
            </div>
            <Item
              tipo={watch(`secciones.${index}.tipo`)}
              seccionIndex={index}
            />
          </div>
        </div>
      ))}

      <div className="mt-4">
        <Button
          text={"Agregar Sección"}
          icon={<PlusIcon className="w-4" />}
          variant={"primaryOutline"}
          onClick={() => {
            append({ id_etapa: '', tipo: '',items:[] });
          }}
        />
      </div>
    </>
  );
};
