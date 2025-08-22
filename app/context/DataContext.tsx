import React, { createContext, useContext, useState } from "react";
import type { ProjectsUI } from "~/types/projectsType";
import type {
  DetailsItemsDB,
  DetailsMaterialsDB,
  QuotesDB,
  QuotesUI,
  OpportunityAndQuotesUI,
  OpportunityUITable
} from "~/types/opportunitiesType";
import { supabase } from "~/backend/supabaseClient";
import { useContacts } from "./ContactsContext";
import { setEntities } from "~/services/fetchers/fetchEntitiesWithClient";
import type { MaterialsUI } from "~/types/materialsType";
import { getQuoteTotals, roundToPrecision } from "~/utils/functions";
type DataContextType = {
  projects: ProjectsUI[] | null;
  getProjects: () => Promise<void>;
  opportunities: OpportunityUITable[] | null;
  getOpportunities: () => Promise<void>;
  materials: MaterialsUI[] | null;
  getMaterials: () => Promise<void>;
  getOpportunityById: (id: number) => Promise<OpportunityAndQuotesUI | null>;
  selectedOpportunity: OpportunityAndQuotesUI | null;
  refreshOpportunity: () => Promise<void>;
  setSelectedOpportunity: (opportunity: OpportunityAndQuotesUI | null) => void;
};
const DataContext = createContext<DataContextType | undefined>(undefined);
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { clients } = useContacts();
  const [projects, setProjects] = useState<ProjectsUI[] | null>(null);
  const [opportunities, setOpportunities] = useState<OpportunityUITable[] | null>(
    null
  );
  const [materials, setMaterials] = useState<MaterialsUI[] | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityAndQuotesUI | null>(null);
  const getProjects = async (): Promise<void> => {
    if (clients) {
      setEntities<ProjectsUI>({
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
  const getMaterials = async (): Promise<void> => {
    setEntities<MaterialsUI>({
      table: "materials",
      select: "*, prices(*), view_categorizations(*)",
      setData: setMaterials,
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
        const idsQuotes = opportunity.quotes.map(
          (quote: QuotesDB) => quote.id
        );
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
          const orifinalsQuotes: QuotesUI[] = opportunity.quotes;
          const updatedQuotes: QuotesUI[] = orifinalsQuotes.map((q) => {
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
        setSelectedOpportunity
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
