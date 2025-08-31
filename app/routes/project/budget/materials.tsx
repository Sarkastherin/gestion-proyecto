import type { Route } from "../../+types/home";
import { useForm, useFieldArray } from "react-hook-form";
import { budgetMaterialsApi } from "~/backend/cruds";
import { useUI } from "~/context/UIContext";
import type { MaterialsUI } from "~/types/materialsType";
import FooterForms from "~/templates/FooterForms";
import { TableDetailsQuotes, Cell } from "~/components/QuotesAndBudgets/TableDetailsQuotes";
import { Input } from "~/components/Forms/Inputs";
import { ButtonDeleteIcon, ButtonAdd } from "~/components/Specific/Buttons";
import { useEffect, useState } from "react";
import { updatesArrayFields } from "~/utils/updatesArraysFields";
import { roundToPrecision } from "~/utils/functions";
import type { PricesDB } from "~/types/materialsType";
import { SelectUnits } from "~/components/Specific/SelectUnits";
import { useFieldsChange } from "~/utils/fieldsChange";
import { useData } from "~/context/DataContext";
import MaterialsModal from "~/components/modals_temp/particularsModals/MaterialsModal";
import { useModalState } from "~/components/modals_temp/particularsModals/useModalState";
import PriceModal from "~/components/modals_temp/particularsModals/PriceModal";
import { useUIModals } from "~/context/ModalsContext";
import { columnsMaterialsQuote } from "~/components/QuotesAndBudgets/QuotesAndBudgetLayout";
import type { BudgetMaterialsDB, BudgetMaterialsUI, BudgetItemProps } from "~/types/projectsType";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Oportunidad [Cotización]" },
    { name: "description", content: "Oportunidad [Cotización]" },
  ];
}

export type DetailsMaterialForm = {
  materials: BudgetMaterialsUI[];
};
export type PriceModalPayload = {
  prices: PricesDB[];
  idMaterial: number;
};

export default function BudgetMaterials() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { openModal } = useUIModals();
  const materialsModal = useModalState<MaterialsUI>();
  const priceModal = useModalState<PriceModalPayload>();

  const [materialsToDelete, setMaterialsToDelete] = useState<
    Array<BudgetMaterialsDB["id"]>
  >([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { propsQuoteAndBudget } = useUI();
  const { selectedProject, materials } = useData();
  const {
    register,
    formState: { isSubmitSuccessful, isDirty, dirtyFields, errors },
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
  } = useForm<DetailsMaterialForm>({
    defaultValues: { materials: [] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
  });

  const onSubmit = async (formData: DetailsMaterialForm): Promise<void> => {
    if (!isDirty) {
      openModal("INFORMATION", {
        title: "Formulario sin cambios",
        message: "No hay cambios para actualizar'",
      });
      return;
    }
    openModal("LOADING");
    try {
      const { materials } = formData;
      const cleanedMaterials = materials.map(
        ({ materials, prices, ...rest }) => rest
      );
      const newData = await updatesArrayFields({
        fieldName: "materials",
        fieldsArray: cleanedMaterials as BudgetMaterialsDB[],
        dirtyFields: dirtyFields as Record<
          string,
          Partial<Record<keyof BudgetMaterialsDB, boolean>>[]
        >,
        fieldsDelete: materialsToDelete,
        onInsert: budgetMaterialsApi.insertOne,
        onRemove: (id: number) => budgetMaterialsApi.remove({ id }),
        onUpdate: budgetMaterialsApi.update,
      });
      const oldData = cleanedMaterials.filter(
        (item): item is BudgetMaterialsDB =>
          "id" in item && typeof item.id === "number"
      );
      reset({
        materials: [...oldData, ...(Array.isArray(newData) ? newData : [])],
      });
      setMaterialsToDelete([]);
      openModal("SUCCESS", {
        message: "Se han guardado los datos",
      });
    } catch (e) {
      openModal("ERROR", {
        message: `No se pudo actualizar la oportunidad. Error: ${String(e)}`,
      });
    }
  };

  const handleAdd = () => {
    if (propsQuoteAndBudget && propsQuoteAndBudget.selsectedPhase > 0) {
      append({
        id_project: selectedProject?.id, // Este valor se asignará al guardar la cotización
        id_phase: propsQuoteAndBudget.selsectedPhase,
        type: "materiales",
        id_material: 0,
        quantity: 0,
        id_price: 0,
        notes: "",
        observations: "",
      } as BudgetMaterialsUI);
    }
  };
  const handleRemove = (index: number) => {
    const currentItems = watch("materials");
    const item = currentItems[index];
    if (item && "id" in item && item.id !== undefined) {
      setMaterialsToDelete((prev) => [...prev, item.id]);
    }
    remove(index);
  };
  const { budget_details_materials } = selectedProject || {};
  useEffect(() => {
    if (budget_details_materials) reset({ materials: budget_details_materials });
  }, [budget_details_materials]);

  

  useFieldsChange({ isSubmitSuccessful, isDirty });
  /* MODALES */
  /* Precios */
  const handleOpenPrices = (index: number) => {
    setActiveIndex(index);
    const id_material = watch(`materials.${index}.id_material`);
    const material = materials?.find((m) => m.id === id_material);
    const prices = material?.prices ?? [];
    priceModal.openModal({ prices, idMaterial: id_material });
  };
  /* Materiales */
  const handleOpenMaterials = (index: number) => {
    setActiveIndex(index);
    materialsModal.openModal();
  };
  const handleSelectMaterial = (index: number, material: MaterialsUI) => {
    const { prices, ...propsMaterial } = material;
    const defaultPrice = prices.find((p) => p.default) || {};
    setValue(`materials.${index}.materials`, propsMaterial);
    setValue(`materials.${index}.prices`, defaultPrice);
    setValue(`materials.${index}.id_material`, propsMaterial.id);
    setValue(
      `materials.${index}.id_price`,
      (defaultPrice as PricesDB)?.id || 0
    );
  };
  const handleSelectedPrice = ({
    id,
    price,
  }: {
    id: number;
    price: PricesDB;
  }) => {
    if (activeIndex !== null) {
      setValue(`materials.${activeIndex}.prices`, price, { shouldDirty: true });
      setValue(`materials.${activeIndex}.id_price`, id, { shouldDirty: true });
      priceModal.closeModal();
    }
  };
  return (
    <>
      {propsQuoteAndBudget?.selsectedPhase && (
        <>
          <TableDetailsQuotes
            title="Tabla Materiales"
            columns={columnsMaterialsQuote}
            handleSubmit={handleSubmit(onSubmit)}
            isEditMode={isEditMode}
            addElement={
              <ButtonAdd
                disabled={false}
                title="Agregar Material"
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
                (item) => item.id_phase === propsQuoteAndBudget.selsectedPhase
              )
              .map(({ index, id }) => (
                <tr
                  key={id}
                  className="*:text-zinc-900 *:first:font-medium dark:*:text-white align-baseline"
                >
                  <Cell>{index + 1}</Cell>

                  {/* ID (oculto) */}
                  <Cell>
                    <Input
                      disabled={false}
                      {...register(`materials.${index}.id_material`, {
                        required: "Campo requerido",

                        validate: {
                          checkNumber: (value) => {
                            return (
                              value > 0 || "No se ha seleccionado material"
                            );
                          },
                        },
                      })}
                      className="sr-only"
                    />
                    <Input
                      disabled={false}
                      readOnly
                      placeholder="Material"
                      value={
                        watch(`materials.${index}.materials.description`) ?? ""
                      }
                      onClick={() => handleOpenMaterials(index)}
                      error={errors.materials?.[index]?.id_material?.message}
                    />
                  </Cell>
                  {/* Unidad (no registrada, solo visible) */}
                  <Cell>
                    <SelectUnits
                      value={Number(
                        watch(`materials.${index}.materials.id_unit`) ?? 0
                      )}
                      disabled
                    />
                  </Cell>

                  {/* Cantidad (registrada) */}
                  <Cell>
                    <Input
                      disabled={false}
                      type="number"
                      step={0.01}
                      {...register(`materials.${index}.quantity`, {
                        valueAsNumber: true,
                        required: "Campo requerido",
                        validate: {
                          checkNumber: (value) => {
                            return value > 0 || "No se ha seleccionado precio";
                          },
                        },
                      })}
                      error={errors.materials?.[index]?.quantity?.message}
                    />
                  </Cell>

                  {/* Precio (solo mostrar, no registrar) */}
                  <Cell>
                    <Input
                      className="sr-only"
                      {...register(`materials.${index}.id_price`, {
                        required: "Campo requerido",
                        validate: {
                          checkNumber: (value) => {
                            return value > 0 || "No se ha seleccionado precio";
                          },
                        },
                      })}
                    />
                    <Input
                      disabled={false}
                      readOnly
                      value={Number(
                        watch(`materials.${index}.prices.price`) ?? 0
                      )}
                      placeholder="$ 0.00"
                      onClick={() => handleOpenPrices(index)}
                      error={errors.materials?.[index]?.id_price?.message}
                    />
                  </Cell>

                  {/* Total (calculado) */}
                  <Cell>
                    <Input
                      type="number"
                      placeholder="Total"
                      readOnly
                      value={roundToPrecision(
                        (watch(`materials.${index}.quantity`) ?? 0) *
                          (watch(`materials.${index}.prices.price`) ?? 0),
                        2
                      )}
                    />
                  </Cell>

                  {/* Eliminar fila */}
                  <Cell>
                    <ButtonDeleteIcon
                      disabled={false}
                      onClick={() => handleRemove(index)}
                    />
                  </Cell>
                </tr>
              ))}
          </TableDetailsQuotes>
          <MaterialsModal
            activeIndex={activeIndex}
            onSelectMaterial={handleSelectMaterial}
            open={materialsModal.open}
            onClose={materialsModal.closeModal}
          />
          <PriceModal
            open={priceModal.open}
            onClose={priceModal.closeModal}
            onSelectPrice={handleSelectedPrice}
            prices={priceModal.data?.prices ?? []}
            idMaterial={priceModal.data?.idMaterial ?? 0}
          />
        </>
      )}
    </>
  );
}
