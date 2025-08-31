import type { Route } from "../../+types/root";
import { ContainerToForms } from "~/components/Generals/Containers";
import { useData } from "~/context/DataContext";
import { useProjectRealtime } from "~/backend/realTime";
import { useContacts } from "~/context/ContactsContext";
import { Card, CardToggle } from "~/components/Generals/Cards";
import { Input, Select } from "~/components/Forms/Inputs";
import { useUI } from "~/context/UIContext";
import { ButtonAdd } from "~/components/Specific/Buttons";
import { useForm, useFieldArray } from "react-hook-form";
import type { TaskProps, TaskDB } from "~/types/projectsType";
import { Button } from "~/components/Forms/Buttons";
import { useEffect, useState } from "react";
import PersonalModal from "~/components/modals_temp/particularsModals/PersonalModal";
import { useModalState } from "~/components/modals_temp/particularsModals/useModalState";
import FooterForms from "~/templates/FooterForms";
import { ButtonDeleteIcon } from "~/components/Specific/Buttons";
// 📌 Meta
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Planificación" },
    { name: "description", content: "Planificación del proyecto" },
  ];
}
type TasksForm = {
  tasks: (TaskProps & {
    employee_assigned: number[];
  })[];
};
type PersonalModalPayload = {
  activeIndex: number | null;
};

// 🧩 Página principal
export default function Planning() {
  useProjectRealtime();
  const [isEditMode, setIsEditMode] = useState(false);
  const personalModal = useModalState<PersonalModalPayload>();
  const { selectedProject } = useData();
  const { phases_project } = selectedProject || {};
  const { employees } = useContacts();
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const { isFieldsChanged } = useUI();
  const [tasksToDelete, setTasksToDelete] = useState<Array<TaskDB["id"]>>([]);
  if (!selectedProject) return null;

  const { control, register, watch, handleSubmit, setValue } =
    useForm<TasksForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });
  const handleAdd = () => {
    console.log(selectedPhase);
    if (selectedProject && selectedPhase && employees && employees.length > 0) {
      append({
        name: "",
        id_project: selectedProject.id,
        id_phase: selectedPhase,
        id_supervisor: 0,
        duration: 0,
        progress: 0,
        employee_assigned: [],
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
  const onSubmit = (data: TasksForm) => {
    console.table(data.tasks);
  };
  return (
    <ContainerToForms>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={!isEditMode}>
          <Select
            id="id_phase"
            onChange={(e) => handleChangePhases(e)}
            disabled={isFieldsChanged}
          >
            {phases_project?.map((phase) => (
              <option key={phase.id} value={phase.id}>
                {`[${phase.id}] ${phase.name}`}
              </option>
            ))}
          </Select>
          <div className="mt-4">
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
                      {...register(`tasks.${index}.name`)}
                      placeholder="Nombre de la tarea"
                    />
                    <div className="flex flex-col md:flex-row gap-2">
                      <div className="flex-2">
                        <Select
                          label="Supervisor"
                          {...register(`tasks.${index}.id_supervisor`)}
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
                          {...register(`tasks.${index}.duration`)}
                          placeholder="Duración (en días)"
                        />
                      </div>
                      <div className="flex-1">
                        <Select
                          label="Avance"
                          {...register(`tasks.${index}.progress`)}
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
                      {watch(`tasks.${index}.employee_assigned`)?.length > 0 ? (
                        <ul className="flex flex-wrap gap-2">
                          {watch(`tasks.${index}.employee_assigned`)?.map(
                            (id: number) => (
                              <li key={id}>
                                <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-sm whitespace-nowrap text-purple-700">
                                  {
                                    employees?.find((e) => e.id === id)
                                      ?.contacto_nombre
                                  }
                                </span>
                              </li>
                            )
                          )}
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
                              `tasks.${personalModal.data.activeIndex}.employee_assigned`
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
