import { use, useEffect, useState } from "react";
import ModalBase from "../ModalBase";
import { useData } from "~/context/DataContext";
import { ReportTasksForm } from "~/templates/Projects/DailyReports/ReportTasksForm";
import { ReportEmployeeForm } from "~/templates/Projects/DailyReports/ReportEmployeeForm";
import { DailyReportInitForm } from "~/templates/Projects/DailyReports/DailyReportInitForm";
import {
  DocumentPlusIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import type { DailyReportUI } from "~/types/projectsType";
import { Button } from "~/components/Forms/Buttons";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { dailyReportsApi } from "~/backend/cruds";
import { useDailyReportsRealtime } from "~/backend/realTime";
type DailyReportModalProps = {
  open: boolean;
  onClose: () => void;
  type: "new" | "edit";
  report?: DailyReportUI;
};

const initialSteps = [
  {
    id: 1,
    name: "Inicializando",
    status: "in-progress",
    icon: <DocumentPlusIcon />,
  },
  {
    id: 2,
    name: "Actividades",
    status: "pending",
    icon: <ClipboardDocumentCheckIcon />,
  },
  { id: 3, name: "Personal", status: "pending", icon: <UserGroupIcon /> },
  //{ id: 4, name: "Materiales", status: "pending", icon: <ArchiveBoxArrowDownIcon /> },
];
export default function DailyReportModal({
  onClose,
  type,
  report,
}: DailyReportModalProps) {
  useDailyReportsRealtime("DailyReportModal");
  const [dailyReportId, setDailyReportId] = useState<number | null>(
    report?.id || null
  );
  const [idsEmployees, setIdsEmployees] = useState<number[] | null>(null);
  const { selectedProject, refreshProject, getReportsEmployees } = useData();
  const { phases_project } = selectedProject || {};
  const tasks = phases_project?.flatMap((phase) => phase.tasks) || [];
  const [steps, setSteps] = useState<typeof initialSteps>(() =>
    initialSteps.map((s) => ({ ...s }))
  );
  const [selectedPhase, setSelectedPhase] = useState<number | "">("");

  const progressPercent =
    steps.length > 0
      ? (steps.filter((s) => s.status === "done").length / steps.length) * 100
      : 0;
  const handleNextStep = () => {
    const currentStep = steps.findIndex(
      (step) => step.status === "in-progress"
    );
    if (currentStep !== -1) {
      const newSteps = [...steps];
      newSteps[currentStep].status = "done";
      if (currentStep + 1 < newSteps.length) {
        newSteps[currentStep + 1].status = "in-progress";
      }
      setSteps(newSteps);
    }
  };

  const getEmployeeDataByTasksId = (tasksTouched: number[]): number[] | [] => {
    const tasks = phases_project?.flatMap((phase) => phase.tasks);
    const assignments = tasks?.flatMap((t) => t.task_assignments);

    const assignmentsFiltered = tasksTouched.map((tId) => {
      const assigment = assignments?.filter(
        (a) => a.id_task === tId && a.active
      );
      return assigment;
    });
    if (assignmentsFiltered.length === 0) return [];
    const employeeIds = [
      ...new Set(
        assignmentsFiltered.flatMap((a) => a).map((a) => a?.id_employee)
      ),
    ];
    return employeeIds as number[];
  };
  const handlerStepClick = (index: number) => {
    if (type === "new") return;
    const newSteps = steps.map((s, i) => {
      if (i <= index) {
        s.status = "in-progress";
      }
      return s;
    });
  };
  const LinkStep = ({
    index,
    icon,
  }: {
    index: number;
    icon: React.ReactNode;
  }) => {
    return (
      <div
        className={`flex items-center font-semibold ${steps[index].status === "done" ? "text-green" : ""}`}
        onClick={() => handlerStepClick(index)}
      >
        <div className="size-5 mr-2">{icon}</div>
        <span>{steps[index].name}</span>
      </div>
    );
  };
  const handlePrevStep = () => {
    const currentStep = steps.findIndex(
      (step) => step.status === "in-progress"
    );
    if (currentStep > 0) {
      const newSteps = [...steps];
      newSteps[currentStep].status = "pending";
      newSteps[currentStep - 1].status = "in-progress";
      setSteps(newSteps);
    }
  };
  const ButtonBack = ({ label }: { label: string }) => {
    return (
      <div className="mt-4 w-fit">
        <Button
          size="sm"
          variant="light"
          type="button"
          onClick={handlePrevStep}
        >
          {label || "Volver"}
        </Button>
      </div>
    );
  };
  const changeStatus = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newStatus = e.currentTarget.id as "borrador" | "finalizado";
    if (newStatus === report?.status) return;
    if (!report) return;
    report.status = newStatus;
    try {
      const { error } = await dailyReportsApi.update({
        id: report?.id as number,
        values: { status: newStatus },
      });
      if (error) {
        throw new Error(
          `Problemas al actualizar el status del reporte: ${error}`
        );
      }
      refreshProject();
      toggleDropdown();
    } catch (error) {
      console.error("Error al actualizar el status del reporte:", error);
    }
  };
  const toggleDropdown = () => {
    const dropdown = document.getElementById("dropdown");
    if (dropdown) {
      dropdown.classList.toggle("hidden");
    }
  };
  return (
    <ModalBase
      title={
        type === "new"
          ? "Nuevo Parte Diario"
          : `Editar Parte Diario # ${report?.id}`
      }
      open={true}
      zIndex={40}
      onClose={() => {
        setSteps(initialSteps.map((s) => ({ ...s })));
        setSelectedPhase("");
        setDailyReportId(null);
        onClose();
      }}
      width="max-w-4xl"
    >
      <div
        className="px-6 pt-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 270px)" }}
      >
        {type === "edit" && (
          <div className="absolute top-4 right-12">
            <div className="flex flex-col items-end relative">
              <label
                htmlFor="search-dropdown"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Cambiar status
              </label>
              <Button
                variant={report?.status === "borrador" ? "yellow" : "green"}
                size="sm"
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                type="button"
                onClick={toggleDropdown}
                disabled={report?.status === "borrador"}
              >
                <div className="inline-flex items-center gap-1">
                  {report?.status
                    ? report.status.slice(0, 1).toUpperCase() +
                      report.status.slice(1)
                    : ""}{" "}
                  <ChevronDownIcon className="size-4.5" />
                </div>
              </Button>
              <div
                id="dropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-zinc-700"
              >
                <ul
                  className="py-2 text-sm text-zinc-700 dark:text-zinc-200"
                  aria-labelledby="dropdown-button"
                >
                  <li>
                    <button
                      type="button"
                      id="borrador"
                      className="inline-flex w-full px-4 py-2 hover:bg-yellow-200 hover:text-zinc-900"
                      onClick={changeStatus}
                    >
                      Borrador
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      id="finalizado"
                      className="inline-flex w-full px-4 py-2 hover:bg-green-200 hover:text-zinc-900"
                      onClick={changeStatus}
                    >
                      Finalizado
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {phases_project && (
          <div className="space-y-2">
            {/* Barra de progreso */}
            <div className="w-full bg-zinc-300 dark:bg-zinc-600 rounded-full h-2.5">
              <div
                className="bg-green h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <ol className="flex justify-between text-zinc-500 dark:text-zinc-500">
              {steps.map((step, index) => (
                <li key={Math.random()} className="">
                  <LinkStep index={index} icon={step.icon} />
                </li>
              ))}
            </ol>
            {steps[0].status === "in-progress" && (
              <DailyReportInitForm
                selectedPhase={selectedPhase}
                setSelectedPhase={setSelectedPhase}
                type={type}
                idDailyReport={dailyReportId}
                onSuccess={(id) => {
                  setDailyReportId(id);
                  handleNextStep();
                  refreshProject();
                }}
              />
            )}
            {dailyReportId && tasks && steps[1].status === "in-progress" && (
              <>
                <ReportTasksForm
                  idDailyReport={dailyReportId}
                  filteredTasks={tasks.filter(
                    (t) => t.id_phase === selectedPhase
                  )}
                  selectedPhase={selectedPhase as number}
                  type={type}
                  onSuccess={(tasksTouched) => {
                    setIdsEmployees(getEmployeeDataByTasksId(tasksTouched));
                    handleNextStep();
                    refreshProject();
                  }}
                />
                <ButtonBack label="Ir a Inicialización" />
              </>
            )}
            {dailyReportId &&
              idsEmployees &&
              steps[2].status === "in-progress" && (
                <>
                  <ReportEmployeeForm
                    idDailyReport={dailyReportId}
                    idsEmployees={idsEmployees}
                    type={type}
                    onSuccess={() => {
                      handleNextStep();
                      refreshProject();
                      getReportsEmployees();
                      onClose();
                    }}
                  />
                  <ButtonBack label="Ir a Actividades" />
                </>
              )}
          </div>
        )}
      </div>
    </ModalBase>
  );
}
