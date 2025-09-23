type WeekendOption = number | string; // número (1–17) o cadena "0000011"
type Holiday = string | Date; // "yyyy-mm-dd" o Date

/**
 * Calcula la fecha laboral resultante como hace DIA.LAB.INTL en Google Sheets
 * @param startDate Fecha de inicio en formato "yyyy-mm-dd"
 * @param numDays Número de días laborables (puede ser negativo)
 * @param weekend Opcional. Número (1–17) o string "0000011" que define los fines de semana
 * @param holidays Opcional. Lista de fechas (yyyy-mm-dd o Date) que se consideran festivos
 * @returns Date final
 */
export function workdayIntl(
  startDate: string,
  numDays: number,
  weekend: number | string = 1,
  holidays: (string | Date)[] = []
): Date {
  const start = new Date(startDate);
  if (isNaN(start.getTime())) throw new Error("Fecha inválida");

  // Normalizar feriados
  const holidaySet = new Set(
    holidays.map((h) =>
      new Date(h instanceof Date ? h : h + "T00:00:00").toDateString()
    )
  );

  // Weekend mask: lunes=0 ... domingo=6
  const weekendMask = getWeekendMask(weekend);

  let daysRemaining = numDays;
  let current = new Date(start);

  const step = numDays >= 0 ? 1 : -1;

  while (daysRemaining !== 0) {
    current.setDate(current.getDate() + step);

    const dayOfWeek = (current.getDay() + 6) % 7; // lunes=0 ... domingo=6
    const isWeekend = weekendMask[dayOfWeek] === 1;
    const isHoliday = holidaySet.has(current.toDateString());

    if (!isWeekend && !isHoliday) {
      daysRemaining -= step;
    }
  }

  // Si por alguna razón cae en finde o feriado, mover al próximo hábil
  while (
    weekendMask[(current.getDay() + 6) % 7] === 1 ||
    holidaySet.has(current.toDateString())
  ) {
    current.setDate(current.getDate() + step);
  }

  return current;
}


// Convierte el argumento weekend en un array [0..6] con 0=weekday, 1=fin de semana
function getWeekendMask(weekend: WeekendOption): number[] {
  if (typeof weekend === "string") {
    if (weekend.length !== 7 || /[^01]/.test(weekend))
      throw new Error("Formato de cadena inválido para weekend");
    return weekend.split("").map((c) => Number(c));
  }

  // Números 1–7 = pares de días (ej: 1=sábado+domingo, 2=domingo+lunes...)
  // Números 11–17 = solo un día
  const mask = Array(7).fill(0);
  if (weekend >= 1 && weekend <= 7) {
    const mapping: [number, number][] = [
      [5, 6], // 1 → sábado+domingo
      [6, 0], // 2 → domingo+lunes
      [0, 1], // 3 → lunes+martes
      [1, 2], // 4 → martes+miércoles
      [2, 3], // 5 → miércoles+jueves
      [3, 4], // 6 → jueves+viernes
      [4, 5], // 7 → viernes+sábado
    ];
    const [d1, d2] = mapping[weekend - 1];
    mask[d1] = 1;
    mask[d2] = 1;
  } else if (weekend >= 11 && weekend <= 17) {
    const mapping = {
      11: 6, // domingo
      12: 0, // lunes
      13: 1, // martes
      14: 2, // miércoles
      15: 3, // jueves
      16: 4, // viernes
      17: 5, // sábado
    } as const;
    mask[mapping[weekend as keyof typeof mapping]] = 1;
  } else {
    throw new Error("Valor inválido para weekend");
  }
  return mask;
}
