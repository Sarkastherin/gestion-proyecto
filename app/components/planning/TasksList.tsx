import { use, useEffect, useState } from "react";
import { ButtonAdd } from "~/components/Specific/Buttons";
import { Button } from "~/components/Forms/Buttons";
import TaskCard from "./TaskCard";
import type { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import type { PersonalModalPayload } from "~/routes/project/planning";
import type { TaskAssignmentDB, TaskDB } from "~/types/projectsType";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useData } from "~/context/DataContext";

export type TaskFormProps = TaskDB & {
  task_assignments: TaskAssignmentDB[];
};
export type TasksFormArray = {
  tasks: (TaskFormProps & { progress?: number })[];
};
type Props = {
  form: UseFormReturn<TasksFormArray>;
  fieldArray: UseFieldArrayReturn<TasksFormArray, "tasks">;
  currentPhaseId: number | null;
  employeesById: Map<number, string>;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onOpenPersonal: (index: number) => void;
  personalModal: {
    open: boolean;
    data: PersonalModalPayload | undefined;
    closeModal: () => void;
  };
  isEditMode: boolean;
  mode: "" | "0000000" | "0000010" | "0000011" | undefined;
};

export default function TasksList({
  form,
  fieldArray,
  currentPhaseId,
  employeesById,
  onAdd,
  onRemove,
  onOpenPersonal,
  personalModal,
  isEditMode,
  mode,
}: Props) {
  const { watch, register, setValue } = form;
  const { fields } = fieldArray;

  // estado local para expansiones
  const [expandedIndexes, setExpandedIndexes] = useState<
    Record<number, boolean>
  >({});

  const toggleExpanded = (index: number) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleExpandedAll = () => {
    if (Object.keys(expandedIndexes).length === fields.length) {
      // Todas expandidas, cerrar todas
      setExpandedIndexes({});
    } else {
      // No todas expandidas, expandir todas
      const all: Record<number, boolean> = {};
      fields.forEach((_, idx) => (all[idx] = true));
      setExpandedIndexes(all);
    }
  };
  return (
    <fieldset
      className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2"
      disabled={!isEditMode}
    >
      {/* Header acciones globales */}
      <div className="col-span-full flex justify-between items-center mb-2">
        <ButtonAdd
          disabled={!isEditMode}
          title="Agregar Tarea"
          onClick={onAdd}
          label="Agregar Tarea"
        />
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={toggleExpandedAll}
            variant="outlineBlue"
            size="sm"
            disabled={fields.length === 0}
            title={
              Object.keys(expandedIndexes).length === fields.length
                ? "Cerrar todas"
                : "Expandir todas"
            }
          >
            <div className="flex items-center gap-1">
              {Object.keys(expandedIndexes).length === fields.length ? (
                <>
                  <LuEyeClosed className="w-5 h-5" /> <span>Cerrar todas</span>
                </>
              ) : (
                <>
                  <LuEye className="w-5 h-5" /> <span>Expandir todas</span>
                </>
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Render de cards */}
      {fields
        .map((field, index) => ({ ...field, index }))
        .filter((item) => item.id_phase === currentPhaseId)
        .map(({ index, id }) => (
          <TaskCard
            key={id}
            index={index}
            expanded={!!expandedIndexes[index]}
            toggleExpanded={toggleExpanded}
            onRemove={onRemove}
            onOpenPersonal={onOpenPersonal}
            employeesById={employeesById}
            register={register}
            watch={watch}
            setValue={setValue}
            personalModal={personalModal}
            mode={mode}
          />
        ))}
    </fieldset>
  );
}
