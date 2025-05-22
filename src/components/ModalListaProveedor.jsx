import {
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ModalListaProveedor({modalId}) {
  const [show, setShow] = useState(false)
  return (
    <div
      id={modalId}
      className={`absolute top-0 right-0 w-full min-h-screen bg-gray-800/40 flex items-start justify-center z-40 ${
        !show && "hidden"
      }`}
    >
      <div
        role="alert"
        className={`rounded-xl border border-gray-100 bg-white px-8 pb-8 pt-6 mt-[100px] max-h-full w-lg`}
      >
        <div className={`flex items-start gap-1.5 text-indigo-600`}>
          <CheckCircleIcon className="w-6" />

          <div className="flex-1">
            <strong className="block font-medium"> Lista de Proveedores </strong>
          </div>
          <button
          title="close button"
          type="button"
            className={`text-gray-500 transition hover:text-red-600 cursor-pointer`}
          >
            <XMarkIcon width={"24px"} onClick={setShow(false)} />
          </button>
        </div>
        <div className="mt-4">listado...</div>
        
      </div>
    </div>
  );
};

