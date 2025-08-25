import type React from "react";
import { Button, variants } from "../Forms/Buttons";
export type ButtonsFooter = {
  label: string;
  handleOnClick: () => void;
  variant?: keyof typeof variants;
};
export type FooterModal = {
  btnPrimary?: ButtonsFooter;
  btnSecondary?: ButtonsFooter;
};
type ModalProps = {
  open: boolean;
  title: string;
  zIndex: number;
  children: React.ReactNode;
  onClose: () => void;
  footer?: FooterModal;
  icon?: React.ReactNode;
  width?: string;
};
export default function ModalBase({
  open,
  title,
  zIndex,
  children,
  onClose,
  footer,
  icon,
  width = "max-w-md",
}: ModalProps) {
  const safeZIndex = typeof zIndex === "number" ? `z-[${zIndex}]` : "z-[50]";
  return (
    <div
      className={`fixed inset-0 ${safeZIndex} flex justify-center items-start bg-white/10 p-4 transition-opacity duration-300 ease-out ${
        open ? "opacity-100 z-[zIndex]" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div
        className={`w-full ${width} max-h-[90vh] rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900 transform transition-all duration-300 ease-out ${
          open
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 -translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between">
          {icon}
          <h2
            id="modalTitle"
            className="text-lg font-semibold text-zinc-900 sm:text-xl dark:text-white"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="-me-4 -mt-4 rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-50 hover:text-zinc-600 focus:outline-none dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-red-400 cursor-pointer"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4">{children}</div>
        {footer && (
          <footer className="mt-6 flex justify-end gap-2">
            {footer.btnSecondary && (
              <div className="min-w-34">
                <Button
                  variant={footer.btnSecondary.variant}
                  onClick={footer.btnSecondary.handleOnClick}
                  type="button"
                >
                  {footer.btnSecondary.label}
                </Button>
              </div>
            )}
            {footer.btnPrimary && (
              <div className="min-w-34">
                <Button
                  variant={footer.btnPrimary.variant}
                  onClick={footer.btnPrimary.handleOnClick}
                  type="button"
                >
                  {footer.btnPrimary.label}
                </Button>
              </div>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}
