import { createContext, useState, useContext } from "react";
const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);
export const ModalContextProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);
  const handleModalClose = () => {
    setActiveModal(null);
  };
  const handleModalShow = (modalId) => {
    setActiveModal(modalId);
  };
  return (
    <ModalContext.Provider
      value={{ activeModal, handleModalShow, handleModalClose }}
    >
      {children}
    </ModalContext.Provider>
  );
};
