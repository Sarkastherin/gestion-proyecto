import type { Route } from "../+types/conditions";
import { useForm, useFieldArray } from "react-hook-form";
import {
  details_materialsApi,
  type DetailsMaterialsType,
} from "~/backend/dataBase";
import { useUI, type MaterialTypeDB } from "~/context/UIContext";
import FooterForms from "~/templates/FooterForms";
import { TableDetailsQuotes, Cell } from "~/templates/TableDetailsQuotes";
import { Input } from "~/components/Forms/Inputs";
import { ButtonDeleteIcon, ButtonAdd } from "~/components/Specific/Buttons";
import { useEffect, useState } from "react";
import ModalMateriales from "~/components/Specific/ModalMateriales";
import { useOutletContext } from "react-router";
import { updatesArrayFields } from "~/utils/updatesArraysFields";
import { roundToPrecision } from "~/utils/functions";
import type { PricesType, MaterialsType } from "~/backend/dataBase";
import { SelectUnits } from "~/components/Specific/SelectUnits";
import ModalPrice from "~/components/Specific/ModalPrice";
import { useFieldsChange } from "~/utils/fieldsChange";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Oportunidad [Cotización]" },
    { name: "description", content: "Oportunidad [Cotización]" },
  ];
}

export type DetailsMaterialForm = {
  materials: Array<
    DetailsMaterialsType & {
      materials: MaterialsType;
      prices: PricesType | {};
    }
  >;
};
export default function Materials() {
  const { selectedQuoteId } = useOutletContext<{
    selectedQuoteId: number | null;
  }>();
  const [materialsToDelete, setMaterialsToDelete] = useState<
    Array<DetailsMaterialsType["id"]>
  >([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const {
    showModal,
    selectedPhase,
    isModeEdit,
    selectedOpportunity,
    setOpenMaterialsModal,
    setOpenPriceModal,
    materials,
    editByStatus,
  } = useUI();
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
      showModal({
        title: "Formulario sin cambios",
        message: "No hay cambios para actualizar'",
        variant: "information",
      });
      return;
    }
    showModal({
      title: "Procesando",
      message: `Procesando requerimiento`,
      variant: "loanding",
    });
    try {
      const { materials } = formData;
      const cleanedMaterials = materials.map(
        ({ materials, prices, ...rest }) => rest
      );
      const newData = await updatesArrayFields({
        fieldName: "materials",
        fieldsArray: cleanedMaterials as DetailsMaterialsType[],
        dirtyFields: dirtyFields as Record<
          string,
          Partial<Record<keyof DetailsMaterialsType, boolean>>[]
        >,
        fieldsDelete: materialsToDelete,
        onInsert: details_materialsApi.insertOne,
        onRemove: (id: number) => details_materialsApi.remove({ id }),
        onUpdate: details_materialsApi.update,
      });
      const oldData = cleanedMaterials.filter(
        (item): item is DetailsMaterialsType =>
          "id" in item && typeof item.id === "number"
      );
      reset({
        materials: [...oldData, ...(Array.isArray(newData) ? newData : [])],
      });
      setMaterialsToDelete([]);
      showModal({
        title: "¡Todo OK!",
        message: "Se han guardado los datos",
        variant: "success",
      });
    } catch (e) {
      showModal({
        title: "Error al actualizar",
        message: `No se pudo actualizar la oportunidad. Error:`,
        code: String(e),
        variant: "error",
      });
    }
  };
  const handleAdd = () => {
    if (selectedPhase && selectedPhase > 0) {
      append({
        id_quote: selectedQuoteId, // Este valor se asignará al guardar la cotización
        id_phase: selectedPhase,
        type: "materiales",
        id_material: 0,
        quantity: 0,
        id_price: 0,
        notes: "",
        observations: "",
      } as DetailsMaterialsType & {
        prices: PricesType;
        materials: MaterialsType;
      });
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
  const { details_materials } = selectedOpportunity || {};
  useEffect(() => {
    const details = details_materials?.filter(
      (q) => q.id_quote === selectedQuoteId
    );
    if (details) reset({ materials: details });
  }, [details_materials, selectedQuoteId]);

  const columnsMaterials = [
    { groupColsClass: "w-[1%]", label: "#" },
    { groupColsClass: "", label: "Elemento cotizado" },
    { groupColsClass: "w-[10%]", label: "Unidad" },
    { groupColsClass: "w-[10%]", label: "Cantidad" },
    { groupColsClass: "w-[10%]", label: "Costo unitario" },
    { groupColsClass: "w-[10%]", label: "Total" },
    { groupColsClass: "w-[1%]", label: "🗑️" },
  ];

  useFieldsChange({ isSubmitSuccessful, isDirty });
  /* MODALES */
  /* Precios */
  const handleOpenPrices = (index: number) => {
    setActiveIndex(index);
    const id_material = watch(`materials.${index}.id_material`);
    const material = materials?.find((m) => m.id === id_material);
    const prices = material?.prices;
    setOpenPriceModal({
      open: true,
      data: prices ?? [],
      idMaterial: id_material,
    });
  };
  /* Materiales */
  const handleOpenMaterials = (index: number) => {
    setActiveIndex(index);
    setOpenMaterialsModal(true);
  };
  const handleSelectMaterial = (index: number, material: MaterialTypeDB) => {
    const { prices, ...propsMaterial } = material;
    const defaultPrice = prices.find((p) => p.default) || {};
    setValue(`materials.${index}.materials`, propsMaterial);
    setValue(`materials.${index}.prices`, defaultPrice);
    setValue(`materials.${index}.id_material`, propsMaterial.id);
    setValue(
      `materials.${index}.id_price`,
      (defaultPrice as PricesType)?.id || 0
    );
  };
  const handleSelectedPrice = ({
    id,
    price,
  }: {
    id: number;
    price: PricesType;
  }) => {
    if (activeIndex !== null) {
      setValue(`materials.${activeIndex}.prices`, price);
      setValue(`materials.${activeIndex}.id_price`, id);
      setOpenPriceModal({ open: false, data: null, idMaterial: null });
    }
  };
  return (
    <>
      {selectedPhase && (
        <>
          <form
            className=" flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset disabled={!isModeEdit}>
              <div className="overflow-x-auto">
                <TableDetailsQuotes
                  title="Tabla Materiales"
                  columns={columnsMaterials}
                >
                  {fields
                    .map((field, index) => ({ ...field, index }))
                    .filter((item) => item.id_phase === selectedPhase)
                    .map(({ index, id }) => (
                      <tr
                        key={id}
                        className="*:text-zinc-900 *:first:font-medium dark:*:text-white align-baseline"
                      >
                        <Cell>{index + 1}</Cell>

                        {/* ID (oculto) */}
                        <Cell>
                          <Input
                            disabled={!editByStatus}
                            {...register(`materials.${index}.id_material`, {
                              required: "Campo requerido",

                              validate: {
                                checkNumber: (value) => {
                                  return (
                                    value > 0 ||
                                    "No se ha seleccionado material"
                                  );
                                },
                              },
                            })}
                            className="sr-only"
                          />
                          <Input
                            disabled={!editByStatus}
                            readOnly
                            placeholder="Material"
                            value={watch(
                              `materials.${index}.materials.description`
                            )}
                            onClick={() => handleOpenMaterials(index)}
                          />
                        </Cell>
                        {/* Unidad (no registrada, solo visible) */}
                        <Cell>
                          <SelectUnits
                            value={Number(
                              watch(`materials.${index}.materials.id_unit`)
                            )}
                            disabled
                          />
                        </Cell>

                        {/* Cantidad (registrada) */}
                        <Cell>
                          <Input
                            disabled={!editByStatus}
                            type="number"
                            step={0.01}
                            {...register(`materials.${index}.quantity`, {
                              valueAsNumber: true,
                              required: "Campo requerido",
                              validate: {
                                checkNumber: (value) => {
                                  return (
                                    value > 0 || "No se ha seleccionado precio"
                                  );
                                },
                              },
                            })}
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
                                  return (
                                    value > 0 || "No se ha seleccionado precio"
                                  );
                                },
                              },
                            })}
                          />
                          <Input
                            disabled={!editByStatus}
                            readOnly
                            value={
                              Number(
                                watch(`materials.${index}.prices.price`)
                              ) || 0
                            }
                            placeholder="$ 0.00"
                            onClick={() => handleOpenPrices(index)}
                          />
                        </Cell>

                        {/* Total (calculado) */}
                        <Cell>
                          <Input
                            type="number"
                            placeholder="Total"
                            readOnly
                            value={
                              roundToPrecision(
                                watch(`materials.${index}.quantity`) *
                                  watch(`materials.${index}.prices.price`),
                                2
                              ) || 0
                            }
                          />
                        </Cell>

                        {/* Eliminar fila */}
                        <Cell>
                          <ButtonDeleteIcon
                            disabled={!editByStatus}
                            onClick={() => handleRemove(index)}
                          />
                        </Cell>
                      </tr>
                    ))}
                </TableDetailsQuotes>
                <ButtonAdd
                  disabled={!editByStatus}
                  title="Agregar Material"
                  onClick={handleAdd}
                />
              </div>
            </fieldset>
            <FooterForms mode="view" />
          </form>
          <ModalMateriales
            activeIndex={activeIndex}
            onSelectMaterial={handleSelectMaterial}
          />
          <ModalPrice
            activeIndex={activeIndex}
            onSelectPrice={handleSelectedPrice}
          />
        </>
      )}
    </>
  );
}
