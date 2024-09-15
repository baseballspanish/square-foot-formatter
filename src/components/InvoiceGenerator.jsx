import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InvoiceForm from './InvoiceForm';
import InvoiceServices from './InvoiceServices';

export const InvoiceGenerator = ({ onDownloadInvoice }) => {
  const [invoiceData, setInvoiceData] = useState({
    clientName: '',
    companyName: 'MERAV INTERIORS',
    email: 'katie@meravinteriors.com',
    services: [],
    invoiceLogoUrl1: '',
    invoiceLogoUrl2: '',
    invoiceTitle: '',
    paymentLink: '',
    total: 0
  });

  const updateInvoiceData = (field, value) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    setInvoiceData(prev => ({
      ...prev,
      services: [...prev.services, { location: '', description: '', category: '', subtotal: 0 }]
    }));
  };

  const updateService = (index, field, value) => {
    const updatedServices = [...invoiceData.services];
    updatedServices[index][field] = value;
    const newTotal = updatedServices.reduce((sum, service) => sum + Number(service.subtotal), 0);
    setInvoiceData(prev => ({
      ...prev,
      services: updatedServices,
      total: newTotal
    }));
  };

  const handleDownloadInvoice = () => {
    onDownloadInvoice(invoiceData);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Invoice Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <InvoiceForm
          invoiceData={invoiceData}
          updateInvoiceData={updateInvoiceData}
        />
        <InvoiceServices
          services={invoiceData.services}
          updateService={updateService}
          addService={addService}
        />
        <div className="mb-4">
          <strong>Total: ${invoiceData.total.toFixed(2)}</strong>
        </div>
        <Button onClick={handleDownloadInvoice} className="w-full">
          Download Invoice
        </Button>
      </CardContent>
    </Card>
  );
};
