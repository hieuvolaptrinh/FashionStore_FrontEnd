import React from "react";
import { Spinner as BootstrapSpinner } from "react-bootstrap";

const Spinner: React.FC = () => {
  return (
    <div
      id="spinner"
      className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
    >
      <BootstrapSpinner
        animation="border"
        variant="primary"
        style={{ width: "3rem", height: "3rem" }}
      />
    </div>
  );
};

export default Spinner;
