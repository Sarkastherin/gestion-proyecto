import {
  View,
  Text,
} from "@react-pdf/renderer";
import type { ConsolidatedData } from "~/routes/rrhh/consolidated_hours_per_worker";
import { formatDateUStoES } from "~/utils/functions";
import type { GlobalBalance } from "~/routes/rrhh/consolidated_hours_per_worker";
import { PageTemplate, Cell,styles } from "./PDFComponentsReports";

const ResumenTemplate = ({
  periodo,
  globalBalance,
}: {
  periodo: { from: string; to: string };
  globalBalance: GlobalBalance;
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 4,
        fontSize: 10,
        borderBottom: "1px solid #9ca3af",
        paddingBottom: 10,
      }}
    >
      <View>
        <Text>Balance Global</Text>
        <View>
          <Text style={styles.codeText}>
            {`Total horas equivalentes: ${globalBalance.total_equivalent_hours.toFixed(2)}`}
          </Text>
          <Text style={styles.codeText}>
            {`Total días equivalentes: ${globalBalance.total_equivalent_days.toFixed(2)}`}
          </Text>
          <Text style={styles.codeText}>
            {`Total viáticos: ${globalBalance.total_viaticum}`}
          </Text>
          <Text style={styles.codeText}>
            {`Total comidas: ${globalBalance.alimentation}`}
          </Text>
        </View>
      </View>
      <View style={{ display: "flex", gap: "4" }}>
        <View>
          <Text>Periodo</Text>
          <Text style={styles.codeText}>{`Desde ${periodo.from}`}</Text>
          <Text style={styles.codeText}>{`Hasta ${periodo.to}`}</Text>
        </View>
        <View>
          <Text>Fecha de generación</Text>
          <Text style={styles.codeText}>{new Date().toLocaleDateString()}</Text>
        </View>
      </View>
    </View>
  );
};
const TableHeader = () => {
  return (
    <View
      fixed
      style={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid #9ca3af",
        fontSize: 10,
        fontWeight: "bold",
        backgroundColor: "#f3f4f6",
      }}
    >
      <Cell content="Empleado" flex={2} isFirst />
      <Cell content="HS-EQ" flex={0.5} />
      <Cell content="Días EQ" flex={0.5} />
      <Cell content="Viático" flex={0.5} />
      <Cell content="Comidas" flex={0.5} />
    </View>
  );
};
const TableRowWorker = ({ worker }: { worker: ConsolidatedData }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        borderLeft: "1px solid #9ca3af",
        borderRight: "1px solid #9ca3af",
        borderBottom: "1px solid #9ca3af",
        fontSize: 10,
        fontWeight: "semibold",
      }}
    >
      <Cell content={worker.employee_name} flex={2} isFirst />
      <Cell content={worker.total_equivalent_hours.toFixed(2)} flex={0.5} />
      <Cell content={worker.total_equivalent_days.toFixed(2)} flex={0.5} />
      <Cell content={worker.total_viaticum.toString()} flex={0.5} />
      <Cell content={worker.alimentation.toString()} flex={0.5} />
    </View>
  );
};
const TableRowProject = ({ worker }: { worker: ConsolidatedData }) => {
  return (
    <View
      style={{
        display: "flex",
      }}
    >
      {worker.projects.map((project, idx) => (
        <View
          key={idx}
          style={{
            display: "flex",
            flexDirection: "row",
            borderLeft: "1px solid #9ca3af",
            borderRight: "1px solid #9ca3af",
            borderBottom: "1px solid #9ca3af",
            fontSize: 9,
          }}
        >
          <Cell content={project.project_name} flex={2} isFirst />
          <Cell content={project.equivalent_hours.toFixed(2)} flex={0.5} />
          <Cell content={project.equivalent_days.toFixed(2)} flex={0.5} />
          <Cell content={project.viaticum.toString()} flex={0.5} />
          <Cell content={project.alimentation.toString()} flex={0.5} />
        </View>
      ))}
    </View>
  );
};
const TableRowReport = ({ worker }: { worker: ConsolidatedData }) => {
  return (
    <View>
      {worker.projects.map((project, idx) =>
        project.dayReport.map((report, reportIdx) => (
          <View
            key={`${idx}-${report.id}`}
            style={{
              display: "flex",
              flexDirection: "row",
              borderLeft: "1px solid #9ca3af",
              borderRight: "1px solid #9ca3af",
              borderBottom:
                reportIdx === project.dayReport.length - 1
                  ? "1px solid #9ca3af"
                  : "1px dashed #9ca3af",
              ...styles.codeText,
            }}
          >
            <Cell
              content={formatDateUStoES(report.date_report)}
              flex={2}
              alignment="right"
              isFirst
            />
            <Cell
              content={(report.equivalent_hours ?? 0).toFixed(2)}
              flex={0.5}
            />
            <Cell
              content={((report.equivalent_hours ?? 0) / 9)
                .toFixed(2)
                .toString()}
              flex={0.5}
            />
            <Cell content={report.viaticum ? "Sí" : "No"} flex={0.5} />
            <Cell content={report.absent ? "1" : "0"} flex={0.5} />
          </View>
        )),
      )}
    </View>
  );
};

export default function PDFConsolidatedPerWorker({
  title,
  data,
  periodo,
  globalBalance,
}: {
  title: string;
  data: ConsolidatedData[];
  periodo: { from: string; to: string };
  globalBalance: GlobalBalance;
}) {
  return (
    <PageTemplate title={title}>
      <ResumenTemplate periodo={periodo} globalBalance={globalBalance} />
      <View style={{ marginTop: 25 }}>
        <TableHeader />
        <View>
          {data.map((worker, index) => (
            <View key={index}>
              <TableRowWorker worker={worker} />
              <TableRowProject worker={worker} />
              <TableRowReport worker={worker} />
            </View>
          ))}
        </View>
      </View>
    </PageTemplate>
  );
}
