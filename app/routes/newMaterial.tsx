import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import type { Route } from "./+types/home";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { MaterialForm } from "~/templates/MaterialForm";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nuevo Material" },
    { name: "description", content: "Nuevo Material" },
  ];
}

export default function NewMaterial() {
  return (
    <ProtectedRoute allowed={["administrador", "dueño"]}>
      <ContainerWithTitle title="Crear nuevo material">
        <MaterialForm
          isNew={true}
          initialEditMode={true}
          defaultValues={{
            id_subcategory: null,
            description: "",
            id_unit: null,
          }}
        />
      </ContainerWithTitle>
    </ProtectedRoute>
  );
}
