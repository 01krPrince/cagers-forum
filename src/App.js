import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PersonalInfo from "./components/PersonalInfo";
import Address from "./components/Address";
import Education from "./components/Education";
import Submit from "./components/Submit";
import {
  uploadImageToCloudinary,
  submitFormData,
  isUserExists,
  changeStudentStatus
} from "./components/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const App = () => {
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        await fetch("https://batch-master-backend.onrender.com/api/v1/subjects/getAllSubjects");
        console.log("This is called to start the backend server😊");
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    parentsPhoneNo: "",
    mobileNumber: "",
    email: "",
    dob: "",
    imgUrl: "",
    address: {
      street: "",
      city: "",
      district: "",
      state: "",
      postalCode: "",
    },
    degree: "",
    course: "Full Stack Development",
    batchId: "",
    branchId: "",
    admissionDate: "",
    studyMode: "",
  });

  const [expandedSection, setExpandedSection] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const requiredFields = [
    "studentName",
    "fatherName",
    "parentsPhoneNo",
    "mobileNumber",
    "email",
    "dob",
    "imgUrl",
    "address.street",
    "address.city",
    "address.district",
    "address.state",
    "address.postalCode",
    "degree",
    "course",
    "batchId",
    "branchId",
    "admissionDate",
  ];

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => acc && acc[key], obj);
  };

  const validateForm = () => {
    for (const field of requiredFields) {
      const value = getNestedValue(formData, field);
      if (!value || value.toString().trim() === "") {
        toast.error(`Please enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`);
        return false;
      }
    }

    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
      toast.error("Please enter a valid Mobile Number (10 digits)");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);

    try {
      toast.info("Checking if the user exists...");
      const existingStudent = await isUserExists(formData.email);

      if (existingStudent) {
        toast.error("Student with this email already exists!");
        setIsSubmitting(false);
        return;
      }

      let updatedFormData = { ...formData };

      // Handle image upload if it's a File object
      if (formData.imgUrl instanceof File) {
        try {
          const secureUrl = await uploadImageToCloudinary(formData.imgUrl);
          updatedFormData.imgUrl = secureUrl;
        } catch (imageError) {
          toast.error("Image upload failed. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }

      const result = await submitFormData(updatedFormData);

      if (result.responseStatus === "CREATED") {
        console.log(result);
        if (result.studentId) {
          await changeStudentStatus(result.studentId);
        }
        toast.success("Registered successfully!");
      } else {
        toast.error("Failed to register. Please try again.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
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
          <h2 onClick={() => toggleSection("personal")}>Personal Information</h2>
          {expandedSection === "personal" && (
            <PersonalInfo formData={formData} handleChange={handleChange} />
          )}
        </div>

        <div className="expandable-section">
          <h2 onClick={() => toggleSection("address")}>Address Details</h2>
          {expandedSection === "address" && (
            <Address formData={formData} handleChange={handleChange} />
          )}
        </div>

        <div className="expandable-section">
          <h2 onClick={() => toggleSection("education")}>Education Details</h2>
          {expandedSection === "education" && (
            <Education formData={formData} handleChange={handleChange} />
          )}
        </div>

        <Submit handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default App;
