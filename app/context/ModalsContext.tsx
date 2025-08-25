import React, { createContext, useContext, useState } from "react";

export type ModalType =
  | "LOADING"
  | "SUCCESS"
  | "ERROR"
  | "CONFIRMATION"
  | "PROGRESSIVE";

type ModalState = {
  type: ModalType | null;
  props?: Record<string, any>;
};
export type Step = {
  label: string;
  status: "done" | "in-progress" | "error" | "pending";
};
const UIModalsContext = createContext<
  | {
      modal: ModalState;
      openModal: (type: ModalType, props?: Record<string, any>) => void;
      closeModal: () => void;
      progressiveSteps: Step[];
      setProgressiveSteps: React.Dispatch<React.SetStateAction<Step[]>>;
      updateStep: (index: number, status: Step["status"]) => void;
    }
  | undefined
>(undefined);

export const UIModalsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modal, setModal] = useState<ModalState>({ type: null });
  const [progressiveSteps, setProgressiveSteps] = useState<Step[]>([]);

  const openModal = (type: ModalType, props?: Record<string, any>) => {
    setModal({ type, props });
  };

  const closeModal = () => {
    setModal({ type: null });
  };
  const updateStep = (index: number, status: Step["status"]) => {
    setProgressiveSteps((prev) =>
      prev.map((step, i) => (i === index ? { ...step, status } : step))
    );
  };
  return (
    <UIModalsContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        progressiveSteps,
        setProgressiveSteps,
        updateStep
      }}
    >
      {children}
    </UIModalsContext.Provider>
  );
};

export const useUIModals = () => {
  const context = useContext(UIModalsContext);
  if (!context)
    throw new Error("useUIModals must be used within UIModalsProvider");
  return context;
};
