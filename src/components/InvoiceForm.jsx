import React from 'react';
import { Input } from "@/components/ui/input";

const InvoiceForm = ({ invoiceData, updateInvoiceData }) => {
  const handleImageUpload = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateInvoiceData(field, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Client Name"
        value={invoiceData.clientName}
        onChange={(e) => updateInvoiceData('clientName', e.target.value)}
        className="mb-2"
      />
      <Input
        type="text"
        placeholder="Company Name"
        value={invoiceData.companyName}
        onChange={(e) => updateInvoiceData('companyName', e.target.value)}
        className="mb-2"
      />
      <Input
        type="email"
        placeholder="Email"
        value={invoiceData.email}
        onChange={(e) => updateInvoiceData('email', e.target.value)}
        className="mb-2"
      />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, 'invoiceLogoUrl1')}
        className="mb-2"
      />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, 'invoiceLogoUrl2')}
        className="mb-2"
      />
      <Input
        type="text"
        placeholder="Invoice Title"
        value={invoiceData.invoiceTitle}
        onChange={(e) => updateInvoiceData('invoiceTitle', e.target.value)}
        className="mb-2"
      />
      <Input
        type="text"
        placeholder="Payment Link"
        value={invoiceData.paymentLink}
        onChange={(e) => updateInvoiceData('paymentLink', e.target.value)}
        className="mb-2"
      />
    </>
  );
};

export default InvoiceForm;