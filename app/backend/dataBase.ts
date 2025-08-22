import { createCrud } from "./crudFactory";
import type {
  CommonTypesDataBase,
} from "~/types/database";
import type {
  OpportunityDB,
  PhasesDB,
  QuotesDB,
  DetailsItemsDB,
  DetailsMaterialsDB,
} from "~/types/opportunitiesType";
import type { PricesDB, MaterialsDB, FamilyDB, CategoryDB, SubCategoryDB, UnitsDB } from "~/types/materialsType";
import type { BudgetMaterialsDB, ProjectsDB, PhasesProjectDB, BudgetItemDB } from "~/types/projectsType";
type PhasesInput = {
  name: string;
  id_opportunity: number;
  history_data?: object;
};
type PhasesType = PhasesInput & CommonTypesDataBase;
type QuotesInput = {
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
type QuotesType = QuotesInput & CommonTypesDataBase;
type DetailsItemsInput = {
  id_quote: number;
  id_phase: number;
  type: "mano de obra" | "subcontratos" | "otros";
  item: string;
  quantity: number;
  unit_cost: number;
  notes?: string;
  observations?: string;
  total?: number;
};
type DetailsItemsType = DetailsItemsInput & CommonTypesDataBase;
type DetailsMaterialsInput = {
  id_quote: number;
  id_phase: number;
  type: "materiales";
  id_material: number;
  quantity: number;
  id_price: number;
  notes?: string;
  observations?: string;
};
type MaterialsInput = {
  id_subcategory: number | null;
  description: string;
  id_unit: number | null;
  weight?: number;
  applycation?: string;
};
export type MaterialsType = MaterialsInput & CommonTypesDataBase;

type FamilyInput = {
  description: string;
};
type FamilyType = FamilyInput & CommonTypesDataBase;
type CategoryInput = {
  description: string;
  id_family: number;
};
type CategoryType = CategoryInput & CommonTypesDataBase;
type SubCategoryInput = {
  description: string;
  id_category: number;
};
type SubCategoryType = SubCategoryInput & CommonTypesDataBase;

type UnitsInput = {
  description: string;
  abbreviation: string;
};
type UnitsType = UnitsInput & CommonTypesDataBase;

export const opportunityApi = createCrud<OpportunityDB>("opportunities");
export const phasesApi = createCrud<PhasesDB>("phases");
export const quotesApi = createCrud<QuotesDB>("quotes");
export const details_itemsApi = createCrud<DetailsItemsDB>("details_items");
export const details_materialsApi =
  createCrud<DetailsMaterialsDB>("details_materials");
export const pricesApi = createCrud<PricesDB>("prices");
export const materialsApi = createCrud<MaterialsDB>(
  "materials"
);
export const familyApi = createCrud<FamilyDB>("families");
export const categoryApi = createCrud<CategoryDB>("categories");
export const subcategoryApi = createCrud<SubCategoryDB>("subcategories");
export const unitsApi = createCrud<UnitsDB>("units");
export type ProjetcInput = {
  name: string;
  id_client: number;
  scope?: string;
  id_opportunity: number;
  id_quote: number;
  method_payment?: string;
  guarantee?: string;
  materials?: number;
  labor?: number;
  subcontracting?: number;
  others?: number;
  general?: number;
  plan_start_date?: string;
  plan_end_date?: string;
  plan_duration?: number;
  start_date?: string;
  end_date?: string;
  duration?: number;
};
export type ProjectsType = ProjetcInput & CommonTypesDataBase;
export const projectsApi = createCrud<ProjectsDB>("projects");
export type PhasesProjectInput = {
  name: string;
  id_project: number;
};
export type PhasesProjectType = PhasesProjectInput & CommonTypesDataBase;
export const phasesProjectApi = createCrud<PhasesProjectDB>("phases_project");
type BudgetItemInput = {
  id_phase: number;
  id_project: number;
  type: "materiales" | "mano de obra" | "subcontratos" | "otros";
  item: string;
  quantity: number;
  unit_cost: number;
  notes?: string;
  observations?: string;
  created_by?: string;
};
type BudgetItemType = BudgetItemInput & CommonTypesDataBase;
export const budgetItemsApi = createCrud<BudgetItemDB>(
  "budget_details_items"
);

export const budgetMaterialsApi = createCrud<BudgetMaterialsDB>(
  "budget_details_materials"
);
