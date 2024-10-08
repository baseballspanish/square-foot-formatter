import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Link,
} from '@react-pdf/renderer';

Font.register({
  family: 'Montserrat',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2',
    },
    {
      src: 'https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_cJD6xuX.woff2',
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Montserrat',
    fontSize: 10,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 30,
    marginTop: 30,
  },
  logo1: {
    width: 225,
    height: 'auto',
    marginBottom: 20,
    marginLeft: '10%',
  },
  logo2: {
    width: 400,
    height: 'auto',
    marginBottom: 20,
    alignSelf: 'center',
  },
  logoFallback: {
    fontSize: 12,
    marginBottom: 10,
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
    fontWeight: 'bold',
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
  paymentLabel: {
    color: 'black',
    textDecoration: 'none',
  },
  paymentLink: {
    color: 'blue',
    textDecoration: 'underline',
  },
});

const InvoicePDF = ({ clientName, companyName, email, services, total, invoiceLogoUrl1, invoiceLogoUrl2, paymentLink, invoiceTitle }) => {
  console.log('Rendering InvoicePDF with props:', { clientName, companyName, email, services, total, invoiceLogoUrl1, invoiceLogoUrl2, paymentLink, invoiceTitle });
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {invoiceLogoUrl1 ? (
            <Image style={styles.logo1} src={invoiceLogoUrl1} />
          ) : (
            <Text style={styles.logoFallback}>Logo 1 not available</Text>
          )}
          {invoiceLogoUrl2 ? (
            <Image style={styles.logo2} src={invoiceLogoUrl2} />
          ) : (
            <Text style={styles.logoFallback}>Logo 2 not available</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.boldText}>{invoiceTitle || 'INVOICE'}</Text>
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
          {services && services.map((service, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{service.location || 'N/A'}</Text>
              <Text style={styles.cellLarge}>{service.description}</Text>
              <Text style={styles.cell}>{service.category}</Text>
              <Text style={[styles.cell, styles.cellRight]}>${Number(service.subtotal).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.total}>
          <Text style={styles.boldText}>Total: ${Number(total).toFixed(2)}</Text>
        </View>

        {paymentLink && (
          <Text>
            <Text style={styles.paymentLabel}>Payment Link: </Text>
            <Link src={paymentLink} style={styles.paymentLink}>{paymentLink}</Link>
          </Text>
        )}
      </Page>
    </Document>
  );
};

export default InvoicePDF;
