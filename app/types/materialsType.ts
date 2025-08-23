import type { Categorization } from "~/context/UIContext";
import type { CommonPropsDB } from "./sharedTypes";
export type MaterialsProps = {
  id_subcategory: number | null;
  description: string;
  id_unit: number | null;
  weight?: number;
  applycation?: string;
};
export type MaterialsDB = CommonPropsDB & MaterialsProps;
export type MaterialsUI = MaterialsDB & {
  prices: PricesDB[];
  view_categorizations: Categorization;
};
/* Prices */
export type PricesProps = {
  id_material: number | null;
  id_supplier: number | null;
  price: number;
  default: boolean;
  date?: string;
};
export type PricesDB = CommonPropsDB & PricesProps;
/* Settings */
export type FamilyProps = {
  description: string;
};
export type FamilyDB = CommonPropsDB & FamilyProps;

export type CategoryProps = {
  description: string;
  id_family: number;
};
export type CategoryDB = CommonPropsDB & CategoryProps;
export type SubCategoryProps = {
  description: string;
  id_category: number;
};
export type SubCategoryDB = CommonPropsDB & SubCategoryProps;
export type UnitsProps = {
  description: string;
  abbreviation: string;
};
export type UnitsDB = CommonPropsDB & UnitsProps;

