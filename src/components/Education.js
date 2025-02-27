import React, { useState, useEffect } from "react";

const Education = ({ formData, handleChange }) => {
  const [selectedBranch, setSelectedBranch] = useState(formData.branch || "");
  const [batchOptions, setBatchOptions] = useState([]);
  const [showCustomCourse, setShowCustomCourse] = useState(false);

  // Update batch options when branch changes
  useEffect(() => {
    if (selectedBranch === "Kankarbagh") {
      setBatchOptions([
        "Cage - K1",
        "Cage - K2",
        "Cage - K3",
        "Cage - K4",
        "Cage - K5",
        "Cage - K6",
        "Cage - K7",
      ]);
    } else if (selectedBranch === "Boring Road") {
      setBatchOptions(["Cage - B1", "Cage - B2", "Cage - B3"]);
    } else {
      setBatchOptions([]);
    }
  }, [selectedBranch]);

  // Handle branch change
  const handleBranchChange = (e) => {
    const { value } = e.target;
    setSelectedBranch(value);
    handleChange(e); // Update formData
  };

  // Handle course change to show "Other" input
  const handleCourseChange = (e) => {
    handleChange(e);
    setShowCustomCourse(e.target.value === "Other");
  };

  return (
    <div>
      {/* Course Dropdown */}
      <div className="form-group">
        <label htmlFor="course">Course:</label>
        <select
          id="course"
          name="course"
          value={formData.course || ""}
          onChange={handleCourseChange}
          required
        >
          <option value="">Select Course</option>
          {[
            "C++",
            "Java",
            "Python",
            "Data Structures",
            "Web Development",
            "App Development",
            "Machine Learning",
            "Other",
          ].map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Course Input (if "Other" is selected) */}
      {showCustomCourse && (
        <div className="form-group">
          <label htmlFor="customCourse">Enter Custom Course:</label>
          <input
            type="text"
            id="customCourse"
            name="customCourse"
            value={formData.customCourse || ""}
            onChange={handleChange}
            placeholder="Enter your custom course"
            required={showCustomCourse}
          />
        </div>
      )}

      {/* Degree Dropdown */}
      <div className="form-group">
        <label htmlFor="degree">Degree:</label>
        <select
          id="degree"
          name="degree"
          value={formData.degree || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Degree</option>
          {[
            "Class 1-5",
            "Class 6-10",
            "Matriculation",
            "Intermediate",
            "Diploma",
            "B.Tech",
            "B.E",
            "B.Sc CS",
            "BCA",
            "BBA-IT",
            "M.Tech",
            "M.Sc CS",
            "MCA",
            "MBA-IT",
            "Other",
          ].map((degree) => (
            <option key={degree} value={degree}>
              {degree}
            </option>
          ))}
        </select>
      </div>

      {/* Branch Selection */}
      <div className="form-group">
        <label>Branch:</label>
        <div className="inline-radio-group">
          <label>
            <input
              type="radio"
              name="branch"
              value="Kankarbagh"
              checked={formData.branch === "Kankarbagh"}
              onChange={handleBranchChange}
            />
            Kankarbagh
          </label>
          <label>
            <input
              type="radio"
              name="branch"
              value="Boring Road"
              checked={formData.branch === "Boring Road"}
              onChange={handleBranchChange}
            />
            Boring Road
          </label>
        </div>
      </div>

      {/* Batch Dropdown (Dynamic) */}
      <div className="form-group">
        <label htmlFor="batchId">Batch:</label>
        <select
          id="batchId"
          name="batchId"
          value={formData.batchId || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Batch</option>
          {batchOptions.map((batch, index) => (
            <option key={index} value={batch}>
              {batch}
            </option>
          ))}
        </select>
      </div>

      {/* Study Mode */}
      <div className="form-group">
        <label>Study Mode:</label>
        <div className="inline-radio-group">
          <label>
            <input
              type="radio"
              name="study_mode"
              value="Online"
              checked={formData.study_mode === "Online"}
              onChange={handleChange}
            />
            Online
          </label>
          <label>
            <input
              type="radio"
              name="study_mode"
              value="Offline"
              checked={formData.study_mode === "Offline"}
              onChange={handleChange}
            />
            Offline
          </label>
        </div>
      </div>

      {/* Admission Date */}
      <div className="form-group">
        <label htmlFor="admissionDate">Admission Date:</label>
        <input
          type="date"
          id="admissionDate"
          name="admissionDate"
          value={formData.admissionDate || ""}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default Education;
