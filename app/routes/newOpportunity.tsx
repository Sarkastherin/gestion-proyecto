import type { Route } from "./+types/home";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import OpportunityForm from "~/templates/OpportunityForm";
import { useAuth } from "~/context/AuthContext";
import { useOpportunityRealtime } from "~/backend/realTime";
import { useEffect } from "react";
import { useUI } from "~/context/UIContext";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nueva Oportunidad" },
    { name: "description", content: "Nueva Oportunidad" },
  ];
}

export default function NewOpportunity() {
  useOpportunityRealtime();
  const { user } = useAuth();
  const { setSelectedClient, setSelectedOpportunity } = useUI();

  useEffect(() => {
    setSelectedOpportunity(null);
    setSelectedClient(null);
  }, []);
  return (
    <>
      <ContainerWithTitle title="Creando nueva oportunidad">
        <OpportunityForm
          mode="create"
          defaultValues={{
            name: "",
            id_client: 0,
            status: "Nuevo",
            created_by: user?.user_name || "",
          }}
        />
      </ContainerWithTitle>
    </>
  );
}
