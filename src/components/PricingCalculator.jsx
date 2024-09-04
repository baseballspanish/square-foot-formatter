import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PricingCalculator = ({ onGeneratePDF }) => {
  const [squareFeet, setSquareFeet] = useState('');
  const [pricePerSqFt, setPricePerSqFt] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [payments, setPayments] = useState([]);
  const [percentages, setPercentages] = useState([25, 25, 25, 25]);
  const [calculatorLogoUrl, setCalculatorLogoUrl] = useState('');

  useEffect(() => {
    const calculatedTotalCost = Number(squareFeet) * Number(pricePerSqFt);
    setTotalCost(calculatedTotalCost);

    const calculatedPayments = percentages.map(percentage => 
      (calculatedTotalCost * percentage) / 100
    );
    setPayments(calculatedPayments);
  }, [squareFeet, pricePerSqFt, percentages]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCalculatorLogoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-2"
        />
        {onGeneratePDF({
          squareFeet,
          pricePerSqFt,
          totalCost,
          payments,
          percentages,
          logoUrl: calculatorLogoUrl
        })}
      </CardContent>
    </Card>
  );
};