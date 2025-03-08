import React from "react";
import { submitFormData } from "./apiService";
import { toast } from "react-toastify";

const PersonalInfo = ({ formData, handleChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({ target: { name, value } });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await submitFormData(formData);

      if (result.responseStatus === "CREATED") {
        toast.success("Registered successfully!");
      } else if (
        result.responseStatus === "BAD_REQUEST" &&
        result.errorMessage
      ) {
        toast.error(result.errorMessage);
      } else {
        throw new Error("An unexpected error occurred.");
      }
    } catch (error) {
      toast.error(error.message);
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
        <label htmlFor="imgUrl">Image URL:</label>
        <input
          type="text"
          id="imgUrl"
          name="imgUrl"
          placeholder="Enter image URL"
          value={formData.imgUrl}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PersonalInfo;
