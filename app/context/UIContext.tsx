import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useContacts, type ClientDataType } from "./ContactsContext";
import type { ModalBaseProps } from "~/components/Generals/Modals";
import { supabase } from "~/backend/supabaseClient";
import {
  categoryApi,
  familyApi,
  subcategoryApi,
  unitsApi,
} from "~/backend/dataBase";
import type { OpportunityType } from "~/types/database";
import {
  getQuoteTotals,
  roundToPrecision,
  type Totals,
} from "~/utils/functions";
import type {
  PhasesType,
  QuotesType,
  DetailsItemsType,
  DetailsMaterialsType,
  UnitsType,
  MaterialsType,
  PricesType,
  FamilyType,
  CategoryType,
  SubCategoryType,
} from "~/backend/dataBase";
import type { MyUser } from "./AuthContext";
export type QuotesEnrichType = QuotesType &
  Totals & {
    t_mg_materials: number;
    t_mg_labor: number;
    t_mg_subcontracting: number;
    t_mg_others: number;
    total: number;
    t_mg_total: number;
  };
export type Categorization = {
  description_category: string;
  description_family: string;
  description_subcategory: string;
  id_category: number;
  id_family: number;
  id_subcategory: number;
};
export type MaterialTypeDB = MaterialsType & {
  prices: PricesType[];
  view_categorizations: Categorization;
};
export type OpportunitiesTypeDB = OpportunityType & {
  client: ClientDataType;
  users: MyUser | null;
};
export type CategoriesProps = {
  id: number;
  description: string;
};
export type CategorizationsProps = {
  families: CategoriesProps[] | null;
  categories: Array<CategoriesProps & { id_family: number }> | null;
  subcategories: Array<CategoriesProps & { id_category: number }> | null;
};
export type OpportunitiesWithClient = OpportunityType & {
  client: ClientDataType;
};
type QuotesDataTypes = {
  details_items: DetailsItemsType[] | [];
  details_materials: DetailsMaterialsType[] | [];
};
export type OpportunityAll = OpportunitiesTypeDB & {
  phases: PhasesType[];
  quotes: QuotesEnrichType[];
} & QuotesDataTypes;
type ModalProps = Omit<ModalBaseProps, "onClose">;
type ThemeProps = "dark" | "light";

export type SelectedMaterialType = MaterialsType & {
  prices: PricesType[] | [];
};
type PropsModalPrice = {
  open: boolean;
  data: PricesType[] | null;
  idMaterial: number | null;
};
type UIContextType = {
  showModal: (modal: ModalProps) => void;
  closeModal: () => void;
  modal: ModalProps | null;
  toggleTheme: () => void;
  theme: ThemeProps;
  openClientModal: boolean;
  openSupplierModal: boolean;
  propsPriceModal: PropsModalPrice;
  openMaterialsModal: boolean;
  openQuotesModal: boolean;
  setOpenPriceModal: React.Dispatch<React.SetStateAction<PropsModalPrice>>;
  setOpenClientModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSupplierModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMaterialsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenQuotesModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedClient: ClientDataType | null;
  setSelectedClient: React.Dispatch<
    React.SetStateAction<ClientDataType | null>
  >;
  selectedSupplier: ClientDataType | null;
  setSelectedSupplier: React.Dispatch<
    React.SetStateAction<ClientDataType | null>
  >;
  selectedOpportunity: OpportunityAll | null;
  setSelectedOpportunity: React.Dispatch<
    React.SetStateAction<OpportunityAll | null>
  >;
  refreshOpportunity: () => Promise<void>;
  isModeEdit: boolean;
  setIsModeEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isFieldsChanged: boolean;
  setIsFieldsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetIsFieldsChanged: (
    isSubmitSuccessful: boolean,
    isDirty: boolean
  ) => void;
  categorizations: CategorizationsProps | null;
  setCategorizations: React.Dispatch<
    React.SetStateAction<CategorizationsProps | null>
  >;
  getCategorizations: () => Promise<void>;
  selectedMaterial: MaterialTypeDB | null;
  setSelectedMaterial: React.Dispatch<
    React.SetStateAction<MaterialTypeDB | null>
  >;
  getMaterial: (id: number, materialsList: MaterialTypeDB[]) => void;
  refreshMaterial: (id?: number) => Promise<void>;
  selectedPhase: number | null;
  setSelectedPhase: React.Dispatch<React.SetStateAction<number | null>>;

  materials: MaterialTypeDB[] | null;
  setMaterials: React.Dispatch<React.SetStateAction<MaterialTypeDB[] | null>>;
  getMaterials: () => Promise<MaterialTypeDB[]>;
  getUnits: () => Promise<void>;
  units: UnitsType[] | null;
  getOpportunities: () => Promise<OpportunitiesTypeDB[]>;
  opportunities: OpportunitiesTypeDB[] | null;
  setOpportunities: React.Dispatch<
    React.SetStateAction<OpportunitiesTypeDB[] | null>
  >;
  getOpportunityById: (
    id: number,
    onlyReturn?: boolean
  ) => Promise<OpportunityAll | null>;
  families: FamilyType[] | null;
  setFamilies: React.Dispatch<React.SetStateAction<FamilyType[] | null>>;
  getFamilies: () => Promise<void>;
  categories: CategoryType[] | null;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[] | null>>;
  getCategories: () => Promise<void>;
  subcategories: SubCategoryType[] | null;
  setSubcategories: React.Dispatch<
    React.SetStateAction<SubCategoryType[] | null>
  >;
  getSubcategories: () => Promise<void>;
  editByStatus: boolean;
  setEditByStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState<ThemeProps>(
    prefersDark ? "dark" : "light"
  );
  /* Datos */
  const [materials, setMaterials] = useState<MaterialTypeDB[] | null>(null);
  const [opportunities, setOpportunities] = useState<
    OpportunitiesTypeDB[] | null
  >(null);
  const [units, setUnits] = useState<UnitsType[] | null>(null);
  const [families, setFamilies] = useState<FamilyType[] | null>(null);
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [subcategories, setSubcategories] = useState<SubCategoryType[] | null>(
    null
  );
  const [categorizations, setCategorizations] =
    useState<CategorizationsProps | null>(null);
  const { clients } = useContacts();
  const [editByStatus, setEditByStatus] = useState<boolean>(false);
  /* Seleccionados */
  const [selectedClient, setSelectedClient] = useState<ClientDataType | null>(
    null
  );
  const [selectedMaterial, setSelectedMaterial] =
    useState<MaterialTypeDB | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<OpportunityAll | null>(null);

  const [selectedSupplier, setSelectedSupplier] =
    useState<ClientDataType | null>(null);
  /* Booleans */
  const [isFieldsChanged, setIsFieldsChanged] = useState<boolean>(false);
  const [isModeEdit, setIsModeEdit] = useState<boolean>(false);
  /* Modales */
  const [modal, setModal] = useState<ModalProps | null>(null);
  const showModal = (modal: ModalProps) => setModal(modal);
  const closeModal = () => setModal(null);
  /* Modales Específicos */
  const [openClientModal, setOpenClientModal] = useState<boolean>(false);
  const [openMaterialsModal, setOpenMaterialsModal] = useState<boolean>(false);
  const [openQuotesModal, setOpenQuotesModal] = useState<boolean>(false);
  const [propsPriceModal, setOpenPriceModal] = useState<PropsModalPrice>({
    open: false,
    data: null,
    idMaterial: null,
  });
  const [openSupplierModal, setOpenSupplierModal] = useState<boolean>(false);
  /* Funcines */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    document.documentElement.setAttribute(
      "data-theme",
      theme === "dark" ? "light" : "dark"
    );
  };
  const getCategorizations = async () => {
    try {
      const {
        data,
        error,
      }: { data: Categorization[] | null; error: Error | null } = await supabase
        .from("view_categorizations")
        .select("*");
      if (error) throw new Error(error.message);
      const subcategories = data?.map((item) => {
        return {
          id: item.id_subcategory,
          description: item.description_subcategory,
          id_category: item.id_category,
        };
      });
      const categoriesAll = data?.map((item) => {
        return {
          id: item.id_category,
          description: item.description_category,
          id_family: item.id_family,
        };
      });
      const categories = Array.from(
        new Map(categoriesAll?.map((item) => [item.id, item])).values()
      );
      const familiesAll = data?.map((item) => {
        return { id: item.id_family, description: item.description_family };
      });
      const families = Array.from(
        new Map(familiesAll?.map((item) => [item.id, item])).values()
      );

      setCategorizations({
        families: families,
        categories: categories,
        subcategories: subcategories ?? null,
      });
    } catch (e) {
      showModal({
        title: "Error",
        message: "Problemas al obtener datos",
        code: String(e),
        variant: "error",
      });
    }
  };
  const getMaterials = async (): Promise<MaterialTypeDB[]> => {
    let allData: MaterialTypeDB[] = [];
    let from = 0;
    const pageSize = 1000;

    while (true) {
      const { data, error, count } = await supabase
        .from("materials")
        .select("*, prices(*), view_categorizations(*)", { count: "exact" })
        .order("id", { ascending: true })
        .range(from, from + pageSize - 1);

      if (error) throw new Error("Error: " + error.message);
      if (!data || data.length === 0) break;

      allData = allData.concat(data);
      from += pageSize;

      if (data.length < pageSize) break;
    }
    setMaterials(allData);
    return allData;
  };
  const getMaterial = (id: number, materialsList: MaterialTypeDB[]) => {
    const data = materialsList.find((item) => item.id === id);
    setSelectedMaterial(data || null);
  };
  const refreshMaterial = async (id?: number) => {
    const { id: idSelected } = selectedMaterial || {};
    const idMaterial = idSelected ? idSelected : id;
    if (!idMaterial) return;
    const updatedMaterials = await getMaterials();
    if (!updatedMaterials) return;
    getMaterial(idMaterial, updatedMaterials);
  };

  const getOpportunities = async (): Promise<OpportunitiesTypeDB[]> => {
    let allData: OpportunitiesTypeDB[] = [];
    let from = 0;
    const pageSize = 1000;

    while (true) {
      const { data, error, count } = await supabase
        .from("opportunities")
        .select("*, users(*)")
        .order("id", { ascending: false })
        .range(from, from + pageSize - 1);

      if (error) throw new Error("Error: " + error.message);

      if (!data || data.length === 0) break;

      allData = allData.concat(data);
      from += pageSize;
      if (data.length < pageSize) break;
      
    }
    if (clients && clients.length > 0) {
      setOpportunities(
        allData
          .map((item) => {
            const client = clients.find((c) => c.id === item.id_client);
            if (!client) return null; // filter out if no client found
            return { ...item, client };
          })
          .filter((item): item is OpportunitiesTypeDB => item !== null)
      );
    }
    return allData;
  };
  const getOpportunityById = async (
    id: number,
    onlyReturn?: boolean
  ): Promise<OpportunityAll | null> => {
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

      let dataQuotes: QuotesDataTypes = {
        details_items: [],
        details_materials: [],
      };

      if (hasQuotes) {
        const idsQuotes = opportunity.quotes.map(
          (quote: QuotesType) => quote.id
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
          const orifinalsQuotes: QuotesEnrichType[] = opportunity.quotes;
          const updatedQuotes: QuotesEnrichType[] = orifinalsQuotes.map((q) => {
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
      const completedOpportunity: OpportunityAll = {
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
  const handleSetIsFieldsChanged = (
    isSubmitSuccessful: boolean,
    isDirty: boolean
  ): void => {
    setIsFieldsChanged?.(isDirty);
    if (isSubmitSuccessful) {
      setIsFieldsChanged(false);
    }
  };
  const getUnits = async () => {
    const { data, error } = await unitsApi.getAll({});
    if (error)
      showModal({
        title: "Error",
        message: "Hubo un problema la traer las unidades",
        code: String(error.message),
        variant: "error",
      });
    setUnits(data);
  };
  const getFamilies = async () => {
    const { data, error } = await familyApi.getAll({});
    if (error)
      showModal({
        title: "Error",
        message: "Hubo un problema la traer las unidades",
        code: String(error.message),
        variant: "error",
      });
    setFamilies(data);
  };
  const getCategories = async () => {
    const { data, error } = await categoryApi.getAll({});
    if (error)
      showModal({
        title: "Error",
        message: "Hubo un problema la traer las unidades",
        code: String(error.message),
        variant: "error",
      });
    setCategories(data);
  };
  const getSubcategories = async () => {
    const { data, error } = await subcategoryApi.getAll({});
    if (error)
      showModal({
        title: "Error",
        message: "Hubo un problema la traer las unidades",
        code: String(error.message),
        variant: "error",
      });
    setSubcategories(data);
  };
  return (
    <UIContext.Provider
      value={{
        showModal,
        closeModal,
        modal,
        toggleTheme,
        theme,
        openClientModal,
        setOpenClientModal,
        selectedClient,
        setSelectedClient,
        selectedOpportunity,
        setSelectedOpportunity,
        refreshOpportunity,
        isModeEdit,
        setIsModeEdit,
        isFieldsChanged,
        setIsFieldsChanged,
        handleSetIsFieldsChanged,
        categorizations,
        setCategorizations,
        getCategorizations,
        selectedMaterial,
        setSelectedMaterial,
        propsPriceModal,
        setOpenPriceModal,
        openSupplierModal,
        setOpenSupplierModal,
        selectedSupplier,
        setSelectedSupplier,
        getMaterial,
        refreshMaterial,
        selectedPhase,
        setSelectedPhase,
        openMaterialsModal,
        setOpenMaterialsModal,
        getMaterials,
        materials,
        setMaterials,
        getUnits,
        units,
        getOpportunities,
        opportunities,
        setOpportunities,
        getOpportunityById,
        families,
        setFamilies,
        getFamilies,
        categories,
        setCategories,
        getCategories,
        subcategories,
        setSubcategories,
        getSubcategories,
        setEditByStatus,
        editByStatus,
        openQuotesModal,
        setOpenQuotesModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI debe usarse dentro de <UIProvider>");
  return context;
}
