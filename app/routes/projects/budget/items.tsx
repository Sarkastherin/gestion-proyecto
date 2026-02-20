import type { Route } from "../../+types/home";
import { useForm, useFieldArray } from "react-hook-form";
import { useUI } from "~/context/UIContext";
import FooterForms from "~/templates/FooterForms";
import { TableDetailsQuotes, Cell } from "~/components/QuotesAndBudgets/TableDetailsQuotes";
import { Input } from "~/components/Forms/Inputs";
import { ButtonDeleteIcon } from "~/components/Specific/Buttons";
import { ButtonAdd } from "~/components/Specific/Buttons";
import { roundToPrecision } from "~/utils/functions";
import { updatesArrayFields } from "~/utils/updatesArraysFields";
import { useState, useEffect } from "react";
import { budgetItemsApi } from "~/backend/cruds";
import { useFieldsChange } from "~/utils/fieldsChange";
import { useData } from "~/context/DataContext";
import { useUIModals } from "~/context/ModalsContext";
import type { BudgetItemProps, BudgetItemDB } from "~/types/projectsType";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Proyecto [Presupuesto]" },
    { name: "description", content: "Proyecto [Presupuesto]" },
  ];
}
type DetailsItemsFormType = {
  items: Array<BudgetItemDB | BudgetItemProps>;
};
export default function Items() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<
    Array<BudgetItemDB["id"]>
  >([]);
  const { openModal } = useUIModals();
  const { propsQuoteAndBudget, editByStatus } = useUI();
  const { selectedProject } = useData();
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
        message: "No hay cambios para actualizar'",
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
        fieldsArray: cleanedItems as BudgetItemDB[],
        dirtyFields: dirtyFields as Record<
          string,
          Partial<Record<keyof BudgetItemDB, boolean>>[]
        >,
        fieldsDelete: itemsToDelete,
        onInsert: budgetItemsApi.insertOne,
        onRemove: (id: number) => budgetItemsApi.remove({ id }),
        onUpdate: budgetItemsApi.update,
      });
      const oldData = cleanedItems.filter(
        (item): item is BudgetItemDB =>
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
    if (propsQuoteAndBudget && propsQuoteAndBudget.selsectedPhase > 0) {
      append({
        id_project: selectedProject?.id, // Este valor se asignará al guardar la cotización
        id_phase: propsQuoteAndBudget.selsectedPhase,
        type: propsQuoteAndBudget.activeType,
        item: "",
        quantity: 0,
        unit_cost: 0,
        notes: "",
        observations: "",
      } as BudgetItemDB);
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

  const { budget_details_items } = selectedProject || {};
  useEffect(() => {
    if (budget_details_items) reset({ items: budget_details_items });
  }, [budget_details_items]);
  const columnsItems = [
    { groupColsClass: "w-[1%]", label: "#" },
    { groupColsClass: "", label: "Elemento cotizado" },
    { groupColsClass: "w-[10%]", label: "Cantidad" },
    { groupColsClass: "w-[10%]", label: "Costo unitario" },
    { groupColsClass: "w-[10%]", label: "Total" },
    { groupColsClass: "w-[1%]", label: "🗑️" },
  ];
  useFieldsChange({ isSubmitSuccessful, isDirty });
  return (
    <>
      {propsQuoteAndBudget?.selsectedPhase && (
        <TableDetailsQuotes
          title="Tabla Items"
          columns={columnsItems}
          handleSubmit={handleSubmit(onSubmit)}
          isEditMode={isEditMode}
          addElement={
            <ButtonAdd
              disabled={!isEditMode}
              title="Agregar Item"
              onClick={handleAdd}
            />
          }
          footerElement={
            <FooterForms
              isNew={false}
              isEditMode={isEditMode}
              onToggleEdit={() => setIsEditMode((prev) => !prev)}
            />
          }
        >
          {fields
            .map((field, index) => ({ ...field, index }))
            .filter(
              (item) =>
                item.type === propsQuoteAndBudget.activeType &&
                item.id_phase === propsQuoteAndBudget.selsectedPhase
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
                    disabled={false}
                  />
                </Cell>
                <Cell>
                  <Input
                    type="number"
                    disabled={false}
                    step={0.01}
                    {...register(`items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                  />
                </Cell>
                <Cell>
                  <Input
                    disabled={false}
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
                  <ButtonDeleteIcon
                    disabled={false}
                    onClick={() => handleRemove(index)}
                  />
                </Cell>
              </tr>
            ))}
        </TableDetailsQuotes>
      )}
    </>
  );
}
