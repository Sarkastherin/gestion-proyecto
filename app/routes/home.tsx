import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bienvenido" },
    { name: "description", content: "Bienvenido" },
  ];
}

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full text-center text-zinc-600 dark:text-zinc-400 mt-20">
        <span className="text-2xl font-semibold mb-2">
          🛠️ Dashboard en construcción
        </span>
        <p className="max-w-md">
          Estamos trabajando para traerte una vista con indicadores clave sobre
          tus oportunidades. Muy pronto vas a poder analizar estadísticas,
          conversiones y más, todo desde un solo lugar.
        </p>
      </div>
    </>
  );
}
