// QuotePDFDocument.tsx
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { OpportunityAll, QuotesEnrichType } from "~/context/UIContext";
import type { PropStateReport } from "~/routes/opportunity/report";
import Logo from "public/logo_imindustrial.png";
import { currencies, modelOfTable } from "~/routes/opportunity/report";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    color: "#333",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px",
    borderBottomColor: "#999",
    paddingBottom: 10,
  },
  logo: {
    height: 70,
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
  h1: {
    fontSize: 20,
    fontWeight: "700",
  },
  h2: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
  body: {
    paddingTop: 20,
  },
  fontBody: {
    fontWeight: "600",
    marginRight: 10,
  },
  descripcion: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
  },
  table: {
    borderTop: "1px solid #9ca3af",
    borderLeft: "1px solid #9ca3af",
    borderRight: "1px solid #9ca3af",
  },
  thead: {
    fontWeight: 700,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    height: 25,
    borderBottom: "1px solid #9ca3af",
  },
  tbody: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {},
});

export default function QuotePDFDocument({
  quote,
  quoteId,
  settings,
  selectedOpportunity,
}: {
  quote: QuotesEnrichType;
  quoteId: number;
  settings: PropStateReport;
  selectedOpportunity: OpportunityAll | null;
}) {
  const safeRate =
    isFinite(settings.exchangeRate) && settings.exchangeRate > 0
      ? settings.exchangeRate
      : 1;
  const format = (amount: number) => {
    return (
      settings.currency === "USD" ? amount : amount * safeRate
    ).toLocaleString("es-AR", {
      style: "currency",
      currency: settings.currency,
      minimumFractionDigits: 2,
    });
  };

  const rows = (() => {
    switch (settings.model) {
      case "closed":
        return [{ label: "Precio cerrado", value: quote.t_mg_total }];
      case "byType":
        return [
          { label: "Materiales", value: quote.t_mg_materials },
          { label: "Mano de obra", value: quote.t_mg_labor },
          { label: "Subcontratos", value: quote.t_mg_subcontracting },
          { label: "Otros", value: quote.t_mg_others },
        ];
      case "groupedServices":
        return [
          { label: "Materiales", value: quote.t_mg_materials },
          {
            label: "Servicios",
            value: quote.t_mg_labor + quote.t_mg_subcontracting,
          },
          { label: "Otros", value: quote.t_mg_others },
        ];
      case "useCategory":
        return [
          {
            label: "Costos Directos",
            value: quote.t_mg_materials + quote.t_mg_labor,
          },
          {
            label: "Costos Indirectos",
            value: quote.t_mg_subcontracting + quote.t_mg_others,
          },
        ];
      case "materialsOnly":
        return [
          { label: "Materiales", value: quote.t_mg_materials },
          {
            label: "Mano de Obra",
            value:
              quote.t_mg_labor + quote.t_mg_subcontracting + quote.t_mg_others,
          },
        ];
      default:
        return [];
    }
  })();
  const total = rows.reduce((acc, row) => acc + row.value, 0);
  const fecha = new Date().toLocaleString("es-AR", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={Logo} style={styles.logo} />
          <View>
            <Text style={styles.h1}>Cotización Nro: {quoteId}</Text>
            <Text style={{marginTop: 10}}>Fecha: {fecha}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.h2}>Datos de la oportunidad</Text>
            <View style={styles.descripcion}>
              <Text style={styles.fontBody}>{"Nombre"}:</Text>
              <Text style={{ flex: 1 }}>{selectedOpportunity?.name}</Text>
            </View>
            <View style={styles.descripcion}>
              <Text style={styles.fontBody}>{"Cliente"}:</Text>
              <Text style={{ flex: 1 }}>
                {selectedOpportunity?.client.nombre}
              </Text>
            </View>
            <View style={styles.descripcion}>
              <Text style={styles.fontBody}>{"Alcance del Servicio"}:</Text>
              <Text style={{ flex: 1 }}>{selectedOpportunity?.scope}</Text>
            </View>
            <View style={styles.descripcion}>
              <Text style={styles.fontBody}>{"Etapas"}:</Text>
              <Text style={{ flex: 1 }}>
                {selectedOpportunity?.phases.map((p) => p.name).join(" - ")}
              </Text>
            </View>
          </View>
          {/* Quote */}
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.h2}>Datos de cotización</Text>
            <View style={styles.descripcion}>
              <Text style={styles.fontBody}>
                {"Fecha Probable de Inicio de Obra:"}:
              </Text>
              <Text style={{ flex: 1 }}>{quote.estimated_start_date}</Text>
            </View>
            <View style={styles.descripcion}>
              <Text style={styles.fontBody}>
                {"Vigencia de la Cotización"}:
              </Text>
              <Text style={{ flex: 1 }}>{quote.validity}</Text>
            </View>
            <View style={styles.descripcion}>
              <Text style={styles.fontBody}>{"Plazo de Ejecución"}:</Text>
              <Text style={{ flex: 1 }}>{quote.delivery_time}</Text>
            </View>
            <View style={styles.descripcion}>
              <Text style={styles.fontBody}>{"Forma de Pago"}:</Text>
              <Text style={{ flex: 1 }}>{quote.method_payment}</Text>
            </View>
            <View style={styles.descripcion}>
              <Text style={styles.fontBody}>{"Garantía"}:</Text>
              <Text style={{ flex: 1 }}>{quote.guarantee}</Text>
            </View>
            <View style={styles.descripcion}>
              <Text style={styles.fontBody}>{"Notas"}:</Text>
              <Text style={{ flex: 1 }}>{quote.notes}</Text>
            </View>
            <View style={styles.descripcion}>
              <Text style={styles.fontBody}>{"Moneda"}:</Text>
              <Text style={{ flex: 1 }}>
                {currencies.find((c) => c.value === settings.currency)?.label}
              </Text>
            </View>
            <View style={styles.descripcion}>
              <Text style={styles.fontBody}>{"Presentación"}:</Text>
              <Text style={{ flex: 1 }}>
                {modelOfTable.find((m) => m.mode === settings.model)?.name}
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={styles.table}>
              <View style={styles.thead}>
                <View style={styles.row}>
                  <Text>Categoría</Text>
                  <Text>Total</Text>
                </View>
              </View>
              {rows.map((r) => (
                <View key={r.label} style={styles.row}>
                  <Text>{r.label}</Text>
                  <Text>{format(r.value)}</Text>
                </View>
              ))}
              <View style={[styles.row, { fontWeight: 700 }]}>
                <Text>Total</Text>
                <Text>{format(total)}</Text>
              </View>
            </View>
          </View>
        </View>
        {/* render info de la oportunidad / cotización / tabla igual que antes */}
      </Page>
    </Document>
  );
}
