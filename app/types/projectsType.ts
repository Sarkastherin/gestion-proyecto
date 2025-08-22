import type { ClientDataType } from "~/context/ContactsContext";
import type { MyUser } from "~/context/AuthContext";
import type { CommonPropsDB } from "./sharedTypes";
import type { PricesDB, MaterialsDB } from "~/types/materialsType";
export type StatusProjectsType = "Nuevo" | "Planificado" | "En proceso" | "Ejecutado"
export type ProjectsProps = {
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
  status?: StatusProjectsType
};
export type ProjectsDB = CommonPropsDB & ProjectsProps;
export type ProjectsUI = ProjectsDB & {
  client: ClientDataType;
  users: MyUser;
};
/* Phases project */
export type PhasesProjectProps = {
  name: string;
  id_project: number;
};
export type PhasesProjectDB = PhasesProjectProps & CommonPropsDB;

/* Budget Material */
export type BudgetMaterialsProps = {
  id_phase: number;
  id_project: number;
  type: "materiales";
  id_material: number;
  id_price: number;
  quantity: number;
  notes?: string;
  observations?: string;
  created_by?: string;
};
export type BudgetMaterialsDB= BudgetMaterialsProps & CommonPropsDB
export type BudgetMaterialsUI = BudgetMaterialsDB & {
  materials: MaterialsDB;
  prices: PricesDB | {};
};
/* Budget Items */
export type BudgetItemProps = {
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
export type BudgetItemDB = BudgetItemProps & CommonPropsDB;