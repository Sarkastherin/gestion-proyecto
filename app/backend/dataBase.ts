import { createCrud } from "./crudFactory";
import type { CommonTypesDataBase, OpportunityInput, OpportunityType } from "~/types/database";

export type PhasesInput = {
  name: string;
  id_opportunity: number;
  history_data?: object;
};
export type PhasesType = PhasesInput & CommonTypesDataBase;
export type QuotesInput = {
  id_opportunity: number;
  method_payment?: string;
  validity?: string;
  delivery_time?: string;
  guarantee?: string;
  status: "Abierta" | "Cerrada";
  active: boolean;
  estimated_start_date?: string;
  notes?: string;
  history_data?: object;
  materials?: number;
  labor?: number;
  subcontracting?: number;
  others?: number;
  general?: number;
  
};
export type QuotesType = QuotesInput & CommonTypesDataBase;
export type DetailsItemsInput = {
  id_quote: number;
  id_phase: number;
  type: "mano de obra" | "subcontratos" | "otros";
  item: string;
  quantity: number;
  unit_cost: number;
  notes?: string;
  observations?: string;
  total?: number
  
};
export type DetailsItemsType = DetailsItemsInput & CommonTypesDataBase;
export type DetailsMaterialsInput = {
  id_quote: number;
  id_phase: number;
  type: "materiales";
  id_material: number;
  quantity: number;
  id_price: number;
  notes?: string;
  observations?: string;
};
export type DetailsMaterialsType = DetailsMaterialsInput & CommonTypesDataBase;
export type PricesInput = {
  id_material: number | null;
  id_supplier: number | null;
  price: number;
  default: boolean;
  date?:string;
  history_data?: object;
};
export type PricesType = PricesInput & CommonTypesDataBase
export type MaterialsInput = {
  id_subcategory: number | null;
  description: string;
  id_unit: number | null;
  weight?: number;
  applycation?:string
};
export type MaterialsType = MaterialsInput & CommonTypesDataBase;
export type ProfitMarginInput = {
  id_opportunity: number;
  id_quote: number;
  materials: number;
  labor: number;
  subcontracting: number;
  others: number;
  general: number;
}
export type FamilyInput = {
  description: string
}
export type FamilyType = FamilyInput & CommonTypesDataBase;
export type CategoryInput = {
  description: string;
  id_family: number
}
export type CategoryType = CategoryInput & CommonTypesDataBase;
export type SubCategoryInput = {
  description: string;
  id_category: number
}
export type SubCategoryType = SubCategoryInput & CommonTypesDataBase;

export type UnitsInput = {
  description: string;
  abbreviation: string
}
export type UnitsType = UnitsInput & CommonTypesDataBase;

export type ProfitMarginType = ProfitMarginInput & CommonTypesDataBase;
export const opportunityApi = createCrud<OpportunityType, OpportunityInput>(
  "opportunities"
);
export const phasesApi = createCrud<PhasesType, PhasesInput>("phases");
export const quotesApi = createCrud<QuotesType, QuotesInput>(
  "quotes"
);
export const details_itemsApi = createCrud<DetailsItemsType, DetailsItemsInput>(
  "details_items"
);
export const details_materialsApi = createCrud<
  DetailsMaterialsType,
  DetailsMaterialsInput
>("details_materials");
export const pricesApi = createCrud<PricesType, PricesInput>("prices");
export const materialsApi = createCrud<MaterialsType, MaterialsInput>(
  "materials"
);
export const profitMarginApi = createCrud<ProfitMarginType, ProfitMarginInput>(
  "profit_margins"
);
export const familyApi = createCrud<FamilyType, FamilyInput>(
  "families"
);
export const categoryApi = createCrud<CategoryType, CategoryInput>(
  "categories"
);
export const subcategoryApi = createCrud<SubCategoryType, SubCategoryInput>(
  "subcategories"
);
export const unitsApi = createCrud<UnitsType, UnitsInput>(
  "units"
);
