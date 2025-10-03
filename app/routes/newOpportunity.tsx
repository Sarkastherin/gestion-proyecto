import type { Route } from "./+types/home";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import OpportunityForm from "~/templates/OpportunityForm";
import { useAuth } from "~/context/AuthContext";
import { useOpportunityRealtime } from "~/backend/realTime";
import { useEffect } from "react";
import { useUI } from "~/context/UIContext";
import { useData } from "~/context/DataContext";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { ALLOWED_NEW_OPPORTUNITY } from "~/components/auth/allowedRoles";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nueva Oportunidad" },
    { name: "description", content: "Nueva Oportunidad" },
  ];
}

export default function NewOpportunity() {
  useOpportunityRealtime();
  const { user } = useAuth();
  const { setSelectedClient } = useUI();
  const { setSelectedOpportunity } = useData();

  useEffect(() => {
    setSelectedOpportunity(null);
    setSelectedClient(null);
  }, []);
  return (
    <ProtectedRoute allowed={ALLOWED_NEW_OPPORTUNITY}>
      <ContainerWithTitle title="Creando nueva oportunidad" width="max-w-7xl w-full">
        <OpportunityForm
          isNew={true}
          initialEditMode={true}
          defaultValues={{
            name: "",
            id_client: 0,
            status: "Nuevo",
          }}
        />
      </ContainerWithTitle>
    </ProtectedRoute>
  );
}
