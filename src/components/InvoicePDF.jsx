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
    padding: 30,
    fontFamily: 'Montserrat',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 'auto',
  },
  companyInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  companyDetail: {
    fontSize: 10,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  table: {
    flexDirection: 'column',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalAmount: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
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
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bill To:</Text>
        <Text style={styles.text}>{clientName}</Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Description</Text>
          <Text style={styles.tableCell}>Location</Text>
          <Text style={styles.tableCell}>Category</Text>
          <Text style={styles.tableCell}>Amount</Text>
        </View>
        {services.map((service, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{service.description}</Text>
            <Text style={styles.tableCell}>{service.location}</Text>
            <Text style={styles.tableCell}>{service.category}</Text>
            <Text style={styles.tableCell}>${service.subtotal.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.total}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </View>

      <Text style={styles.footer}>Thank you for your business!</Text>
    </Page>
  </Document>
);

export default InvoicePDF;