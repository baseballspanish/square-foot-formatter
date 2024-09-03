import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from '../components/InvoicePDF';

const Index = () => {
  const [squareFeet, setSquareFeet] = useState('');
  const [pricePerSqFt, setPricePerSqFt] = useState('');
  const [percentages, setPercentages] = useState([50, 30, 10, 10]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [calculationDone, setCalculationDone] = useState(false);

  const calculatePayments = () => {
    const total = parseFloat(squareFeet) * parseFloat(pricePerSqFt);
    setTotalCost(total);
    let remainingCost = total;
    const newPayments = percentages.map((percentage, index) => {
      const payment = (total * percentage) / 100;
      remainingCost -= payment;
      if (index === percentages.length - 1) {
        // Last payment, don't round
        return parseFloat(payment.toFixed(2));
      }
      // Round to nearest $10
      return Math.round(payment / 10) * 10;
    });
    // Adjust last payment to account for rounding errors
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
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button onClick={calculatePayments} className="w-full mb-4" disabled={!!error}>Calculate Payments</Button>
          {calculationDone && (
            <PDFDownloadLink
              document={
                <InvoicePDF
                  squareFeet={squareFeet}
                  pricePerSqFt={pricePerSqFt}
                  totalCost={totalCost}
                  payments={payments}
                  percentages={percentages}
                  uploadedImage={uploadedImage}
                />
              }
              fileName="invoice.pdf"
            >
              {({ blob, url, loading, error }) => (
                <Button className="w-full" disabled={loading}>
                  {loading ? 'Loading document...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
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