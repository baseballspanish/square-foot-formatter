import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BlobProvider } from '@react-pdf/renderer';
import InvoicePDF from '../components/InvoicePDF';
import PricingCalculatorPDF from '../components/PricingCalculatorPDF';

const Index = () => {
  // Pricing calculator state
  const [squareFeet, setSquareFeet] = useState('');
  const [pricePerSqFt, setPricePerSqFt] = useState('');
  const [percentages, setPercentages] = useState([50, 30, 10, 10]);
  const [totalCost, setTotalCost] = useState(0);
  const [payments, setPayments] = useState([0, 0, 0, 0]);
  const [calculatorError, setCalculatorError] = useState('');

  // Invoice generator state
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [services, setServices] = useState([
    { location: '', description: '', category: '', subtotal: 0 }
  ]);
  const [error, setError] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [total, setTotal] = useState(0);

  // Calculator effect
  useEffect(() => {
    const sqFt = parseFloat(squareFeet);
    const price = parseFloat(pricePerSqFt);
    if (!isNaN(sqFt) && !isNaN(price)) {
      const cost = sqFt * price;
      setTotalCost(cost);
      calculatePayments(cost);
    } else {
      setTotalCost(0);
      setPayments([0, 0, 0, 0]);
    }
  }, [squareFeet, pricePerSqFt, percentages]);

  const calculatePayments = (cost) => {
    const newPayments = percentages.map((percentage, index) => {
      const payment = (cost * percentage) / 100;
      return index === percentages.length - 1 ? payment : Math.round(payment / 10) * 10;
    });
    setPayments(newPayments);
  };

  const handlePercentageChange = (index, value) => {
    const newPercentages = [...percentages];
    newPercentages[index] = parseFloat(value) || 0;
    const total = newPercentages.reduce((sum, percent) => sum + percent, 0);
    if (total > 100) {
      setCalculatorError('Total percentage cannot exceed 100%');
    } else {
      setCalculatorError('');
      setPercentages(newPercentages);
    }
  };

  // Invoice total effect
  useEffect(() => {
    const newTotal = services.reduce((sum, service) => sum + parseFloat(service.subtotal || 0), 0);
    setTotal(newTotal);
  }, [services]);

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    if (field === 'subtotal') {
      updatedServices[index][field] = parseFloat(value) || 0;
    }
    setServices(updatedServices);
  };

  const addService = () => {
    setServices([...services, { location: '', description: '', category: '', subtotal: 0 }]);
  };

  const removeService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handleDownloadPDF = async (blob, filename) => {
    setIsGeneratingPDF(true);
    try {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Pricing Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              type="number"
              placeholder="Square Feet"
              value={squareFeet}
              onChange={(e) => setSquareFeet(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Price per Square Foot"
              value={pricePerSqFt}
              onChange={(e) => setPricePerSqFt(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {percentages.map((percentage, index) => (
              <Input
                key={index}
                type="number"
                placeholder={`Payment ${index + 1} %`}
                value={percentage}
                onChange={(e) => handlePercentageChange(index, e.target.value)}
              />
            ))}
          </div>
          {calculatorError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{calculatorError}</AlertDescription>
            </Alert>
          )}
          <div className="text-right mb-4">
            <p><strong>Total Cost: ${totalCost.toFixed(2)}</strong></p>
            {payments.map((payment, index) => (
              <p key={index}><strong>Payment {index + 1}: ${payment.toFixed(2)}</strong></p>
            ))}
          </div>
          <BlobProvider
            document={
              <PricingCalculatorPDF
                squareFeet={squareFeet}
                pricePerSqFt={pricePerSqFt}
                totalCost={totalCost}
                payments={payments}
                percentages={percentages}
              />
            }
          >
            {({ blob, url, loading, error }) => (
              <Button
                className="w-full"
                onClick={() => handleDownloadPDF(blob, 'pricing-calculator.pdf')}
                disabled={loading || isGeneratingPDF}
              >
                {loading || isGeneratingPDF ? 'Generating PDF...' : 'Download Pricing Calculator PDF'}
              </Button>
            )}
          </BlobProvider>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Invoice Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Input
              placeholder="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <Input
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {services.map((service, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 mb-4">
              <Input
                placeholder="Location"
                value={service.location}
                onChange={(e) => handleServiceChange(index, 'location', e.target.value)}
              />
              <Input
                placeholder="Description"
                value={service.description}
                onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
              />
              <Input
                placeholder="Service Category"
                value={service.category}
                onChange={(e) => handleServiceChange(index, 'category', e.target.value)}
              />
              <Input
                type="number"
                placeholder="Subtotal"
                value={service.subtotal}
                onChange={(e) => handleServiceChange(index, 'subtotal', e.target.value)}
              />
              <Button onClick={() => removeService(index)} variant="destructive">Remove Service</Button>
            </div>
          ))}
          <Button onClick={addService} className="mb-4">Add Service</Button>
          <div className="text-right mb-4">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <BlobProvider
            document={
              <InvoicePDF
                clientName={clientName}
                companyName={companyName}
                email={email}
                services={services}
                total={total}
              />
            }
          >
            {({ blob, url, loading, error }) => (
              <Button
                className="w-full"
                onClick={() => handleDownloadPDF(blob, 'invoice.pdf')}
                disabled={loading || isGeneratingPDF}
              >
                {loading || isGeneratingPDF ? 'Generating PDF...' : 'Download Invoice PDF'}
              </Button>
            )}
          </BlobProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;