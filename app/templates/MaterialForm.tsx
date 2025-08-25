import { materialsApi } from "~/backend/cruds";
import { useForm } from "react-hook-form";
import type { Categorization, CategoriesProps } from "~/context/UIContext";
import { useUI } from "~/context/UIContext";
import { CardToggle } from "~/components/Generals/Cards";
import { Input, Select } from "~/components/Forms/Inputs";
import FooterForms from "./FooterForms";
import { useEffect, useState, type ChangeEventHandler } from "react";
import { useNavigate } from "react-router";
import { useMaterialsAndPricesRealtime } from "~/backend/realTime";
import { SelectUnits } from "~/components/Specific/SelectUnits";
import type { MaterialsDB } from "~/types/materialsType";
import { useData } from "~/context/DataContext";
import { updateSingleRow } from "~/utils/updatesSingleRow";
/* Modals */
import { useUIModals } from "~/context/ModalsContext";

type MaterialFormProps = {
  defaultValues: MaterialsDB | Omit<MaterialsDB, "id" | "created_at">;
  isNew: boolean;
  categorization?: Categorization;
  initialEditMode: boolean;
};

export const MaterialForm = ({
  defaultValues,
  isNew,
  categorization,
  initialEditMode
}: MaterialFormProps) => {
  const [isEditMode, setIsEditMode] = useState(initialEditMode);
  const { setSelectedMaterial, selectedMaterial, getMaterials } = useData();
  useMaterialsAndPricesRealtime(selectedMaterial?.id);
  const { openModal } = useUIModals();
  const navigate = useNavigate();
  const [filterCategories, setFilterCategories] = useState<
    CategoriesProps[] | null
  >(null);
  const [filterSubCategories, setFilterSubCategories] = useState<
    CategoriesProps[] | null
  >(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { getCategorizations, categorizations } = useUI();

  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
  } = useForm<MaterialsDB>({
    defaultValues: defaultValues ?? {
      id_subcategory: null,
      description: "",
      id_unit: null,
    },
  });
  const onSubmit = async (formData: MaterialsDB) => {
    try {
      if (isNew) {
        openModal("LOADING", {
          title: "Guardando material",
          message: "Por favor, espere...",
        });
        const { data, error } = await materialsApi.insertOne(formData);
        if (error || !data || !("id" in data))
          throw new Error("Error al crear oportunidad");
        openModal("SUCCESS", {
          title: "Material creado con éxito",
          message: "El material se ha creado correctamente.",
        });
        getMaterials();
        navigate(`/material/${data?.id}`);
      }
      if (!isNew && isEditMode) {
        openModal("LOADING", {
          title: "Actualizando material",
          message: "Por favor, espere...",
        });
        await updateSingleRow({
          dirtyFields: Object.fromEntries(
            Object.entries(dirtyFields).filter(
              ([_, v]) => typeof v === "boolean"
            )
          ),
          formData: formData,
          onUpdate: materialsApi.update,
        });
        openModal("SUCCESS", {
          title: "Material actualizado con éxito",
          message: "El material se ha actualizado correctamente.",
        });
      }
    } catch (e) {
      openModal("ERROR", {
        title: "Error al actualizar material",
        message: String(e),
      });
    }
  };
  useEffect(() => {
    if (!categorizations) {
      getCategorizations();
    }
  }, []);
  const loadCategorysByFamily = (id_family: number) => {
    if (!categorizations) return;
    const { categories } = categorizations;
    setFilterCategories(
      categories?.filter(
        (category) => category.id_family === Number(id_family)
      ) || []
    );
  };
  const loadSubcategoryByCategory = (id_category: number) => {
    if (!categorizations) return;
    const { subcategories } = categorizations;
    setFilterSubCategories(
      subcategories?.filter(
        (subcategory) => subcategory.id_category === Number(id_category)
      ) || []
    );
  };
  const handleChangeFamily: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const target = e.target;
    const value: string = target.value;
    if (value === "") return;
    loadCategorysByFamily(Number(value));
  };
  const handleChangeCategory: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const target = e.target;
    const value: string = target.value;
    if (value === "") return;
    loadSubcategoryByCategory(Number(value));
  };
  useEffect(() => {
    if (!categorizations) return;
    if (!isNew && categorization) {
      loadCategorysByFamily(categorization.id_family);
      loadSubcategoryByCategory(categorization.id_category);
    }
    setIsLoaded(true);
  }, [categorization, categorizations]);
  return (
    <>
      {isLoaded && (
        <form
          className=" flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset disabled={!isEditMode}>
            <CardToggle title="Datos del material">
              <div className="flex flex-col gap-4">
                <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-2">
                  <Select
                    id="id_family"
                    label="Familia"
                    selectText="Selecciona familia"
                    onChange={handleChangeFamily}
                    defaultValue={
                      isNew ? "" : categorization?.id_family
                    }
                    error={errors.id_subcategory?.message}
                  >
                    {categorizations?.families?.map((family) => (
                      <option key={family.id} value={family.id}>
                        {family.description}
                      </option>
                    ))}
                  </Select>
                  <Select
                    id="id_category"
                    label="Rubro"
                    selectText="Seleccion rubro"
                    onChange={handleChangeCategory}
                    error={errors.id_subcategory?.message}
                    defaultValue={
                      isNew ? "" : categorization?.id_category
                    }
                  >
                    {filterCategories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.description}
                      </option>
                    ))}
                  </Select>
                  <Select
                    label="Sub-rubro"
                    selectText="Seleccion sub-rubro"
                    {...register("id_subcategory", {
                      required: "Campo requerido",
                      valueAsNumber: true,
                    })}
                    error={errors.id_subcategory?.message}
                  >
                    {filterSubCategories?.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.description}
                      </option>
                    ))}
                  </Select>
                </div>
                <Input
                  label="Descripción"
                  placeholder="Descripción del material"
                  {...register("description", { required: "Campo requerido" })}
                  error={errors.description?.message}
                />
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
                  <SelectUnits
                    label="Unidad"
                    {...register("id_unit", {
                      required: "Campo requerido",
                      valueAsNumber: true,
                    })}
                    error={errors.id_unit?.message}
                  />
                  <Input
                    label="Peso"
                    type="number"
                    placeholder="Peso en gramos"
                    defaultValue={0}
                    {...register("weight", { valueAsNumber: true })}
                  />
                </div>
                <Input
                  label="Aplicación"
                  placeholder="Aplicación"
                  {...register("applycation")}
                />
              </div>
            </CardToggle>
          </fieldset>
          <FooterForms
            isNew={isNew}
            isEditMode={isEditMode}
            onToggleEdit={() => setIsEditMode((prev) => !prev)}
          />
        </form>
      )}
    </>
  );
};
