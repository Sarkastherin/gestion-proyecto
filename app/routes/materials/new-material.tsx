import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import type { Route } from "../+types/home";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { MaterialForm } from "~/templates/MaterialForm";
import { ALLOWED_NEW_MATERIAL } from "~/components/auth/allowedRoles";
import { Box } from "lucide-react";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nuevo Material" },
    { name: "description", content: "Nuevo Material" },
  ];
}

export default function NewMaterial() {
  return (
    <ProtectedRoute allowed={ALLOWED_NEW_MATERIAL}>
      <ContainerWithTitle
        title="Nuevo material"
        width="max-w-5xl w-full"
        back_path="/materials"
        IconComponent={{
          component: Box,
          color: "text-yellow-600 dark:text-yellow-400",
        }}
      >
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
