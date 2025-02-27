import React from 'react';

const Address = ({ formData, handleChange }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="street">Street:</label>
        <input type="text" id="street" name="street" placeholder="Enter street address" value={formData.street} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" placeholder="Enter city" value={formData.city} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="district">District:</label>
        <input type="text" id="district" name="district" placeholder="Enter district" value={formData.district} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="state">State:</label>
        <input type="text" id="state" name="state" placeholder="Enter state" value={formData.state} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="postalCode">Postal Code:</label>
        <input type="text" id="postalCode" name="postalCode" placeholder="Enter postal code" value={formData.postalCode} onChange={handleChange} required />
      </div>
    </div>
  );
};

export default Address;