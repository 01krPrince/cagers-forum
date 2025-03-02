import React from "react";

const Address = ({ formData, handleChange }) => {
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    handleChange({
      target: {
        name: "address",
        value: {
          ...formData.address,
          [name]: value,
        },
      },
    });
  };

  return (
    <div>
      <h3>Address Details</h3>
      <div className="form-group">
        <label htmlFor="street">Street:</label>
        <input
          type="text"
          id="street"
          name="street"
          placeholder="Enter street address"
          value={formData.address?.street || ""}
          onChange={handleAddressChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Enter city"
          value={formData.address?.city || ""}
          onChange={handleAddressChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="district">District:</label>
        <input
          type="text"
          id="district"
          name="district"
          placeholder="Enter district"
          value={formData.address?.district || ""}
          onChange={handleAddressChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          placeholder="Enter state"
          value={formData.address?.state || ""}
          onChange={handleAddressChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="postalCode">Postal Code:</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          placeholder="Enter postal code"
          value={formData.address?.postalCode || ""}
          onChange={handleAddressChange}
          required
        />
      </div>
    </div>
  );
};

export default Address;
