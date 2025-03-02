import React, { useEffect, useRef } from "react";
import { uploadImageToCloudinary, submitFormData } from "./apiService";
import { toast } from "react-toastify";

const CustomToast = ({ message, type }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ marginRight: "10px" }}>
      {type === "success" ? (
        <i className="fas fa-check-circle" style={{ color: "#4caf50" }}></i>
      ) : (
        <i
          className="fas fa-exclamation-circle"
          style={{ color: "#f44336" }}
        ></i>
      )}
    </div>
    <div>{message}</div>
  </div>
);

const PersonalInfo = ({ formData, handleChange }) => {
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (formData.imgUrl instanceof File && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(formData.imgUrl);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [formData.imgUrl]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    handleChange({ target: { name, value: newValue } });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let updatedFormData = { ...formData };

      if (formData.imgUrl instanceof File) {
        const secureUrl = await uploadImageToCloudinary(formData.imgUrl);
        updatedFormData.imgUrl = secureUrl;
      } else {
        throw new Error("Please upload a valid image.");
      }

      const result = await submitFormData(updatedFormData);

      if (result.responseStatus === "CREATED") {
        toast(<CustomToast message="Registered successfully!" type="success" />);
      } else if (
        result.responseStatus === "BAD_REQUEST" &&
        result.errorMessage
      ) {
        toast(<CustomToast message={result.errorMessage} type="error" />);
      } else {
        throw new Error("An unexpected error occurred.");
      }
    } catch (error) {
      toast(<CustomToast message={error.message} type="error" />);
      console.error("Submission error:", error);
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="parentsPhoneNo">Parent's Phone No:</label>
        <input
          type="tel"
          id="parentsPhoneNo"
          name="parentsPhoneNo"
          placeholder="Enter parent's phone number"
          value={formData.parentsPhoneNo}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          ref={fileInputRef}
          required
        />
      </div>
    </form>
  );
};

export default PersonalInfo;
