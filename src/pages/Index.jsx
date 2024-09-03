import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import InvoicePDF from '../components/InvoicePDF';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [squareFeet, setSquareFeet] = useState('');
  const [pricePerSqFt, setPricePerSqFt] = useState('');
  const [percentages, setPercentages] = useState([50, 30, 10, 10]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [calculationDone, setCalculationDone] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Montserrat');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const calculatePayments = () => {
    const total = parseFloat(squareFeet) * parseFloat(pricePerSqFt);
    setTotalCost(total);
    let remainingCost = total;
    const newPayments = percentages.map((percentage, index) => {
      const payment = (total * percentage) / 100;
      remainingCost -= payment;
      if (index === percentages.length - 1) {
        return parseFloat(payment.toFixed(2));
      }
      return Math.round(payment / 10) * 10;
    });
    newPayments[newPayments.length - 1] += parseFloat(remainingCost.toFixed(2));
    setPayments(newPayments);
    setCalculationDone(true);
  };

  const validateTotalPercentage = (newPercentages) => {
    const total = newPercentages.reduce((sum, percentage) => sum + percentage, 0);
    return total <= 100;
  };

  const handlePercentageChange = (index, value) => {
    const newPercentages = [...percentages];
    newPercentages[index] = parseFloat(value) || 0;
    
    if (validateTotalPercentage(newPercentages)) {
      setPercentages(newPercentages);
      setError('');
    } else {
      setError('Total percentage cannot exceed 100%');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
          <CardTitle>Invoice Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input
              type="number"
              placeholder="Square Feet"
              value={squareFeet}
              onChange={(e) => setSquareFeet(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Price per Sq Ft"
              value={pricePerSqFt}
              onChange={(e) => setPricePerSqFt(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
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
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          <Select onValueChange={setSelectedFont} defaultValue={selectedFont} className="mb-4">
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Montserrat">Montserrat</SelectItem>
              <SelectItem value="Helvetica">Helvetica</SelectItem>
              <SelectItem value="Times-Roman">Times New Roman</SelectItem>
              <SelectItem value="Courier">Courier</SelectItem>
            </SelectContent>
          </Select>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button onClick={calculatePayments} className="w-full mb-4" disabled={!!error}>Calculate Payments</Button>
          {calculationDone && (
            <BlobProvider
              document={
                <InvoicePDF
                  squareFeet={squareFeet}
                  pricePerSqFt={pricePerSqFt}
                  totalCost={totalCost}
                  payments={payments}
                  percentages={percentages}
                  uploadedImage={uploadedImage}
                  selectedFont={selectedFont}
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
          )}
        </CardContent>
      </Card>

      {calculationDone && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-bold">Total Cost:</div>
              <div>${totalCost.toFixed(2)}</div>
              {payments.map((payment, index) => (
                <React.Fragment key={index}>
                  <div className="font-bold">Payment {index + 1} ({percentages[index]}%):</div>
                  <div>${payment.toFixed(2)}</div>
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;