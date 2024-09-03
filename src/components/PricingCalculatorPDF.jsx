import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
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

const PricingCalculatorPDF = ({ squareFeet, pricePerSqFt, totalCost, payments, percentages, logoUrl }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Pricing Calculator Summary</Text>
        </View>
        {logoUrl && <Image style={styles.logo} src={logoUrl} />}
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Square Feet: {squareFeet}</Text>
        <Text style={styles.text}>Price per Square Foot: ${pricePerSqFt}</Text>
        <Text style={styles.text}>Total Cost: ${totalCost.toFixed(2)}</Text>
        {payments.map((payment, index) => (
          <Text key={index} style={styles.text}>
            Payment {index + 1} ({percentages[index]}%): ${payment.toFixed(2)}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default PricingCalculatorPDF;