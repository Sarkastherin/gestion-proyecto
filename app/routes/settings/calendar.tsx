import { CalendarDays, Trash2, Edit2 } from "lucide-react";
import type { Route } from "../+types/home";
import { ContainerWithTitle } from "~/components/Generals/Containers";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { ALLOWED_SETTINGS } from "~/components/auth/allowedRoles";
import HolidaysModal from "~/components/modals/customs/HolidaysModal";
import { useModalState } from "~/components/modals/customs/useModalState";
import { useData } from "~/context/DataContext";
import { useUI } from "~/context/UIContext";
import { useEffect, useState, useMemo } from "react";
import type { HolidaysDB } from "~/types/projectsType";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { es } from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "~/styles/calendar.css";
import { useUIModals } from "~/context/ModalsContext";
import { LoaderComponent } from "~/components/Generals/LoaderComponent";
import { Button } from "~/components/Forms/Buttons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Calendario" },
    { name: "Calendario", content: "Calendario" },
  ];
}

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Calendar() {
  const { openModal } = useUIModals();
  const holidaysModal = useModalState();
  const { holidays, getHolidays, deleteHoliday } = useData();
  const { theme } = useUI();
  const [selectedHoliday, setSelectedHoliday] = useState<HolidaysDB | null>(
    null,
  );
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (!holidays) getHolidays();
  }, [getHolidays]);

  const events = useMemo(() => {
    if (!holidays) return [];
    return holidays.map((holiday) => {
      const [year, month, day] = holiday.date.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return {
        id: holiday.id,
        title: holiday.name || "Feriado",
        start: date,
        end: date,
        allDay: true,
        resource: holiday,
      };
    });
  }, [holidays]);

  const handleEdit = (holiday: HolidaysDB) => {
    setSelectedHoliday(holiday);
    holidaysModal.openModal();
  };

  const handleDelete = async (id: number) => {
    openModal("CONFIRMATION", {
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que deseas eliminar este feriado?",
      onConfirm: async () => {
        try {
          await deleteHoliday(id);
        } catch (error) {
          console.error("Error deleting holiday:", error);
        }
      },
    });
  };

  const handleCloseModal = () => {
    setSelectedHoliday(null);
    holidaysModal.closeModal();
  };

  const handleSuccess = () => {
    setSelectedHoliday(null);
  };

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedHoliday({
      date: slotInfo.start.toISOString().split("T")[0], // Formato YYYY-MM-DD
    } as HolidaysDB);
    holidaysModal.openModal();
  };
  if (!holidays) return <LoaderComponent />;
  return (
    <ProtectedRoute allowed={ALLOWED_SETTINGS}>
      <ContainerWithTitle
        title={"Calendario"}
        width="max-w-7xl w-full"
        back_path="/settings"
        IconComponent={{
          component: CalendarDays,
          color: "text-blue-600 dark:text-blue-400",
        }}
        description="Gestiona los feriados y visualiza el calendario laboral."
      >
        {" "}
        <section className="grid gap-6 lg:grid-cols-[2fr,1fr] z-0">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-4">
              Calendario
            </div>
            <div
              className={theme === "dark" ? "dark" : ""}
              style={{ height: "600px" }}
            >
              <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                culture="es"
                selectable
                onSelectEvent={(data) => handleEdit(data.resource)}
                onSelectSlot={handleSelectSlot}
                date={currentDate}
                onNavigate={handleNavigate}
                views={["month"]}
                defaultView="month"
                messages={{
                  next: "Siguiente",
                  previous: "Anterior",
                  today: "Hoy",
                  month: "Mes",
                  week: "Semana",
                  day: "Día",
                  agenda: "Agenda",
                  date: "Fecha",
                  time: "Hora",
                  event: "Evento",
                  noEventsInRange: "No hay feriados en este rango",
                  showMore: (total: number) => `+ Ver más (${total})`,
                }}
              />
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-4">
              Feriados
            </div>
            {!holidays || holidays.length === 0 ? (
              <div className="rounded-md border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 text-center">
                No hay feriados registrados
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-zinc-200 dark:border-zinc-700">
                    <tr>
                      <th className="text-left py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                        Fecha
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                        Nombre
                      </th>
                      <th className="text-center py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...holidays]
                      .sort((a, b) => a.date.localeCompare(b.date))
                      .map((holiday) => (
                        <tr
                          key={holiday.id}
                          className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                        >
                          <td className="py-3 px-3">
                            <span className="font-medium text-zinc-900 dark:text-zinc-100">
                              {(() => {
                                const [year, month, day] =
                                  holiday.date.split("-");
                                return `${day}/${month}/${year}`;
                              })()}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-zinc-700 dark:text-zinc-300">
                            {holiday.name || (
                              <span className="text-zinc-400 italic">
                                Sin nombre
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition"
                                title="Editar"
                                onClick={() => handleEdit(holiday)}
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                                title="Eliminar"
                                onClick={() => handleDelete(holiday.id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
        <HolidaysModal
          open={holidaysModal.open}
          onClose={handleCloseModal}
          step={holidaysModal.step}
          setStep={holidaysModal.setStep}
          holiday={selectedHoliday}
          onSuccess={handleSuccess}
        />
      </ContainerWithTitle>
      <span className="fixed bottom-0 w-full">
        <div
          className={`flex justify-end w-full px-10 py-5 hover:bg-zinc-200 hover:dark:bg-zinc-900`}
        >
          <div className="w-fit">
            <Button variant="blue" onClick={() => holidaysModal.openModal()}>
              + Feriado
            </Button>
          </div>
        </div>
      </span>
    </ProtectedRoute>
  );
}
