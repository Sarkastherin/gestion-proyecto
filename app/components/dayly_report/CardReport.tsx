import { Card } from "../Generals/Cards";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import type { DailyReportUI, DailyReportsView } from "~/types/projectsType";
import { Badge } from "../Specific/Badge";
import { formatDateUStoES } from "~/utils/functionsDays";
import { Button } from "../Forms/Buttons";
import { useModalState } from "../modals/customs/useModalState";
import { useMemo } from "react";
import { useContacts } from "~/context/ContactsContext";
export default function CardReport({ report, onOpenModal }: { report: DailyReportsView; onOpenModal: () => void }) {
  const { employees } = useContacts();
  const employeesById = useMemo(
    () => new Map(employees?.map((e) => [e.id, e.contacto_nombre])),
    [employees]
  );
  return (
    <Card key={report.id}>
      <div className="flex gap-2 items-center font-bold text-xl mb-4">
        <DocumentTextIcon className="size-6 text-primary-text" />{" "}
        <h2 className="">
          Parte Diario 📅{formatDateUStoES(report.date_report)}
        </h2>
      </div>

      <ul className="text-sm space-y-1.5">
        <li>
          <strong>Proyecto:</strong> {report.name_project}
        </li>
        <li>
          <strong>Fecha:</strong> {formatDateUStoES(report.date_report)}
        </li>
        <li>
          <strong>Etapa:</strong> {report.name_phase}
        </li>
        <li>
          <strong>Responsable:</strong>{" "}
          {report.id_supervisor != null
            ? (employeesById.get(report.id_supervisor) ?? "")
            : ""}
        </li>
        <li>
          <strong>Status:</strong>{" "}
          {
            <Badge variant={report.status === "borrador" ? "yellow" : "green"}>
              {report.status.slice(0, 1).toUpperCase() + report.status.slice(1)}
            </Badge>
          }
        </li>
      </ul>
      <div className="mt-6 text-center">
        <Button
          type="button"
          size="sm"
          variant="light"
          onClick={onOpenModal}
        >
          Ver detalles
        </Button>
      </div>
    </Card>
  );
}
