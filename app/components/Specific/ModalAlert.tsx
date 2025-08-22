// ModalAlert.tsx
import { Button } from "../Forms/Buttons";
import { LayoutModal } from "../Generals/Modals";
import { useUIModals, ModalType } from "~/context/ModalsContext";

export default function ModalAlert() {
  const { activeModal, closeModal, alert } = useUIModals();

  const open = activeModal === ModalType.ALERT;
  const message = alert?.message ?? "";
  const type = alert?.type ?? "success";

  const colorMap = {
    success: {
      bg: "bg-lime-100 dark:bg-lime-200",
      text: "text-lime-800",
      border: "border-lime-400",
      title: "Éxito",
    },
    error: {
      bg: "bg-red-100 dark:bg-red-200",
      text: "text-red-800",
      border: "border-red-400",
      title: "Error",
    },
  };

  const styles = colorMap[type];

  return (
    <LayoutModal
      open={open}
      title={styles.title}
      handleOpen={closeModal}
      justifyStyle="justify-end"
      size="w-md min-w-xs"
      buttonsGroup={
        <div className="w-32">
          <Button type="button" onClick={closeModal} variant="secondary">
            Cerrar
          </Button>
        </div>
      }
    >
      <div
        className={`mt-4 p-4 border rounded ${styles.bg} ${styles.text} ${styles.border}`}
        role="alert"
      >
        {message}
      </div>
    </LayoutModal>
  );
}
