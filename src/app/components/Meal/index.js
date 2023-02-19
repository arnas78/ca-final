import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuro } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const Meal = ({ meal, profile, isChosen, onClick, id }) => {
  return (
    <div
      className={
        isChosen === id
          ? "Container__single_meal Chosen"
          : "Container__single_meal"
      }
      onClick={onClick}
    >
      <div className="Container__meal_header">
        <img alt="profile" src={profile} className="Image__price"></img>
        <p>{meal.count}</p>
        <FontAwesomeIcon icon={faEuro} className="Icon__price" />
        <p>{meal.price}</p>
      </div>
      <div className="Container__meal_info">
        <p>{meal.desc}</p>
      </div>
    </div>
  );
};

export default Meal;
