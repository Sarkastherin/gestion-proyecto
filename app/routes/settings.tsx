import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { ConfigTable } from "~/components/Specific/ConfigTable";
import { useUI, type CategorizationsProps } from "~/context/UIContext";
import type { TableColumn } from "react-data-table-component";
import { Button } from "~/components/Forms/Buttons";
import type {
  UnitsType,
  UnitsInput,
  FamilyInput,
  FamilyType,
  CategoryInput,
  CategoryType,
  SubCategoryInput,
  SubCategoryType,
} from "~/backend/dataBase";
import {
  unitsApi,
  familyApi,
  categoryApi,
  subcategoryApi,
} from "~/backend/dataBase";
import { useUnitsRealTime, useConfigRealTime } from "~/backend/realTime";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Configuraciones" },
    { name: "Configuraciones", content: "Configuraciones" },
  ];
}
const colsUnits: TableColumn<UnitsType>[] = [
  { id: "id", name: "Id", selector: (row) => row.id, width: "80px" },
  { name: "Abreviatura", selector: (row) => row.abbreviation, width: "180px" },
  { name: "Descripción", selector: (row) => row.description },
];

const colsFamilies: TableColumn<FamilyType>[] = [
  { id: "id", name: "Id", selector: (row) => row.id, width: "80px" },
  { name: "Familia", selector: (row) => row.description },
];


export default function Settings() {
  useUnitsRealTime();
  useConfigRealTime();
  const [activeTab, setActiveTab] = useState("unidades");
  const {
    units,
    families,
    categories,
    subcategories,
    getCategories,
    getFamilies,
    getUnits,
    getSubcategories,
    getCategorizations,
    categorizations,
  } = useUI();

  useEffect(() => {
    if (!families) getFamilies();
    if (!categories) getCategories();
    if (!subcategories) getSubcategories();
    if (!categorizations) getCategorizations();
    if (!units) getUnits();
  }, []);
  const colsCategories: TableColumn<CategoryType>[] = [
  { id: "id", name: "Id", selector: (row) => row.id, width: "80px" },
  {
      name: "Familia",
      selector: (row) => {
        const family = families?.find(
          (c) => c.id === row.id_family
        )?.description;
        return family ?? "";
      },
      width: "230px",
    },
  { name: "Rubro", selector: (row) => row.description },
];
  const colsSubcategories: TableColumn<SubCategoryType>[] = [
    { id: "id", name: "Id", selector: (row) => row.id, width: "80px" },
    {
      name: "Familia",
      selector: (row) => {
        const id_family = categories?.find(c => c.id === row.id_category)?.id_family
        const family = families?.find(
          (c) => c.id === id_family
        )?.description;
        return family ?? "";
      },
      width: "230px",
    },
    {
      name: "Rubro",
      selector: (row) => {
        const category = categories?.find(
          (c) => c.id === row.id_category
        )?.description;
        return category ?? "";
      },
      width: "230px",
    },
    { name: "Subrubro", selector: (row) => row.description },
  ];
  return (
    <div className="flex flex-1 gap-6 min-h-[calc(100vh-64px)]">
      {/* Menú lateral */}
      <nav className="w-58 pt-4 space-y-2 border-r border-zinc-300 bg-zinc-200/80 dark:border-zinc-700/60 dark:bg-zinc-900/70 px-4 shadow">
        {["unidades", "familias", "rubros", "subrubros"].map((key, i) => (
          <Button
            key={i}
            type="button"
            onClick={() => setActiveTab(key)}
            variant={activeTab === key ? "primary" : "secondary"}
            className="w-full"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Button>
        ))}
      </nav>

      {/* Secciones */}
      <div className="flex-1 py-4 mx-auto pe-10">
        {activeTab === "unidades" && (
          <ConfigTable<UnitsType, UnitsInput>
            table="units"
            title="Unidades"
            columns={colsUnits}
            data={units || []}
            method={unitsApi}
            formFields={[
              {
                name: "description",
                label: "Descripción",
                type: "text",
                required: true,
              },
              {
                name: "abbreviation",
                label: "Abreviatura",
                type: "text",
                required: true,
              },
            ]}
          />
        )}

        {activeTab === "familias" && (
          <ConfigTable<FamilyType, FamilyInput>
            table="families"
            title="Familias"
            columns={colsFamilies}
            data={(families as FamilyType[]) || []}
            method={familyApi}
            formFields={[
              {
                name: "description",
                label: "Descripción",
                type: "text",
                required: true,
              },
            ]}
          />
        )}

        {activeTab === "rubros" && (
          <ConfigTable<CategoryType, CategoryInput>
            table="categories"
            title="Rubros"
            columns={colsCategories}
            data={(categories as CategoryType[]) || []}
            method={categoryApi}
            formFields={[
              {
                name: "description",
                label: "Descripción",
                type: "text",
                required: true,
              },
              {
                name: "id_family",
                label: "Familia",
                type: "select",
                options: families?.map((f) => {
                  return { value: f.id, label: f.description };
                }),
                required: true,
              },
            ]}
          />
        )}

        {activeTab === "subrubros" && (
          <ConfigTable<SubCategoryType, SubCategoryInput>
            table="subcategories"
            title="Subrubros"
            columns={colsSubcategories}
            data={(subcategories as SubCategoryType[]) || []}
            method={subcategoryApi}
            formFields={[
              {
                name: "description",
                label: "Descripción",
                type: "text",
                required: true,
              },
              {
                name: "id_category",
                label: "Rubro",
                type: "select",
                options: categories?.map((f) => {
                  return { value: f.id, label: f.description };
                }),
                required: true,
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}
