import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuro } from "@fortawesome/free-solid-svg-icons";

const Meal = ({
  count,
  price,
  description,
  profile,
  isChosen,
  onClick,
  id,
}) => {
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
        <img alt="profil    e" src={profile} className="Image__price"></img>
        <p>{count}</p>
        <FontAwesomeIcon icon={faEuro} className="Icon__price" />
        <p>{price}</p>
      </div>
      <div className="Container__meal_info">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Meal;
