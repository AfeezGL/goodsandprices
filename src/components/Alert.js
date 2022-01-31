import React from "react";

const Alert = ({ alert, clearAlert }) => {
  return (
    <div
      className={`alert alert-${alert.type} alert-dismissible fade show`}
      role="alert"
    >
      {alert.message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={clearAlert}
      ></button>
    </div>
  );
};

export default Alert;
