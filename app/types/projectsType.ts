import type {
  ContactsDataType,
  EmployeesDataType,
} from "~/context/ContactsContext";
import type { MyUser } from "~/context/AuthContext";
import type { CommonPropsDB } from "./sharedTypes";
import type { PricesDB, MaterialsDB } from "~/types/materialsType";
import type { Totals } from "~/utils/functions";
import type { TotalsMargens } from "./opportunitiesType";
export type StatusProjectsType =
  | "Nuevo"
  | "Planificado"
  | "En proceso"
  | "Ejecutado";
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
  status?: StatusProjectsType;
  mode?: "0000000" | "0000010" | "0000011" | "";
  customer_requirement: boolean;
};
export type ProjectsDB = CommonPropsDB & ProjectsProps;
export type ProjectsUITable = ProjectsDB & {
  client: ContactsDataType;
  users: MyUser;
  phases_project_supervisors: {id_supervisor: number}[];
};
/* Phases project */
export type PhasesProjectProps = {
  name: string;
  id_project: number;
  id_supervisor?: number;
  viaticum?: boolean;
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
export type BudgetMaterialsDB = BudgetMaterialsProps & CommonPropsDB;
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
export type ProjectAndBudgetUI = ProjectsUITable &
  TotalsMargens &
  Omit<Totals, "id_quote"> & {
    phases_project: (PhasesProjectDB & {
      tasks: ((TaskDB & { progress: number }) & {
        task_assignments: TaskAssignmentDB[];
      })[];
      daily_reports: DailyReportUI[];
    })[];
    budget_details_items: BudgetItemDB[];
    budget_details_materials: BudgetMaterialsDB[];
    client: ContactsDataType;
  };

export type TaskProps = {
  name: string;
  id_phase: number;
  duration: number;
  planned?: boolean;
  startDate?: string;
  endDate?: string;
  peopleCount?: number;
  observations?: string;
  checklistCompleted?: boolean;
};
export type TaskDB = TaskProps & CommonPropsDB;
export type TaskAssignmentProps = {
  id_task: number;
  id_employee: number;
  active: boolean;
};
export type TaskAssignmentDB = TaskAssignmentProps & CommonPropsDB;
export type DailyReportProps = {
  id_phase: number;
  date_report: string;
  status: string;
};
export type DailyReportDB = DailyReportProps & CommonPropsDB;
export type ReportTaskProps = {
  id_task: number;
  id_daily_report: number;
  progress: number;
};
export type DailyReportUI = DailyReportDB & {
  report_tasks: ReportTaskDB[];
  report_employees: ReportEmployeeDB[];
};
export type ReportTaskDB = ReportTaskProps & CommonPropsDB;
export type ViewTasks = {
  id: number;
  id_phase: number;
  name: string;
  progress_total: number;
};
export type ReportEmployeeProps = {
  id_daily_report: number;
  id_employee: number;
  hour_start: string | null;
  hour_end: string | null;
  observation?: string | null;
  absent: boolean;
};
export type ReportEmployeeDB = ReportEmployeeProps & CommonPropsDB;
export type ReportsEmployeesUIView = ReportEmployeeDB & {
  date_report: string;
  employee?: EmployeesDataType;
  id_phase: number;
  phase_name?: string;
  id_project: number;
  project_name?: string;
  hours_worked?: number;
}
export type DailyReportsView = DailyReportDB &{
  name_phase: string;
  name_project: string;
  id_supervisor: number;
  id_project: number;
}

export type HolidaysProps = {
  date: string;
  name?: string | null;
  created_by?: string | null;
};

export type HolidaysDB = CommonPropsDB & HolidaysProps;
