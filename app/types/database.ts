import type { StatusOpportunityType } from "./opportunitiesType";
/* export type StatusType =
  | "Nuevo"
  | "Desestimada"
  | "En proceso"
  | "Enviada"
  | "Revisión"
  | "Ganada"
  | "Perdida"
  | "Vencida"
  | "No status";
 */
export type CommonTypesDataBase = {
  id: number;
  created_at: string;
};
export type OpportunityType = OpportunityInput & CommonTypesDataBase;
export type OpportunityInput = {
  name: string;
  scope?: string;
  id_client: number;
  status: StatusOpportunityType;
  created_by: string;
  loss_reason?: string | null;
  id_project?: number | null;
};
