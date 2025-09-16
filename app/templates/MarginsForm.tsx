import { Card, CardToggle } from "~/components/Generals/Cards";
import { Input } from "~/components/Forms/Inputs";
import { useEffect } from "react";
import type {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
type PropsMarginsForm = {
  watch: UseFormWatch<any>;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  disabled: boolean;
};
export const MarginsForm = ({
  watch,
  register,
  setValue,
  disabled,
}: PropsMarginsForm) => {
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
  return (
    <>
      <fieldset disabled={disabled}>
        {" "}
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
                  <th className="px-3 py-2 whitespace-nowrap">Total con M/S</th>
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
                      disabled={false}
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
                  <td className="px-3 py-2 whitespace-nowrap">Mano de obra</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {watch("total_labor")?.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "USD",
                    }) || "$ 0.00"}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">0 %</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <Input
                      disabled={false}
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
                  <td className="px-3 py-2 whitespace-nowrap">Subcontratos</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {watch("total_subcontracting")?.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "USD",
                    }) || "$ 0.00"}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">0 %</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <Input
                      disabled={false}
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
                      disabled={false}
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
      <fieldset disabled={disabled}>
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
                    disabled={disabled}
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
    </>
  );
};
