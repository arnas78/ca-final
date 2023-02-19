import React from "react";
import "./index.css";

const Input = ({ label, placeholder, value }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" placeholder={placeholder} defaultValue={value}></input>
    </div>
  );
};
export default Input;
