// UnauthorizedPage.tsx
import type { Route } from "./+types/home";
import { ButtonNavigate } from "~/components/Specific/Buttons";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "No permitido" },
    { name: "description", content: "No tienes permisos para acceder a esta página." },
  ];
}
export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
          Acceso denegado
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          No tienes permisos para acceder a esta página. Si crees que es un
          error, contacta con el administrador.
        </p>

        <ButtonNavigate route="/">Volver al inicio</ButtonNavigate>
      </div>
    </div>
  );
};
