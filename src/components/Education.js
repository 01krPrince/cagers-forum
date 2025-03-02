import React, { useState, useEffect } from "react";

const branchIdMap = {
  "Kankarbagh": "67b7023622eeac26b371bc7e",
  "Boring Road": "67b7038822eeac26b371bc7f",
};

const batchIdMap = {
  "Cage - K1": "67b7042e22eeac26b371bc80",
  "Cage - K2": "67b7042e22eeac26b371bc81",
  "Cage - K3": "67b7042e22eeac26b371bc82",
  "Cage - K4": "67b7047122eeac26b371bc81",
  "Cage - K5": "67b7049d22eeac26b371bc82",
  "Cage - K6": "67b7042e22eeac26b371bc85",
  "Cage - K7": "67b7074122eeac26b371bc83",
  "Cage - B1": "67b7042e22eeac26b371bc91",
  "Cage - B2": "67b7042e22eeac26b371bc92",
  "Cage - B3": "67b7042e22eeac26b371bc93",
};

const getBatchByBranch = (branch) => {
  return branch === "Kankarbagh"
    ? ["Cage - K1", "Cage - K2", "Cage - K3", "Cage - K4", "Cage - K5", "Cage - K6", "Cage - K7"]
    : branch === "Boring Road"
    ? ["Cage - B1", "Cage - B2", "Cage - B3"]
    : [];
};

const degreeOptions = [
  "Class 1-5", "Class 6-10", "Matriculation", "Intermediate", "Diploma",
  "B.Tech", "B.E", "B.Sc CS", "BCA", "BBA-IT", "M.Tech", "M.Sc CS", "MCA", "MBA-IT", "Other",
];

const Education = ({ formData, handleChange }) => {
  const [selectedBranch, setSelectedBranch] = useState(
    Object.keys(branchIdMap).find((branch) => branchIdMap[branch] === formData.branchId) || ""
  );

  const [batchOptions, setBatchOptions] = useState([]);

  useEffect(() => {
    const updatedBatches = getBatchByBranch(selectedBranch);
    setBatchOptions(updatedBatches);

    if (formData.batchId) {
      const currentBatch = Object.keys(batchIdMap).find(
        (batch) => batchIdMap[batch] === formData.batchId
      );

      if (currentBatch && !updatedBatches.includes(currentBatch)) {
        setBatchOptions((prev) => [...prev, currentBatch]);
      }
    }
  }, [selectedBranch, formData.batchId]);

  const handleBranchChange = (e) => {
    const branch = e.target.value;
    setSelectedBranch(branch);
    handleChange({ target: { name: "branchId", value: branchIdMap[branch] || "" } });
  };

  const handleBatchChange = (e) => {
    const batch = e.target.value;
    handleChange({ target: { name: "batchId", value: batchIdMap[batch] || "" } });
  };

  const handleStudyModeChange = (e) => {
    const isOnline = e.target.value === "Online";
    handleChange({ target: { name: "studyMode", value: isOnline } });
  };

  return (
    <div>
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
          {degreeOptions.map((degree) => (
            <option key={degree} value={degree}>
              {degree}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Branch:</label>
        <div className="inline-radio-group">
          {Object.keys(branchIdMap).map((branch) => (
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

      <div className="form-group">
        <label htmlFor="batchId">Batch:</label>
        <select
          id="batchId"
          name="batchId"
          value={Object.keys(batchIdMap).find(
            (batch) => batchIdMap[batch] === formData.batchId
          ) || ""}
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

      <div className="form-group">
        <label>Study Mode:</label>
        <div className="inline-radio-group">
          {['Online', 'Offline'].map((mode) => (
            <label key={mode}>
              <input
                type="radio"
                name="studyMode"
                value={mode}
                checked={formData.studyMode === (mode === 'Online')}
                onChange={handleStudyModeChange}
              />
              {mode}
            </label>
          ))}
        </div>
      </div>

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