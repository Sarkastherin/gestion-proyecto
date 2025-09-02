import type { Route } from "../../+types/root";
import { ContainerToForms } from "~/components/Generals/Containers";
import { useData } from "~/context/DataContext";
import { useContacts } from "~/context/ContactsContext";
import { CardToggle } from "~/components/Generals/Cards";
import { Input, Select } from "~/components/Forms/Inputs";
import { useUI } from "~/context/UIContext";
import { ButtonAdd } from "~/components/Specific/Buttons";
import { useForm, useFieldArray } from "react-hook-form";
import type {
  TaskDB,
  TaskAssignmentProps,
  TaskAssignmentDB,
} from "~/types/projectsType";
import { Button } from "~/components/Forms/Buttons";
import { useEffect, useMemo, useState } from "react";
import PersonalModal from "~/components/modals_temp/particularsModals/PersonalModal";
import { useModalState } from "~/components/modals_temp/particularsModals/useModalState";
import FooterForms from "~/templates/FooterForms";
import { ButtonDeleteIcon } from "~/components/Specific/Buttons";
import { useUIModals } from "~/context/ModalsContext";
import { useFieldsChange } from "~/utils/fieldsChange";
import { tasksApi, taskAssignmentsApi } from "~/backend/cruds";
import { useTasksRealtime } from "~/backend/realTime";
// 📌 Meta
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Planificación" },
    { name: "description", content: "Planificación del proyecto" },
  ];
}
type TaskFormProps = TaskDB & {
  task_assignments: TaskAssignmentDB[];
};
type TasksFormArray = {
  tasks: TaskFormProps[];
};
type PersonalModalPayload = {
  activeIndex: number | null;
};

// 🧩 Página principal
export default function Planning() {
  useTasksRealtime();
  const [isEditMode, setIsEditMode] = useState(false);
  const personalModal = useModalState<PersonalModalPayload>();
  const { selectedProject } = useData();
  const { phases_project } = selectedProject || {};
  const { tasks } = selectedProject || {};
  const { employees } = useContacts();
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const { isFieldsChanged } = useUI();
  const { openModal } = useUIModals();
  const [tasksToDelete, setTasksToDelete] = useState<Array<TaskDB["id"]>>([]);
  if (!selectedProject) return null;

  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitSuccessful, isDirty, dirtyFields },
  } = useForm<TasksFormArray>({
    defaultValues: { tasks: tasks },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });
  useFieldsChange({ isSubmitSuccessful, isDirty });
  const handleAdd = () => {
    if (selectedProject && selectedPhase && employees && employees.length > 0) {
      append({
        id: 0, // default value for new task, will be replaced by DB
        created_at: new Date().toISOString(), // or "" if you prefer
        name: "",
        id_project: selectedProject.id,
        id_phase: selectedPhase,
        id_supervisor: 0,
        duration: 0,
        progress: 0,
        task_assignments: [],
      });
    }
  };
  const handleChangePhases = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const phaseId = Number(e.target.value);
    setSelectedPhase(phaseId);
  };
  const handleOpenPersonal = (index: number) => {
    personalModal.openModal({ activeIndex: index });
  };
  const handleRemove = (index: number) => {
    const currentItems = watch("tasks");
    const item = currentItems[index];
    if (item && "id" in item && typeof item.id === "number") {
      setTasksToDelete((prev) => [...prev, item.id as number]);
    }
    remove(index);
  };
  const onSubmit = async (data: TasksFormArray) => {
    if (!isDirty) {
      openModal("INFORMATION", {
        title: "Formulario sin cambios",
        message: "No hay cambios para actualizar'",
      });
      return;
    }
    openModal("LOADING");
    try {
      const { tasks } = data;
      const dirtyArray = dirtyFields.tasks ?? [];
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
  useEffect(() => {
    if (phases_project && phases_project.length > 0 && !selectedPhase) {
      setSelectedPhase(phases_project[0].id);
    }
  }, [phases_project]);
  useEffect(() => {
    reset({ tasks });
  }, [tasks]);
  const employeesById = useMemo(
    () => new Map(employees?.map((e) => [e.id, e.contacto_nombre])),
    [employees]
  );
  return (
    <ContainerToForms>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={!isEditMode} className="flex items-center gap-4">
          <div className="flex-1">
            <Select
              id="id_phase"
              onChange={(e) => handleChangePhases(e)}
              disabled={isFieldsChanged}
              value={selectedPhase || undefined}
            >
              {phases_project?.map((phase) => (
                <option key={phase.id} value={phase.id}>
                  {`[${phase.id}] ${phase.name}`}
                </option>
              ))}
            </Select>
          </div>
          <div className="">
            <ButtonAdd
              disabled={false}
              title="Agregar Tarea"
              onClick={handleAdd}
              label="Agregar Tarea"
            />
          </div>
        </fieldset>
        <fieldset
          className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2"
          disabled={!isEditMode}
        >
          {fields
            .map((field, index) => ({ ...field, index }))
            .filter((item) => item.id_phase === selectedPhase)
            .map(({ index, id }) => (
              <div className="flex-1 relative" key={id}>
                <CardToggle
                  title={`Tarea: ${watch(`tasks.${index}.name`) || "Nombre de tarea"}`}
                >
                  <div className="flex flex-col gap-2">
                    <Input
                      label="Descripción"
                      {...register(`tasks.${index}.name`, {required: {value: true, message: "Este campo es requerido"} })}
                      placeholder="Nombre de la tarea"
                    />
                    <div className="flex flex-col md:flex-row gap-2">
                      <div className="flex-2">
                        <Select
                          label="Supervisor"
                          {...register(`tasks.${index}.id_supervisor`, {
                            valueAsNumber: true,
                            validate: (value) => value > 0
                          })}
                          selectText="Seleccionar Supervisor"
                        >
                          {employees?.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                              {employee.contacto_nombre}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <div className="flex-1">
                        <Input
                          label="Duración en días"
                          type="number"
                          {...register(`tasks.${index}.duration`, {
                            valueAsNumber: true,
                            validate: (value) => value > 0
                          })}
                          placeholder="Duración (en días)"
                        />
                      </div>
                      <div className="flex-1">
                        <Select
                          label="Avance"
                          {...register(`tasks.${index}.progress`, {
                            valueAsNumber: true,
                          })}
                          selectText="Avance"
                        >
                          <option value="0">0 %</option>
                          <option value="0.25">25 %</option>
                          <option value="0.5">50 %</option>
                          <option value="0.75">75 %</option>
                          <option value="1">100 %</option>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 ">
                      <div
                        className="bg-green-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{
                          width: `${watch(`tasks.${index}.progress`) * 100 || 0}%`,
                        }}
                      />
                    </div>
                    <div className="">
                      <h5 className="font-semibold">Personal asignado</h5>
                      {watch(`tasks.${index}.task_assignments`)?.length > 0 ? (
                        <ul className="flex flex-wrap gap-2">
                          {watch(`tasks.${index}.task_assignments`)
                            ?.filter(
                              (assignment: TaskAssignmentProps) =>
                                assignment.active
                            )
                            .map((assignment: TaskAssignmentProps) => (
                              <li key={assignment.id_employee}>
                                <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-sm whitespace-nowrap text-purple-700">
                                  {employeesById.get(assignment.id_employee)}
                                </span>
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-zinc-400">
                          No hay personal asignado
                        </p>
                      )}
                      <div className="mt-4 w-40">
                        <Button
                          type="button"
                          variant="yellow"
                          onClick={() => handleOpenPersonal(index)}
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
                      watch={watch}
                    />
                  </div>
                  <div className="absolute right-4 top-3">
                    <ButtonDeleteIcon
                      disabled={!isEditMode}
                      onClick={() => handleRemove(index)}
                    />
                  </div>
                </CardToggle>
              </div>
            ))}
        </fieldset>
        <FooterForms
          isNew={false}
          isEditMode={isEditMode}
          onToggleEdit={() => setIsEditMode((prev) => !prev)}
        />
      </form>
    </ContainerToForms>
  );
}
