import React, { useState } from 'react';
import Header from './components/Header';
import PersonalInfo from './components/PersonalInfo';
import Address from './components/Address';
import Education from './components/Education';
import Submit from './components/Submit';
import './style.css';

const App = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    parentsPhoneNo: '',
    mobileNumber: '',
    email: '',
    dob: '',
    imgUrl: '',
    street: '',
    city: '',
    district: '',
    state: '',
    postalCode: '',
    degree: '',
    course: '',
    batchId: '',
    branchId: '',
    admissionDate: '',
    studyMode: ''
  });

  const [expandedSection, setExpandedSection] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(formData); // For debugging
    // Post the data to the API
    try {
      const response = await fetch('https://batch-master-backend.onrender.com/api/v1/students/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="container">
      <Header />
      <div className="form-container">
        <div className="expandable-section">
          <h2 onClick={() => toggleSection('personal')}>
            Personal Information
            <span className="icon">{expandedSection === 'personal' ? '-' : '+'}</span>
          </h2>
          {expandedSection === 'personal' && (
            <PersonalInfo formData={formData} handleChange={handleChange} />
          )}
        </div>
        <div className="expandable-section">
          <h2 onClick={() => toggleSection('address')}>
            Address Details
            <span className="icon">{expandedSection === 'address' ? '-' : '+'}</span>
          </h2>
          {expandedSection === 'address' && (
            <Address formData={formData} handleChange={handleChange} />
          )}
        </div>
        <div className="expandable-section">
          <h2 onClick={() => toggleSection('education')}>
            Education Details
            <span className="icon">{expandedSection === 'education' ? '-' : '+'}</span>
          </h2>
          {expandedSection === 'education' && (
            <Education formData={formData} handleChange={handleChange} />
          )}
        </div>
        <Submit handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default App;