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
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 'auto',
  },
  headerText: {
    fontSize: 10,
    color: '#333333',
    textAlign: 'right',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 20,
    borderStyle: 'solid',
    borderColor: '#EEEEEE',
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333333',
  },
  tableCell: {
    fontSize: 10,
    color: '#333333',
  },
  total: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

const InvoicePDF = ({ clientName, companyName, email, services, total, logoUrl }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {logoUrl && <Image style={styles.logo} src={logoUrl} />}
        <View>
          <Text style={styles.headerText}>{companyName}</Text>
          <Text style={styles.headerText}>{email}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>INVOICE</Text>
      
      <Text style={styles.tableCell}>BILLED TO: {clientName}</Text>

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