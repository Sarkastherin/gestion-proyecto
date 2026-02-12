import { useForm } from "react-hook-form";
import ModalBase from "../ModalBase";
import { Button } from "~/components/Forms/Buttons";
import { Input } from "~/components/Forms/Inputs";
import { holidaysApi } from "~/backend/cruds";
import type { HolidaysDB } from "~/types/projectsType";
import type { ModalSteps } from "./useModalState";
import { CircleCheckBig, CircleX, Loader } from "lucide-react";
import { useEffect } from "react";
import { useData } from "~/context/DataContext";

export default function HolidaysModal({
  open,
  onClose,
  step,
  setStep,
  holiday,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  step: ModalSteps;
  setStep: React.Dispatch<React.SetStateAction<ModalSteps>>;
  holiday?: HolidaysDB | null;
  onSuccess?: () => void;
}) {
  const { getHolidays } = useData();
  const { register, handleSubmit, reset } = useForm<HolidaysDB>({
    defaultValues: {
      date: holiday?.date || "",
      name: holiday?.name || "",
    },
  });

  useEffect(() => {
    reset({
      date: holiday?.date || "",
      name: holiday?.name || "",
    });
  }, [holiday, reset]);

  const onSubmit = async (data: HolidaysDB) => {
    try {
      setStep("saving");
      if (holiday?.id) {
        const { error } = await holidaysApi.update({
          id: holiday.id,
          values: {
            name: data.name ?? null,
            date: data.date,
          },
        });
        if (error) throw error;
      } else {
        const { error } = await holidaysApi.insertOne({
          name: data.name ?? null,
          date: data.date,
        });
        if (error) throw error;
      }
      reset();
      setStep("success");
      onSuccess?.();
      getHolidays();
    } catch (err) {
      setStep("error");
    }
  };
  const renderContent = () => {
    if (step === "saving") {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Guardando feriado...</p>
        </div>
      );
    }

    if (step === "success") {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-8 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
          <CircleCheckBig className="w-12 h-12 text-green-600 dark:text-green-400" />
          <p className="text-sm font-medium text-green-700 dark:text-green-300">
            Feriado guardado correctamente.
          </p>
          <div className="w-fit">
            <Button type="button" variant="green" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      );
    }

    if (step === "error") {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-8 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
          <CircleX className="w-12 h-12 text-red-600 dark:text-red-400" />
          <p className="text-sm font-medium text-red-700 dark:text-red-300">
            No se pudo guardar el feriado. Intentalo de nuevo.
          </p>
          <div className="w-fit">
            <Button type="button" variant="light" onClick={() => setStep("form")}>
              Volver al formulario
            </Button>
          </div>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Nombre del feriado"
          {...register("name", { required: true })}
        />
        <Input
          label="Fecha del feriado"
          type="date"
          {...register("date", { required: true })}
        />
        <div className="w-fit float-end">
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </div>
      </form>
    );
  };
  return (
    <ModalBase
      title={holiday ? `Editar Feriado` : `Nuevo Feriado`}
      open={open}
      zIndex={50}
      onClose={onClose}
      width="max-w-lg"
    >
      <div
        className="px-2 pt-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 270px)" }}
      >
        {renderContent()}
      </div>
    </ModalBase>
  );
}
