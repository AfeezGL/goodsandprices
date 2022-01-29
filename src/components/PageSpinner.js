import React from "react";
import Spinner from "./Spinner";

const PageSpinner = () => {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Spinner />
    </div>
  );
};

export default PageSpinner;
