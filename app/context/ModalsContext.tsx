import React, { createContext, useContext, useState } from "react";

export enum ModalType {
  PROGRESSIVE = "PROGRESSIVE",
  ALERT = "ALERT",
}
type ProgressiveStep = {
  label: string;
  status: "pending" | "in-progress" | "done" | "error";
};
type ModalContextType = {
  activeModal: ModalType | null;
  openModal: (type: ModalType) => void;
  closeModal: () => void;

  progressive?: {
    steps: ProgressiveStep[];
    setSteps: React.Dispatch<React.SetStateAction<ProgressiveStep[]>>;
    updateStep: (index: number, status: ProgressiveStep["status"]) => void;
  };

  alert?: {
    message: string | React.ReactNode;
    type: "success" | "error";
    setAlert: (msg: string | React.ReactNode, type: "success" | "error") => void;
  };
};
const UIModalsContext = createContext<ModalContextType | undefined>(undefined);

export const UIModalsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [steps, setSteps] = useState<ProgressiveStep[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | React.ReactNode>("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const setAlert = (msg: string | React.ReactNode, type: "success" | "error") => {
    openModal(ModalType.ALERT);
    setAlertMessage(msg);
    setAlertType(type);
  };
  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => {
  setActiveModal(null);
  setSteps([]);
  setAlertMessage("");
};

  const updateStep = (index: number, status: ProgressiveStep["status"]) => {
    setSteps((prev) =>
      prev.map((step, i) => (i === index ? { ...step, status } : step))
    );
  };
  const progressive = {
    steps,
    setSteps,
    updateStep,
  };
  const alert = {
    message: alertMessage,
    type: alertType,
    setAlert,
  };

  return (
    <UIModalsContext.Provider
      value={{
        activeModal,
        openModal,
        closeModal,
        progressive,
        alert,
      }}
    >
      {children}
    </UIModalsContext.Provider>
  );
};

export const useUIModals = () => {
  const context = useContext(UIModalsContext);
  if (context === undefined) {
    throw new Error("useUIModals must be used within a UIModalsProvider");
  }
  return context;
};
