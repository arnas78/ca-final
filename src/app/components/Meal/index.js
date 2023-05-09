import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuro } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const Meal = ({ meal, profile, isChosen, image, onClick, id, dashboard }) => {
  if (!dashboard) {
    return (
      <div
        className={
          isChosen === id
            ? "Container__single_meal Chosen"
            : "Container__single_meal"
        }
        onClick={onClick}
      >
        <div className="Container__meal_info">
          <div className="Container__meal_header">
            <h4>{meal.name}</h4>
            <p>{meal.desc}</p>
          </div>
          <div>
            <div className="Container__tags">
              <p className="Tag Vegan">Vegan</p>
              <p className="Tag Spicy">Aštru</p>
            </div>
            <div className="Container__details">
              <div className="Container__price">
                <FontAwesomeIcon icon={faEuro} className="Icon__price" />
                <p>{meal.price}</p>
              </div>
              <div className="Container__count">
                <h4>{meal.count}</h4>
                <img alt="profile" src={profile} className="Image__price"></img>
              </div>
            </div>
          </div>
        </div>
        <div className="Container__meal_image">
          <div className="Container__popular Visible">
            <p className="Tag">Populiaru</p>
          </div>
          <img src={image} className="Image__meal" alt="asd"></img>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Container__single_meal_dashboard">
        <div className="Container__meal_info">
          <div className="Container__meal_header">
            <h4>{meal.name}</h4>
            <div className="Container__meal_image_dashboard">
              <img src={image} className="Image__meal" alt="asd"></img>
            </div>
          </div>
          <div className="Container__tags_dashboard">
            <p className="Tag Vegan__dashboard">Vegan</p>
            <p className="Tag Spicy__dashboard">Aštru</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Meal;
