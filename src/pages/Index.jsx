import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BlobProvider } from '@react-pdf/renderer';
import InvoicePDF from '../components/InvoicePDF';
import PricingCalculatorPDF from '../components/PricingCalculatorPDF';

const Index = () => {
  // ... (previous state declarations remain unchanged)

  const handleDownloadPDF = async (blob, filename) => {
    setIsGeneratingPDF(true);
    setError('');
    try {
      console.log('Attempting to generate PDF:', { blob, filename });
      if (!blob) {
        throw new Error('PDF blob is undefined');
      }
      const url = URL.createObjectURL(blob);
      console.log('Created URL for blob:', url);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('PDF download initiated');
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError(`Failed to generate PDF: ${error.message}`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // ... (other functions remain unchanged)

  return (
    <div className="container mx-auto p-4">
      {/* Pricing Calculator Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Pricing Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          {/* ... (previous input fields remain unchanged) */}
          <BlobProvider
            document={
              <PricingCalculatorPDF
                squareFeet={squareFeet}
                pricePerSqFt={pricePerSqFt}
                totalCost={totalCost}
                payments={payments}
                percentages={percentages}
                logoUrl={calculatorLogoUrl}
              />
            }
          >
            {({ blob, url, loading, error: pdfError }) => {
              console.log('BlobProvider state:', { blob, url, loading, pdfError });
              return (
                <Button
                  className="w-full"
                  onClick={() => {
                    if (pdfError) {
                      console.error('PDF generation error:', pdfError);
                      setError(`Failed to generate PDF: ${pdfError.message}`);
                    } else {
                      handleDownloadPDF(blob, 'pricing-calculator.pdf');
                    }
                  }}
                  disabled={loading || isGeneratingPDF}
                >
                  {loading || isGeneratingPDF ? 'Generating PDF...' : 'Download Pricing Calculator PDF'}
                </Button>
              );
            }}
          </BlobProvider>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Invoice Generator Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Invoice Generator</CardTitle>
        </CardHeader>
        <CardContent>
          {/* ... (previous input fields remain unchanged) */}
          <BlobProvider
            document={
              <InvoicePDF
                clientName={clientName}
                companyName={companyName}
                email={email}
                services={services}
                total={total}
                logoUrl={invoiceLogoUrl1}
                logoUrl2={invoiceLogoUrl2}
                invoiceTitle={invoiceTitle}
                paymentLink={paymentLink}
              />
            }
          >
            {({ blob, url, loading, error: pdfError }) => {
              console.log('Invoice BlobProvider state:', { blob, url, loading, pdfError });
              return (
                <Button
                  className="w-full"
                  onClick={() => {
                    if (pdfError) {
                      console.error('Invoice PDF generation error:', pdfError);
                      setError(`Failed to generate Invoice PDF: ${pdfError.message}`);
                    } else {
                      handleDownloadPDF(blob, 'invoice.pdf');
                    }
                  }}
                  disabled={loading || isGeneratingPDF}
                >
                  {loading || isGeneratingPDF ? 'Generating PDF...' : 'Download Invoice PDF'}
                </Button>
              );
            }}
          </BlobProvider>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;