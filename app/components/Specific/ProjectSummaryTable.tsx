import { useState } from "react";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";
import { GoXCircleFill } from "react-icons/go";
import type { ProjectAndBudgetUI } from "~/types/projectsType";

export default function ProjectSummaryTable({
  phases_project,
  supervisorsById,
  getProgress,
}: {
  phases_project: ProjectAndBudgetUI["phases_project"];
  supervisorsById: (id_phase: number) => string;
  getProgress: Map<number, number>;
}) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const togglePhase = (id: number) => {
    setExpandedPhase((prev) => (prev === id ? null : id));
  };

  return (
    <div className="rounded-xl shadow-md p-6 border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900/70">
      <h3 className="text-lg font-semibold mb-4">Avance de etapas</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="border-b text-zinc-500 dark:text-zinc-400">
            <tr>
              <th className="py-2">Etapa</th>
              <th className="py-2">Supervisor</th>
              <th className="py-2">Avance</th>
            </tr>
          </thead>
          <tbody>
            {phases_project.map((phase) => {
              const isExpanded = expandedPhase === phase.id;
              return (
                <>
                  <tr
                    key={phase.id}
                    className="border-b last:border-0 text-zinc-700 dark:text-zinc-200 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
                    onClick={() => togglePhase(phase.id)}
                  >
                    <td className="py-2 flex items-center gap-2 font-medium">
                      <FaChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isExpanded
                            ? "rotate-90 text-indigo-600"
                            : "text-zinc-400"
                        }`}
                      />
                      {phase.name}
                    </td>
                    <td className="py-2 font-medium">{phase.name}</td>
                    <td className="py-2">{supervisorsById(phase.id)}</td>
                    <td className="py-2">{getProgress.get(phase.id) ?? 0}%</td>
                  </tr>

                  {isExpanded && (
                    <tr>
                      <td
                        colSpan={3}
                        className="p-3 bg-zinc-50 dark:bg-zinc-800/40"
                      >
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left">
                            <thead className="border-b text-zinc-500 dark:text-zinc-400">
                              <tr>
                                <th className="py-1">Tarea</th>
                                <th className="py-1">Duración</th>
                                <th className="py-1">Personal</th>
                                <th className="py-1">Avance</th>
                                <th className="py-1">Planificada</th>
                              </tr>
                            </thead>
                            <tbody>
                              {phase.tasks.map((task) => (
                                <tr
                                  key={task.id}
                                  className="border-b last:border-0"
                                >
                                  <td className="py-1">{task.name}</td>
                                  <td className="py-1">{task.duration} d</td>
                                  <td className="py-1">
                                    {task.peopleCount ?? 0} /{" "}
                                    {task.task_assignments.length}
                                  </td>
                                  <td className="py-1">
                                    {task.progress ?? 0}%
                                  </td>
                                  <td className="py-1">
                                    {task.planned ? (
                                      <FaCheckCircle className="inline text-green-500" />
                                    ) : (
                                      <GoXCircleFill className="inline text-red-500" />
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
