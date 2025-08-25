import { useState } from "react";
type ModalVariant = "edit" | "view" | "create";

export function useModalState<T = undefined>() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [variant, setVariant] = useState<ModalVariant>("view");

  const openModal = (payload?: T, mode: ModalVariant = "view") => {
    setData(payload);
    setVariant(mode);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setData(undefined);
  };

  return { open, data, variant, openModal, closeModal };
}