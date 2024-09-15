import React from 'react';
import { Button } from "@/components/ui/button";
import ServiceInput from './ServiceInput';

const InvoiceServices = ({ services, updateService, addService }) => {
  return (
    <>
      {services.map((service, index) => (
        <ServiceInput
          key={index}
          service={service}
          updateService={(field, value) => updateService(index, field, value)}
        />
      ))}
      <Button onClick={addService} className="mb-4">Add Service</Button>
    </>
  );
};

export default InvoiceServices;