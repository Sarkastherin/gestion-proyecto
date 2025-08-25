import type { Route } from "../+types/conditions";
import { useForm, useFieldArray } from "react-hook-form";
import { useUI } from "~/context/UIContext";
import FooterForms from "~/templates/FooterForms";
import { TableDetailsQuotes, Cell } from "~/templates/TableDetailsQuotes";
import { Input } from "~/components/Forms/Inputs";
import { ButtonDeleteIcon } from "~/components/Specific/Buttons";
import { ButtonAdd } from "~/components/Specific/Buttons";
import { roundToPrecision } from "~/utils/functions";
import { useOutletContext } from "react-router";
import { updatesArrayFields } from "~/utils/updatesArraysFields";
import { useState, useEffect } from "react";
import { details_itemsApi } from "~/backend/cruds";
import { useFieldsChange } from "~/utils/fieldsChange";
import { useData } from "~/context/DataContext";
import { useUIModals } from "~/context/ModalsContext";
import type { DetailsItemsProps, DetailsItemsDB, DetailsMaterialsDB, DetailsMaterialsUI } from "~/types/opportunitiesType";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Oportunidad [Cotización]" },
    { name: "description", content: "Oportunidad [Cotización]" },
  ];
}
type DetailsItemsFormType = {
  items: Array<DetailsItemsDB | DetailsItemsProps>;
};
export default function Items() {
  const { selectedQuoteId, activeType } = useOutletContext<{
    selectedQuoteId: number | null;
    activeType: "materiales" | "mano de obra" | "subcontratos" | "otros" | "";
  }>();
  const [itemsToDelete, setItemsToDelete] = useState<
    Array<DetailsItemsDB["id"]>
  >([]);
  const { openModal } = useUIModals();
  const {
    selectedPhase,
    editByStatus,
    isModeEdit,
  } = useUI();
  const { selectedOpportunity } = useData();
  const {
    register,
    formState: { dirtyFields, isSubmitSuccessful, isDirty },
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm<DetailsItemsFormType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const onSubmit = async (formData: DetailsItemsFormType): Promise<void> => {
    if (!isDirty) {
      openModal("INFORMATION", {
        message: "No hay cambios para actualizar'"
      });
      return;
    }
    openModal("LOADING", {
      message: "Procesando requerimiento",
    });
    try {
      const { items: cleanedItems } = formData;
      
      const newData = await updatesArrayFields({
        fieldName: "items",
        fieldsArray: cleanedItems as DetailsItemsDB[],
        dirtyFields: dirtyFields as Record<
          string,
          Partial<Record<keyof DetailsItemsDB, boolean>>[]
        >,
        fieldsDelete: itemsToDelete,
        onInsert: details_itemsApi.insertOne,
        onRemove: (id: number) => details_itemsApi.remove({ id }),
        onUpdate: details_itemsApi.update,
      });
      const oldData = cleanedItems.filter(
        (item): item is DetailsItemsDB =>
          "id" in item && typeof item.id === "number"
      );
      reset({
        items: [...oldData, ...(Array.isArray(newData) ? newData : [])],
      });
      setItemsToDelete([]);
      openModal("SUCCESS", {
        message: "Se han guardado los datos",
      });
    } catch (e) {
      openModal("ERROR", {
        message: `No se pudo actualizar la oportunidad.`,
      });
    }
  };
  const handleAdd = () => {
    if (selectedPhase && selectedPhase > 0) {
      append({
        id_quote: selectedQuoteId, // Este valor se asignará al guardar la cotización
        id_phase: selectedPhase,
        type: activeType,
        item: "",
        quantity: 0,
        unit_cost: 0,
        notes: "",
        observations: "",
      } as DetailsItemsDB);
    }
  };
  const handleRemove = (index: number) => {
    const currentItems = watch("items");
    const item = currentItems[index];

    if (item && "id" in item && item.id !== undefined) {
      setItemsToDelete((prev) => [...prev, item.id]);
    }

    remove(index);
  };

  const { details_items } = selectedOpportunity || {};
  useEffect(() => {
    const details = details_items?.filter(
      (q) => q.id_quote === selectedQuoteId
    );
    if (details) reset({ items: details });
  }, [details_items, selectedQuoteId]);
  const columnsItems = [
    { groupColsClass: "w-[1%]", label: "#" },
    { groupColsClass: "", label: "Elemento cotizado" },
    { groupColsClass: "w-[10%]", label: "Cantidad" },
    { groupColsClass: "w-[10%]", label: "Costo unitario" },
    { groupColsClass: "w-[10%]", label: "Total" },
    { groupColsClass: "w-[1%]", label: "🗑️" },
  ];
  useFieldsChange({isSubmitSuccessful, isDirty})
  return (
    <>
      {selectedPhase && (
        <form
          className=" flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset disabled={!isModeEdit}>
            <div className="overflow-x-auto">
              <TableDetailsQuotes title="Tabla Items" columns={columnsItems}>
                {fields
                  .map((field, index) => ({ ...field, index }))
                  .filter(
                    (item) =>
                      item.type === activeType &&
                      item.id_phase === selectedPhase
                  )
                  .map(({ index, id }) => (
                    <tr
                      key={id}
                      className="*:text-zinc-900 *:first:font-medium dark:*:text-white"
                    >
                      <Cell>{index + 1}</Cell>
                      <Cell>
                        <Input
                          {...register(`items.${index}.item`)}
                          placeholder="Ítem"
                          disabled={!editByStatus}
                        />
                      </Cell>
                      <Cell>
                        <Input
                          type="number"
                          disabled={!editByStatus}
                          step={0.01}
                          {...register(`items.${index}.quantity`, {
                            valueAsNumber: true,
                          })}
                        />
                      </Cell>
                      <Cell>
                        <Input
                        disabled={!editByStatus}
                          type="number"
                          {...register(`items.${index}.unit_cost`, {
                            valueAsNumber: true,
                          })}
                        />
                      </Cell>
                      <Cell>
                        <Input
                          type="number"
                          placeholder="Total"
                          readOnly
                          value={
                            roundToPrecision(
                              watch(`items.${index}.quantity`) *
                                watch(`items.${index}.unit_cost`),
                              2
                            ) || 0
                          }
                        />
                      </Cell>
                      <Cell>
                        <ButtonDeleteIcon disabled={!editByStatus} onClick={() => handleRemove(index)} />
                      </Cell>
                    </tr>
                  ))}
              </TableDetailsQuotes>
              <ButtonAdd title="Agregar Item" disabled={!editByStatus} onClick={handleAdd} />
            </div>
          </fieldset>
          <FooterForms mode="view" />
        </form>
      )}
    </>
  );
}
