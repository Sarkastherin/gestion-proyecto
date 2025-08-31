import { Input, Select, Textarea } from "~/components/Forms/Inputs";
import { CardToggle, Card } from "~/components/Generals/Cards";
import { useForm } from "react-hook-form";
import { useUI } from "~/context/UIContext";
import { quotesApi } from "~/backend/cruds";
import FooterForms from "./FooterForms";
import { useEffect } from "react";
import { updateSingleRow, type DirtyMap } from "~/utils/updatesSingleRow";
import { useFieldsChange } from "~/utils/fieldsChange";
import type { QuotesUI } from "~/types/opportunitiesType";
import { useData } from "~/context/DataContext";
import type { QuotesDB } from "~/types/opportunitiesType";
import { useUIModals } from "~/context/ModalsContext";
import { useState } from "react";
import { MarginsForm } from "./MarginsForm";
export const formaPago = [
  { description: "15 días fecha de factura por transferencia bancaria" },
  { description: "15 días fecha de factura por e-cheq a 15 días" },
  { description: "30 días fecha de factura por transferencia bancaria" },
  { description: "30 días fecha de factura por e-cheq a 15 días" },
  { description: "contra envio de factura por transferencia bancaria" },
  { description: "contra envio de factura por e-cheq a 15 días" },
  { description: "contra envio de factura por e-cheq a 30 días" },
  { description: "Otro" },
];
export default function ConditionsForm({
  quoteActive,
}: {
  quoteActive: number;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { openModal } = useUIModals();
  const { editByStatus } = useUI();
  const { selectedOpportunity } = useData();
  const { quotes } = selectedOpportunity || {};
  const {
    register,
    formState: { dirtyFields, isSubmitSuccessful, isDirty },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<QuotesUI>({
    defaultValues: {},
  });
  const onSubmit = async (formData: QuotesUI): Promise<void> => {
    openModal("LOADING");
    try {
      await updateSingleRow({
        dirtyFields: dirtyFields as DirtyMap<QuotesDB>,
        formData: formData,
        onUpdate: quotesApi.update,
      });
      openModal("SUCCESS", {
        message: `Oportunidad actualizada correctamente`,
      });
    } catch (e) {
      openModal("ERROR", {
        message: `No se pudo actualizar la oportunidad. Error: ${String(e)}`,
      });
    }
  };

  useFieldsChange({ isSubmitSuccessful, isDirty });
  useEffect(() => {
    const quote = quotes?.find((q) => q.id === quoteActive);
    if (quote) reset(quote);
  }, [quotes, quoteActive]);
  return (
    <>
      <form className=" flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={!isEditMode}>
          <CardToggle title="Formas y metodos de pago">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
              <Select
                disabled={!editByStatus}
                label="Forma de pago"
                {...register("method_payment", {
                  required: true,
                })}
              >
                {formaPago.map((item) => (
                  <option key={item["description"]} value={item["description"]}>
                    {item["description"]}
                  </option>
                ))}
              </Select>
              <Input
                disabled={!editByStatus}
                placeholder="Plazo de ejecución"
                label="Plazo de ejecución"
                {...register("delivery_time")}
              />
              <Input
                disabled={!editByStatus}
                placeholder="Garantía"
                label="Garantía"
                {...register("guarantee")}
              />
              <Input
                disabled={!editByStatus}
                type="date"
                placeholder="Vigencia"
                label="Vigencia"
                {...register("validity")}
              />
              <Input
                disabled={!editByStatus}
                type="date"
                placeholder="Fecha probable de inicio"
                label="Fecha probable de inicio"
                {...register("estimated_start_date")}
              />
              <Select
                disabled={!editByStatus}
                label="Status"
                {...register("status", {
                  required: true,
                })}
              >
                <option value="">Seleccione un status</option>
                {[{ description: "Abierta" }, { description: "Cerrada" }].map(
                  (item) => (
                    <option
                      key={item["description"]}
                      value={item["description"]}
                    >
                      {item["description"]}
                    </option>
                  )
                )}
              </Select>
              <div className="lg:col-span-2">
                <Textarea
                  disabled={!editByStatus}
                  label="Notas de Cotización"
                  placeholder="Notas de Cotización"
                  rows={2}
                  {...register("notes")}
                />
              </div>
            </div>
          </CardToggle>
        </fieldset>
        <MarginsForm
          watch={watch}
          register={register}
          setValue={setValue}
          disabled={!isEditMode}
        />
        <FooterForms
          isNew={false}
          isEditMode={isEditMode}
          onToggleEdit={() => setIsEditMode((prev) => !prev)}
        />
      </form>
    </>
  );
}
