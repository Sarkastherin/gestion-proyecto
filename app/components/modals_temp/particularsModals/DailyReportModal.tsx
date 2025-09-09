import { useEffect, useState } from "react";
import { Input, Select } from "~/components/Forms/Inputs";
import ModalBase from "../ModalBase";
import { Button } from "~/components/Forms/Buttons";
import { useData } from "~/context/DataContext";
import { ButtonAdd } from "~/components/Specific/Buttons";
import type {
  DailyReportDB,
  ReportTaskDB,
  ViewTasks,
} from "~/types/projectsType";
import { ReportTasksForm } from "~/templates/Projects/DailyReports/ReportTasksForm";
import { ReportEmployeeForm } from "~/templates/Projects/DailyReports/ReportEmployeeForm";
import { set, useFieldArray, useForm } from "react-hook-form";
import { DailyReportInitForm } from "~/templates/Projects/DailyReports/DailyReportInitForm";
import {
  DocumentPlusIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";
import { ReportMaterialsForm } from "~/templates/Projects/DailyReports/ReportMaterialsForm";
type DailyReportModalProps = {
  open: boolean;
  onClose: () => void;
};

const initialSteps = [
  { id: 1, name: "Inicializando", status: "in-progress" },
  { id: 2, name: "Actividades", status: "pending" },
  { id: 3, name: "Personal", status: "pending" },
  { id: 4, name: "Materiales", status: "pending" },
];
export default function DailyReportModal({
  open,
  onClose,
}: DailyReportModalProps) {
  const [dailyReportId, setDailyReportId] = useState<number | null>(null);
  const [idsEmployees, setIdsEmployees] = useState<number[] | null>(null);
  const {
    selectedProject,
    getTasksByIdPhase,
    tasksProgress,
    setTasksProgress,
  } = useData();
  const { phases_project } = selectedProject || {};
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
  useEffect(() => {
    if (selectedPhase) {
      getTasksByIdPhase(selectedPhase);
    }
  }, [selectedPhase]);
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
  return (
    <ModalBase
      title="Parte Diario"
      open={open}
      zIndex={40}
      onClose={() => {
        setSteps(initialSteps.map((s) => ({ ...s })));
        setSelectedPhase("");
        setDailyReportId(null);
        setTasksProgress(null);
        onClose();
      }}
      width="max-w-4xl"
    >
      {phases_project && (
        <div className="mt-4 space-y-2">
          {/* Barra de progreso */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-400 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <ol className="flex justify-between text-zinc-400">
            <li>
              <div
                className={`flex items-center ${steps[0].status === "done" ? "text-indigo-400" : ""}`}
              >
                <DocumentPlusIcon className="h-5 w-5 mr-2" />
                <span>Inicializando</span>
              </div>
            </li>
            <li>
              <div
                className={`flex items-center ${steps[1].status === "done" ? "text-indigo-400" : ""}`}
              >
                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                <span>Actividades</span>
              </div>
            </li>
            <li>
              <div
                className={`flex items-center ${steps[2].status === "done" ? "text-indigo-400" : ""}`}
              >
                <UserGroupIcon className="h-5 w-5 mr-2" />
                <span>Personal</span>
              </div>
            </li>
            <li>
              <div
                className={`flex items-center ${steps[3].status === "done" ? "text-indigo-400" : ""}`}
              >
                <ArchiveBoxArrowDownIcon className="h-5 w-5 mr-2" />
                <span>Materiales</span>
              </div>
            </li>
          </ol>

          {steps[0].status === "in-progress" && (
            <DailyReportInitForm
              selectedPhase={selectedPhase}
              setSelectedPhase={setSelectedPhase}
              phases_project={phases_project}
              onSuccess={(id) => {
                setDailyReportId(id);
                handleNextStep();
              }}
            />
          )}
          {dailyReportId &&
            tasksProgress &&
            steps[1].status === "in-progress" && (
              <ReportTasksForm
                idDailyReport={dailyReportId}
                filteredTasks={tasksProgress}
                selectedPhase={selectedPhase as number}
                onSuccess={(tasksTouched) => {
                  setIdsEmployees(getEmployeeDataByTasksId(tasksTouched));
                  handleNextStep();
                }}
              />
            )}
          {dailyReportId &&
            idsEmployees &&
            steps[2].status === "in-progress" && (
              <ReportEmployeeForm
                idDailyReport={dailyReportId}
                selectedPhase={selectedPhase as number}
                idsEmployees={idsEmployees}
                onSuccess={() => {
                  handleNextStep();
                }}
              />
            )}
          {dailyReportId && steps[3].status === "in-progress" && (
            <ReportMaterialsForm
              idDailyReport={dailyReportId}
              onSuccess={() => {
                handleNextStep();
                onClose();
              }}
            />
          )}
        </div>
      )}
    </ModalBase>
  );
}
