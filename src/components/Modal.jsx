import {
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import { useModal } from "../context/ModalContext";

export const Modal = ({
  modalId,
  title,
  children,
  icon,
  disableXButton,
  variant = "default",
}) => {
  const variants = {
    danger: {color: 'text-red-700', icon:<XCircleIcon className="w-6" />},
    primary: {color: 'text-indigo-600', icon:<XCircleIcon className="w-6" />},
    success: {color: 'text-green-500', icon:<CheckCircleIcon className="w-6" />},
  };
  const { handleModalClose, activeModal } = useModal();
  const show = activeModal === modalId;
  return (
    <div
      id={modalId}
      className={`absolute top-0 right-0 w-full min-h-screen bg-gray-800/40 flex items-start justify-center z-40 ${
        !show && "hidden"
      }`}
    >
      <div
        role="alert"
        className="rounded-xl border border-gray-100 bg-white px-8 pb-8 pt-6 mt-[100px] max-h-full sm:w-sm md:w-lg"
      >
        <div className={`flex items-start gap-1.5 ${variants[variant].color}`}>
          {variants[variant].icon}

          <div className="flex-1">
            <strong className="block font-medium"> {title} </strong>
          </div>
          <button
          title="close button"
          type="button"
            className={`text-gray-500 transition hover:text-red-600 cursor-pointer ${
              disableXButton && "hidden"
            }`}
          >
            <XMarkIcon width={"24px"} onClick={handleModalClose} />
          </button>
        </div>
        <div className="mt-4">{children}</div>
        
      </div>
    </div>
  );
};

