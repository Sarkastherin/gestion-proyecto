import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { Select } from "~/components/Forms/Inputs";
import FooterForms from "~/templates/FooterForms";
import TasksList from "~/components/planning/TasksList";
import { useUIModals } from "~/context/ModalsContext";
import { useUI } from "~/context/UIContext";
import { useFieldsChange } from "~/utils/fieldsChange";
import type { TaskDB, TaskAssignmentDB } from "~/types/projectsType";
import type { PersonalModalPayload } from "~/routes/project/planning";
import {
  tasksApi,
  taskAssignmentsApi,
  phasesProjectApi,
} from "~/backend/cruds";
import type { ProjectAndBudgetUI } from "~/types/projectsType";
import type { EmployeesDataType } from "~/context/ContactsContext";
import type {
  TasksFormArray,
  TaskFormProps,
} from "~/components/planning/TasksList";

type Props = {
  selectedProject: ProjectAndBudgetUI;
  employees: EmployeesDataType[] | null;
  personalModal: {
    open: boolean;
    data: PersonalModalPayload | undefined;
    closeModal: () => void;
    openModal: (data: PersonalModalPayload) => void;
  };
};

export default function PlanningForm({
  selectedProject,
  employees,
  personalModal,
}: Props) {
  const { phases_project } = selectedProject || {};
  const tasks = phases_project?.flatMap((phase) => phase.tasks) || [];
  const { isFieldsChanged } = useUI();
  const { openModal } = useUIModals();
  const [isEditMode, setIsEditMode] = useState(false);
  const [tasksToDelete, setTasksToDelete] = useState<Array<TaskDB["id"]>>([]);
  const [propsPhases, setPropsPhases] = useState<{
    id_phase: number;
    id_supervisor: number;
  } | null>(null);

  // hook form
  const form = useForm<TasksFormArray>({
    defaultValues: { tasks },
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "tasks",
  });

  useFieldsChange({
    isSubmitSuccessful: form.formState.isSubmitSuccessful,
    isDirty: form.formState.isDirty,
  });

  // empleados por id
  const employeesById = useMemo(
    () => new Map(employees?.map((e) => [e.id, e.contacto_nombre])),
    [employees]
  );

  const handleAdd = () => {
    if (selectedProject && propsPhases?.id_phase) {
      fieldArray.append({
        id: 0,
        created_at: new Date().toISOString(),
        name: "",
        id_phase: propsPhases.id_phase,
        duration: 0,
        task_assignments: [],
      });
    }
  };

  const handleRemoveTask = (index: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      const currentItems = form.getValues("tasks");
      const item = currentItems[index];
      if (item && "id" in item && typeof item.id === "number") {
        setTasksToDelete((prev) => [...prev, item.id as number]);
      }
      fieldArray.remove(index);
    }
  };

  const onSubmit = async (data: TasksFormArray) => {
    const selectedPhase = selectedProject.phases_project.find(
      (phase) => phase.id === propsPhases?.id_phase
    );
    const hasChangedSupervisor =
      selectedPhase?.id_supervisor !== propsPhases?.id_supervisor;
    if (!form.formState.isDirty && !hasChangedSupervisor) {
      openModal("INFORMATION", {
        title: "Formulario sin cambios",
        message: "No hay cambios para actualizar'",
      });
      return;
    }
    openModal("LOADING");
    try {
      const { tasks } = data;
      const dirtyArray = form.formState.dirtyFields.tasks ?? [];

      if (!selectedPhase)
        throw new Error("No se encontró la fase seleccionada");
      if (!propsPhases?.id_supervisor)
        throw new Error("No se ha seleccionado un supervisor");

      if (hasChangedSupervisor) {
        const { error: errorUpdate } = await phasesProjectApi.update({
          id: selectedPhase.id,
          values: { id_supervisor: propsPhases.id_supervisor },
        });
        if (errorUpdate) throw new Error(errorUpdate.message);
      }

      await Promise.all(
        tasks.map(async (task, i) => {
          const hasId = task.id > 0;
          const dirty = dirtyArray[i] ?? {};
          const hasFieldChanged = Object.values(dirty).some((v) => v);
          if (hasId && hasFieldChanged) {
            const fieldsChanged = Object.keys(dirty) as (keyof TaskFormProps)[];
            const updates: Partial<TaskFormProps> = fieldsChanged.reduce(
              (acc, key) => {
                acc[key] = task[key] as any;
                return acc;
              },
              {} as Partial<TaskFormProps>
            );
            const { task_assignments, ...updateTask } = updates;
            const { error: errorUpdate } = await tasksApi.update({
              id: task.id as number,
              values: updateTask,
            });
            if (errorUpdate) throw new Error(errorUpdate.message);
            if (task_assignments) {
              task_assignments.forEach(async (assignment: TaskAssignmentDB) => {
                const hasId = "id" in assignment;
                const { id, created_at, id_task, ...values } = assignment;
                if (hasId) {
                  const { error: errorAssignment } =
                    await taskAssignmentsApi.update({
                      id: id,
                      values: values,
                    });
                  if (errorAssignment) throw new Error(errorAssignment.message);
                } else {
                  const insertValues = { id_task: task.id, ...values };
                  const { error: errorAssignment } =
                    await taskAssignmentsApi.insertOne(insertValues);
                  if (errorAssignment) throw new Error(errorAssignment.message);
                }
              });
            }
          } else if (!hasId) {
            const { task_assignments, id, created_at, ...newData } =
              task as TaskFormProps;
            const { data: dataInsert, error: errorInsert } =
              await tasksApi.insertOne(newData);
            if (errorInsert) throw new Error(errorInsert.message);
            if (task_assignments && dataInsert) {
              await Promise.all(
                task_assignments.map(async (assignment: TaskAssignmentDB) => {
                  const { id, created_at, id_task, ...values } = assignment;
                  const insertValues = { id_task: dataInsert.id, ...values };
                  const { error: errorAssignment } =
                    await taskAssignmentsApi.insertOne(insertValues);
                  if (errorAssignment) throw new Error(errorAssignment.message);
                })
              );
            }
          }
        })
      );
      for (const id of tasksToDelete) {
        const { error: errorRemove } = await tasksApi.remove({ id });
        if (errorRemove) throw new Error(errorRemove.message);
      }
      openModal("SUCCESS", {
        title: "Tareas actualizadas",
        message: "Las tareas se han actualizado correctamente.",
      });
    } catch (e) {
      openModal("ERROR", {
        title: "Error al actualizar",
        message: `No se pudo actualizar las tareas. Error: ${String(e)}`,
      });
    }
  };

  // efectos para fases por defecto y reset
  useEffect(() => {
    if (phases_project && phases_project.length > 0 && !propsPhases?.id_phase) {
      const firstPhaseWithTasks = phases_project.findIndex(
        (phase) => phase.tasks.length > 0
      );
      if (firstPhaseWithTasks !== -1) {
        setPropsPhases({
          id_phase: phases_project[firstPhaseWithTasks].id,
          id_supervisor: phases_project[firstPhaseWithTasks].id_supervisor || 0,
        });
      }
    }
  }, [phases_project]);
  const handleChangePhase = (id_phase: number) => {
    const phase = phases_project?.find((p) => p.id === id_phase);
    if (phase) {
      setPropsPhases({
        id_phase: phase.id,
        id_supervisor: phase.id_supervisor || 0,
      });
    }
  };
  useEffect(() => {
    form.reset({
      tasks: tasks.sort((a, b) => (a.id as number) - (b.id as number)),
    });
  }, [phases_project]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* selects de fase y supervisor */}
      <fieldset
        disabled={!isEditMode}
        className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Select
          label="Etapa"
          id="id_phase"
          onChange={(e) => {
            const selectedPhaseId = Number(e.target.value);
            handleChangePhase(selectedPhaseId);
          }}
          disabled={isFieldsChanged}
          value={propsPhases?.id_phase || ""}
        >
          {phases_project?.map((phase) => (
            <option key={phase.id} value={phase.id}>
              {`[${phase.id}] ${phase.name}`}
            </option>
          ))}
        </Select>
        <Select
          label="Supervisor"
          id="id_supervisor"
          value={propsPhases?.id_supervisor || ""}
          onChange={(e) =>
            setPropsPhases({
              ...propsPhases!,
              id_supervisor: Number(e.target.value),
            })
          }
        >
          {employees
            ?.filter((e) => e.puesto === "Supervisor")
            .map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.contacto_nombre}
              </option>
            ))}
        </Select>
      </fieldset>

      <TasksList
        form={form}
        fieldArray={fieldArray}
        currentPhaseId={propsPhases?.id_phase || 0}
        employeesById={employeesById}
        onAdd={handleAdd}
        onRemove={handleRemoveTask}
        onOpenPersonal={(i) => personalModal.openModal({ activeIndex: i })}
        personalModal={personalModal}
        isEditMode={isEditMode}
        mode={selectedProject?.mode || ""}
      />

      <FooterForms
        isNew={false}
        isEditMode={isEditMode}
        onToggleEdit={() => setIsEditMode((prev) => !prev)}
      />
    </form>
  );
}
