import React from 'react';

const Submit = ({ handleSubmit, isSubmitting }) => {
  return (
    <div className="button-container">
      <button type="button" className="btn" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Wait..." : "Submit"}
      </button>
    </div>
  );
};

export default Submit;
