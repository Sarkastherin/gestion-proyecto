import { createCrud } from "./crudFactory";
import type {
  OpportunityDB,
  PhasesDB,
  QuotesDB,
  DetailsItemsDB,
  DetailsMaterialsDB,
} from "~/types/opportunitiesType";
import type {
  PricesDB,
  MaterialsDB,
  FamilyDB,
  CategoryDB,
  SubCategoryDB,
  UnitsDB,
} from "~/types/materialsType";
import type {
  BudgetMaterialsDB,
  ProjectsDB,
  PhasesProjectDB,
  BudgetItemDB,
  TaskDB,
  TaskAssignmentDB,
  DailyReportDB,
  ReportTaskDB,
  ReportEmployeeDB
} from "~/types/projectsType";
export const opportunityApi = createCrud<OpportunityDB>("opportunities");
export const phasesApi = createCrud<PhasesDB>("phases");
export const quotesApi = createCrud<QuotesDB>("quotes");
export const details_itemsApi = createCrud<DetailsItemsDB>("details_items");
export const details_materialsApi =
  createCrud<DetailsMaterialsDB>("details_materials");
export const pricesApi = createCrud<PricesDB>("prices");
export const materialsApi = createCrud<MaterialsDB>("materials");
export const familyApi = createCrud<FamilyDB>("families");
export const categoryApi = createCrud<CategoryDB>("categories");
export const subcategoryApi = createCrud<SubCategoryDB>("subcategories");
export const unitsApi = createCrud<UnitsDB>("units");

export const projectsApi = createCrud<ProjectsDB>("projects");
export const phasesProjectApi = createCrud<PhasesProjectDB>("phases_project");
export const budgetItemsApi = createCrud<BudgetItemDB>("budget_details_items");
export const budgetMaterialsApi = createCrud<BudgetMaterialsDB>(
  "budget_details_materials"
);
export const tasksApi = createCrud<TaskDB>("tasks");
export const taskAssignmentsApi = createCrud<TaskAssignmentDB>("task_assignments");
export const dailyReportsApi = createCrud<DailyReportDB>("daily_reports");
export const reportTasksApi = createCrud<ReportTaskDB>("report_tasks");
export const reportEmployeesApi = createCrud<ReportEmployeeDB>("report_employees");