import { Input, Select } from "~/components/Forms/Inputs";
import { Button } from "~/components/Forms/Buttons";
import { useForm } from "react-hook-form";
import { dailyReportsApi } from "~/backend/cruds";
import { useEffect, useState } from "react";
import type { DailyReportDB, DailyReportUI } from "~/types/projectsType";
import { updateSingleRow } from "~/utils/updatesSingleRow";
import { useUIModals } from "~/context/ModalsContext";
import { useDailyReportsRealtime } from "~/backend/realTime";
import { useData } from "~/context/DataContext";

export function DailyReportInitForm({
  onSuccess,
  selectedPhase,
  setSelectedPhase,
  idDailyReport,
  type,
}: {
  onSuccess: (id: number) => void;
  selectedPhase: number | "";
  idDailyReport: number | null;
  setSelectedPhase: React.Dispatch<React.SetStateAction<number | "">>;
  type: "new" | "edit";
}) {
  const [report, setReport] = useState<DailyReportUI | null>(null);
  const { selectedProject } = useData();
  if (!selectedProject) return null;
  const { phases_project } = selectedProject || {};
  const dailyReports =
    phases_project?.flatMap((phase) => phase.daily_reports) || [];
  const getReport = (id: number) => {
    setReport(dailyReports.find((report) => report.id === id) || null);
  };
  useEffect(() => {
    if (idDailyReport) {
      getReport(idDailyReport);
    }
  }, [idDailyReport, phases_project]);

  useDailyReportsRealtime(
    `DailyReportInitForm-${selectedProject.id}-${idDailyReport}`
  );
  const isFinished = report?.status === "finalizado";
  const { openModal } = useUIModals();
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
    reset,
  } = useForm<DailyReportDB>();
  const isDuplicateReport = (
    formData: DailyReportDB,
    dailyReports: DailyReportDB[],
    ignoreId?: number
  ) => {
    return dailyReports.some(
      (dr) =>
        dr.date_report === formData.date_report &&
        dr.id_phase === formData.id_phase &&
        (ignoreId ? dr.id !== ignoreId : true)
    );
  };
  const onSubmit = async (formData: DailyReportDB) => {
    try {
      if (type === "new") {
        if (isDuplicateReport(formData, dailyReports)) {
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
          reset({
            id: data.id,
            id_phase: data.id_phase,
            date_report: data.date_report,
          });
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
        // Validar duplicados ignorando el propio registro
        if (isDuplicateReport(formData, dailyReports, formData.id)) {
          throw new Error(
            "Ya existe un parte diario para la fase y fecha seleccionadas"
          );
        }
        if (Object.keys(dirtyFields).length > 0) {
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
        reset(formData);
        onSuccess(formData.id);
      }
    } catch (e: any) {
      openModal("ERROR", {
        message: `No se pudo actualizar la oportunidad. ${e.message || e}`,
      });
    }
  };
  const handleChangePhases = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPhaseId = Number(e.target.value);
    setSelectedPhase(selectedPhaseId);
  };
  useEffect(() => {
    if (report) {
      setSelectedPhase(report?.id_phase || "");
      reset({
        id: report?.id || 0,
        id_phase: report?.id_phase || undefined,
        date_report:
          report?.date_report || new Date().toISOString().split("T")[0],
      });
    }
  }, [report, reset, setSelectedPhase]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isFinished}>
        <Select
          label="Etapa"
          {...register("id_phase", {
            required: { value: true, message: "Este campo es obligatorio" },
            valueAsNumber: true,
          })}
          onChange={(e) => handleChangePhases(e)}
          disabled={false}
          value={selectedPhase || ""}
          error={errors.id_phase?.message}
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
          {...register("date_report", {
            required: { value: true, message: "Este campo es obligatorio" },
          })}
          error={errors.date_report?.message}
        />
      </fieldset>
      <div className="mt-4 float-end">
        <Button variant="outlineBlue" type="submit" size="sm">
          Ir a Actividades
        </Button>
      </div>
    </form>
  );
}
