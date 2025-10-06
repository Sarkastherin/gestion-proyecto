import ModalBase from "../ModalBase";
import { useContacts } from "~/context/ContactsContext";
import type { UseFormSetValue } from "react-hook-form";
import type { TaskAssignmentProps } from "~/types/projectsType";
export default function PersonalModal({
  open,
  onClose,
  taskIndex,
  selected = [],
  setValue,
  isFull,
}: {
  open: boolean;
  onClose: () => void;
  taskIndex: number | null;
  selected: TaskAssignmentProps[];
  setValue: UseFormSetValue<any>;
  isFull: boolean;
}) {
  const { employees } = useContacts();
  const toggleEmployee = (id: number) => {
    if (taskIndex === null || taskIndex === undefined) return;

    const current = selected || [];

    const updated = (() => {
      const existing = current.find((e) => e.id_employee === id);

      if (!existing) {
        // No existe → lo agregamos como activo
        return [...current, { id_employee: id, active: true }];
      }

      // Existe → alternamos el estado
      return current.map((e) =>
        e.id_employee === id ? { ...e, active: !e.active } : e
      );
    })();

    setValue(`tasks.${taskIndex}.task_assignments`, updated, {
      shouldDirty: true,
    });
  };
  return (
    <ModalBase
      title="Listado de Operarios"
      open={open}
      zIndex={50}
      onClose={onClose}
      width="max-w-lg"
      footer={{
        btnPrimary: {
          label: "Cerrar",
          variant: "light",
          handleOnClick: onClose,
        },
      }}
    >
      <div
        className="px-6 pt-6 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 270px)" }}
      >
        <fieldset>
          <legend className="sr-only">Checkboxes</legend>

          <div className="flex flex-col items-start gap-3">
            {employees
              ?.filter((e) => e.puesto !== "Coordinador")
              .map((employee) => (
                <label
                  key={employee.id}
                  htmlFor={`employee-${employee.id}`}
                  className="inline-flex items-center gap-3"
                >
                  <input
                    type="checkbox"
                    className="size-5 rounded border-zinc-300 shadow-sm dark:border-zinc-600 dark:bg-zinc-900 dark:ring-offset-zinc-900 dark:checked:bg-blue-600"
                    id={`employee-${employee.id}`}
                    checked={selected?.some(
                      (e) => e.id_employee === employee.id && e.active
                    )}
                    onChange={() => toggleEmployee(employee.id)}
                    disabled={
                      isFull &&
                      !selected?.some(
                        (e) => e.id_employee === employee.id && e.active
                      )
                    }
                  />
                  <span className="font-medium text-zinc-700 dark:text-zinc-200">
                    {`${employee.contacto_nombre} - [${employee.id}] `}
                  </span>
                </label>
              ))}
          </div>
        </fieldset>
        {isFull && (
          <div className="mt-4 px-4 py-2 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded text-sm">
            Selección de personal completa. Si necesitas agregar más personas,
            modifica la cantidad definida en la tarea.
          </div>
        )}
      </div>
    </ModalBase>
  );
}
