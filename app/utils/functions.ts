import pkg from "package.json";
import type { Data } from "react-csv/lib/core";
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
    2
  );

  const total_labor = roundToPrecision(
    data.details_items
      .filter((item) => item.type === "mano de obra")
      .reduce((sum, item) => sum + (item.quantity * item.unit_cost || 0), 0),
    2
  );

  const total_subcontracting = roundToPrecision(
    data.details_items
      .filter((item) => item.type === "subcontratos")
      .reduce((sum, item) => sum + (item.quantity * item.unit_cost || 0), 0),
    2
  );

  const total_others = roundToPrecision(
    data.details_items
      .filter((item) => item.type === "otros")
      .reduce((sum, item) => sum + (item.quantity * item.unit_cost || 0), 0),
    2
  );

  return {
    id_quote,
    total_materials,
    total_labor,
    total_subcontracting,
    total_others,
  };
}
export const dateUSFormatted = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const stringDay = day > 9 ? String(day) : `0${day}`;
  const stringMonth = month > 9 ? String(month) : `0${month}`;
  return `${year}-${stringMonth}-${stringDay}`;
};
// Escapa comillas dobles y transforma valores undefined
export const escapeCSVValue = (value: any) =>
  typeof value === 'string' ? value.replace(/"/g, '""') : value ?? '';

// Transforma un solo ítem en una fila CSV compatible
export const transformToCSVRow = (item: any) => {
  const defaultPrice = item.prices?.find((p: any) => p.default) ?? {};

  return {
    id: item.id,
    description: escapeCSVValue(item.description),
    weight: item.weight ?? '',
    unit: item.id_unit ?? '',
    price: defaultPrice.price ?? '',
    supplier: defaultPrice.id_supplier ?? '',
    'view_categorizations.description_family': escapeCSVValue(item.view_categorizations?.description_family ?? ''),
    'view_categorizations.description_category': escapeCSVValue(item.view_categorizations?.description_category ?? ''),
    'view_categorizations.description_subcategory': escapeCSVValue(item.view_categorizations?.description_subcategory ?? ''),
  };
};

// Aplica la transformación a todo el array de datos
export const sanitizeCSVData = (data: Data) => data.map(transformToCSVRow);
