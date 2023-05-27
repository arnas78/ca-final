import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuro } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const Meal = ({ meal, profile, isChosen, onClick, dashboard, vegan }) => {
  if (!vegan) {
    if (!dashboard) {
      return (
        <div
          className={
            isChosen === meal
              ? "Container__single_meal Chosen"
              : "Container__single_meal"
          }
          onClick={onClick}
        >
          <div className="Container__meal_info">
            <div className="Container__meal_header">
              <h4>{meal.title}</h4>
              <p>{meal.desc}</p>
            </div>
            <div>
              <div className="Container__tags">
                <p
                  className={
                    meal.isVegan ? "Tag Vegan" : "Tag Vegan Tag__invisible"
                  }
                >
                  Vegan
                </p>
              </div>
              <div className="Container__details">
                <div className="Container__price">
                  <FontAwesomeIcon icon={faEuro} className="Icon__price" />
                  <p>{meal.price}</p>
                </div>
                <div className="Container__count">
                  <h4>{meal.count}</h4>
                  <img
                    alt="profile"
                    src={profile}
                    className="Image__price"
                  ></img>
                </div>
              </div>
            </div>
          </div>
          <div className="Container__meal_image">
            <div
              className={
                meal.isPopular
                  ? "Container__popular Visible"
                  : "Container__popular"
              }
            >
              <p className="Tag">Populiaru</p>
            </div>
            <img src={meal.image} className="Image__meal" alt="asd"></img>
          </div>
        </div>
      );
    } else if (vegan && meal.isVegan) {
      if (!dashboard) {
        return (
          <div
            className={
              isChosen === meal
                ? "Container__single_meal Chosen"
                : "Container__single_meal"
            }
            onClick={onClick}
          >
            <div className="Container__meal_info">
              <div className="Container__meal_header">
                <h4>{meal.title}</h4>
                <p>{meal.desc}</p>
              </div>
              <div>
                <div className="Container__tags">
                  <p
                    className={
                      meal.isVegan ? "Tag Vegan" : "Tag Vegan Tag__invisible"
                    }
                  >
                    Vegan
                  </p>
                </div>
                <div className="Container__details">
                  <div className="Container__price">
                    <FontAwesomeIcon icon={faEuro} className="Icon__price" />
                    <p>{meal.price}</p>
                  </div>
                  <div className="Container__count">
                    <h4>{meal.count}</h4>
                    <img
                      alt="profile"
                      src={profile}
                      className="Image__price"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="Container__meal_image">
              <div
                className={
                  meal.isPopular
                    ? "Container__popular Visible"
                    : "Container__popular"
                }
              >
                <p className="Tag">Populiaru</p>
              </div>
              <img src={meal.image} className="Image__meal" alt="asd"></img>
            </div>
          </div>
        );
      }
    } else if (dashboard) {
      return (
        <div className="Container__single_meal_dashboard">
          <div>
            <div className="Container__meal_header">
              <h4>{meal.name}</h4>
              <div className="Container__meal_image_dashboard">
                <img src={meal.image} className="Image__meal" alt="asd"></img>
              </div>
            </div>
            <div className="Container__tags_dashboard">
              <p className="Tag Vegan__dashboard">Vegan</p>
            </div>
          </div>
          <div className="Container__single_meal_dashboard_price">
            <FontAwesomeIcon icon={faEuro} className="Icon__price" />
            <p>{meal.price}</p>
          </div>
        </div>
      );
    }
  } else if (vegan && meal.isVegan) {
    if (!dashboard) {
      return (
        <div
          className={
            isChosen === meal
              ? "Container__single_meal Chosen"
              : "Container__single_meal"
          }
          onClick={onClick}
        >
          <div className="Container__meal_info">
            <div className="Container__meal_header">
              <h4>{meal.title}</h4>
              <p>{meal.desc}</p>
            </div>
            <div>
              <div className="Container__tags">
                <p
                  className={
                    meal.isVegan ? "Tag Vegan" : "Tag Vegan Tag__invisible"
                  }
                >
                  Vegan
                </p>
              </div>
              <div className="Container__details">
                <div className="Container__price">
                  <FontAwesomeIcon icon={faEuro} className="Icon__price" />
                  <p>{meal.price}</p>
                </div>
                <div className="Container__count">
                  <h4>{meal.count}</h4>
                  <img
                    alt="profile"
                    src={profile}
                    className="Image__price"
                  ></img>
                </div>
              </div>
            </div>
          </div>
          <div className="Container__meal_image">
            <div
              className={
                meal.isPopular
                  ? "Container__popular Visible"
                  : "Container__popular"
              }
            >
              <p className="Tag">Populiaru</p>
            </div>
            <img src={meal.image} className="Image__meal" alt="asd"></img>
          </div>
        </div>
      );
    } else if (dashboard && vegan && meal.isVegan) {
      return (
        <div className="Container__single_meal_dashboard">
          <div>
            <div className="Container__meal_header">
              <h4>{meal.title}</h4>
              <div className="Container__meal_image_dashboard">
                <img src={meal.image} className="Image__meal" alt="asd"></img>
              </div>
            </div>
            <div className="Container__tags_dashboard">
              <p className="Tag Vegan__dashboard">Vegan</p>
            </div>
          </div>
          <div className="Container__single_meal_dashboard_price">
            <FontAwesomeIcon icon={faEuro} className="Icon__price" />
            <p>{meal.price}</p>
          </div>
        </div>
      );
    }
  }
};

export default Meal;
