import { Button } from "../Forms/Buttons";
import { LayoutModal } from "../Generals/Modals";
import { useUIModals, ModalType } from "~/context/ModalsContext";

export default function ModalProgressive() {
  const { activeModal, closeModal, progressive } = useUIModals();

  const open = activeModal === ModalType.PROGRESSIVE;
  const steps = progressive?.steps ?? [];

  const progressPercent =
    steps.length > 0
      ? (steps.filter(s => s.status === "done").length / steps.length) * 100
      : 0;

  return (
    <LayoutModal
      open={open}
      title="Procesando..."
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
      <div className="mt-4 space-y-4">
        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Lista de pasos */}
        <ul className="space-y-2">
          {steps.map((step, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  step.status === "done"
                    ? "bg-green-500"
                    : step.status === "in-progress"
                    ? "bg-blue-500 animate-pulse"
                    : step.status === "error"
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
              />
              <span>{step.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </LayoutModal>
  );
}
