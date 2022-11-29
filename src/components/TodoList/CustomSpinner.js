import React from "react";
import { Spinner } from "react-bootstrap";

export const CustomSpinner = () => {
  return (
    <div className="container">
      <div
        className="d-flex justify-content-center1 "
        style={{
          width: "100%",
          height: "100vh",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Spinner
          style={{
            width: "6rem",
            height: "6rem",
            margin: "0 auto",
            alignItems: "center",
          }}
          animation="border"
          variant="info"
          size="lg"
        />
      </div>
    </div>
  );
};
