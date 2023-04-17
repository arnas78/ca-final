import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuro } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const Meal = ({ meal, profile, isChosen, image, onClick, id }) => {
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
            <p className="Tag">Populiaru</p>
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
        <img src={image} className="Image__meal"></img>
      </div>
      {/* <div className="Container__meal_info">
        <p>{meal.desc}</p>
      </div> */}
    </div>
  );
};

export default Meal;
