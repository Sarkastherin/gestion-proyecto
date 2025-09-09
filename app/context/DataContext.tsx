import React, { createContext, useContext, useState } from "react";
import type { ProjectsUITable, ProjectAndBudgetUI, ViewTasks } from "~/types/projectsType";
import type {
  DetailsItemsDB,
  DetailsMaterialsDB,
  QuotesDB,
  QuotesUI,
  OpportunityAndQuotesUI,
  OpportunityUITable,
} from "~/types/opportunitiesType";
import { supabase } from "~/backend/supabaseClient";
import { useContacts } from "./ContactsContext";
import { setEntities } from "~/services/fetchers/fetchEntitiesWithClient";
import type {
  MaterialsUI,
  UnitsDB,
  FamilyDB,
  CategoryDB,
  SubCategoryDB,
} from "~/types/materialsType";
import {
  getQuoteTotals,
  roundToPrecision,
  getBudgetTotals,
} from "~/utils/functions";
type DataContextType = {
  projects: ProjectsUITable[] | null;
  getProjects: () => Promise<void>;
  opportunities: OpportunityUITable[] | null;
  getOpportunities: () => Promise<void>;
  materials: MaterialsUI[] | null;
  getMaterials: () => Promise<MaterialsUI[]>;
  getOpportunityById: (
    id: number,
    onlyReturn?: boolean
  ) => Promise<OpportunityAndQuotesUI | null>;
  selectedOpportunity: OpportunityAndQuotesUI | null;
  refreshOpportunity: () => Promise<void>;
  setSelectedOpportunity: (opportunity: OpportunityAndQuotesUI | null) => void;
  refreshMaterial: (id?: number) => Promise<void>;
  getMaterial: (id: number, materialsList: MaterialsUI[]) => void;
  getUnits: () => Promise<UnitsDB[]>;
  units: UnitsDB[] | null;
  getFamilies: () => Promise<FamilyDB[]>;
  families: FamilyDB[] | null;
  getCategories: () => Promise<CategoryDB[]>;
  categories: CategoryDB[] | null;
  getSubcategories: () => Promise<SubCategoryDB[]>;
  subcategories: SubCategoryDB[] | null;
  selectedMaterial: MaterialsUI | null;
  setSelectedMaterial: (material: MaterialsUI | null) => void;
  getProjectById: (id: number) => Promise<ProjectAndBudgetUI | null>;
  selectedProject: ProjectAndBudgetUI | null;
  refreshProject: (id?: number) => Promise<void>;
  getTasksByIdPhase: (id: number) => Promise<ViewTasks[] | null>;
  tasksProgress: ViewTasks[] | null;
  setTasksProgress: React.Dispatch<React.SetStateAction<ViewTasks[] | null>>;
};
const DataContext = createContext<DataContextType | undefined>(undefined);
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { clients } = useContacts();
  const [projects, setProjects] = useState<ProjectsUITable[] | null>(null);
  const [opportunities, setOpportunities] = useState<
    OpportunityUITable[] | null
  >(null);
  const [units, setUnits] = useState<UnitsDB[] | null>(null);
  const [families, setFamilies] = useState<FamilyDB[] | null>(null);
  const [categories, setCategories] = useState<CategoryDB[] | null>(null);
  const [subcategories, setSubcategories] = useState<SubCategoryDB[] | null>(
    null
  );
  const [materials, setMaterials] = useState<MaterialsUI[] | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<OpportunityAndQuotesUI | null>(null);
  const [selectedProject, setSelectedProject] =
    useState<ProjectAndBudgetUI | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialsUI | null>(
    null
  );
  const [tasksProgress, setTasksProgress] = useState<ViewTasks[] | null>(null);
  const getProjects = async (): Promise<void> => {
    if (clients) {
      setEntities<ProjectsUITable>({
        table: "projects",
        select: "*, users(*)",
        clientKey: "id_client",
        clients,
        setData: setProjects,
      });
    }
  };
  const getOpportunities = async (): Promise<void> => {
    if (clients) {
      setEntities<OpportunityUITable>({
        table: "opportunities",
        select: "*, users(*)",
        clientKey: "id_client",
        clients,
        setData: setOpportunities,
      });
    }
  };
  const getMaterials = async (): Promise<MaterialsUI[]> => {
    return setEntities<MaterialsUI>({
      table: "materials",
      select: "*, prices(*), view_categorizations(*)",
      setData: setMaterials,
    });
  };
  const getUnits = async (): Promise<UnitsDB[]> => {
    return setEntities<UnitsDB>({
      table: "units",
      select: "*",
      setData: setUnits,
    });
  };
  const getFamilies = async (): Promise<FamilyDB[]> => {
    return setEntities<FamilyDB>({
      table: "families",
      select: "*",
      setData: setFamilies,
    });
  };
  const getCategories = async (): Promise<CategoryDB[]> => {
    return setEntities<CategoryDB>({
      table: "categories",
      select: "*",
      setData: setCategories,
    });
  };
  const getSubcategories = async (): Promise<SubCategoryDB[]> => {
    return setEntities<SubCategoryDB>({
      table: "subcategories",
      select: "*",
      setData: setSubcategories,
    });
  };
  const getOpportunityById = async (
    id: number,
    onlyReturn?: boolean
  ): Promise<OpportunityAndQuotesUI | null> => {
    try {
      const { data: opportunity, error } = await supabase
        .from("opportunities")
        .select("*, phases(*), quotes(*)")
        .eq("id", id)
        .single();

      if (error || !opportunity)
        throw new Error("No se pudo obtener la oportunidad");

      const client = clients?.find((c) => c.id === opportunity.id_client);
      if (!client) throw new Error("Cliente no encontrado");
      const hasQuotes =
        Array.isArray(opportunity.quotes) && opportunity.quotes.length > 0;
      interface QuotesDataTypes {
        details_items: DetailsItemsDB[];
        details_materials: DetailsMaterialsDB[];
      }
      let dataQuotes: QuotesDataTypes = {
        details_items: [],
        details_materials: [],
      };

      if (hasQuotes) {
        const idsQuotes = opportunity.quotes.map((quote: QuotesDB) => quote.id);
        const { data, error } = await supabase
          .from("quotes")
          .select(
            "details_items(*), details_materials(*,materials:id_material(*),prices:id_price(*))"
          )
          .in("id", idsQuotes);

        if (error)
          throw new Error(
            `Error al obtener detalles de quotes: ${error.message}`
          );
        if (data?.length) {
          const originalsQuotes: QuotesUI[] = opportunity.quotes;
          const updatedQuotes: QuotesUI[] = originalsQuotes.map((q) => {
            const match = data.find((d) => {
              const id =
                d.details_items[0]?.id_quote ??
                d.details_materials[0]?.id_quote;
              return id === q.id;
            });

            if (!match) return q;
            const quoteTotals = getQuoteTotals(match);
            const t_mg_materials = roundToPrecision(
              quoteTotals.total_materials * ((q.materials ?? 0) / 100 + 1),
              2
            );
            const t_mg_labor = roundToPrecision(
              quoteTotals.total_labor * ((q.labor ?? 0) / 100 + 1),
              2
            );
            const t_mg_subcontracting = roundToPrecision(
              quoteTotals.total_subcontracting *
                ((q.subcontracting ?? 0) / 100 + 1),
              2
            );
            const t_mg_others = roundToPrecision(
              quoteTotals.total_others * ((q.others ?? 0) / 100 + 1),
              2
            );
            const total = roundToPrecision(
              t_mg_materials + t_mg_labor + t_mg_subcontracting + t_mg_others,
              2
            );
            const t_mg_total = roundToPrecision(
              total * ((q.general ?? 0) / 100 + 1),
              2
            );
            return {
              ...q,
              ...quoteTotals,
              t_mg_materials: t_mg_materials,
              t_mg_labor: t_mg_labor,
              t_mg_subcontracting: t_mg_subcontracting,
              t_mg_others: t_mg_others,
              total: total,
              t_mg_total: t_mg_total,
            };
          });

          opportunity.quotes = updatedQuotes;

          dataQuotes = {
            details_items: data.flatMap((q) => q.details_items ?? []),
            details_materials: data.flatMap((q) => q.details_materials ?? []),
          };
        }
      }
      const completedOpportunity: OpportunityAndQuotesUI = {
        ...opportunity,
        client,
        ...dataQuotes,
      };
      if (!onlyReturn) setSelectedOpportunity(completedOpportunity);
      return completedOpportunity;
    } catch (err) {
      console.error("Error en getOpportunityById:", err);
      return null;
    }
  };
  const getProjectById = async (
    id: number,
    onlyReturn?: boolean
  ): Promise<ProjectAndBudgetUI | null> => {
    try {
      const { data: project, error } = await supabase
        .from("projects")
        .select(
          "*, phases_project(*, tasks(*, task_assignments(*)), daily_reports(*, report_tasks(*), report_employees(*))), budget_details_items(*), budget_details_materials(*,materials:id_material(*),prices:id_price(*))"
        )
        .eq("id", id)
        .single();
      if (error || !project) throw new Error("No se pudo obtener el proyecto");
      const budget = {
        details_items: project.budget_details_items ?? [],
        details_materials: project.budget_details_materials ?? [],
      };
      const budgetTotals = getBudgetTotals(budget);
      const t_mg_materials = roundToPrecision(
        budgetTotals.total_materials * ((project.materials ?? 0) / 100 + 1),
        2
      );
      const t_mg_labor = roundToPrecision(
        budgetTotals.total_labor * ((project.labor ?? 0) / 100 + 1),
        2
      );
      const t_mg_subcontracting = roundToPrecision(
        budgetTotals.total_subcontracting *
          ((project.subcontracting ?? 0) / 100 + 1),
        2
      );
      const t_mg_others = roundToPrecision(
        budgetTotals.total_others * ((project.others ?? 0) / 100 + 1),
        2
      );
      const total = roundToPrecision(
        t_mg_materials + t_mg_labor + t_mg_subcontracting + t_mg_others,
        2
      );
      const t_mg_total = roundToPrecision(
        total * ((project.general ?? 0) / 100 + 1),
        2
      );
      const client = clients?.find((c) => c.id === project.id_client);
      if (!client) throw new Error("Cliente no encontrado");

      const completedProject: ProjectAndBudgetUI = {
        ...project,
        ...budgetTotals,
        t_mg_materials: t_mg_materials,
        t_mg_labor: t_mg_labor,
        t_mg_subcontracting: t_mg_subcontracting,
        t_mg_others: t_mg_others,
        total: total,
        t_mg_total: t_mg_total,
        client,
      };
      //if (!onlyReturn) setSelectedOpportunity(completedProject);
      setSelectedProject(completedProject);
      return completedProject;
    } catch (err) {
      console.error("Error en getProjectById:", err);
      return null;
    }
  };
  const getTasksByIdPhase = async (id: number): Promise<ViewTasks[] | null> => {
    const {data, error} = await supabase.from('view_tasks_progress').select('*').eq('id_phase', id);
    if (error) {
      console.error("Error en getTasksByIdPhase:", error);
      return null;
    }
    setTasksProgress
    (data);
    return data;
  };
  const getMaterial = (id: number, materialsList: MaterialsUI[]) => {
    const data = materialsList.find((item) => item.id === id);
    setSelectedMaterial(data || null);
  };
  const refreshOpportunity = async () => {
    if (!selectedOpportunity) return;
    const { id } = selectedOpportunity;
    const updatedOpportunity = await getOpportunityById(id);
    if (!updatedOpportunity) return;
    setOpportunities(
      (prev) =>
        prev?.map((opp) =>
          opp.id === updatedOpportunity.id ? updatedOpportunity : opp
        ) ?? []
    );
  };
  const refreshMaterial = async (id?: number) => {
    const { id: idSelected } = selectedMaterial || {};
    const idMaterial = idSelected ? idSelected : id;
    if (!idMaterial) return;
    const updatedMaterials = await getMaterials();
    if (!updatedMaterials || updatedMaterials.length === 0) return;
    getMaterial(idMaterial, updatedMaterials);
  };
  const refreshProject = async () => {
    if (!selectedProject) return;
    const { id } = selectedProject;
    const updateProject = await getProjectById(id);
    if (!updateProject) return;
    setProjects(
      (prev) =>
        prev?.map((proj) =>
          proj.id === updateProject.id ? updateProject : proj
        ) ?? []
    );
  };
  return (
    <DataContext.Provider
      value={{
        getProjects,
        projects,
        getOpportunities,
        opportunities,
        getMaterials,
        materials,
        getOpportunityById,
        selectedOpportunity,
        refreshOpportunity,
        setSelectedOpportunity,
        refreshMaterial,
        getMaterial,
        getUnits,
        units,
        getFamilies,
        families,
        getCategories,
        categories,
        getSubcategories,
        subcategories,
        selectedMaterial,
        setSelectedMaterial,
        getProjectById,
        selectedProject,
        refreshProject,
        getTasksByIdPhase,
        tasksProgress,
        setTasksProgress,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
