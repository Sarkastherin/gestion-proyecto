import type { variants } from "../Forms/Buttons";
import ModalBase from "./ModalBase";
import { ClipLoader } from "react-spinners";

export function ModalConfirmation({
  message,
  onConfirm,
  onClose,
}: {
  message: string | React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <ModalBase
      title="Confirmar acción"
      open
      zIndex={50}
      onClose={onClose}
      footer={{
        btnPrimary: {
          label: "Confirmar",
          handleOnClick: onConfirm,
          variant: "yellow",
        },
        btnSecondary: {
          label: "Cancelar",
          handleOnClick: onClose,
          variant: "secondary",
        },
      }}
    >
      <div className="flex flex-col items-center justify-center py-4 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
        <div className="text-sm text-zinc-700 dark:text-zinc-300 text-center max-w-xs">
          {message}
        </div>
      </div>
    </ModalBase>
  );
}
export function ModalLoading({
  title = "⏳ Un momento...",
  message = "Se está procesando su requerimiento",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <ModalBase title={title} open zIndex={50}>
      <div className="flex flex-col items-center justify-center py-6 gap-4">
        <ClipLoader color="#4F46E5" size={40} />
        <p className="text-sm text-zinc-700 dark:text-zinc-300 text-center max-w-xs">
          {message}
        </p>
      </div>
    </ModalBase>
  );
}
export function ModalInformation({
  title = "ℹ️ Información",
  message,
  onClose,
btnSecondary,
}: {
  title?: string;
  message?: string;
  onClose: () => void;
  btnPrimary?: {
    label: string;
    handleOnClick: () => void;
    variant?: keyof typeof variants;
  };
  btnSecondary: {
    label: string;
    handleOnClick: () => void;
    variant?: keyof typeof variants;
  };
}) {/*  */
  const footer = {
    btnSecondary,
  };
  return (
    <ModalBase title={title} open zIndex={50} onClose={onClose} footer={footer}>
      <div className="flex flex-col items-center justify-center py-4 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
        <div className="text-sm text-zinc-700 dark:text-zinc-300 text-center max-w-xs">
          {message}
        </div>
      </div>
    </ModalBase>
  );
}
export function ModalSuccess({
  title = "✅ ¡Listo!",
  message = "La operación se realizó con éxito.",
  onClose,
  btnPrimary,
  btnSecondary,
}: {
  title?: string;
  message?: string;
  onClose: () => void;
  btnPrimary?: {
    label: string;
    handleOnClick: () => void;
    variant?: keyof typeof variants;
  };
  btnSecondary: {
    label: string;
    handleOnClick: () => void;
    variant?: keyof typeof variants;
  };
}) {
  const footer = {
    btnPrimary,
    btnSecondary,
  };
  return (
    <ModalBase title={title} open zIndex={50} onClose={onClose} footer={footer}>
      <div className="flex flex-col items-center justify-center py-4 rounded-lg bg-zinc-700/50">
        <p className="text-sm text-zinc-300 text-center max-w-xs">{message}</p>
      </div>
    </ModalBase>
  );
}
export function ModalError({
  title = "❌ Algo salió mal...",
  message = "Ocurrió un error al realizar la operación.",
  onClose,
  btnSecondary,
}: {
  title?: string;
  message?: string;
  onClose: () => void;
  btnPrimary?: {
    label: string;
    handleOnClick: () => void;
    variant?: keyof typeof variants;
  };
  btnSecondary: {
    label: string;
    handleOnClick: () => void;
    variant?: keyof typeof variants;
  };
}) {
  const footer = {
    btnSecondary,
  };
  return (
    <ModalBase title={title} open zIndex={50} onClose={onClose} footer={footer}>
      <div className="flex flex-col items-center justify-center py-4 rounded-lg bg-zinc-700/50">
        <p className="text-sm text-zinc-300 text-center max-w-xs">{message}</p>
      </div>
    </ModalBase>
  );
}
export function ModalProgressive({
  steps,
  onClose,
}: {
  steps: Array<{
    label: string;
    status: "done" | "in-progress" | "error" | "pending";
  }>;
  setSteps?: React.Dispatch<React.SetStateAction<typeof steps>>;
  updateStep?: (
    index: number,
    status: (typeof steps)[number]["status"]
  ) => void;
  onClose: () => void;
}) {
  const progressPercent =
    steps.length > 0
      ? (steps.filter((s) => s.status === "done").length / steps.length) * 100
      : 0;
  return (
    <ModalBase title="Progreso" open zIndex={50} onClose={onClose}>
      <div className="mt-4 space-y-4">
        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
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
    </ModalBase>
  );
}
