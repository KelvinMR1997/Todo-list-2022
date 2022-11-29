import React from "react";

export const Line = ({ width, height, backgroundColor }) => {
  return (
    <span
    className="my-2"
      style={{
        display: "block",
        width: width ?? "70px",
        height: height ?? "5px",
        margin: "1px auto",
        backgroundColor: backgroundColor ?? "gray",
        borderRadius: "50rem",
      }}
    ></span>
  );
};
