import React, { useState, useEffect } from "react";

const branchIdMap = {
  Kankarbagh: "67b7023622eeac26b371bc7e",
  "Boring Road": "67b7038822eeac26b371bc7f",
};

const batchIdMap = {
  "Cage - K1": "67b7042e22eeac26b371bc80",
  "Cage - K2": "67b7042e22eeac26b371bc81",
  "Cage - K3": "67b7042e22eeac26b371bc82",
  "Cage - K4": "67b7042e22eeac26b371bc83",
  "Cage - K5": "67b7042e22eeac26b371bc84",
  "Cage - K6": "67b7042e22eeac26b371bc85",
  "Cage - K7": "67b7042e22eeac26b371bc86",
  "Cage - B1": "67b7042e22eeac26b371bc91",
  "Cage - B2": "67b7042e22eeac26b371bc92",
  "Cage - B3": "67b7042e22eeac26b371bc83",
};

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
    const branchId = branchIdMap[value] || "";
    handleChange({ target: { name: "branchId", value: branchId } });
  };

  // Handle batch change
  const handleBatchChange = (e) => {
    const { value } = e.target;
    const batchId = batchIdMap[value] || "";
    handleChange({ target: { name: "batchId", value: batchId } });
  };

  // Handle degree change
  const handleDegreeChange = (e) => {
    handleChange(e);
  };

  // Handle study mode (true for online, false for offline)
  const handleStudyModeChange = (e) => {
    const isOnline = e.target.value === "Online";
    handleChange({ target: { name: "studyMode", value: isOnline } });
  };

  // Handle admission date
  const handleAdmissionDateChange = (e) => {
    handleChange(e);
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
          onChange={handleDegreeChange}
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
          {["Kankarbagh", "Boring Road"].map((branch) => (
            <label key={branch}>
              <input
                type="radio"
                name="branch"
                value={branch}
                checked={selectedBranch === branch}
                onChange={handleBranchChange}
              />
              {branch}
            </label>
          ))}
        </div>
      </div>

      {/* Batch Dropdown (Dynamic) */}
      <div className="form-group">
        <label htmlFor="batchId">Batch:</label>
        <select
          id="batchId"
          name="batchId"
          value={formData.batchId || ""}
          onChange={handleBatchChange}
          required
        >
          <option value="">Select Batch</option>
          {batchOptions.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>
      </div>

      {/* Study Mode */}
      <div className="form-group">
        <label>Study Mode:</label>
        <div className="inline-radio-group">
          {["Online", "Offline"].map((mode) => (
            <label key={mode}>
              <input
                type="radio"
                name="studyMode"
                value={mode}
                checked={
                  formData.studyMode === (mode === "Online" ? true : false)
                }
                onChange={handleStudyModeChange}
              />
              {mode}
            </label>
          ))}
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
          onChange={handleAdmissionDateChange}
          required
        />
      </div>

      {/* Error Handling */}
      {formData.error && (
        <div className="error-message">
          <p>Error: {formData.error}</p>
        </div>
      )}
    </div>
  );
};

export default Education;
