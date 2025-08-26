import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { type ContactsDataType } from "./ContactsContext";
import { supabase } from "~/backend/supabaseClient";
import { useUIModals } from "./ModalsContext";

import type { PricesDB } from "~/types/materialsType";
export type Categorization = {
  description_category: string;
  description_family: string;
  description_subcategory: string;
  id_category: number;
  id_family: number;
  id_subcategory: number;
};
export type CategoriesProps = {
  id: number;
  description: string;
};
type CategorizationsProps = {
  families: CategoriesProps[] | null;
  categories: Array<CategoriesProps & { id_family: number }> | null;
  subcategories: Array<CategoriesProps & { id_category: number }> | null;
};
type ThemeProps = "dark" | "light";

type PropsModalPrice = {
  open: boolean;
  data: PricesDB[] | null;
  idMaterial: number | null;
};
type UIContextType = {
  toggleTheme: () => void;
  theme: ThemeProps;
  openClientModal: boolean;
  openSupplierModal: boolean;
  propsPriceModal: PropsModalPrice;
  openQuotesModal: boolean;
  setOpenPriceModal: React.Dispatch<React.SetStateAction<PropsModalPrice>>;
  setOpenClientModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSupplierModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenQuotesModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedClient: ContactsDataType | null;
  setSelectedClient: React.Dispatch<
    React.SetStateAction<ContactsDataType | null>
  >;
  selectedSupplier: ContactsDataType | null;
  setSelectedSupplier: React.Dispatch<
    React.SetStateAction<ContactsDataType | null>
  >;
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
  selectedPhase: number | null;
  setSelectedPhase: React.Dispatch<React.SetStateAction<number | null>>;
  editByStatus: boolean;
  setEditByStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const { openModal } = useUIModals();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState<ThemeProps>(
    prefersDark ? "dark" : "light"
  );
  /* Datos */
  const [categorizations, setCategorizations] =
    useState<CategorizationsProps | null>(null);
  const [editByStatus, setEditByStatus] = useState<boolean>(false);
  /* Seleccionados */
  const [selectedClient, setSelectedClient] = useState<ContactsDataType | null>(
    null
  );
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const [selectedSupplier, setSelectedSupplier] =
    useState<ContactsDataType | null>(null);
  /* Booleans */
  const [isFieldsChanged, setIsFieldsChanged] = useState<boolean>(false);
  /* Modales */
  /* Modales Específicos */
  const [openClientModal, setOpenClientModal] = useState<boolean>(false);
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
      openModal("ERROR");
    }
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

  return (
    <UIContext.Provider
      value={{
        toggleTheme,
        theme,
        openClientModal,
        setOpenClientModal,
        selectedClient,
        setSelectedClient,
        isFieldsChanged,
        setIsFieldsChanged,
        handleSetIsFieldsChanged,
        categorizations,
        setCategorizations,
        getCategorizations,
        propsPriceModal,
        setOpenPriceModal,
        openSupplierModal,
        setOpenSupplierModal,
        selectedSupplier,
        setSelectedSupplier,
        selectedPhase,
        setSelectedPhase,
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
