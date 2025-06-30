import type { Route } from "../+types/home";
import { ContainerToForms } from "~/components/Generals/Containers";
import { MaterialForm } from "~/templates/MaterialForm";
import { useUI } from "~/context/UIContext";
import { Button } from "~/components/Forms/Buttons";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useParams, useNavigate } from "react-router";
import { materialsApi } from "~/backend/dataBase";
import { useMaterialsRealtime } from "~/backend/realTime";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nuevo Material" },
    { name: "description", content: "Nuevo Material" },
  ];
}

export default function Material() {
  useMaterialsRealtime()
  const { selectedMaterial, isModeEdit } = useUI();
  const navigate = useNavigate()
  const { id } = useParams();
  if (selectedMaterial) {
    const {
      prices,
      view_categorizations: categorization,
      ...materialProps
    } = selectedMaterial;
    const handleDelete = async () => {
      if (confirm("¿Está seguro de eliminar este material?")) {
        const { error } = await materialsApi.remove({ id: Number(id) });
        if (error) {
          alert(error.message);
          return;
        }
        navigate("materils")
      }
    };
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
              <div className="mt-6 text-end">
                <Button variant="danger" onClick={handleDelete} disabled={!isModeEdit}>
                  <div className="flex gap-1">
                    <TrashIcon className="size-4" />
                    <span>Eliminar Material</span>
                  </div>
                </Button>
              </div>
            </ContainerToForms>
          </>
        )}
      </>
    );
  }
  return <p>No hay datos</p>;
}
