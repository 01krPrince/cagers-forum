import React, { useState, useEffect } from "react";

const Education = ({ formData, handleChange }) => {
  const [selectedBranch, setSelectedBranch] = useState(formData.branch || "");
  const [batchOptions, setBatchOptions] = useState([]);

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

  // Handle degree change
  const handleDegreeChange = (e) => {
    handleChange(e); // Update formData
  };

  return (
    <div>
      {/* Degree Dropdown */}
      <div className="form-group">
        <label htmlFor="degree">Degree:</label>
        <select
          id="degree"
          name="degree"
          value={formData.degree || ""}
          onChange={handleDegreeChange} // Use the new handler
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
              checked={selectedBranch === "Kankarbagh"}
              onChange={handleBranchChange}
            />
            Kankarbagh
          </label>
          <label>
            <input
              type="radio"
              name="branch"
              value="Boring Road"
              checked={selectedBranch === "Boring Road"}
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