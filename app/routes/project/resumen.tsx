import type { Route } from "../../+types/root";
// 📌 Meta
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumen" },
    { name: "description", content: "Resumen del proyecto" },
  ];
}
// 🧩 Página principal
export default function Resumen(){
    return (
        <div>
            <h1>Resumen</h1>
        </div>
    );
}