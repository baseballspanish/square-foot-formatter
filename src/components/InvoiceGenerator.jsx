import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ServiceInput from './ServiceInput';
import { BlobProvider } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';

export const InvoiceGenerator = () => {
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('MERAV INTERIORS');
  const [email, setEmail] = useState('katie@meravinteriors.com');
  const [services, setServices] = useState([]);
  const [invoiceLogoUrl1, setInvoiceLogoUrl1] = useState('');
  const [invoiceLogoUrl2, setInvoiceLogoUrl2] = useState('');
  const [invoiceTitle, setInvoiceTitle] = useState('');
  const [paymentLink, setPaymentLink] = useState('');
  const [total, setTotal] = useState(0);

  const handleImageUpload = (event, setImageUrl) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addService = () => {
    setServices([...services, { location: '', description: '', category: '', subtotal: 0 }]);
  };

  const updateService = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);

    const newTotal = updatedServices.reduce((sum, service) => sum + Number(service.subtotal), 0);
    setTotal(newTotal);
  };

  const invoiceData = {
    clientName,
    companyName,
    email,
    services,
    total,
    logoUrl: invoiceLogoUrl1,
    logoUrl2: invoiceLogoUrl2,
    invoiceTitle,
    paymentLink
  };

  return (
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
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, setInvoiceLogoUrl1)}
          className="mb-2"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, setInvoiceLogoUrl2)}
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

        {services.map((service, index) => (
          <ServiceInput
            key={index}
            service={service}
            updateService={(field, value) => updateService(index, field, value)}
          />
        ))}

        <Button onClick={addService} className="mb-4">Add Service</Button>

        <div className="mb-4">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
      </CardContent>
      <CardFooter>
        <BlobProvider document={<InvoicePDF {...invoiceData} />}>
          {({ blob, url, loading, error }) => (
            <Button
              onClick={() => {
                if (error) {
                  console.error('Error generating Invoice PDF:', error);
                } else if (url) {
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'invoice.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}
              disabled={loading}
            >
              {loading ? 'Generating PDF...' : 'Generate and Download PDF'}
            </Button>
          )}
        </BlobProvider>
      </CardFooter>
    </Card>
  );
};
