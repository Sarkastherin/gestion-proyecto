import { Input } from "~/components/Forms/Inputs";
import { CardToggle } from "~/components/Generals/Cards";
import { useForm, useFieldArray } from "react-hook-form";
import { ButtonDeleteIcon, ButtonAdd } from "~/components/Specific/Buttons";
import { useUI } from "~/context/UIContext";
import ModalClientes from "~/components/Specific/ModalClientes";
import { useEffect, useState } from "react";
import { updatesArrayFields } from "~/utils/updatesArraysFields";
import { useFieldsChange } from "~/utils/fieldsChange";
import {
  phasesApi,
  type PhasesInput,
  type PhasesType,
} from "~/backend/dataBase";
import FooterForms from "./FooterForms";
type PhasesFormType = {
  phases: Array<PhasesType | PhasesInput>;
};
export default function PhasesForm({
  defaultValues,
  idOpportunity,
  mode,
}: {
  defaultValues: PhasesFormType;
  idOpportunity: number;
  mode: "create" | "view";
}) {
  const [phasesToDelete, setPhasesToDelete] = useState<Array<PhasesType["id"]>>(
    []
  );
  const {
    showModal,
    isModeEdit,
    editByStatus
  } = useUI();
  const {
    register,
    formState: { errors, dirtyFields, isSubmitSuccessful, isDirty },
    control,
    handleSubmit,
    reset,
  } = useForm<PhasesFormType>({
    defaultValues: defaultValues ?? { phases: [] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phases",
  });

  const onSubmit = async (data: PhasesFormType) => {
    if (!isDirty) {
      showModal({
        title: "Formulario sin cambios",
        message: "No hay cambios para actualizar'",
        variant: "information",
      });
      return;
    }
    showModal({
      title: "⌛ Procesando...",
      message: `Procesando requerimiento`,
    });
    {
      try {
        const { phases } = data;
        const newData = await updatesArrayFields({
          fieldName: "phases",
          fieldsArray: phases,
          dirtyFields: dirtyFields as Record<
            string,
            Partial<Record<keyof PhasesType, boolean>>[]
          >,
          fieldsDelete: phasesToDelete,
          onInsert: phasesApi.insertOne,
          onRemove: (id: number) => phasesApi.remove({ id }),
          onUpdate: phasesApi.update,
        });
        showModal({
          title: "Actualizado con exito",
          message: `Se ha actualizado la oportunidad`,
          variant: "success",
        });
        const oldData = phases.filter(
          (item): item is PhasesType =>
            "id" in item && typeof item.id === "number"
        );
        reset({
          phases: [...oldData, ...(Array.isArray(newData) ? newData : [])],
        });
        setPhasesToDelete([]);
      } catch (e) {
        showModal({
          title: "Error al actualizar",
          message: `No se pudo actualizar la oportunidad. Error:`,
          code: String(e),
          variant: "error",
        });
      }
    }
  };
  const handleAddPhase = () => {
    append({
      id_opportunity: idOpportunity ?? null,
      name: "",
    });
  };
  const handleRemove = (index: number) => {
    const phasesIndex = defaultValues.phases[index];
    remove(index);
    if (phasesIndex && "id" in phasesIndex && phasesIndex.id !== undefined) {
      setPhasesToDelete((prev) => [...prev, phasesIndex.id as number]);
    }
  };
  useFieldsChange({isSubmitSuccessful, isDirty})
  return (
    <>
      <form className=" flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={!isModeEdit}>
          <CardToggle title="Etapas">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto divide-y-2 divide-zinc-200 dark:divide-zinc-700">
                <colgroup>
                  <col className="w-[1%]" />
                  <col />
                  <col className="w-[1%]" />
                </colgroup>

                <thead className="ltr:text-left rtl:text-right">
                  <tr className="*:font-medium *:text-zinc-900 dark:*:text-white">
                    <th className="px-3 py-2 whitespace-nowrap">#</th>
                    <th className="px-3 py-2 whitespace-nowrap">Etapas</th>
                    <th className="px-3 py-2 whitespace-nowrap">🗑️</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {fields.map((item, index) => (
                    <tr
                      key={item.id ?? index}
                      className="*:text-zinc-900 *:first:font-medium dark:*:text-white"
                    >
                      <td className="px-3 py-2 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <Input
                          placeholder="Nombre de la etapa"
                          disabled={!editByStatus}
                          {...register(`phases.${index}.name`, {
                            required: "Campo requerido",
                          })}
                          error={
                            errors.phases && errors.phases[index]?.name?.message
                          }
                        />
                      </td>

                      <td className="px-3 py-2 whitespace-nowrap">
                        <ButtonDeleteIcon onClick={() => handleRemove(index)} disabled={!editByStatus}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4">
                <ButtonAdd
                  aria-label="Agregar nueva etapa"
                  onClick={handleAddPhase}
                  disabled={!editByStatus}
                />
              </div>
            </div>
          </CardToggle>
        </fieldset>
        <FooterForms mode={mode} />
      </form>
      <ModalClientes />
    </>
  );
}
