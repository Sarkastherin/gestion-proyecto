import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import Logo from "../../public/logo_imindustrial.png";
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
});

export default function PDFCotizacion() {
  const location = useLocation();
  const { pdfData } = location.state || {};
  const Descripcion = ({ title, content }) => {
    return (
      <View style={styles.descripcion}>
        <Text style={styles.fontBody}>{title}:</Text>
        <Text style={{flex: 1}}>{content}</Text>
      </View>
    );
  };
  return (
    <PDFViewer width={"100%"} height={"100%"}>
      <Document>
        <Page size={"A4"} style={styles.page}>
          <View style={styles.header}>
            <Image src={Logo} style={styles.logo}></Image>
            <Text style={styles.h1}>
              Cotización Nro: {pdfData.id_cotizacion}
            </Text>
          </View>
          <View style={styles.body}>
            <Descripcion title={"Cliente"} content={pdfData.cliente.nombre} />
            <Descripcion
              title={"Alcance del servicio"}
              content={pdfData.alcance}
            />
            <Descripcion
              title={"Plazo de ejecución"}
              content={pdfData.tiempo_entrega}
            />
            <Descripcion
              title={"Precio Cotizado"}
              content={`${pdfData.total_monto?.toLocaleString("es-AR", {
                style: "currency",
                currency: "USD",
              })} + IVA` || 0}
            />
            <Descripcion
              title={"Moneda"}
              content={"USD [Dolares Americanos]"}
            />
            <Descripcion
              title={"Tipo de Cotización"}
              content={
                "[Precio Cerrado - Mano de Obra – Materiales - Otro: [especificar] ]"
              }
            />
            <Descripcion title={"Forma de Pago"} content={pdfData.forma_pago} />
            <Descripcion
              title={"Vigencia de la Cotización"}
              content={pdfData.vigencia}
            />
            <Descripcion
              title={"Fecha Probable de Inicio de Obra"}
              content={pdfData.fecha_inicio_estimada}
            />
            <Descripcion
              title={"Garantía"}
              content={pdfData.garantia}
            />
            <Descripcion
              title={"Notas de Cotización"}
              content={pdfData.notas || 'Por hacer'}
            />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
