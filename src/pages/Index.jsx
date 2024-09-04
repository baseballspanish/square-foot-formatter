import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BlobProvider } from '@react-pdf/renderer';
import InvoicePDF from '../components/InvoicePDF';
import PricingCalculatorPDF from '../components/PricingCalculatorPDF';

const Index = () => {
  const [squareFeet, setSquareFeet] = useState('');
  const [pricePerSqFt, setPricePerSqFt] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [payments, setPayments] = useState([]);
  const [percentages, setPercentages] = useState([25, 25, 25, 25]);
  const [calculatorLogoUrl, setCalculatorLogoUrl] = useState('');
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('MERAV INTERIORS');
  const [email, setEmail] = useState('katie@meravinteriors.com');
  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);
  const [invoiceLogoUrl1, setInvoiceLogoUrl1] = useState('');
  const [invoiceLogoUrl2, setInvoiceLogoUrl2] = useState('');
  const [invoiceTitle, setInvoiceTitle] = useState('');
  const [paymentLink, setPaymentLink] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Calculate total cost and payments whenever squareFeet or pricePerSqFt changes
    const calculatedTotalCost = Number(squareFeet) * Number(pricePerSqFt);
    setTotalCost(calculatedTotalCost);

    const calculatedPayments = percentages.map(percentage => 
      (calculatedTotalCost * percentage) / 100
    );
    setPayments(calculatedPayments);
  }, [squareFeet, pricePerSqFt, percentages]);

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

  return (
    <div className="container mx-auto p-4">
      {/* Pricing Calculator Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Pricing Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="number"
            placeholder="Square Feet"
            value={squareFeet}
            onChange={(e) => setSquareFeet(e.target.value)}
            className="mb-2"
          />
          <Input
            type="number"
            placeholder="Price per Square Foot"
            value={pricePerSqFt}
            onChange={(e) => setPricePerSqFt(e.target.value)}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Calculator Logo URL"
            value={calculatorLogoUrl}
            onChange={(e) => setCalculatorLogoUrl(e.target.value)}
            className="mb-2"
          />
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
          <Input
            type="text"
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mb-2"
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Invoice Logo URL 1"
            value={invoiceLogoUrl1}
            onChange={(e) => setInvoiceLogoUrl1(e.target.value)}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Invoice Logo URL 2"
            value={invoiceLogoUrl2}
            onChange={(e) => setInvoiceLogoUrl2(e.target.value)}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Invoice Title"
            value={invoiceTitle}
            onChange={(e) => setInvoiceTitle(e.target.value)}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Payment Link"
            value={paymentLink}
            onChange={(e) => setPaymentLink(e.target.value)}
            className="mb-2"
          />
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