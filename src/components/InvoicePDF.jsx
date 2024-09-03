import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import MontserratRegular from '../assets/Montserrat-Regular.ttf';
import MontserratBold from '../assets/Montserrat-Bold.ttf';

// Register the Montserrat font
Font.register({
  family: 'Montserrat',
  fonts: [
    { src: MontserratRegular, fontWeight: 'normal' },
    { src: MontserratBold, fontWeight: 'bold' },
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
      fontFamily: selectedFont === 'Montserrat' ? 'Montserrat' : selectedFont,
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