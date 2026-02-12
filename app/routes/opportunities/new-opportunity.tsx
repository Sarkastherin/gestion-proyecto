import type { Route } from "../projects/+types/home";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import OpportunityForm from "~/templates/OpportunityForm";
import { useAuth } from "~/context/AuthContext";
import { useOpportunityRealtime } from "~/backend/realTime";
import { useEffect } from "react";
import { useUI } from "~/context/UIContext";
import { useData } from "~/context/DataContext";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { ALLOWED_NEW_OPPORTUNITY } from "~/components/auth/allowedRoles";
import { BriefcaseBusiness } from "lucide-react";
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
      <ContainerWithTitle
        title="Nueva oportunidad"
        width="max-w-5xl w-full"
        back_path="/opportunities"
        IconComponent={{component: BriefcaseBusiness, color: "text-green-600 dark:text-green-400"}}
      >
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
