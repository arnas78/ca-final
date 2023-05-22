import React from "react";
import "./index.css";

const Popup = ({ trainingObj, image, onClick }) => {
  const getStatusClass = () => {
    let statusClass = "";
    if (trainingObj.status === "Būsimas") {
      statusClass = "Yellow";
    } else if (trainingObj.status === "Vyksta") {
      statusClass = "Green";
    } else if (trainingObj.status === "Baigėsi") {
      statusClass = "Red";
    }
    return statusClass;
  };

  const getButtonClass = () => {
    let buttonClass = "";
    if (trainingObj.status === "Vyksta" || trainingObj.status === "Baigėsi") {
      buttonClass = "Apply__disabled";
    }
    return buttonClass;
  };

  return (
    <div
      className={
        trainingObj.name ? "Container__popup" : "Container__popup Invisible"
      }
    >
      <div className="Popup__heading">
        <div>
          <h1>{trainingObj.name}</h1>
          <div className="Container__presenter_popup">
            <img className="Image__popup" src={image} alt="img"></img>
            <h4>{trainingObj.lecturer}</h4>
          </div>
        </div>
        <div className="Container__status">
          <h3 className={getStatusClass()}>{trainingObj.status}</h3>
        </div>
      </div>
      <div className="Popup__date">
        <p>{trainingObj.startDate}</p>
        <p>-</p>
        <p>{trainingObj.endDate}</p>
      </div>
      <div className="Popup__place">
        <p>Vieta: TEAMS Meeting</p>
        <p>Laikas: Pirmadieniais, 14:00</p>
      </div>
      <div className="Popup__content">
        <h4>{trainingObj.description}</h4>
        <button
          className={getButtonClass()}
          onClick={trainingObj.status === "Būsimas" ? onClick : null}
        >
          APLIKUOTI
        </button>
      </div>
    </div>
  );
};

export default Popup;
