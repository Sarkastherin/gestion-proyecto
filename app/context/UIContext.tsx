import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useContacts, type ClientDataType } from "./ContactsContext";
import type { ModalBaseProps } from "~/components/Generals/Modals";
import { supabase } from "~/backend/supabaseClient";
import type { MaterialsUI } from "~/types/materialsType";
import {
  categoryApi,
  familyApi,
  subcategoryApi,
  unitsApi,
} from "~/backend/dataBase";
import type { OpportunityType } from "~/types/database";

import type {
  UnitsType,
  MaterialsType,
  PricesType,
  FamilyType,
  CategoryType,
  SubCategoryType,
} from "~/backend/dataBase";
import type { MyUser } from "./AuthContext";
export type Categorization = {
  description_category: string;
  description_family: string;
  description_subcategory: string;
  id_category: number;
  id_family: number;
  id_subcategory: number;
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
  selectedMaterial: MaterialsUI | null;
  setSelectedMaterial: React.Dispatch<
    React.SetStateAction<MaterialsUI | null>
  >;
  getMaterial: (id: number, materialsList: MaterialsUI[]) => void;
  refreshMaterial: (id?: number) => Promise<void>;
  selectedPhase: number | null;
  setSelectedPhase: React.Dispatch<React.SetStateAction<number | null>>;

  materials: MaterialsUI[] | null;
  setMaterials: React.Dispatch<React.SetStateAction<MaterialsUI[] | null>>;
  getMaterials: () => Promise<MaterialsUI[]>;
  getUnits: () => Promise<void>;
  units: UnitsType[] | null;
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
  const [materials, setMaterials] = useState<MaterialsUI[] | null>(null);
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
    useState<MaterialsUI | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

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
  const getMaterials = async (): Promise<MaterialsUI[]> => {
    let allData: MaterialsUI[] = [];
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
  const getMaterial = (id: number, materialsList: MaterialsUI[]) => {
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
