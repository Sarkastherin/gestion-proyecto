import type { HolidaysDB } from "~/types/projectsType";

/**
 * Tipos de día para factor de pago
 */
export type DayType = "weekday" | "saturday" | "sundayOrHoliday";

/**
 * Tramos de horas trabajadas con su factor correspondiente
 */
export type PayBracket = {
  upToHours: number; // límite superior de horas para este factor
  factor: number; // multiplicador a aplicar
};

/**
 * Reglas de pago por tipo de día
 * Cada tramo define el límite superior de horas acumuladas y su factor
 */
export const PAY_RULES: Record<DayType, PayBracket[]> = {
  // Lunes a Viernes (día normal)
  weekday: [
    { upToHours: 9, factor: 1 }, // Primeras 9 horas: factor 1
    { upToHours: Infinity, factor: 1.5 }, // Más de 18 horas: factor 1.5
  ],
  // Sábado
  saturday: [
    { upToHours: 4, factor: 1 }, // Primeras 4 horas: factor 1
    { upToHours: 9, factor: 1.5 }, // De 4 a 9 horas: factor 1.5 (semi-laboral)
    { upToHours: Infinity, factor: 2 }, // Más de 9 horas: factor 2
  ],
  // Domingo o Feriado
  sundayOrHoliday: [
    { upToHours: 9, factor: 2 }, // Primeras 9 horas: factor 2 (jornada base no laborable)
    { upToHours: Infinity, factor: 4 }, // Más de 9 horas: factor 4
  ],
};
/**
 * Determina el tipo de día (weekday, saturday, sundayOrHoliday)
 * @param date - Fecha a evaluar (string YYYY-MM-DD o Date)
 * @param holidays - Array de feriados
 * @returns Tipo de día
 */
export function getDayType(
  date: string,
  holidays: HolidaysDB[]
): DayType {
  const splitDate = date.split("-").map(Number) 
  if (splitDate.length !== 3) {
    throw new Error("Fecha inválida. Se esperaba formato YYYY-MM-DD.");
  }
  const dateObj = typeof date === "string" ? new Date(splitDate[0], splitDate[1] - 1, splitDate[2]) : date;
  const dateString =
    typeof date === "string"
      ? date
      : dateObj.toISOString().split("T")[0];

  // Verificar si es feriado
  const isHoliday = holidays.some((h) => h.date === dateString);
  if (isHoliday) return "sundayOrHoliday";

  // Verificar día de la semana (0 = Domingo, 6 = Sábado)
  const dayOfWeek = dateObj.getDay();

  if (dayOfWeek === 0) return "sundayOrHoliday"; // Domingo
  if (dayOfWeek === 6) return "saturday"; // Sábado
  return "weekday"; // Lunes a Viernes
}

/**
 * Calcula las horas pagadas aplicando factores por tramos
 * @param hoursWorked - Cantidad de horas trabajadas
 * @param date - Fecha del trabajo (string YYYY-MM-DD o Date)
 * @param holidays - Array de feriados
 * @returns Horas equivalentes pagadas con factor aplicado
 */
export function calculatePaidHours(
  hoursWorked: number,
  date: string,
  holidays: HolidaysDB[]
): { equivalentHours: number; dayType: DayType | null } {
  if (hoursWorked <= 0) return { equivalentHours: 0, dayType: null };

  const dayType = getDayType(date, holidays);
  const brackets = PAY_RULES[dayType];

  let totalPaidHours = 0;
  let remainingHours = hoursWorked;
  let previousLimit = 0;

  for (const bracket of brackets) {
    if (remainingHours <= 0) break;

    // Horas dentro de este tramo
    const bracketRange = bracket.upToHours - previousLimit;
    const hoursInBracket = Math.min(remainingHours, bracketRange);

    // Acumular horas pagadas con su factor
    totalPaidHours += hoursInBracket * bracket.factor;
    remainingHours -= hoursInBracket;
    previousLimit = bracket.upToHours;
  }
  const roundedPaidHours = Math.round(totalPaidHours * 100) / 100;

  return { equivalentHours: roundedPaidHours, dayType }; // Redondear a 2 decimales
}

/**
 * Calcula las horas trabajadas entre dos horas (formato HH:MM o HH:MM:SS)
 * @param hourStart - Hora de inicio (ej: "08:00" o "08:00:00")
 * @param hourEnd - Hora de fin (ej: "17:30" o "17:30:00")
 * @returns Horas trabajadas (decimal)
 */
export function calculateWorkedHours(
  hourStart: string,
  hourEnd: string
): number {
  const [startHour, startMin] = hourStart.split(":").map(Number);
  const [endHour, endMin] = hourEnd.split(":").map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  const workedMinutes = endMinutes - startMinutes;
  return Math.round((workedMinutes / 60) * 100) / 100; // Redondear a 2 decimales
}
