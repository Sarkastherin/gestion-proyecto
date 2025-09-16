import { useEffect, useState } from "react";
import ModalBase from "../ModalBase";
import { useData } from "~/context/DataContext";
import { ReportTasksForm } from "~/templates/Projects/DailyReports/ReportTasksForm";
import { ReportEmployeeForm } from "~/templates/Projects/DailyReports/ReportEmployeeForm";
import { DailyReportInitForm } from "~/templates/Projects/DailyReports/DailyReportInitForm";
import {
  DocumentPlusIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";
import { ReportMaterialsForm } from "~/templates/Projects/DailyReports/ReportMaterialsForm";
import type { DailyReportUI } from "~/types/projectsType";
type DailyReportModalProps = {
  open: boolean;
  onClose: () => void;
  type: "new" | "edit";
  report?: DailyReportUI;
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
  type,
  report,
}: DailyReportModalProps) {
  const [dailyReportId, setDailyReportId] = useState<number | null>(
    report?.id || null
  );
  const [idsEmployees, setIdsEmployees] = useState<number[] | null>(null);
  const {
    selectedProject,
    getTasksByIdPhase,
    tasksProgress,
    setTasksProgress,
    refreshProject,
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
  const handlerStepClick = (index: number) => {
    if (type === "new") return;
    const newSteps = steps.map((s, i) => {
      if (i <= index) {
        s.status = "in-progress";
      }
      return s;
    });
    //setSteps(newSteps);
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
  return (
    <ModalBase
      title={type === "new" ? "Nuevo Parte Diario" : "Editar Parte Diario"}
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
          <div className="w-full bg-zinc-200 dark:bg-zinc-600 rounded-full h-2.5">
            <div
              className="bg-green h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <ol className="flex justify-between text-zinc-400 dark:text-zinc-500">
            <li>
              <LinkStep index={0} icon={<DocumentPlusIcon />} />
            </li>
            <li>
              <LinkStep index={1} icon={<ClipboardDocumentCheckIcon />} />
            </li>
            <li>
              <LinkStep index={2} icon={<UserGroupIcon />} />
            </li>
            <li>
              <LinkStep index={3} icon={<ArchiveBoxArrowDownIcon />} />
            </li>
          </ol>

          {steps[0].status === "in-progress" && (
            <DailyReportInitForm
              selectedPhase={selectedPhase}
              setSelectedPhase={setSelectedPhase}
              phases_project={phases_project}
              data={report}
              type={type}
              onSuccess={(id) => {
                setDailyReportId(id);
                handleNextStep();
                refreshProject();
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
                type={type}
                data={report}
                onSuccess={(tasksTouched) => {
                  setIdsEmployees(getEmployeeDataByTasksId(tasksTouched));
                  handleNextStep();
                  refreshProject();
                }}
              />
            )}
          {dailyReportId &&
            idsEmployees &&
            steps[2].status === "in-progress" && (
              <ReportEmployeeForm
                idDailyReport={dailyReportId}
                idsEmployees={idsEmployees}
                type={type}
                data={report}
                onSuccess={() => {
                  handleNextStep();
                  refreshProject();
                }}
              />
            )}
          {dailyReportId && steps[3].status === "in-progress" && (
            <ReportMaterialsForm
              idDailyReport={dailyReportId}
              onSuccess={() => {
                handleNextStep();
                onClose();
                refreshProject();
              }}
            />
          )}
        </div>
      )}
    </ModalBase>
  );
}
