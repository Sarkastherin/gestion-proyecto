import {
  XMarkIcon,
  ArchiveBoxIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { useModal } from "../context/ModalContext";
import ReactLoading from "react-loading";
export const Modal = ({
  modalId,
  title,
  children,
  icon,
  disableXButton,
  variant = "default",
}) => {
  const variants = {
    default: "text-gray-800",
    danger: "text-red-700",
    primary: "text-indigo-600",
    success: "text-green-600",
    waiting: "text-blue-500",
  };
  const { handleModalClose, activeModal } = useModal();
  const show = activeModal === modalId;
  return (
    <div
      id={modalId}
      className={`absolute bottom-0 right-0 w-full min-h-screen bg-gray-800/40 flex items-start justify-center ${
        !show && "hidden"
      }`}
    >
      <div
        role="alert"
        className="rounded-xl border border-gray-100 bg-white px-8 py-6 mt-[100px] max-h-full sm:w-sm md:w-lg"
      >
        <div className={`flex items-start gap-4 ${variants[variant]}`}>
          {icon}

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
        {children}
      </div>
    </div>
  );
};
export const ModalLoading = ({ title, id }) => {
  return (
    <Modal
      modalId={id}
      variant="primary"
      title={title}
      icon={<ArchiveBoxIcon width={"24px"} />}
      disableXButton={true}
    >
      <div className="mx-auto mt-4">
        <ReactLoading
          type={"spin"}
          color=""
          className="mx-auto fill-indigo-500"
        />
      </div>
    </Modal>
  );
};
export const ModalSuccess = ({ title, id }) => {
  return (
    <Modal
      modalId={id}
      variant="success"
      title={title}
      icon={<CheckBadgeIcon width={"24px"} />}
    >
      <p className="mt-4 text-sm text-green-700">
        Los datos se han guardo exitosamente
        <br />
        <strong>
          Imprime el registro de la Solicitud, y entegalo al responsable de
          procesar tu pedido
        </strong>
      </p>
      <Button
        className={"w-full mt-4"}
        type="button"
        variant="success"
        onClick={() => {
          handleModalClose();
          navigate("/pdf", { state: { pdfData: data } });
        }}
      >
        Imprimir Solicitud
      </Button>
    </Modal>
  );
};
