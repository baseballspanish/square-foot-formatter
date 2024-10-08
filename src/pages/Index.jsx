import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BlobProvider } from '@react-pdf/renderer';
import PricingCalculatorPDF from '../components/PricingCalculatorPDF';
import { PricingCalculator } from '../components/PricingCalculator';
import { InvoiceGenerator } from '../components/InvoiceGenerator';
import InvoicePDF from '../components/InvoicePDF';

const Index = () => {
  const [error, setError] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [lastGeneratedPDF, setLastGeneratedPDF] = useState(null);

  const handleDownloadPDF = useCallback(async (blob, filename) => {
    setIsGeneratingPDF(true);
    setError('');
    try {
      if (!blob) {
        throw new Error('PDF blob is undefined');
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setLastGeneratedPDF({ blob, filename });
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError(`Failed to generate PDF: ${error.message}`);
    } finally {
      setIsGeneratingPDF(false);
    }
  }, []);

  const handleDownloadInvoice = (invoiceData) => {
    console.log('Handling invoice download with data:', invoiceData);
    return (
      <BlobProvider document={<InvoicePDF {...invoiceData} />}>
        {({ blob, loading, error: pdfError }) => {
          if (pdfError) {
            console.error('PDF generation error:', pdfError);
            setError(`Failed to generate Invoice PDF: ${pdfError.message}`);
          } else if (!loading && blob) {
            console.log('PDF blob generated, initiating download');
            handleDownloadPDF(blob, 'invoice.pdf');
          }
          return null;
        }}
      </BlobProvider>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <PricingCalculator
        onGeneratePDF={(pdfProps) => (
          <BlobProvider document={<PricingCalculatorPDF {...pdfProps} />}>
            {({ blob, loading, error: pdfError }) => (
              <Button
                className="w-full"
                onClick={() => {
                  if (pdfError) {
                    setError(`Failed to generate PDF: ${pdfError.message}`);
                  } else {
                    handleDownloadPDF(blob, 'pricing-calculator.pdf');
                  }
                }}
                disabled={loading || isGeneratingPDF}
              >
                {loading || isGeneratingPDF ? 'Generating PDF...' : 'Download Pricing Calculator PDF'}
              </Button>
            )}
          </BlobProvider>
        )}
      />

      <InvoiceGenerator onDownloadInvoice={handleDownloadInvoice} />

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {lastGeneratedPDF && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Last Generated PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Filename: {lastGeneratedPDF.filename}</p>
            <Button
              onClick={() => handleDownloadPDF(lastGeneratedPDF.blob, lastGeneratedPDF.filename)}
              className="mt-2"
            >
              Download Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;
