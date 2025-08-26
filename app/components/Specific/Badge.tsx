import type React from "react";
import type { StatusType } from "~/types/database";

type BadgeStatusType = {
  variant: StatusType;
  size?: "sm" | "md";
  children: React.ReactNode;
};
export function BadgeStatus({
  variant,
  size = "sm",
  children,
}: BadgeStatusType) {
  const variants = {
    Nuevo: "bg-blue-200 text-blue-700",
    Desestimada: "bg-gray-200 text-gray-700",
    "En proceso": "bg-amber-200 text-amber-700",
    Enviada: "bg-purple-300 text-purple-700",
    Revisión: "bg-orange-200 text-orange-700",
    Ganada: "bg-green-200 text-green-700",
    Perdida: "bg-red-200 text-red-700",
    Vencida: "bg-orange-200 text-orange-700",
    "No status": "bg-red-200 text-red-700",
  };
  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };
  return (
    <span
      className={`rounded-full font-semibold whitespace-nowrap ${sizes[size]} ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
export function Badge({
  variant,
  size = "sm",
  children,
}: {
  variant: "success";
  size?: "sm" | "md";
  children: React.ReactNode;
}) {
  const variants = {
    success: "bg-lime-200 text-lime-700",
  };
  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };
  return (
    <span
      className={`rounded-full font-semibold whitespace-nowrap ${sizes[size]} ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
