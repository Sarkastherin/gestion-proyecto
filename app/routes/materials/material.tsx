import type { Route } from "../+types/home";
import { ContainerToForms } from "~/components/Generals/Containers";
import { MaterialForm } from "~/templates/MaterialForm";
import { useData } from "~/context/DataContext";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nuevo Material" },
    { name: "description", content: "Nuevo Material" },
  ];
}

export default function Material() {
  const { selectedMaterial } = useData();
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
                isNew={false}
                initialEditMode={false}
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
