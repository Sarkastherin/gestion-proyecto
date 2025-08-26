import { useForm } from "react-hook-form";
import { CardToggle } from "~/components/Generals/Cards";
import { Input, Textarea, Select } from "~/components/Forms/Inputs";
import FooterForms from "../FooterForms";
import type { ProjectsDB } from "~/types/projectsType";
import { useState } from "react";
import { useUI } from "~/context/UIContext";
import { useModalState } from "~/components/modals_temp/particularsModals/useModalState";
import type { ContactsDataType } from "~/context/ContactsContext";
import { formaPago } from "../ConditionsForm";
export function InformationForms({
  defaultValues,
}: {
  defaultValues: ProjectsDB;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { selectedClient } = useUI();
  const clientModal = useModalState<ContactsDataType>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProjectsDB>({
    defaultValues: defaultValues,
  });
  const onSubmit = (data: ProjectsDB) => {
    console.log(data);
  };
  console.log(defaultValues);
  return (
    <form className=" flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={!isEditMode}>
        <CardToggle title="Datos del Proyecto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre del Proyecto"
              disabled={!isEditMode}
              {...register("name", { required: "Campo requerido" })}
              error={errors.name?.message}
            />
            <Input
              label="Cliente"
              placeholder="Seleccione un cliente"
              readOnly
              disabled={!isEditMode}
              value={selectedClient?.nombre || ""}
              onClick={() => {
                clientModal.openModal();
              }}
              error={errors.id_client?.message}
            />
            <input
              type="hidden"
              {...register("id_client", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <div className="col-span-2">
              <Textarea
                disabled={!isEditMode}
                label="Alcance"
                {...register("scope")}
              />
            </div>
          </div>
        </CardToggle>
      </fieldset>
      <fieldset disabled={!isEditMode}>
        <CardToggle title="Detalles adicionales">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-3">
              <Select
                disabled={!isEditMode}
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
            </div>
            <div className="col-span-3">
              <Input
                label="Garantía"
                {...register("guarantee")}
                disabled={!isEditMode}
                error={errors.guarantee?.message}
              />
            </div>
            <Input
              label="Fecha de inicio [Plan]"
              type="date"
              {...register("plan_start_date")}
              disabled={!isEditMode}
              error={errors.plan_start_date?.message}
            />
            <Input
              label="Fecha de fin [Plan]"
              type="date"
              {...register("plan_end_date")}
              disabled={!isEditMode}
              error={errors.plan_end_date?.message}
            />
            <Input
              label="Duración [Plan]"
              type="date"
              {...register("plan_duration")}
              disabled={!isEditMode}
              error={errors.plan_duration?.message}
            />
          </div>
        </CardToggle>
      </fieldset>
      <fieldset>
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
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700"></tbody>
            </table>
          </div>
        </CardToggle>
      </fieldset>
      <FooterForms
        isNew={false}
        isEditMode={isEditMode}
        onToggleEdit={() => setIsEditMode((prev) => !prev)}
      />
    </form>
  );
}
