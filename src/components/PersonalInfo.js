import React from 'react';

const PersonalInfo = ({ formData, handleChange }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="studentName">Student Name:</label>
        <input type="text" id="studentName" name="studentName" placeholder="Enter your name" value={formData.studentName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="fatherName">Father's Name:</label>
        <input type="text" id="fatherName" name="fatherName" placeholder="Enter father's name" value={formData.fatherName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="parentsPhoneNo">Parent's Phone No:</label>
        <input type="tel" id="parentsPhoneNo" name="parentsPhoneNo" placeholder="Enter parent's phone no" value={formData.parentsPhoneNo} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input type="tel" id="mobileNumber" name="mobileNumber" placeholder="Enter mobile number" value={formData.mobileNumber} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="imgUpload">Upload Image:</label>
        <input type="file" id="imgUpload" name="imgUrl" accept="image/*" onChange={handleChange} required />
      </div>
    </div>
  );
};

export default PersonalInfo;