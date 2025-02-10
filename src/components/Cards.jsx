import { useState } from "react";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";
export function CardToggle({ className, title, children }) {
  const [toggleCard, setToggleCard] = useState({ hidden: false, border: true });

  const handleOpenCard = (e) => {
    setToggleCard({ hidden: !toggleCard.hidden, border: !toggleCard.border });
  };
  return (
    <div
      className={`rounded-lg border border-gray-200 shadow-sm pt-4 bg-white ${className}`}
    >
      <div
        className={`cursor-pointer flex justify-start items-center gap-2 px-2 sm:px-4 pb-2 ${
          toggleCard.border ? "border-b" : ""
        } border-gray-300`}
        onClick={handleOpenCard}
      >
        <ChevronDoubleDownIcon
          width={20}
          height={20}
          className="text-gray-600"
        />
        <h2 className="md:text-lg sm:text-md font-normal text-gray-700">
          {title}
        </h2>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          toggleCard.hidden ? "max-h-0" : "max-h-[500px]"
        }`}
      >
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}