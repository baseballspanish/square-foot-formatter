import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BlobProvider } from '@react-pdf/renderer';
import InvoicePDF from '../components/InvoicePDF';
import PricingCalculatorPDF from '../components/PricingCalculatorPDF';
import { PricingCalculator } from '../components/PricingCalculator';
import { InvoiceGenerator } from '../components/InvoiceGenerator';

const Index = () => {
  const [error, setError] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Helvetica');

  const handleDownloadPDF = async (blob, filename) => {
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
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError(`Failed to generate PDF: ${error.message}`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>PDF Font Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedFont} defaultValue={selectedFont}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Helvetica">Helvetica</SelectItem>
              <SelectItem value="Times-Roman">Times-Roman</SelectItem>
              <SelectItem value="Courier">Courier</SelectItem>
              <SelectItem value="Montserrat">Montserrat</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

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

      <InvoiceGenerator
        onGeneratePDF={(pdfProps) => (
          <BlobProvider document={<InvoicePDF {...pdfProps} font={selectedFont} />}>
            {({ blob, loading, error: pdfError }) => (
              <Button
                className="w-full"
                onClick={() => {
                  if (pdfError) {
                    setError(`Failed to generate Invoice PDF: ${pdfError.message}`);
                  } else {
                    handleDownloadPDF(blob, 'invoice.pdf');
                  }
                }}
                disabled={loading || isGeneratingPDF}
              >
                {loading || isGeneratingPDF ? 'Generating PDF...' : 'Download Invoice PDF'}
              </Button>
            )}
          </BlobProvider>
        )}
      />

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Index;