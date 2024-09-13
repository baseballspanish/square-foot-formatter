import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";  // Keep both Button and CardFooter if you need both

  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('MERAV INTERIORS');
  const [email, setEmail] = useState('katie@meravinteriors.com');
  const [services, setServices] = useState([]);
  const [invoiceLogoUrl1, setInvoiceLogoUrl1] = useState('');
  const [invoiceLogoUrl2, setInvoiceLogoUrl2] = useState('');
  const [invoiceTitle, setInvoiceTitle] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  // Handle image uploads
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

<<<<<<< HEAD
  // Function to add a new service
  const handleAddService = () => {
    setServices([...services, { description: '', category: '', price: 0, location: '' }]);
  };

  // Handle service input changes
  const handleServiceChange = (index, field, value) => {
    const updatedServices = services.map((service, i) =>
      i === index ? { ...service, [field]: value } : service
    );
    setServices(updatedServices);
  };

  // Remove a service
  const handleRemoveService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  // Calculate total price from services
  const calculateTotal = () => {
    return services.reduce((sum, service) => sum + (service.price || 0), 0);
  };

  // Handle PDF generation
  const handleGeneratePDF = () => {
    // Ensure onGeneratePDF is a valid function
    if (typeof onGeneratePDF === 'function') {
      console.log('Generating PDF with the following data:');
      console.log({
        clientName,
        companyName,
        email,
        services,
        total: calculateTotal(),
        logoUrl: invoiceLogoUrl1,
        logoUrl2: invoiceLogoUrl2,
        invoiceTitle,
        paymentLink,
      });

      onGeneratePDF({
        clientName,
        companyName,
        email,
        services,
        total: calculateTotal(),
        logoUrl: invoiceLogoUrl1,
        logoUrl2: invoiceLogoUrl2,
        invoiceTitle,
        paymentLink,
      });
    } else {
      console.error('onGeneratePDF is not a function');
    }
=======
  const addService = () => {
    setServices([...services, { location: '', description: '', category: '', subtotal: 0 }]);
  };

  const updateService = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);

    // Recalculate total
    const newTotal = updatedServices.reduce((sum, service) => sum + Number(service.subtotal), 0);
    setTotal(newTotal);
>>>>>>> 8f11f703b71aa29ef845882ff14e3d54282d3031
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

<<<<<<< HEAD
        {/* Service Inputs */}
        <h2 className="text-lg mb-2">Services</h2>
        {services.map((service, index) => (
          <div key={index} className="mb-2">
=======
        {services.map((service, index) => (
          <div key={index} className="mb-4">
>>>>>>> 8f11f703b71aa29ef845882ff14e3d54282d3031
            <Input
              type="text"
              placeholder="Location"
              value={service.location}
<<<<<<< HEAD
              onChange={(e) => handleServiceChange(index, 'location', e.target.value)}
              className="mr-2 mb-2"
=======
              onChange={(e) => updateService(index, 'location', e.target.value)}
              className="mb-2"
>>>>>>> 8f11f703b71aa29ef845882ff14e3d54282d3031
            />
            <Input
              type="text"
              placeholder="Description"
              value={service.description}
<<<<<<< HEAD
              onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
              className="mr-2 mb-2"
            />
            <Input
              type="text"
              placeholder="Category"
              value={service.category}
              onChange={(e) => handleServiceChange(index, 'category', e.target.value)}
              className="mr-2 mb-2"
            />
            <Input
              type="number"
              placeholder="Price"
              value={service.price}
              onChange={(e) => handleServiceChange(index, 'price', parseFloat(e.target.value))}
              className="mr-2 mb-2"
            />
            <Button variant="outline" onClick={() => handleRemoveService(index)}>
              Remove Service
            </Button>
          </div>
        ))}
        <Button onClick={handleAddService}>Add Service</Button>
=======
              onChange={(e) => updateService(index, 'description', e.target.value)}
              className="mb-2"
            />
            <Input
              type="text"
              placeholder="Service Category"
              value={service.category}
              onChange={(e) => updateService(index, 'category', e.target.value)}
              className="mb-2"
            />
            <Input
              type="number"
              placeholder="Subtotal"
              value={service.subtotal}
              onChange={(e) => updateService(index, 'subtotal', e.target.value)}
              className="mb-2"
            />
          </div>
        ))}

        <Button onClick={addService} className="mb-4">Add Service</Button>

        <div className="mb-4">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>

        {onGeneratePDF({
          clientName,
          companyName,
          email,
          services,
          total,
          logoUrl: invoiceLogoUrl1,
          logoUrl2: invoiceLogoUrl2,
          invoiceTitle,
          paymentLink
        })}
>>>>>>> 8f11f703b71aa29ef845882ff14e3d54282d3031
      </CardContent>
      <CardFooter>
        <Button onClick={handleGeneratePDF}>Generate PDF</Button>
      </CardFooter>
    </Card>
  );
};
