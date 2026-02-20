import {
  PDFViewer,
  Document,
  Page,
  View,
  Image,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";
import Logo from "public/logo_imindustrial.png";
import type { ConsolidatedData } from "~/routes/rrhh/consolidated_hours_per_worker";
import { formatDateUStoES } from "~/utils/functions";
import type { GlobalBalance } from "~/routes/rrhh/consolidated_hours_per_worker";
export const styles = StyleSheet.create({
  codeText: {
    fontSize: 9,
    fontFamily: "Courier",
    backgroundColor: "#f5f5f5",
  },
});
const HeaderTemplate = ({ title }: { title: string }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #444",
        marginBottom: 15,
        paddingBottom: 5,
      }}
    >
      <Image src={Logo} style={{ width: 150 }} />
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          fontFamily: "Helvetica-Bold", // Título en negrita
          color: "#000000",
        }}
      >
        {title}
      </Text>
    </View>
  );
};
export const Cell = ({
  content,
  flex,
  isFirst,
  alignment,
}: {
  content: string;
  flex?: number | string;
  isFirst?: boolean;
  alignment?: "left" | "center" | "right";
}) => {
  return (
    <Text
      style={{
        flex: flex || 1,
        padding: "4px",
        borderLeft: isFirst ? "none" : "1px dashed #ccc",
        textAlign: alignment || "left",
      }}
    >
      {content}
    </Text>
  );
};

export const PageTemplate = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div style={{ height: "calc(100vh - 120px)" }}>
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page
            size="A4"
            style={{
              flexDirection: "column",
              backgroundColor: "#FFFFFF",
              padding: "30px 30px 50px 30px",
              fontFamily: "Helvetica", // Fuente base del documento
              color: "#434343",
            }}
          >
            <View fixed>
              <HeaderTemplate title={title} />
            </View>
            {children}
            <View
              fixed
              style={{
                position: "absolute",
                bottom: 20,
                left: 0,
                right: 0,
                textAlign: "center",
                fontSize: 8,
                color: "#888",
              }}
            >
              <Text
                render={({ pageNumber, totalPages }) =>
                  `Página ${pageNumber} de ${totalPages}`
                }
              />
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

