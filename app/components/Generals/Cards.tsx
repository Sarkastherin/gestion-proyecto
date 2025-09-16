import React, { useRef, useState, useEffect, type JSX } from "react";
import { ChevronDoubleDownIcon } from "@heroicons/react/16/solid";

type CardToggleProps = {
  title: string;
  children: React.ReactNode;
};

export const CardToggle = ({
  title,
  children,
}: CardToggleProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const [height, setHeight] = useState("auto");
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleCard = (): void => {
    setIsOpen((prev) => !prev);
  };

  const updateHeight = () => {
    if (contentRef.current && isOpen) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(`${scrollHeight}px`);
    }
  };

  useEffect(() => {
    updateHeight(); // Set initial height when open
  }, [isOpen]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Observe content size change
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(content);

    // Observe child DOM changes (e.g., append/remove)
    const mutationObserver = new MutationObserver(() => {
      updateHeight();
    });

    mutationObserver.observe(content, {
      childList: true,
      subtree: true,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [isOpen]);

  return (
    <div className="rounded-[10px] shadow-sm border border-zinc-200 bg-white px-4 py-4 dark:border-zinc-700 dark:bg-zinc-900/70">
      <div
        onClick={toggleCard}
        className={`cursor-pointer flex justify-start items-center gap-2 px-2 sm:px-4 pb-2 ${
          isOpen ? "border-b" : ""
        } border-zinc-400`}
      >
        <ChevronDoubleDownIcon
          className={`w-6 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
        <h2 className="md:text-lg sm:text-md font-normal text-zinc-700 dark:text-zinc-200">
          {title}
        </h2>
      </div>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? height : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s ease-in-out",
        }}
      >
        <div className="p-3 sm:p-4">{children}</div>
      </div>
    </div>
  );
};
export const Card = ({title, children}:{title?: string; children: React.ReactNode}) => {
  return (
    <article className="rounded-xl shadow-md p-6 border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900/70">
      <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {title}
      </h3>
      {children}
    </article>
  )
}
