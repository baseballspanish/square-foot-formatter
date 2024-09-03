import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import MontserratRegularBase64 from '../assets/MontserratRegularBase64';
import MontserratBoldBase64 from '../assets/MontserratBoldBase64';

// Register the Montserrat font using base64 encoding
Font.register({
  family: 'Montserrat',
  fonts: [
    { src: `data:font/truetype;base64,${MontserratRegularBase64}`, fontWeight: 'normal' },
    { src: `data:font/truetype;base64,${MontserratBoldBase64}`, fontWeight: 'bold' },
  ],
});

// Register other fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyCg4QIFqPfE.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyCg4TYFqPfE.ttf', fontWeight: 'bold' },
  ],
});

const InvoicePDF = ({ squareFeet, pricePerSqFt, totalCost, payments, percentages, uploadedImage, selectedFont }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      padding: 30,
      position: 'relative',
      fontFamily: selectedFont,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
    imageContainer: {
      position: 'absolute',
      top: 30,
      right: 30,
      width: 100,
      height: 100,
    },
    image: {
      objectFit: 'contain',
      width: '100%',
      height: '100%',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {uploadedImage && (
          <View style={styles.imageContainer}>
            <Image src={uploadedImage} style={styles.image} />
          </View>
        )}
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
};

export default InvoicePDF;