import { useUI } from "~/context/UIContext";
import { useEffect, useState } from "react";
import type { QuotesEnrichType } from "~/context/UIContext";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
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
     borderRight: "1px solid #9ca3af"
  },
  thead: {
     fontWeight: 700
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    height:25,
    borderBottom: "1px solid #9ca3af"
  },
  tbody: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {},
});
import Logo from "public/logo_imindustrial.png";
export default function PDFQuote({ quoteActive }: { quoteActive: number }) {
  const { selectedOpportunity } = useUI();
  const { quotes } = selectedOpportunity || {};
  const [quote, setQuote] = useState<QuotesEnrichType | undefined>(
    quotes?.find((q) => q.id === quoteActive)
  );

  useEffect(() => {
    setQuote(quotes?.find((q) => q.id === quoteActive));
  }, [quoteActive]);
  return (
    <div style={{ height: "calc(100vh - 270px)" }}>
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page size={"A4"} style={styles.page}>
            <View style={styles.header}>
              <Image src={Logo} style={styles.logo}></Image>
              <Text style={styles.h1}>Cotización Nro: {quoteActive}</Text>
            </View>
            {quote && (
              <View style={styles.body}>
                {/* Opportunity */}
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
                    <Text style={styles.fontBody}>
                      {"Alcance del Servicio"}:
                    </Text>
                    <Text style={{ flex: 1 }}>
                      {selectedOpportunity?.scope}
                    </Text>
                  </View>
                  <View style={styles.descripcion}>
                    <Text style={styles.fontBody}>{"Etapas"}:</Text>
                    <Text style={{ flex: 1 }}>
                      {selectedOpportunity?.phases
                        .map((p) => p.name)
                        .join(" - ")}
                    </Text>
                  </View>
                </View>
                {/* Quote */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.h2}>Datos de cotización</Text>
                  <View style={styles.descripcion}>
                    <Text style={styles.fontBody}>
                      {"Fecha Probable de Inicio de Obra:"}:
                    </Text>
                    <Text style={{ flex: 1 }}>
                      {quote.estimated_start_date}
                    </Text>
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
                </View>
                {/* Totals */}
                <View style={{ marginBottom: 20 }}>
                  <View style={styles.table}>
                    <View style={styles.thead}>
                      <View style={styles.row}>
                        <Text>Categoría de Cotización</Text>
                        <Text>Total</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <Text>Materiales</Text>
                      <Text>
                        {quote.t_mg_materials.toLocaleString("es-AR", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text>Mano de obra</Text>
                      <Text>
                        {quote.t_mg_labor.toLocaleString("es-AR", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text>Subcontratos</Text>
                      <Text>
                        {quote.t_mg_subcontracting.toLocaleString("es-AR", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text>Otros</Text>
                      <Text>
                        {quote.t_mg_others.toLocaleString("es-AR", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </Text>
                    </View>
                    <View style={[styles.row, { fontWeight: 700 }]}>
                      <Text>Total</Text>
                      <Text>
                        {quote.t_mg_total.toLocaleString("es-AR", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
