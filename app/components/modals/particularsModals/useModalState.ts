import { useState } from "react";
type ModalVariant = "edit" | "view" | "create";
export type ModalSteps = "form" | "saving" | "success" | "error";

export function useModalState<T = undefined>() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [variant, setVariant] = useState<ModalVariant>("view");
  const [step, setStep] = useState<ModalSteps>("form");
  const openModal = (payload?: T, mode: ModalVariant = "view") => {
    setData(payload);
    setVariant(mode);
    setStep("form");
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setData(undefined);
    setStep("form");
  };

  return { open, data, variant, step, setStep, openModal, closeModal };
}
