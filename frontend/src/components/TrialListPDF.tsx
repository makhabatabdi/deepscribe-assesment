import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { TrialListProps } from "../../types";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 16 },
  title: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
  item: { marginBottom: 8 },
  link: { color: "blue", textDecoration: "underline" },
});

export default function TrialListPDF({ patient, trials }: TrialListProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Extracted Patient Info</Text>
          {Object.entries(patient).map(([key, value]) => (
            <Text key={key}>
              {key}: {String(value)}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Matching Clinical Trials</Text>
          {trials.map((trial, index) => {
            const nctId =
              trial?.protocolSection?.identificationModule?.nctId ||
              `trial-${index}`;
            const title =
              trial?.protocolSection?.identificationModule?.briefTitle ||
              "Untitled";
            const status =
              trial?.protocolSection?.statusModule?.overallStatus || "Unknown";

            return (
              <View key={nctId} style={styles.item}>
                <Text>Title: {title}</Text>
                <Text>Status: {status}</Text>
                {nctId && (
                  <Text style={styles.link}>
                    https://clinicaltrials.gov/study/{nctId}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}
