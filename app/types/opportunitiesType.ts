import type { ContactsDataType } from "~/context/ContactsContext";
import type { MyUser } from "~/context/AuthContext";
import type { CommonPropsDB } from "./sharedTypes";
import type { Totals } from "~/utils/functions";
//import type { MaterialsType } from "~/backend/dataBase";
import type { PricesDB, MaterialsDB } from "~/types/materialsType";
export type StatusOpportunityType =
  | "Nuevo"
  | "Desestimada"
  | "En proceso"
  | "Enviada"
  | "Revisión"
  | "Ganada"
  | "Perdida"
  | "No status";
export type OpportunityProps = {
  name: string;
  id_client: number;
  scope?: string;
  loss_reason?: string;
  status: StatusOpportunityType;
  id_project?: number;
};
export type OpportunityDB = CommonPropsDB & OpportunityProps;
export type OpportunityUITable = OpportunityDB & {
  client: ContactsDataType;
  users: MyUser;
};
export type OpportunityAndQuotesUI = OpportunityUITable & {
  phases: PhasesDB[];
  quotes: QuotesUI[];
  details_materials: DetailsMaterialsUI[];
  details_items: DetailsItemsDB[];
};
/* Phases */
export type PhasesProps = {
  name: string;
  id_opportunity: number;
};
export type PhasesDB = PhasesProps & CommonPropsDB;
/* Quotes */
export type QuotesProps = {
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
export type TotalsMargens = {
  t_mg_materials: number;
  t_mg_labor: number;
  t_mg_subcontracting: number;
  t_mg_others: number;
  total: number;
  t_mg_total: number;
};
export type QuotesDB = CommonPropsDB & QuotesProps;
export type QuotesUI = QuotesDB & Totals & TotalsMargens;
/* Details Quotes */
export type DetailsItemsProps = {
  id_quote: number;
  id_phase: number;
  type: "mano de obra" | "subcontratos" | "otros";
  item: string;
  quantity: number;
  unit_cost: number;
  notes?: string;
  observations?: string;
};
export type DetailsItemsDB = CommonPropsDB & DetailsItemsProps;
export type DetailsMaterialsProps = {
  id_quote: number;
  id_phase: number;
  type: "materiales";
  id_material: number;
  quantity: number;
  id_price: number;
  notes?: string;
  observations?: string;
};
export type DetailsMaterialsDB = CommonPropsDB & DetailsMaterialsProps;
export type DetailsMaterialsUI = DetailsMaterialsDB & {
  materials: MaterialsDB;
  prices: PricesDB | {};
};
