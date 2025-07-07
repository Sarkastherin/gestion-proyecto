import type { MaterialsInput, MaterialsType } from "~/backend/dataBase";
import { materialsApi } from "~/backend/dataBase";
import { useForm } from "react-hook-form";
import type {
  Categorization,
  CategoriesProps,
} from "~/context/UIContext";
import { useUI } from "~/context/UIContext";
import { CardToggle } from "~/components/Generals/Cards";
import { Input, Select } from "~/components/Forms/Inputs";
import FooterForms from "./FooterForms";
import { useEffect, useState, type ChangeEventHandler } from "react";
import { useNavigate, useParams } from "react-router";
import { useMaterialsRealtime } from "~/backend/realTime";
import { SelectUnits } from "~/components/Specific/SelectUnits";

export type MaterialFormType = MaterialsInput | MaterialsType;
type MaterialFormProps = {
  defaultValues: MaterialFormType;
  mode: "create" | "view";
  categorization?: Categorization;
};

export const MaterialForm = ({
  defaultValues,
  mode,
  categorization,
}: MaterialFormProps) => {
  useMaterialsRealtime();
  const { id } = useParams();
  const navigate = useNavigate();
  const [filterCategories, setFilterCategories] = useState<
    CategoriesProps[] | null
  >(null);
  const [filterSubCategories, setFilterSubCategories] = useState<
    CategoriesProps[] | null
  >(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const {
    isModeEdit,
    showModal,
    getCategorizations,
    categorizations,
    setSelectedMaterial,
  } = useUI();
  const {
    register,
    formState: { errors, dirtyFields, isSubmitSuccessful },
    handleSubmit,
  } = useForm<MaterialFormType>({
    defaultValues: defaultValues ?? {
      id_subcategory: null,
      description: "",
      id_unit: null,
    },
  });
  const onSubmit = async (formData: MaterialFormType) => {
    showModal({
      title: "Procesando",
      message: `Procesando requerimiento`,
      variant: "loanding",
    });
    if (mode === "create") {
      try {
        const { data, error } = await materialsApi.insertOne(formData);
        if (error) throw new Error(String(error));
        setSelectedMaterial(null);
        //getMaterials();
        navigate(`/material/${data?.id}`);
        showModal({
          title: "Guardado con exito",
          message: `Se ha guardado la oportunidad`,
          variant: "success",
        });
      } catch (e) {
        showModal({
          title: "Error al guardar",
          message: "No se pudo guardar la oportunidad. Error:",
          code: String(e),
          variant: "error",
        });
      }
    }
    if (mode === "view" && isModeEdit) {
      try {
        const updatePayload: Record<string, unknown> = {};
        const attributeToUpdates = Object.keys(dirtyFields) as Array<
          keyof MaterialFormType
        >;
        attributeToUpdates.forEach((attribute) => {
          if (
            dirtyFields[attribute] &&
            formData[attribute] !== undefined &&
            formData[attribute] !== null
          ) {
            updatePayload[attribute as string] = formData[attribute];
          }
        });
        const { error } = await materialsApi.update({
          id: Number(id),
          values: updatePayload,
        });
        if (error)
          throw new Error(
            `No se pudo actualizar el material. Error: ${String(error)}`
          );
        showModal({
          title: "Actualizado con exito",
          message: `Se ha actualizado la oportunidad`,
          variant: "success",
        });
      } catch (e) {
        showModal({
          title: "Error al actualizar",
          message: `No se pudo actualizar la oportunidad. Error:`,
          code: String(e),
          variant: "error",
        });
      } finally {
        //refreshMaterial();
      }
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
    if (mode === "view" && categorization) {
      loadCategorysByFamily(categorization.id_family);
      loadSubcategoryByCategory(categorization.id_category);
    }
    setIsLoaded(true);
  }, [categorization]);
  return (
    <>
      {isLoaded && (
        <form
          className=" flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset disabled={!isModeEdit}>
            <CardToggle title="Datos del material">
              <div className="flex flex-col gap-4">
                <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-2">
                  <Select
                    id="id_family"
                    label="Familia"
                    selectText="Selecciona familia"
                    onChange={handleChangeFamily}
                    defaultValue={
                      mode === "view" ? categorization?.id_family : ""
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
                      mode === "view" ? categorization?.id_category : ""
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
          <FooterForms mode={mode} />
        </form>
      )}
    </>
  );
};
