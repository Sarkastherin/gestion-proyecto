import { useEffect } from "react";
import { Input, Textarea } from "~/components/Forms/Inputs";
import { Badge } from "~/components/Specific/Badge";
import { Button } from "~/components/Forms/Buttons";
import {
  ChevronDownIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { UserGroupIcon as UserGroupIconSolid } from "@heroicons/react/24/solid";
import { formatDateUStoES } from "~/utils/functionsDays";
import type {
  TaskAssignmentProps,
} from "~/types/projectsType";
import PersonalModal from "~/components/modals/particularsModals/PersonalModal";
import { workdayIntl } from "~/utils/functionsDays";
import type { PersonalModalPayload } from "~/routes/project/planning";
import { useUIModals } from "~/context/ModalsContext";

type Props = {
  index: number;
  expanded: boolean;
  toggleExpanded: (index: number) => void;
  onRemove: (index: number) => void;
  onOpenPersonal: (index: number) => void;
  employeesById: Map<number, string>;
  register: any;
  watch: any;
  setValue: any;
  personalModal: {
    open: boolean;
    data: PersonalModalPayload | undefined;
    closeModal: () => void;
  };
  mode: "" | "0000000" | "0000010" | "0000011" | undefined;
};

export default function TaskCard({
  index,
  expanded,
  toggleExpanded,
  onRemove,
  onOpenPersonal,
  employeesById,
  register,
  watch,
  setValue,
  personalModal,
  mode,
}: Props) {
  const {openModal} = useUIModals();
  // valores derivados
  const taskValues = watch(`tasks.${index}`);
  const assignedCount =
    taskValues.task_assignments?.filter((ta: TaskAssignmentProps) => ta.active)
      .length || 0;
  const peopleCount = taskValues.peopleCount || 0;
  const isFull = assignedCount === peopleCount;

  // recalculo endDate cuando cambia startDate o duration
  useEffect(() => {
    if (!mode) {
      openModal("ERROR", {
        title: "Modalidad de cálculo no seleccionada",
        message:
          "Selecciona una modalidad de cálculo de días laborales para que el sistema pueda calcular las fechas automáticamente.",
      });
      return;
    }
    const start = taskValues.startDate;
    const duration = taskValues.duration;
    if (!start || !duration) return;
    // 🔹 aquí llamás a tu workdayIntl si querés automatizar
    const endDate = workdayIntl(start, duration, mode).toLocaleDateString(
      "sv-SE"
    );
    setValue(`tasks.${index}.endDate`, endDate, { shouldDirty: true });
  }, [taskValues.startDate, taskValues.duration]);
  return (
    <div className="flex-1 relative">
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-4 border border-zinc-200 dark:border-zinc-700 overflow-hidden relative">
        {/* Header */}
        <div
          onClick={() => toggleExpanded(index)}
          className="cursor-pointer flex justify-between items-center gap-2 pb-2"
        >
          <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">
            {`Tarea: ${watch(`tasks.${index}.name`) || "Nombre de tarea"}`}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // evita que dispare el toggle expand
                onRemove(index);
              }}
              title="Eliminar Tarea"
              className="p-1 text-red-600 dark:text-red-400 hover:text-white hover:bg-red-600 dark:hover:bg-red-400 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
            <ChevronDownIcon
              className={`w-6 transition-transform duration-300 ${
                expanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>

        {/* Basic Info */}
        <div
          className={`mt-2 flex justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-300 ${
            expanded ? "border-b" : ""
          } border-zinc-400 pb-2`}
        >
          <div>
            <span className="block font-medium">Inicio</span>
            <span>{formatDateUStoES(taskValues.startDate) || "-"}</span>
          </div>
          <div>
            <span className="block font-medium">Fin</span>
            <span>{formatDateUStoES(taskValues.endDate) || "-"}</span>
          </div>
          <div>
            <span className="block font-medium">Duración</span>
            <span>
              {taskValues.duration ? `${taskValues.duration} días` : "-"}
            </span>
          </div>
          <div>
            <span className="block font-medium">Personas</span>
            <span>{peopleCount}</span>
          </div>
          <div>
            <span className="block font-medium">Avance</span>
            <span>{taskValues.progress || 0}%</span>
          </div>
        </div>

        {/* Expanded content */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            expanded ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-3">
            {/* Campos principales */}
            <div className="mt-2 grid grid-cols-2 lg:grid-cols-6 gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="col-span-1 lg:col-span-2">
                <span className="block font-medium">Inicio</span>
                <Input {...register(`tasks.${index}.startDate`)} type="date" />
              </div>
              <div className="col-span-1 lg:col-span-2">
                <span className="block font-medium">Fin</span>
                <Input
                  readOnly
                  {...register(`tasks.${index}.endDate`)}
                  type="date"
                />
              </div>
              <div>
                <span className="block font-medium">Duración</span>
                <Input
                  {...register(`tasks.${index}.duration`, {
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div>
                <span className="block font-medium">Personas</span>
                <Input
                  {...register(`tasks.${index}.peopleCount`, {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>

            <div>
              <Input
                label="Nombre de la tarea"
                {...register(`tasks.${index}.name`, { required: true })}
                type="text"
              />
              <Textarea
                label="Observaciones"
                {...register(`tasks.${index}.observations`)}
                placeholder="Detalles adicionales..."
                rows={2}
              />
            </div>

            {/* Personal */}
            <div>
              <div className="flex justify-between items-center">
                <h5 className="font-semibold">Personal asignado</h5>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  {isFull ? (
                    <UserGroupIconSolid className="inline w-4 h-4 text-blue-600" />
                  ) : (
                    <UserGroupIcon className="inline w-4 h-4" />
                  )}
                  {assignedCount}/{peopleCount}
                </span>
              </div>
              {assignedCount > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {taskValues.task_assignments
                    ?.filter((a: TaskAssignmentProps) => a.active)
                    .map((a: TaskAssignmentProps) => (
                      <li key={a.id_employee}>
                        <Badge variant="purple">
                          {employeesById.get(a.id_employee)}
                        </Badge>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-400">
                  No hay personal asignado
                </p>
              )}
              <div className="mt-4 w-fit">
                <Button
                  type="button"
                  variant="yellow"
                  size="sm"
                  onClick={() => onOpenPersonal(index)}
                >
                  Agregar Personal
                </Button>
              </div>
            </div>

            <PersonalModal
              open={personalModal.open}
              onClose={personalModal.closeModal}
              taskIndex={personalModal.data?.activeIndex ?? null}
              selected={
                typeof personalModal.data?.activeIndex === "number"
                  ? watch(
                      `tasks.${personalModal.data.activeIndex}.task_assignments`
                    )
                  : []
              }
              setValue={setValue}
              isFull={isFull}
            />
          </div>
        </div>

        {/* Indicador planificado */}
        <span
          className={`absolute bottom-0 right-0 ${
            taskValues.planned ? "bg-blue-200" : "bg-yellow-200"
          } px-2 py-0.5 font-medium text-xs rounded-tl-lg text-zinc-700`}
        >
          {taskValues.planned ? "Planificado" : "No planificado"}
        </span>
      </div>
    </div>
  );
}
