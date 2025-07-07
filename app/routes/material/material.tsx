import type { Route } from "../+types/home";
import { ContainerToForms } from "~/components/Generals/Containers";
import { MaterialForm } from "~/templates/MaterialForm";
import { useUI } from "~/context/UIContext";
import { useMaterialsRealtime } from "~/backend/realTime";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nuevo Material" },
    { name: "description", content: "Nuevo Material" },
  ];
}

export default function Material() {
  useMaterialsRealtime()
  const { selectedMaterial } = useUI();
  if (selectedMaterial) {
    const {
      prices,
      view_categorizations: categorization,
      ...materialProps
    } = selectedMaterial;
    return (
      <>
        {selectedMaterial && (
          <>
            <ContainerToForms>
              <MaterialForm
                mode="view"
                defaultValues={materialProps}
                categorization={categorization}
              />
            </ContainerToForms>
          </>
        )}
      </>
    );
  }
  return <p>No hay datos</p>;
}
