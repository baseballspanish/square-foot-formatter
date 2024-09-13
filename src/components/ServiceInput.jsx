import React from 'react';
import { Input } from "@/components/ui/input";

const ServiceInput = ({ service, updateService }) => {
  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Location"
        value={service.location}
        onChange={(e) => updateService('location', e.target.value)}
        className="mb-2"
      />
      <Input
        type="text"
        placeholder="Description"
        value={service.description}
        onChange={(e) => updateService('description', e.target.value)}
        className="mb-2"
      />
      <Input
        type="text"
        placeholder="Service Category"
        value={service.category}
        onChange={(e) => updateService('category', e.target.value)}
        className="mb-2"
      />
      <Input
        type="number"
        placeholder="Subtotal"
        value={service.subtotal}
        onChange={(e) => updateService('subtotal', e.target.value)}
        className="mb-2"
      />
    </div>
  );
};

export default ServiceInput;