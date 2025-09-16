import { Input, Select } from "~/components/Forms/Inputs";
import { Button } from "~/components/Forms/Buttons";
import { useForm } from "react-hook-form";
import { dailyReportsApi } from "~/backend/cruds";
import { use, useEffect, useState } from "react";
import type { DailyReportDB, ProjectAndBudgetUI } from "~/types/projectsType";
import { updateSingleRow } from "~/utils/updatesSingleRow";
import { useUIModals } from "~/context/ModalsContext";
import { useData } from "~/context/DataContext";
import { useDailyReportsRealtime } from "~/backend/realTime";
type TypePhasesUI = ProjectAndBudgetUI["phases_project"];

export function DailyReportInitForm({
  onSuccess,
  phases_project,
  selectedPhase,
  setSelectedPhase,
  data,
  type,
}: {
  onSuccess: (id: number) => void;
  phases_project: TypePhasesUI;
  selectedPhase: number | "";
  data?: DailyReportDB;
  setSelectedPhase: React.Dispatch<React.SetStateAction<number | "">>;
  type: "new" | "edit";
}) {
  useDailyReportsRealtime();
  const dailyReports =
    phases_project?.flatMap((phase) => phase.daily_reports) || [];
  const { openModal } = useUIModals();
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
    reset,
  } = useForm<DailyReportDB>();

  const onSubmit = async (formData: DailyReportDB) => {
    try {
      if (type === "new") {
        if (
          dailyReports.some(
            (dr) =>
              dr.date_report === formData.date_report &&
              dr.id_phase === formData.id_phase
          )
        ) {
          throw new Error(
            "Ya existe un parte diario para la fase y fecha seleccionadas"
          );
        }
        openModal("LOADING", {
          message: "Procesando requerimiento",
        });
        const { data, error } = await dailyReportsApi.insertOne(formData);
        if (error)
          throw new Error("Error inserting daily report:", {
            cause: error,
          });
        if (data) {
          onSuccess(data.id);
          openModal("INFORMATION", {
            title: "📄 Parte diario creado",
            message: (
              <>
                <p>✅ El parte diario ha sido inicializado correctamente</p>
                <p>➡️ continue con las actividades.</p>
              </>
            ),
          });
        }
      } else {
        if (Object.keys(dirtyFields).length > 0) {          
          /* dailyReports.some(
            (dr) =>
              dr.date_report === formData.date_report &&
              dr.id_phase === formData.id_phase
          ) */
          await updateSingleRow({
            dirtyFields: dirtyFields,
            formData: formData,
            onUpdate: dailyReportsApi.update,
          });
          openModal("INFORMATION", {
            title: "📄 Parte diario actualizado",
            message: (
              <>
                <p>✅ El parte diario ha sido actualizado correctamente</p>
                <p>➡️ continue con las actividades.</p>
              </>
            ),
          });
        }
        onSuccess(formData.id);
      }
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
    if (data) {
      setSelectedPhase(data?.id_phase || "");
      reset({
        id: data?.id || 0,
        id_phase: data?.id_phase || undefined,
        date_report:
          data?.date_report || new Date().toISOString().split("T")[0],
      });
    }
  }, [data]);
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
        {...register("date_report", { required: true })}
      />
      <div className="mt-4 float-end">
        <Button variant="outlineDark" type="submit">Ir a Actividades</Button>
      </div>
    </form>
  );
}
