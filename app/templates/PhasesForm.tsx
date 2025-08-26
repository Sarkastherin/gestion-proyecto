import { Input } from "~/components/Forms/Inputs";
import { CardToggle } from "~/components/Generals/Cards";
import { useForm, useFieldArray } from "react-hook-form";
import { ButtonDeleteIcon, ButtonAdd } from "~/components/Specific/Buttons";
import { useUI } from "~/context/UIContext";
import { useEffect, useState } from "react";
import { updatesArrayFields } from "~/utils/updatesArraysFields";
import { useFieldsChange } from "~/utils/fieldsChange";
import { phasesApi } from "~/backend/cruds";
import FooterForms from "./FooterForms";
import type { PhasesDB, PhasesProps } from "~/types/opportunitiesType";
import { useUIModals } from "~/context/ModalsContext";
type PhasesFormType = {
  phases: Array<PhasesDB | PhasesProps>;
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [phasesToDelete, setPhasesToDelete] = useState<Array<PhasesDB["id"]>>(
    []
  );
  const { editByStatus } = useUI();
  const { openModal } = useUIModals();
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
      openModal("INFORMATION", {
        title: "Formulario sin cambios",
        message: "No hay cambios para actualizar'",
      });
      return;
    }
    openModal("LOADING");
    {
      try {
        const { phases } = data;
        const newData = await updatesArrayFields({
          fieldName: "phases",
          fieldsArray: phases,
          dirtyFields: dirtyFields as Record<
            string,
            Partial<Record<keyof PhasesDB, boolean>>[]
          >,
          fieldsDelete: phasesToDelete,
          onInsert: phasesApi.insertOne,
          onRemove: (id: number) => phasesApi.remove({ id }),
          onUpdate: phasesApi.update,
        });
        openModal("SUCCESS", {
          message: `Se ha actualizado la oportunidad`,
        });
        const oldData = phases.filter(
          (item): item is PhasesDB =>
            "id" in item && typeof item.id === "number"
        );
        reset({
          phases: [...oldData, ...(Array.isArray(newData) ? newData : [])],
        });
        setPhasesToDelete([]);
      } catch (e) {
        openModal("ERROR", {
          message: `No se pudo actualizar la oportunidad. Error: ${String(e)}`,
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
  useFieldsChange({ isSubmitSuccessful, isDirty });
  return (
    <>
      <form className=" flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={!isEditMode}>
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
                        <ButtonDeleteIcon
                          onClick={() => handleRemove(index)}
                          disabled={!editByStatus}
                        />
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
        <FooterForms
          isNew={false}
          isEditMode={isEditMode}
          onToggleEdit={() => setIsEditMode((prev) => !prev)}
        />
      </form>
    </>
  );
}
