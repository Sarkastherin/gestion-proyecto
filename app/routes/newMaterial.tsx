import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import type { Route } from "./+types/home";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { MaterialForm } from "~/templates/MaterialForm";
import { ALLOWED_NEW_MATERIAL } from "~/components/auth/allowedRoles";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nuevo Material" },
    { name: "description", content: "Nuevo Material" },
  ];
}

export default function NewMaterial() {
  return (
    <ProtectedRoute allowed={ALLOWED_NEW_MATERIAL}>
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
