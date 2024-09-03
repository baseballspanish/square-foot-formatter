import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import MontserratRegular from '../assets/MontserratRegularBase64';
import MontserratBold from '../assets/MontserratBoldBase64';

Font.register({
  family: 'Montserrat',
  fonts: [
    { src: MontserratRegular, fontWeight: 'normal' },
    { src: MontserratBold, fontWeight: 'bold' },
  ],
});

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
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 'auto',
  },
  companyInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  companyDetail: {
    fontSize: 10,
    color: '#666',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  clientInfo: {
    marginBottom: 30,
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    color: '#333',
  },
  table: {
    flexDirection: 'column',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 30,
  },
  tableCol1: {
    width: '40%',
    paddingLeft: 8,
  },
  tableCol2: {
    width: '20%',
    textAlign: 'center',
  },
  tableCol3: {
    width: '20%',
    textAlign: 'center',
  },
  tableCol4: {
    width: '20%',
    textAlign: 'right',
    paddingRight: 8,
  },
  tableCell: {
    fontSize: 10,
    color: '#333',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  },
});

const InvoicePDF = ({ clientName, companyName, email, services, total, logoUrl }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {logoUrl && <Image style={styles.logo} src={logoUrl} />}
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{companyName}</Text>
          <Text style={styles.companyDetail}>{email}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>INVOICE</Text>
      
      <View style={styles.clientInfo}>
        <Text style={styles.label}>BILLED TO</Text>
        <Text style={styles.value}>{clientName}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCol1, styles.tableCell]}>DESCRIPTION</Text>
          <Text style={[styles.tableCol2, styles.tableCell]}>LOCATION</Text>
          <Text style={[styles.tableCol3, styles.tableCell]}>CATEGORY</Text>
          <Text style={[styles.tableCol4, styles.tableCell]}>AMOUNT</Text>
        </View>
        {services.map((service, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={[styles.tableCol1, styles.tableCell]}>{service.description}</Text>
            <Text style={[styles.tableCol2, styles.tableCell]}>{service.location}</Text>
            <Text style={[styles.tableCol3, styles.tableCell]}>{service.category}</Text>
            <Text style={[styles.tableCol4, styles.tableCell]}>${service.subtotal.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.total}>
        <Text style={styles.totalLabel}>TOTAL</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      <Text style={styles.footer}>Thank you for your business!</Text>
    </Page>
  </Document>
);

export default InvoicePDF;