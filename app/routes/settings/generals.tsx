import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { ConfigTable } from "~/components/Specific/ConfigTable";
import { useUI } from "~/context/UIContext";
import type { TableColumn } from "react-data-table-component";
import { Button } from "~/components/Forms/Buttons";
import {
  unitsApi,
  familyApi,
  categoryApi,
  subcategoryApi,
} from "~/backend/cruds";
import { useData } from "~/context/DataContext";
import { useUnitsRealTime, useConfigRealTime } from "~/backend/realTime";
import type {
  UnitsDB,
  FamilyDB,
  CategoryDB,
  SubCategoryDB,
} from "~/types/materialsType";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { ALLOWED_SETTINGS } from "~/components/auth/allowedRoles";
import { Ruler, Layers, Layers2, Boxes } from "lucide-react";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Configuraciones" },
    { name: "Configuraciones", content: "Configuraciones" },
  ];
}
export type ConfigType = "unidades" | "familias" | "rubros" | "subrubros";

export default function Settings() {
  useUnitsRealTime();
  useConfigRealTime();
  const [activeTab, setActiveTab] = useState<ConfigType>("unidades");
  const {
    units,
    getUnits,
    families,
    categories,
    subcategories,
    getCategories,
    getFamilies,
    getSubcategories,
  } = useData();
  const { getCategorizations, categorizations } = useUI();

  useEffect(() => {
    if (!families) getFamilies();
    if (!categories) getCategories();
    if (!subcategories) getSubcategories();
    if (!categorizations) getCategorizations();
    if (!units) getUnits();
  }, []);
  const colsUnits: TableColumn<UnitsDB>[] = [
    { id: "id", name: "Id", selector: (row) => row.id, width: "80px" },
    {
      name: "Abreviatura",
      selector: (row) => row.abbreviation,
      width: "180px",
    },
    { name: "Descripción", selector: (row) => row.description },
  ];

  const colsFamilies: TableColumn<FamilyDB>[] = [
    { id: "id", name: "Id", selector: (row) => row.id, width: "80px" },
    { name: "Familia", selector: (row) => row.description },
  ];
  const colsCategories: TableColumn<CategoryDB>[] = [
    { id: "id", name: "Id", selector: (row) => row.id, width: "80px" },
    {
      name: "Familia",
      selector: (row) => {
        const family = families?.find(
          (c) => c.id === row.id_family,
        )?.description;
        return family ?? "";
      },
      width: "230px",
    },
    { name: "Rubro", selector: (row) => row.description },
  ];
  const colsSubcategories: TableColumn<SubCategoryDB>[] = [
    { id: "id", name: "Id", selector: (row) => row.id, width: "80px" },
    { name: "Subrubro", selector: (row) => row.description },
    {
      name: "Rubro",
      selector: (row) => {
        const category = categories?.find(
          (c) => c.id === row.id_category,
        )?.description;
        return category ?? "";
      },
    },
    {
      name: "Familia",
      selector: (row) => {
        const id_family = categories?.find(
          (c) => c.id === row.id_category,
        )?.id_family;
        const family = families?.find((c) => c.id === id_family)?.description;
        return family ?? "";
      },
    },
  ];
  return (
    <ProtectedRoute allowed={ALLOWED_SETTINGS}>
      <div className="flex flex-1 min-h-[calc(100vh-64px)]">
        {/* Secciones */}
        <div className="flex-1 py-4 px-10 mx-auto">
          {activeTab === "unidades" && (
            <ConfigTable<UnitsDB>
              value="unidades"
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
                  isInFilter: true,
                },
                {
                  name: "abbreviation",
                  label: "Abreviatura",
                  type: "text",
                  required: true,
                  isInFilter: false,
                },
              ]}
              icon={Ruler}
              headers={[
                { key: "id", label: "ID" },
                { key: "description", label: "Descripción" },
                { key: "abbreviation", label: "Abreviatura" },
              ]}
            />
          )}

          {activeTab === "familias" && (
            <ConfigTable<FamilyDB>
              value="familias"
              title="Familias"
              columns={colsFamilies}
              data={(families as FamilyDB[]) || []}
              method={familyApi}
              formFields={[
                {
                  name: "description",
                  label: "Descripción",
                  type: "text",
                  required: true,
                  isInFilter: true,
                },
              ]}
              icon={Boxes}
              headers={[
                { key: "id", label: "ID" },
                { key: "description", label: "Descripción" },
              ]}
            />
          )}

          {activeTab === "rubros" && (
            <ConfigTable<CategoryDB>
              value="rubros"
              title="Rubros"
              columns={colsCategories}
              data={(categories as CategoryDB[]) || []}
              method={categoryApi}
              formFields={[
                {
                  name: "description",
                  label: "Descripción",
                  type: "text",
                  required: true,
                  isInFilter: true,
                },
                {
                  name: "id_family",
                  label: "Familia",
                  type: "select",
                  options: families?.map((f) => {
                    return { value: f.id, label: f.description };
                  }),
                  required: true,
                  isInFilter: false,
                },
              ]}
              icon={Layers2}
              headers={[
                { key: "id", label: "ID" },
                { key: "description", label: "Descripción" },
                { key: "id_family", label: "ID familia" },
              ]}
            />
          )}

          {activeTab === "subrubros" && (
            <ConfigTable<
              SubCategoryDB
            >
            value="subrubros"
              title="Subrubros"
              columns={colsSubcategories}
              data={(subcategories as SubCategoryDB[]) || []}
              method={subcategoryApi}
              formFields={[
                {
                  name: "description",
                  label: "Descripción",
                  type: "text",
                  required: true,
                  isInFilter: true,
                },
                {
                  name: "id_category",
                  label: "Rubro",
                  type: "select",
                  options: categories?.map((c) => {
                    const family = families?.find(
                      (f) => f.id === c.id_family,
                    )?.description;
                    return {
                      value: c.id,
                      label: `${c.description}-[🧩${family}]`,
                    };
                  }),
                  required: true,
                  isInFilter: false,
                },
              ]}
              icon={Layers}
              headers={[
                { key: "id", label: "ID" },
                { key: "description", label: "Descripción" },
                { key: "id_category", label: "ID rubro" },
              ]}
            />
          )}
        </div>
        {/* Menú lateral */}
        <nav className="w-44 pt-4 space-y-2 border-r border-zinc-300 bg-zinc-200/80 dark:border-zinc-700/60 dark:bg-zinc-900/70 px-4 shadow">
          {(["unidades", "familias", "rubros", "subrubros"] as ConfigType[]).map((key, i) => (
            <Button
              key={i}
              type="button"
              onClick={() => setActiveTab(key)}
              variant={activeTab === key ? "dark" : "light"}
              className="w-full"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Button>
          ))}
        </nav>
      </div>
    </ProtectedRoute>
  );
}
