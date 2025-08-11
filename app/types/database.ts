export type StatusType =
  | "Nuevo"
  | "Desestimada"
  | "En proceso"
  | "Enviada"
  | "Revisión"
  | "Ganada"
  | "Perdida"
  | "No status";

export type CommonTypesDataBase = {
  id: number;
  created_at: string;
};
export type OpportunityType = OpportunityInput & CommonTypesDataBase;
export type OpportunityInput = {
  name: string;
  scope?: string;
  id_client: number;
  status: StatusType;
  created_by: string;
  history_data?: {} | null;
  loss_reason?: string | null;
  user_id:string
};
