import { ContainerToForms } from "~/components/Generals/Containers";
import type { Route } from "../../+types/root";
import { Card } from "~/components/Generals/Cards";
import { BadgeStatus } from "~/components/Specific/Badge";
// 📌 Meta
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumen" },
    { name: "description", content: "Resumen del proyecto" },
  ];
}
// 🧩 Página principal
export default function Resumen() {
  return (
    <ContainerToForms>
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-xl font-semibold">{"Resumen"}</h2>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <BadgeStatus size="md" variant={"No status"}>
              {"!"}
            </BadgeStatus>
          </div>
        </div>
      </Card>
    </ContainerToForms>
  );
}
