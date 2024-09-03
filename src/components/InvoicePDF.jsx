import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const InvoicePDF = ({ squareFeet, pricePerSqFt, totalCost, payments, percentages }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Invoice Details</Text>
        <Text style={styles.text}>Square Feet: {squareFeet}</Text>
        <Text style={styles.text}>Price per Sq Ft: ${pricePerSqFt}</Text>
        <Text style={styles.text}>Total Cost: ${totalCost.toFixed(2)}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Payment Schedule</Text>
        {payments.map((payment, index) => (
          <Text key={index} style={styles.text}>
            Payment {index + 1} ({percentages[index]}%): ${payment.toFixed(2)}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;