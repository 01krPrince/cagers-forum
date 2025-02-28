import React, { useState } from 'react';
import Header from './components/Header';
import PersonalInfo from './components/PersonalInfo';
import Address from './components/Address';
import Education from './components/Education';
import Submit from './components/Submit';
import { uploadImageToCloudinary, submitFormData } from './components/apiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

// Inside your App component's return statement
<ToastContainer 
  position="top-right" // Position of the toast
  autoClose={5000} // Auto close after 5 seconds
  hideProgressBar={false} // Show progress bar
  closeOnClick
  pauseOnHover
  draggable
  pauseOnFocusLoss
/>

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
    try {
      // Check if an image file is selected
      if (formData.imgUrl instanceof File) {
        // Upload the image to Cloudinary
        const secureUrl = await uploadImageToCloudinary(formData.imgUrl);
        // Update formData with the image URL
        const updatedFormData = { ...formData, imgUrl: secureUrl };

        // Submit the form data to the backend
        const result = await submitFormData(updatedFormData);
        if (result.responseStatus === "CREATED") {
          toast.success("Registered successfully!"); // Show success message
        } else {
          toast.error("A student with this email already exists."); // Show error message
        }
        console.log(result);
      } else {
        toast.error("Please upload an image before submitting."); // Show error message
      }
    } catch (error) {
      toast.error(error.message); // Show error message
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
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default App;