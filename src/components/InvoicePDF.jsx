import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Attempt to register the Montserrat font, but use a fallback if it fails
try {
  Font.register({
    family: 'Montserrat',
    fonts: [
      { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2', fontWeight: 'normal' },
      { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2', fontWeight: 'bold' },
    ],
  });
} catch (error) {
  console.warn('Failed to load Montserrat font:', error);
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Montserrat',
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
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  billingInfo: {
    marginBottom: 20,
  },
  billingText: {
    fontSize: 10,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  total: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

const InvoicePDF = ({ clientName, companyName, email, services, total, logoUrl }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>MERAV INTERIORS</Text>
          <Text style={styles.subHeader}>BY KATIE ROBERTS</Text>
        </View>
        {logoUrl && <Image style={styles.logo} src={logoUrl} />}
      </View>
      
      <View style={styles.billingInfo}>
        <Text style={styles.billingText}>BILLED TO: {clientName}</Text>
        <Text style={styles.billingText}>PAY TO: {companyName}</Text>
        <Text style={styles.billingText}>{email}</Text>
      </View>

      <Text style={[styles.billingText, { fontWeight: 'bold', marginBottom: 10 }]}>DESIGN FEES:</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>LOCATION</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>DESCRIPTION</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>SERVICE CATEGORY</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>SUBTOTAL</Text>
          </View>
        </View>
        {services.map((service, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{service.location}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{service.description}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{service.category}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${service.subtotal.toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.total}>TOTAL: ${total.toFixed(2)}</Text>
    </Page>
  </Document>
);

export default InvoicePDF;