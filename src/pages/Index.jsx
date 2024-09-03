import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BlobProvider } from '@react-pdf/renderer';
import InvoicePDF from '../components/InvoicePDF';

const Index = () => {
  // Calculator state
  const [squareFootage, setSquareFootage] = useState('');
  const [pricePerSquareFoot, setPricePerSquareFoot] = useState('');
  const [numberOfPayments, setNumberOfPayments] = useState('');
  const [calculatedTotal, setCalculatedTotal] = useState(0);
  const [pricePerPayment, setPricePerPayment] = useState(0);

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
    const total = parseFloat(squareFootage) * parseFloat(pricePerSquareFoot);
    setCalculatedTotal(isNaN(total) ? 0 : total);
    
    const perPayment = total / parseFloat(numberOfPayments);
    setPricePerPayment(isNaN(perPayment) ? 0 : perPayment);
  }, [squareFootage, pricePerSquareFoot, numberOfPayments]);

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

  const handleDownloadPDF = async (blob) => {
    setIsGeneratingPDF(true);
    try {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'invoice.pdf';
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
          <CardTitle>Square Footage Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              type="number"
              placeholder="Square Footage"
              value={squareFootage}
              onChange={(e) => setSquareFootage(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Price per Square Foot"
              value={pricePerSquareFoot}
              onChange={(e) => setPricePerSquareFoot(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Number of Payments"
              value={numberOfPayments}
              onChange={(e) => setNumberOfPayments(e.target.value)}
            />
          </div>
          <div className="text-right">
            <p><strong>Total: ${calculatedTotal.toFixed(2)}</strong></p>
            <p><strong>Price per Payment: ${pricePerPayment.toFixed(2)}</strong></p>
          </div>
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
                onClick={() => handleDownloadPDF(blob)}
                disabled={loading || isGeneratingPDF}
              >
                {loading || isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
              </Button>
            )}
          </BlobProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;