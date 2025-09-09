import type React from "react";
import { Button } from "../Forms/Buttons";
import { useNavigate } from "react-router";
import { variants } from "../Forms/Buttons";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import type { ButtonHTMLAttributes } from "react";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import type { CommonPropTypes } from "react-csv/components/CommonPropTypes";
import { sanitizeCSVData } from "~/utils/functions";
import type { Data } from "react-csv/lib/core";
type ButtonProps = {
  route: string;
  variant?: keyof typeof variants;
  children: React.ReactNode;
};
export const ButtonNavigate = ({ route, variant, children }: ButtonProps) => {
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
             dark:focus:text-zinc-700 dark:focus:bg-red-400 dark:focus:border-red-400 disabled:cursor-not-allowed disabled:border-gray-300 disabled:dark:border-gray-500 disabled:text-gray-300 disabled:dark:text-gray-500 disabled:bg-gray-200 disabled:dark:bg-gray-700"
      {...buttonProps}
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-4" />
    </button>
  );
};
export const ButtonAdd = ({
  label = "Agregar",
  ...buttonProps
}: { label?: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="cursor-pointer text-sm font-semibold border rounded-full py-2 px-4 text-indigo-500  border-indigo-400 hover:bg-zinc-200 hover:border-zinc-200 dark:text-indigo-300  dark:border-indigo-300 dark:hover:bg-zinc-700 dark:hover:border-zinc-700 disabled:cursor-not-allowed disabled:border-none disabled:text-gray-400 disabled:bg-gray-300 dark:disabled:text-zinc-500 dark:disabled:bg-zinc-700"
      type="button"
      {...buttonProps}
    >
      <div className="flex gap-2">
        <PlusCircleIcon className="w-4" />
        <span>{label}</span>
      </div>
    </button>
  );
};
type ButtonExportProps = { type: "resumen" | "materials" } & CommonPropTypes;
export const ButtonExport = ({
  data,
  headers,
  filename,
  type,
}: ButtonExportProps) => {
  const [separator, setSeparator] = useState<"," | ";">(";");
  return (
    <div className="text-sm inline-flex divide-x divide-gray-300 overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm dark:divide-zinc-700 dark:border-zinc-700 dark:bg-zinc-800">
      {/* Botón Exportar */}
      <CSVLink
        data={sanitizeCSVData(data as Data, type)}
        headers={headers}
        separator={separator}
        filename={filename}
        className="bg-green-600 text-white dark:text-zinc-800 px-3 py-1.5 font-medium hover:bg-green-700 transition"
      >
        Exportar
      </CSVLink>

      {/* Selector de separador */}
      <div className="relative">
        <select
          className="dark:bg-zinc-800 appearance-none w-full h-full px-3 py-1.5 text-gray-700 dark:text-zinc-200 bg-transparent pr-8 focus:outline-none cursor-pointer"
          onChange={(e) => setSeparator(e.target.value as "," | ";")}
          value={separator}
        >
          <option disabled>Separador</option>
          <option value=",">coma [,]</option>
          <option value=";">punto y coma [;]</option>
        </select>

        {/* Ícono de flecha */}
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-zinc-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
