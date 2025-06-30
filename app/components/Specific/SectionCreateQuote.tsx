import { useUI } from "~/context/UIContext";
import { quotesApi, type QuotesInput } from "~/backend/dataBase";
import { Button } from "../Forms/Buttons";
import { Card } from "../Generals/Cards";
import React, { useState } from "react";
import { ButtonNavigate } from "./Buttons";
import { useOpportunityRealtime } from "~/backend/realTime";
import { LayoutModal } from "../Generals/Modals";
const ContainerSection = ({
  title,
  message,
  children,
}: {
  title: string;
  message: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="max-w-md mx-auto px-6 py-4 mt-12">
      <Card>
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p>{message}</p>
          {children}
        </div>
      </Card>
    </section>
  );
};
export function SectionCreateQuote() {
  return (
    <ContainerSection
      title="Sin Cotización"
      message="Crea una nueva cotización para esta oportunidad"
    >
      <ButtonCreateQuote />
    </ContainerSection>
  );
}
export function ButtonCreateQuote({
  label = "Crear cotización",
}: {
  label?: string;
}) {
  useOpportunityRealtime();
  const [open, setOpen] = useState<boolean>(false);
  const { selectedOpportunity, showModal } = useUI();
  const { quotes } = selectedOpportunity || {};

  const handleCreateQuote = async () => {
    try {
      if (selectedOpportunity) {
        if (quotes && quotes.length > 0) {
          const activeQuote = quotes.find((q) => q.active === true);
          if (!activeQuote) return;
          const id_activeQuote = activeQuote.id;
          const confirm = window.confirm(
            "Ya existe una cotización activa. ¿Querés reemplazarla con una nueva?"
          );
          if (!confirm) return;
          const { error: updateError } = await quotesApi.update({
            id: id_activeQuote,
            values: { active: false },
          });
          if (updateError) throw new Error(updateError.message);
        }
        showModal({ title: "Procesando", message: "Creando cotización" });
        const newQuote: QuotesInput = {
          id_opportunity: selectedOpportunity.id,
          status: "Abierta",
          active: true,
        };
        const { error: insertError } = await quotesApi.insertOne(newQuote);
        if (insertError) throw new Error(insertError.message);
        showModal({
          title: "¡Todo OK!",
          message: "Cotización inicializada",
          variant: "success",
        });
      }
    } catch (e) {
      showModal({
        title: "Error al actualizar",
        message: `Problemas al intentar crear la cotización`,
        code: String(e),
        variant: "error",
      });
    }
  };
  const handleCopyQuote = () => {
    showModal({
      title: "En proceso",
      message: "Se está trabajando en ello 👩🏻‍💻. En breve estará disponible",
      variant: "information"
    })
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>{label}</Button>
      <LayoutModal
        open={open}
        handleOpen={() => setOpen(false)}
        title="Crear nueva cotización"
        size="w-md"
      >
        <div className="flex flex-col gap-4 mt-6">
          <p className="text-sm">Puedes comenzar una cotización desde cero:</p>
          <span className="mx-auto text-center">
            <Button variant="yellow" onClick={handleCreateQuote}>
              Crear en blanco
            </Button>
          </span>

          <p className="text-sm">
            o duplicar una cotización existente. Se copiarán todos los detalles,
            y se reemplazarán las etapas del flujo actual.
          </p>
          <span className="mx-auto text-center">
            <Button variant="blue" onClick={handleCopyQuote}>
              Duplicar cotización
            </Button>
          </span>
        </div>
      </LayoutModal>
    </>
  );
}

export function ButtonNavigateDetails() {
  const { selectedOpportunity } = useUI();
  return (
    <ContainerSection
      title="Cotización sin detalles"
      message="Esta cotización no tiene detalles creados"
    >
      <ButtonNavigate
        route={`/opportunity/${selectedOpportunity?.id}/quotes/materials`}
      >
        Ir a Detalles de Cotización
      </ButtonNavigate>
    </ContainerSection>
  );
}
