import React from "react";

export function Tooltip({ message, children }: { message: string; children: React.ReactNode }) {
  return (
    <span className="relative group cursor-pointer">
      {children}
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 w-max min-w-[180px] -translate-x-1/2 rounded bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
        {message}
      </span>
    </span>
  );
}
