import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Consolidados por Trabajador" },
    { name: "description", content: "Consolidados por Trabajador [Informes]" },
  ];
}

export default function Report() {
  return (
    <div className="w-full mt-8 mx-auto flex gap-6 px-8">
      <div className="w-full">
        
      </div>
    </div>
  );
}
