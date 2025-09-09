import { Input, Select } from "~/components/Forms/Inputs";
import { Button } from "~/components/Forms/Buttons";
import { useForm } from "react-hook-form";
import { dailyReportsApi } from "~/backend/cruds";
import { useEffect, useState } from "react";
import type { DailyReportDB, ProjectAndBudgetUI } from "~/types/projectsType";
import { updateSingleRow } from "~/utils/updatesSingleRow";
import { useUIModals } from "~/context/ModalsContext";
import { useData } from "~/context/DataContext";
type TypePhasesUI = ProjectAndBudgetUI["phases_project"];

export function DailyReportInitForm({
  onSuccess,
  phases_project,
  selectedPhase,
  setSelectedPhase,
}: {
  onSuccess: (id: number) => void;
  phases_project: TypePhasesUI;
  selectedPhase: number | "";
  setSelectedPhase: React.Dispatch<React.SetStateAction<number | "">>;
}) {
  const dailyReports =
    phases_project?.flatMap((phase) => phase.daily_reports) || [];
  const {} = useData();
  const { openModal } = useUIModals();
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<DailyReportDB>();

  const onSubmit = async (formData: DailyReportDB) => {
    if (
      dailyReports.some(
        (dr) =>
          dr.date_report === formData.date_report &&
          dr.id_phase === formData.id_phase
      )
    ) {
      openModal("ERROR", {
        title: "Reporte existente",
        message: `Ya existe un reporte para la fecha ${formData.date_report} en la etapa seleccionada.`,
      });
      return;
    }
    try {
      openModal("LOADING", {
        message: "Procesando requerimiento",
      });
      if ("id" in formData) {
        await updateSingleRow({
          dirtyFields: Object.fromEntries(
            Object.entries(dirtyFields).filter(
              ([_, v]) => typeof v === "boolean"
            )
          ),
          formData: formData,
          onUpdate: dailyReportsApi.update,
        });
      } else {
        const { data, error } = await dailyReportsApi.insertOne(formData);
        if (error)
          throw new Error("Error inserting daily report:", { cause: error });
        if (data) {
          onSuccess(data.id);
        }
      }
      openModal("SUCCESS", {
        message: "Se han guardado los datos",
      });
    } catch (e) {
      openModal("ERROR", {
        message: `No se pudo actualizar la oportunidad. ${e}`,
      });
    }
  };
  const handleChangePhases = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPhaseId = Number(e.target.value);
    if (selectedPhaseId && typeof selectedPhaseId === "number") {
      setSelectedPhase(selectedPhaseId);
    }
    // Aquí puedes manejar el cambio de fase según tus necesidades
  };
  useEffect(() => {
    if (selectedPhase) {
      console.log(dailyReports);
    }
  }, [selectedPhase]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Etapa"
        {...register("id_phase", { required: true, valueAsNumber: true })}
        onChange={(e) => handleChangePhases(e)}
        disabled={false}
        value={selectedPhase || ""}
      >
        {phases_project?.map((phase) => (
          <option key={phase.id} value={phase.id}>
            {`[${phase.id}] ${phase.name}`}
          </option>
        ))}
      </Select>
      <Input
        label="Fecha"
        type="date"
        defaultValue={new Date().toISOString().split("T")[0]}
        {...register("date_report", { required: true })}
      />
      <div className="mt-4 w-28 float-end">
        <Button type="submit">Siguiente</Button>
      </div>
    </form>
  );
}
