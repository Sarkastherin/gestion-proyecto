import type React from "react";
import type { StatusType } from "~/types/database";

type BadgeStatusType = {
  variant: StatusType;
  children: React.ReactNode
}
export default function BadgeStatus({ variant,children }: BadgeStatusType) {
  const variants = {
    "Nuevo": "bg-blue-200 text-blue-700",
    "Desestimada": "bg-gray-200 text-gray-700",
    "En proceso": "bg-amber-200 text-amber-700",
    "Enviada": "bg-purple-300 text-purple-700",
    "Revisión": "bg-orange-200 text-orange-700",
    "Ganada": "bg-green-200 text-green-700",
    "Perdida": "bg-red-200 text-red-700",
    "No status": "bg-red-200 text-red-700",

  };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${variants[variant]}`}>{children}</span>;
}
