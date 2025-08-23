import type { Route } from "./+types/home";
import { appVersion } from "~/utils/functions";
import { KpiCard } from "~/components/Dashboard/KpiCard";
import { Input } from "~/components/Forms/Inputs";
import { dateUSFormatted } from "~/utils/functions";
import { supabase } from "~/backend/supabaseClient";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bienvenido" },
    { name: "description", content: "Bienvenido" },
  ];
}

export default function Home() {
  const to = dateUSFormatted(new Date());
  const fromArray = to.split("-");
  fromArray[2] = "01";
  const from = fromArray.join("-");
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

        {/* <div
        className="flex flex-col h-full
       text-zinc-600 dark:text-zinc-400 mt-10 px-10"
      >
        <h2 className="text-xl font-semibold mb-6">Periodo</h2>
        <div className="grid grid-cols-5 gap-2 mb-4">
          <Input type="date" label="Desde" defaultValue={from}/>
          <Input type="date" label="Hasta" defaultValue={to}/>
        </div>

        <div className="grid grid-cols-5">
          <KpiCard title="Oportunidades creadas" value={50} growthRate={65}/>
        </div>*/}
      </div>
      <div className="fixed bottom-0 w-full bg-zinc-200 dark:bg-zinc-900 py-2 px-4">
        <p className="text-end text-xs text-zinc-400 dark:text-zinc-600">
          Versión: <span className="font-mono">{appVersion}</span>
        </p>
      </div>
    </>
  );
}
