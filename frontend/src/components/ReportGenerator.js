import React from 'react';

import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    marginBottom: 10,
  },
});

const MyDocument = ({userName, userPhone, vehicleName, pick_up_place, start, end, destination_place }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Vehicle Rental Report</Text>
        <View style={styles.value}>
          <Text style={styles.label}>User Name:</Text>
          <Text>{userName}</Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.label}>User Phone:</Text>
          <Text>{userPhone}</Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.label}>Vehicle Name:</Text>
          <Text>{vehicleName}</Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.label}>Pick-up Place:</Text>
          <Text>{pick_up_place}</Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.label}>Arrival Date:</Text>
          <Text>{start}</Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.label}>Destination Date:</Text>
          <Text>{end}</Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.label}>Destination Place:</Text>
          <Text>{destination_place}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default function ReportGenerator({userName, userPhone, vehicleName, pick_up_place, start, end, destination_place }) {
  return (
    <div>
      <PDFDownloadLink document={<MyDocument userName={userName} userPhone={userPhone} vehicleName={vehicleName} pick_up_place={pick_up_place} start={start} end={end} destination_place={destination_place} />} fileName="report.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download here!'
        }
      </PDFDownloadLink>
    </div>
  );
}
