import { useForm } from "react-hook-form";
import { Input, Select } from "~/components/Forms/Inputs";
import { Button } from "~/components/Forms/Buttons";

export type ReportFilters = {
  project_id?: string;
  phase_id?: string;
  employee_id?: string;
  from_date?: string;
  to_date?: string;
};

export const ReportsFilterForm = ({
  projects,
  phases,
  employees,
  onApplyFilters,
}: {
  projects: { id: string; name: string }[];
  phases: { id: string; name: string }[];
  employees: { id: string; full_name: string }[];
  onApplyFilters: (filters: ReportFilters) => void;
}) => {
  const { register, handleSubmit } = useForm<ReportFilters>();

  return (
    <form
      onSubmit={handleSubmit(onApplyFilters)}
      className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Proyecto */}
        <Select label="Proyecto" id="project_id" register={register("project_id")}>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Select>

        {/* Etapa */}
        <Select label="Etapa" id="phase_id" register={register("phase_id")}>
          {phases.map((ph) => (
            <option key={ph.id} value={ph.id}>
              {ph.name}
            </option>
          ))}
        </Select>

        {/* Empleado */}
        <Select label="Empleado" id="employee_id" register={register("employee_id")}>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.full_name}
            </option>
          ))}
        </Select>

        {/* Rango de fechas */}
        <Input label="Desde" id="from_date" type="date" {...register("from_date")} />
        <Input label="Hasta" id="to_date" type="date" {...register("to_date")} />
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="primary" size="md" className="w-auto">
          Aplicar filtros
        </Button>
      </div>
    </form>
  );
};
