import { Input, Select, Textarea } from "~/components/Forms/Inputs";
import { CardToggle, Card } from "~/components/Generals/Cards";
import { useForm } from "react-hook-form";
import { useUI } from "~/context/UIContext";
import { quotesApi} from "~/backend/cruds";
import FooterForms from "./FooterForms";
import { useEffect } from "react";
import { updateSingleRow, type DirtyMap } from "~/utils/updatesSingleRow";
import { useFieldsChange } from "~/utils/fieldsChange";
import type { QuotesUI } from "~/types/opportunitiesType";
import { useData } from "~/context/DataContext";
import type { QuotesDB } from "~/types/opportunitiesType";
import { useUIModals } from "~/context/ModalsContext";
export default function ConditionsForm({
  quoteActive,
}: {
  quoteActive: number;
}) {
  const { openModal } = useUIModals();
  const { isModeEdit, editByStatus } = useUI();
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
      const {
        t_mg_materials,
        t_mg_labor,
        t_mg_subcontracting,
        t_mg_others,
        total,
        total_materials,
        total_labor,
        total_subcontracting,
        total_others,
        t_mg_total,
        ...propsQuote
      } = formData;
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
  const formaPago = [
    { description: "15 días fecha de factura por transferencia bancaria" },
    { description: "15 días fecha de factura por e-cheq a 15 días" },
    { description: "30 días fecha de factura por transferencia bancaria" },
    { description: "30 días fecha de factura por e-cheq a 15 días" },
    { description: "contra envio de factura por transferencia bancaria" },
    { description: "contra envio de factura por e-cheq a 15 días" },
    { description: "contra envio de factura por e-cheq a 30 días" },
    { description: "Otro" },
  ];
  useFieldsChange({ isSubmitSuccessful, isDirty });
  useEffect(() => {
    const quote = quotes?.find((q) => q.id === quoteActive);
    if (quote) reset(quote);
  }, [quotes, quoteActive]);
  const handleChangeTotalMS = (
    totalLabel:
      | "total_materials"
      | "total_labor"
      | "total_subcontracting"
      | "total_others"
      | "total",
    percentLabel:
      | "materials"
      | "labor"
      | "subcontracting"
      | "others"
      | "general",
    setValueLabel:
      | "t_mg_materials"
      | "t_mg_labor"
      | "t_mg_subcontracting"
      | "t_mg_others"
      | "t_mg_total"
  ) => {
    const total: number = watch(totalLabel);
    const percent = watch(percentLabel);
    const safePercent = percent ?? 0;
    setValue(setValueLabel, total * (1 + safePercent / 100));
  };
  useEffect(() => {
    const total =
      watch("t_mg_materials") +
      watch("t_mg_labor") +
      watch("t_mg_subcontracting") +
      watch("t_mg_others");
    setValue("total", total);
  }, [
    watch("t_mg_materials"),
    watch("t_mg_labor"),
    watch("t_mg_subcontracting"),
    watch("t_mg_others"),
  ]);
  useEffect(() => {
    const percent = watch("general") ?? 0;
    const t_mg_total = watch("total") * (1 + percent / 100);
    setValue("t_mg_total", t_mg_total);
  }, [watch("total")]);
  return (
    <>
      <form className=" flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={!isModeEdit}>
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
        <fieldset disabled={!isModeEdit}>
          <CardToggle title="Margenes de Ganancias">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto divide-y-2 divide-zinc-200 dark:divide-zinc-700">
                <colgroup>
                  <col />
                  <col className="w-[1%]" />
                  <col className="w-[1%]" />
                  <col className="w-[20%]" />
                  <col className="w-[1%]" />
                </colgroup>
                <thead className="ltr:text-left rtl:text-right">
                  <tr className="*:font-medium *:text-zinc-900 dark:*:text-white">
                    <th className="px-3 py-2 whitespace-nowrap">
                      Categoria de Cotización
                    </th>
                    <th className="px-3 py-2 whitespace-nowrap">Total</th>
                    <th className="px-3 py-2 whitespace-nowrap">INC %</th>
                    <th className="px-3 py-2 whitespace-nowrap">Márgen/Comp</th>
                    <th className="px-3 py-2 whitespace-nowrap">
                      Total con M/S
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr className="*:text-zinc-900 *:first:font-medium dark:*:text-white">
                    <td className="px-3 py-2 whitespace-nowrap">Materiales</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {watch("total_materials")?.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "USD",
                      }) || "$ 0.00"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">0 %</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <Input
                        disabled={!editByStatus}
                        placeholder="0 %"
                        {...register("materials", {
                          onChange: (e) =>
                            handleChangeTotalMS(
                              "total_materials",
                              "materials",
                              "t_mg_materials"
                            ),
                        })}
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {watch("t_mg_materials")?.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "USD",
                      }) || "$ 0.00"}
                    </td>
                  </tr>
                  <tr className="*:text-zinc-900 *:first:font-medium dark:*:text-white">
                    <td className="px-3 py-2 whitespace-nowrap">
                      Mano de obra
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {watch("total_labor")?.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "USD",
                      }) || "$ 0.00"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">0 %</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <Input
                        disabled={!editByStatus}
                        placeholder="0%"
                        {...register("labor", {
                          onChange: (e) =>
                            handleChangeTotalMS(
                              "total_labor",
                              "labor",
                              "t_mg_labor"
                            ),
                        })}
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {watch("t_mg_labor")?.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "USD",
                      }) || "$ 0.00"}
                    </td>
                  </tr>
                  <tr className="*:text-zinc-900 *:first:font-medium dark:*:text-white">
                    <td className="px-3 py-2 whitespace-nowrap">
                      Subcontratos
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {watch("total_subcontracting")?.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "USD",
                      }) || "$ 0.00"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">0 %</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <Input
                        disabled={!editByStatus}
                        placeholder="0%"
                        {...register("subcontracting", {
                          onChange: (e) =>
                            handleChangeTotalMS(
                              "total_subcontracting",
                              "subcontracting",
                              "t_mg_subcontracting"
                            ),
                        })}
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {watch("t_mg_subcontracting")?.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "USD",
                      }) || "$ 0.00"}
                    </td>
                  </tr>
                  <tr className="*:text-zinc-900 *:first:font-medium dark:*:text-white">
                    <td className="px-3 py-2 whitespace-nowrap">Otros</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {watch("total_others")?.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "USD",
                      }) || "$ 0.00"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">0 %</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <Input
                        disabled={!editByStatus}
                        placeholder="0%"
                        {...register("others", {
                          onChange: (e) =>
                            handleChangeTotalMS(
                              "total_others",
                              "others",
                              "t_mg_others"
                            ),
                        })}
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {watch("t_mg_others")?.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "USD",
                      }) || "$ 0.00"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardToggle>
        </fieldset>
        <fieldset disabled={!isModeEdit}>
          <Card>
            <table className="min-w-full table-auto ">
              <colgroup>
                <col className="w-[20%]" />
                <col className="w-[4%]" />
                <col className="w-[1%]" />
              </colgroup>
              <thead className="ltr:text-left rtl:text-right">
                <tr className="*:font-medium *:text-zinc-900 dark:*:text-white">
                  <th className="px-3 py-2 whitespace-nowrap">Total</th>
                  <th className="px-3 py-2 whitespace-nowrap">Márgen final</th>
                  <th className="px-3 py-2 whitespace-nowrap">Precio final</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="*:text-zinc-900 *:first:font-medium dark:*:text-white">
                  <td className="px-3 py-2 whitespace-nowrap">
                    {watch("total")?.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "USD",
                    }) || "$ 0.00"}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <Input
                      disabled={!editByStatus}
                      placeholder="0%"
                      {...register("general", {
                        valueAsNumber: true,
                        onChange: (e) =>
                          handleChangeTotalMS("total", "general", "t_mg_total"),
                      })}
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {watch("t_mg_total")?.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "USD",
                    }) || "$ 0.00"}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </fieldset>
        <FooterForms mode="view" />
      </form>
    </>
  );
}
