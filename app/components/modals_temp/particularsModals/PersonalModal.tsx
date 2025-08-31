import ModalBase from "../ModalBase";
import { useContacts } from "~/context/ContactsContext";
import type { UseFormSetValue } from "react-hook-form";
export default function PersonalModal({
  open,
  onClose,
  taskIndex,
  selected = [],
  setValue,
  watch
}: {
  open: boolean;
  onClose: () => void;
  taskIndex: number | null;
  selected: number[];
  setValue: UseFormSetValue<any>;
  watch?: any;
}) {
  const { employees } = useContacts();
  const toggleEmployee = (id: number) => {
    if (taskIndex === null || taskIndex === undefined) return;
    const current = selected || [];
    const updated = current.includes(id)
      ? current.filter((e) => e !== id)
      : [...current, id];

    setValue(`tasks.${taskIndex}.employee_assigned`, updated, {
      shouldDirty: true,
    });
  };
  return (
    <ModalBase
      title="Listado de Personal"
      open={open}
      zIndex={40}
      onClose={onClose}
      width="max-w-lg"
      footer={{
        btnPrimary: {
          label: "Cerrar",
          variant: "secondary",
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
            {employees?.map((employee) => (
              <label
                key={employee.id}
                htmlFor={`employee-${employee.id}`}
                className="inline-flex items-center gap-3"
              >
                <input
                  type="checkbox"
                  className="size-5 rounded border-zinc-300 shadow-sm dark:border-zinc-600 dark:bg-zinc-900 dark:ring-offset-zinc-900 dark:checked:bg-blue-600"
                  id={`employee-${employee.id}`}
                  checked={selected?.includes(employee.id)}
                  onChange={() => toggleEmployee(employee.id)}
                />
                <span className="font-medium text-zinc-700 dark:text-zinc-200">
                  {`${employee.contacto_nombre} - [${employee.id}] `}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </ModalBase>
  );
}
