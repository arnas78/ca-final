import React from "react";
import "./index.css";

function Training({ image, idx, training, appliedTrainings, onClick }) {
  return (
    <div
      className="Training__single"
      id={appliedTrainings.includes(idx) ? "Training__active" : ""}
      onClick={appliedTrainings.includes(idx) ? null : onClick}
    >
      <p>{training.name}</p>
      <div className="Container__presenter">
        <img className="Image__learning" src={image} alt="img"></img>
        <p>{training.lecturer}</p>
      </div>
      <p>{training.status}</p>
      <p>{training.startDate}</p>
      <p>{training.endDate}</p>
      <p className="Training__desc">{training.description}</p>
    </div>
  );
}

export default Training;
