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
