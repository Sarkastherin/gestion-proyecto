import type { Route } from "./+types/home";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { useAuth } from "~/context/AuthContext";
import { MaterialForm } from "~/templates/MaterialForm";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nuevo Material" },
    { name: "description", content: "Nuevo Material" },
  ];
}

export default function NewMaterial() {
  const { user } = useAuth();
  return (
    <>
      <ContainerWithTitle title="Crear nuevo material">
        <MaterialForm
          mode="create"
          defaultValues={{
            id_subcategory: null,
            description: "",
            id_unit: null,
          }}
        />
      </ContainerWithTitle>
    </>
  );
}
