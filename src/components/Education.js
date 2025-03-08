import React, { useState, useEffect } from "react";

const branchIdMap = {
  "Kankarbagh": "67b7023622eeac26b371bc7e",
  "Boring Road": "67b7038822eeac26b371bc7f",
};

const batchIdMap = {
  "Cage - K1": "67c52da5e05fe4125a7bef72",
  "Cage - K2": "67c52dc4e05fe4125a7bef73",
  "Cage - K3": "67c52dcae05fe4125a7bef74",
  "Cage - K4": "67c52e10e05fe4125a7bef75",
  "Cage - K6": "67c52e18e05fe4125a7bef76",
  "Cage - K7": "67c52e23e05fe4125a7bef77",
  "Cage - K8": "67c52e2ce05fe4125a7bef78",
  "Cage - K9": "67cc028e590bd8568dff09a0",
  "Cage - B1": "67c52e6ee05fe4125a7bef79",
  "Cage - B2": "67c52e77e05fe4125a7bef7a",
  "Cage - B3": "67c52f78e05fe4125a7bef7b",
};

const getBatchByBranch = (branch) => {
  return branch === "Kankarbagh"
    ? ["Cage - K1", "Cage - K2", "Cage - K3", "Cage - K4", "Cage - K6", "Cage - K7", "Cage - K8", "Cage - K9"]
    : branch === "Boring Road"
    ? ["Cage - B1", "Cage - B2", "Cage - B3"]
    : [];
};

const degreeOptions = [
  "Class 1-5", "Class 6-10", "Matriculation", "Intermediate", "Diploma",
  "B.Tech", "B.E", "B.Sc CS", "BA", "BCA", "BBA-IT", "B.Com", "M.Tech", "M.Sc CS", "MCA", "MBA-IT", "Other",
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
    console.log("Study mode: ",formData.studyMode)
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
