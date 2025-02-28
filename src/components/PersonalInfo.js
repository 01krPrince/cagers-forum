import React from 'react';
import { uploadImageToCloudinary, submitFormData } from './apiService'; // Adjust the import path as necessary
import { toast } from 'react-toastify';

// Custom Toast Component
const CustomToast = ({ message, type }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '10px' }}>
        {type === 'success' ? (
          <i className="fas fa-check-circle" style={{ color: '#4caf50' }}></i>
        ) : (
          <i className="fas fa-exclamation-circle" style={{ color: '#f44336' }}></i>
        )}
      </div>
      <div>{message}</div>
    </div>
  );
};

const PersonalInfo = ({ formData, handleChange }) => {
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      // Check if an image file is selected
      if (formData.imgUrl instanceof File) {
        
        const secureUrl = await uploadImageToCloudinary(formData.imgUrl);
        
        const updatedFormData = { ...formData, imgUrl: secureUrl };

        const result = await submitFormData(updatedFormData);

        if (result.responseStatus === 'CREATED') {
          toast(<CustomToast message="Registered successfully!" type="success" />);
        } else if (result.responseStatus === 'BAD_REQUEST' && result.errorMessage) {
          toast(<CustomToast message={result.errorMessage} type="error" />);
        }
      } else {
        toast(<CustomToast message="Please upload a valid image file." type="error" />);
      }
    } catch (error) {
      toast(<CustomToast message={error.message} type="error" />);
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="studentName">Student Name:</label>
        <input
          type="text"
          id="studentName"
          name="studentName"
          placeholder="Enter your name"
          value={formData.studentName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="fatherName">Father's Name:</label>
        <input
          type="text"
          id="fatherName"
          name="fatherName"
          placeholder="Enter father's name"
          value={formData.fatherName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="parentsPhoneNo">Parent's Phone No:</label>
        <input
          type="tel"
          id="parentsPhoneNo"
          name="parentsPhoneNo"
          placeholder="Enter parent's phone no"
          value={formData.parentsPhoneNo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          placeholder="Enter mobile number"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="imgUpload">Upload Image:</label>
        <input
          type="file"
          id="imgUpload"
          name="imgUrl"
          accept="image/*"
          onChange={(e) => handleChange({ target: { name: 'imgUrl', value: e.target.files[0] } })}
          required
        />
      </div>
      <small style={{ color: "red" }}>Image should be less than 400 KB</small>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PersonalInfo;