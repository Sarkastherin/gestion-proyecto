import type { Route } from "../+types/home";
import { ContainerToForms } from "~/components/Generals/Containers";
import { useUI } from "~/context/UIContext";
import PricesForm from "~/templates/PricesForm";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Precios" }, { name: "description", content: "Precios" }];
}

export default function Prices() {
  const { selectedMaterial } = useUI();
  if (selectedMaterial) {
    const { prices, id } = selectedMaterial;

    return (
      <>
        {prices && (
          <ContainerToForms>
            <PricesForm
              defaultValues={{ prices: prices }}
              idMaterial={id}
              modalMode={false}
            />
          </ContainerToForms>
        )}
      </>
    );
  }
  return <p>No hay datos</p>;
}
