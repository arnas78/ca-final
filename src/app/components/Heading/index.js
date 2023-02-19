import React from "react";
import "./index.css";

const Heading = ({ title, description }) => {
  return (
    <div className="Container__header">
      <h1>{title}</h1>
      <h4>{description}</h4>
    </div>
  );
};
export default Heading;
