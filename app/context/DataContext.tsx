import React, { createContext, useContext, useState } from "react";
type DataContextType = {
    lastCreatedProjectId: number | null;
    setLastCreatedProjectId: React.Dispatch<React.SetStateAction<number | null>>;
};
const DataContext = createContext<DataContextType | undefined>(undefined);
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [lastCreatedProjectId, setLastCreatedProjectId] = useState<number | null>(null);
  return (
    <DataContext.Provider value={{ lastCreatedProjectId, setLastCreatedProjectId }}>
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