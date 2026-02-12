import pkg from "package.json";
import type { Data } from "react-csv/lib/core";
import type { ButtonExportProps } from "~/components/Specific/Buttons";
export const appVersion = pkg.version;

export type Totals = {
  id_quote: number;
  total_materials: number;
  total_labor: number;
  total_subcontracting: number;
  total_others: number;
};
export const roundToPrecision = (value: number, decimalCount: number) => {
  const pow = Math.pow(10, decimalCount);
  return Math.round((value + Number.EPSILON) * pow) / pow;
};
export function getQuoteTotals(data: {
  details_items: Array<{
    type: string;
    total: number;
    id_quote: number;
    unit_cost: number;
    quantity: number;
  }>;
  details_materials: Array<{
    quantity: number;
    prices: { price: number };
    id_quote: number;
  }>;
}): Totals {
  const id_quote =
    data.details_items[0]?.id_quote ?? data.details_materials[0]?.id_quote ?? 0;

  const total_materials = roundToPrecision(
    data.details_materials.reduce((sum, m) => {
      return sum + m.quantity * (m.prices?.price || 0);
    }, 0),
    2,
  );

  const total_labor = roundToPrecision(
    data.details_items
      .filter((item) => item.type === "mano de obra")
      .reduce((sum, item) => sum + (item.quantity * item.unit_cost || 0), 0),
    2,
  );

  const total_subcontracting = roundToPrecision(
    data.details_items
      .filter((item) => item.type === "subcontratos")
      .reduce((sum, item) => sum + (item.quantity * item.unit_cost || 0), 0),
    2,
  );

  const total_others = roundToPrecision(
    data.details_items
      .filter((item) => item.type === "otros")
      .reduce((sum, item) => sum + (item.quantity * item.unit_cost || 0), 0),
    2,
  );

  return {
    id_quote,
    total_materials,
    total_labor,
    total_subcontracting,
    total_others,
  };
}
export function getBudgetTotals(data: {
  details_items: Array<{
    type: string;
    total: number;
    unit_cost: number;
    quantity: number;
  }>;
  details_materials: Array<{
    quantity: number;
    prices: { price: number };
  }>;
}): Omit<Totals, "id_quote"> {
  const total_materials = roundToPrecision(
    data.details_materials.reduce((sum, m) => {
      return sum + m.quantity * (m.prices?.price || 0);
    }, 0),
    2,
  );

  const total_labor = roundToPrecision(
    data.details_items
      .filter((item) => item.type === "mano de obra")
      .reduce((sum, item) => sum + (item.quantity * item.unit_cost || 0), 0),
    2,
  );

  const total_subcontracting = roundToPrecision(
    data.details_items
      .filter((item) => item.type === "subcontratos")
      .reduce((sum, item) => sum + (item.quantity * item.unit_cost || 0), 0),
    2,
  );

  const total_others = roundToPrecision(
    data.details_items
      .filter((item) => item.type === "otros")
      .reduce((sum, item) => sum + (item.quantity * item.unit_cost || 0), 0),
    2,
  );

  return {
    total_materials,
    total_labor,
    total_subcontracting,
    total_others,
  };
}
export const dateUSFormatted = (date: Date) => {
  if (!date) return "";
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const stringDay = day > 9 ? String(day) : `0${day}`;
  const stringMonth = month > 9 ? String(month) : `0${month}`;
  return `${year}-${stringMonth}-${stringDay}`;
};
// Escapa comillas dobles y transforma valores undefined
export const escapeCSVValue = (value: any) =>
  typeof value === "string" ? value.replace(/"/g, '""') : (value ?? "");
// Transforma valor numerico a string con coma como separador decimal
export const formatNumberForCSV = (value: number) =>
  String(value).replace(".", ",");

// Transforma un solo ítem en una fila CSV compatible
export const transformToCSVRow =
  (type: ButtonExportProps["type"]) => (item: any) => {
    //console.log("type", type);

    if (type === "materials") {
      const defaultPrice = item.prices?.find((p: any) => p.default) ?? {};
      return {
        id: item.id,
        description: escapeCSVValue(item.description),
        "view_categorizations.id_family": item.view_categorizations.id_family,
        "view_categorizations.description_family": escapeCSVValue(
          item.view_categorizations?.description_family ?? "",
        ),
        "view_categorizations.id_category":
          item.view_categorizations.id_category,
        "view_categorizations.description_category": escapeCSVValue(
          item.view_categorizations?.description_category ?? "",
        ),
        "view_categorizations.id_subcategory":
          item.view_categorizations.id_subcategory,
        "view_categorizations.description_subcategory": escapeCSVValue(
          item.view_categorizations?.description_subcategory ?? "",
        ),
        unit: item.id_unit ?? "",
        "units.description": escapeCSVValue(item.units?.description || ""),
        defaultPrice:
          defaultPrice.price !== undefined && defaultPrice.price !== null
            ? String(defaultPrice.price).replace(".", ",")
            : "",
        weight: item.weight ?? "",
        application: escapeCSVValue(item.application ?? ""),
        supplier: defaultPrice.id_supplier ?? "",
      };
    }
    if (type === "resumen") {
      return {
        type: escapeCSVValue(item.type || ""),
        "materials.id": escapeCSVValue(item.materials?.id || ""),
        "materials.description": escapeCSVValue(
          item.materials?.description || "",
        ),
        item: escapeCSVValue(item.item || ""),
        quantity: item.quantity ?? "",
        "prices.price": item.prices?.price ?? "",
        unit_cost: item.unit_cost ?? "",
        unit: escapeCSVValue(item.unit || ""),
      };
    }
    if (type === "absents") {
      return {
        id: item.id,
        date_report: escapeCSVValue(item.date_report || ""),
        "employee.contacto_nombre": escapeCSVValue(
          item.employee?.contacto_nombre || "",
        ),
        absent: item.absent ? "Ausente" : "Presente",
        hour_start: escapeCSVValue(item.hour_start || ""),
        hour_end: escapeCSVValue(item.hour_end || ""),
        project_name: escapeCSVValue(item.project_name || ""),
      };
    }
    if (type === "liquidation") {
      return {
        id: item.id,
        date_report: formatDateUStoES(item.date_report || ""),
        "employee.contacto_nombre": escapeCSVValue(
          item.employee?.contacto_nombre || "",
        ),
        absent: item.absent ? "Ausente" : "Presente",
        hour_start: escapeCSVValue(item.hour_start || ""),
        hour_end: escapeCSVValue(item.hour_end || ""),
        project_name: escapeCSVValue(item.project_name || ""),
        hours_worked: formatNumberForCSV(item.hours_worked ?? ""),
        equivalent_hours: formatNumberForCSV(item.equivalent_hours ?? ""),
        viaticum: item.viaticum ? "Sí" : "No",
      };
    }
    if (type === "opportunities") {
      return {
        id: item.id,
        created_at: transformDatetoLocaleString(item.created_at || ""),
        name: escapeCSVValue(item.name || ""),
        "client.nombre": escapeCSVValue(item.client?.nombre || ""),
        scope: escapeCSVValue(item.scope || ""),
        status: escapeCSVValue(item.status || ""),
        loss_reason: escapeCSVValue(item.loss_reason || ""),
        "users.user_name": escapeCSVValue(item.users?.user_name || ""),
      };
    }
    if (type === "projects") {
      return {
        id: item.id,
        created_at: transformDatetoLocaleString(item.created_at || ""),
        name: escapeCSVValue(item.name || ""),
        "client.nombre": escapeCSVValue(item.client?.nombre || ""),
        plan_start_date: formatDateUStoES(item.plan_start_date || ""),
        plan_end_date: formatDateUStoES(item.plan_end_date || ""),
        plan_duration: formatNumberForCSV(item.plan_duration ?? ""),
        start_date: formatDateUStoES(item.start_date || ""),
        end_date: formatDateUStoES(item.end_date || ""),
        duration: formatNumberForCSV(item.duration ?? ""),
        status: escapeCSVValue(item.status || ""),
        mode:
          item.mode === "0000000"
            ? "Sin descanso"
            : item.mode === "0000010"
              ? "1 día por semana"
              : item.mode === "0000100"
                ? "2 días por semana"
                : "",
        customer_requirement: escapeCSVValue(item.customer_requirement || ""),
        "users.user_name": escapeCSVValue(item.users?.user_name || ""),
      };
    }
    return {}; // fallback vacío si el tipo no coincide
  };

// Aplica la transformación a todo el array de datos
export const sanitizeCSVData = (data: Data, type: ButtonExportProps["type"]) =>
  data.map(transformToCSVRow(type));
export function formatDateUStoES(value?: string) {
  if (!value) return "-";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export function transformDatetoLocaleString(date: string) {
  return new Date(date).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
