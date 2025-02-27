import React from 'react';

const Submit = ({ handleSubmit }) => {
  return (
    <div className="button-container">
      <button type="button" className="btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Submit;
