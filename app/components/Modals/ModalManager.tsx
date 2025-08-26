import { useUIModals } from "~/context/ModalsContext";
import {
  ModalConfirmation,
  ModalLoading,
  ModalSuccess,
  ModalError,
  ModalProgressive,
  ModalInformation
} from "./ModalsGlobal";
export function ModalManager() {
  const { modal, closeModal, progressiveSteps, setProgressiveSteps, updateStep } = useUIModals();
  const { type, props } = modal;

  switch (type) {
    case "LOADING":
      return (
        <ModalLoading
          message={props?.message}
          title={props?.title}
        />
      );
    case "SUCCESS":
      return (
        <ModalSuccess
          onClose={closeModal}
          message={props?.message}
          title={props?.title}
          btnPrimary={props?.btnPrimary}
          btnSecondary={{ label: "Aceptar", handleOnClick: closeModal, variant: "green" }}
        />
      );
    case "ERROR":
      return (
        <ModalError
          onClose={closeModal}
          message={props?.message}
          title={props?.title}
          btnSecondary={{ label: "Aceptar", handleOnClick: closeModal, variant: "danger" }}
        />
      );
    case "CONFIRMATION":
      return (
        <ModalConfirmation
          onClose={closeModal}
          message={props?.message}
          onConfirm={props?.onConfirm}
        />
      );
    case "PROGRESSIVE":
      return (
        <ModalProgressive
          onClose={closeModal}
          steps={progressiveSteps}
        />
      );
    case "INFORMATION":
      return (
        <ModalInformation
          onClose={closeModal}
          message={props?.message}
          title={props?.title}
          btnSecondary={{ label: "Aceptar", handleOnClick: closeModal, variant: "blue" }}
        />
      );
    default:
      return null;
  }
}
