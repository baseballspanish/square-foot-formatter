import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image
} from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'OpenSans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf' },
    { src: 'https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN7rgOUuhs.ttf', fontWeight: 'bold' },
  ],
});

Font.register({
  family: 'GreatVibes',
  src: 'https://fonts.gstatic.com/s/greatvibes/v7/RWmMoKWR9v4ksMfaWd_JN9XFiaQ.ttf',
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'OpenSans',
    fontSize: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
  },
  logoText: {
    fontSize: 36,
    fontFamily: 'GreatVibes',
  },
  companyName: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 5,
  },
  byline: {
    fontSize: 12,
    fontFamily: 'OpenSans',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  tableHeader: {
    marginBottom: 10,
    marginTop: 30,
    borderBottom: 1,
    borderColor: '#000',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: 1,
    borderColor: '#e0e0e0',
    paddingBottom: 5,
    marginBottom: 5,
  },
  cell: {
    flex: 1,
  },
  cellLarge: {
    flex: 2,
  },
  cellRight: {
    textAlign: 'right',
  },
  total: {
    marginTop: 20,
    textAlign: 'right',
  },
  logo: {
    width: 100,
    height: 'auto',
    marginBottom: 10,
  },
});

const InvoicePDF = ({ clientName, companyName, email, services, total, logoUrl, invoiceTitle }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        {logoUrl && <Image style={styles.logo} src={logoUrl} />}
        <Text style={styles.logoText}>{invoiceTitle || 'INVOICE'}</Text>
        <Text style={styles.companyName}>{companyName || 'MERAV INTERIORS'}</Text>
        <Text style={styles.byline}>BY KATIE ROBERTS</Text>
      </View>

      <View style={styles.section}>
        <Text>
          <Text style={styles.boldText}>BILLED TO: </Text>
          {clientName || 'CLIENT NAME'}
        </Text>
        <Text>
          <Text style={styles.boldText}>PAY TO: </Text>
          {companyName || 'MERAV INTERIORS'}
        </Text>
        <Text>{email || 'katie@meravinteriors.com'}</Text>
      </View>

      <View>
        <Text style={styles.tableHeader}>DESIGN FEES:</Text>
        <View style={styles.tableRow}>
          <Text style={[styles.cell, styles.boldText]}>LOCATION</Text>
          <Text style={[styles.cellLarge, styles.boldText]}>DESCRIPTION</Text>
          <Text style={[styles.cell, styles.boldText]}>SERVICE CATEGORY</Text>
          <Text style={[styles.cell, styles.cellRight, styles.boldText]}>
            SUBTOTAL
          </Text>
        </View>
        {services.map((service, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.cell}>{service.location || 'N/A'}</Text>
            <Text style={styles.cellLarge}>{service.description}</Text>
            <Text style={styles.cell}>{service.category}</Text>
            <Text style={[styles.cell, styles.cellRight]}>${service.subtotal.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.total}>
        <Text style={styles.boldText}>Total: ${total.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;