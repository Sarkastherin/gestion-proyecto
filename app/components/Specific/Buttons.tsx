import type React from "react";
import { Button } from "../Forms/Buttons";
import { useNavigate } from "react-router";
import { variants } from "../Forms/Buttons";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import type { ButtonHTMLAttributes } from "react";
type ButtonProps = & {
  route: string;
  variant?: keyof typeof variants;
  children: React.ReactNode;
};
export const ButtonNavigate = ({
  route,
  variant,
  children,
}: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button type="button" variant={variant} onClick={() => navigate(route)}>
      {children}
    </Button>
  );
};
export const ButtonDeleteIcon = ({
  ...buttonProps
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      title="Eliminar"
      className="cursor-pointer rounded-full border border-gray-300 p-2 text-gray-300 
             hover:text-red-500 hover:border-red-500 
             focus:outline-none focus:ring-0 
             focus:text-white focus:border-red-500 focus:bg-red-500 
             transition-colors duration-400 ease-in-out 
             dark:border-gray-500 dark:text-gray-500 
             dark:hover:text-red-400 dark:hover:border-red-400 
             dark:focus:text-zinc-700 dark:focus:bg-red-400 dark:focus:border-red-400"
      {...buttonProps}
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-4" />
    </button>
  );
};
export const ButtonAdd = ({
  ...buttonProps
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="cursor-pointer text-sm font-semibold border rounded-full py-2 px-4 text-indigo-500  border-indigo-400 hover:bg-zinc-200 hover:border-zinc-200 dark:text-indigo-300  dark:border-indigo-300 dark:hover:bg-zinc-700 dark:hover:border-zinc-700 disabled:cursor-not-allowed disabled:border-none disabled:text-gray-400 disabled:bg-gray-300 dark:disabled:text-zinc-500 dark:disabled:bg-zinc-700"
      type="button"
      {...buttonProps}
    >
      <div className="flex gap-2">
        <PlusCircleIcon className="w-4" />
        <span>Agregar</span>
      </div>
    </button>
  );
};
