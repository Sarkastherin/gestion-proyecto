import { Button } from "~/components/Forms/Buttons";
import ModalBase from "../ModalBase";
import { useForm } from "react-hook-form";
import { projectsApi } from "~/backend/cruds";
import { useData } from "~/context/DataContext";
import { useUIModals } from "~/context/ModalsContext";
import { useProjectRealtime } from "~/backend/realTime";
export default function CustomerRequirementModal({
  open,
  onClose,
  data
}: {
  open: boolean;
  onClose: () => void;
  data: {
    customer_requirement?: boolean
  };
}) {
  const { register, watch, handleSubmit } = useForm<{
    customer_requirement: boolean;
  }>({
    defaultValues: { customer_requirement: data?.customer_requirement || false },
  });
  useProjectRealtime();
  const { selectedProject } = useData();
  const { openModal } = useUIModals();
  if (!selectedProject) return null;
  const onSubmit = async (data: { customer_requirement: boolean }) => {
    try {
      openModal("LOADING");
      const { status, error } = await projectsApi.update({
        id: selectedProject.id,
        values: { customer_requirement: data.customer_requirement },
      });
      if (error) throw new Error(error?.message);
      onClose();
      openModal("SUCCESS", {
        title: "¡Todo OK!",
        message: `Requerimiento del cliente actualizado`,
        variant: "success",
      });
    } catch (err) {
      openModal("ERROR", {
        title: "¡Error!",
        message: `No se pudo actualizar el requerimiento del cliente. Inténtalo de nuevo.`,
        variant: "error",
      });
    }
  };
  return (
    <ModalBase
      title={`Requerimientos de cliente`}
      open={open}
      zIndex={50}
      onClose={onClose}
      width="max-w-4xl"
    >
      <div
        className="px-6 pt-6 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 270px)" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              {...register("customer_requirement")}
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {watch("customer_requirement")
                ? "Requerimientos validados"
                : "Validar requerimientos"}
            </label>
          </div>
          <div className="w-fit float-end">
            <Button type="submit" variant="primary">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </ModalBase>
  );
}
