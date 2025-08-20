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
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-400",
      title: "Éxito",
    },
    error: {
      bg: "bg-red-100",
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
        <p>{message}</p>
      </div>
    </LayoutModal>
  );
}