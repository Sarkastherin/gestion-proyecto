import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";

export function Tooltip({
  message,
  children,
}: {
  message: string;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const ref = useRef<HTMLSpanElement>(null);

  const showTooltip = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX + rect.width / 2,
      });
      setVisible(true);
    }
  };

  const hideTooltip = () => setVisible(false);

  return (
    <>
      <span
        ref={ref}
        className="relative group cursor-pointer"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        tabIndex={0}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </span>
      {visible &&
        createPortal(
          <span
            className="mt-2 pointer-events-none fixed z-[9999] w-max min-w-[180px] rounded px-2 py-1.5 text-xs font-semibold shadow-lg border border-zinc-700 bg-zinc-900 text-white dark:bg-zinc-200 dark:text-zinc-900"
            style={{
              top: coords.top,
              left: coords.left,
              transform: "translateX(-50%)",
            }}
          >
            {message}
          </span>,
          document.body
        )}
    </>
  );
}
