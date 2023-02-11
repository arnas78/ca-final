import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

function Header({ image }) {
  return (
    <header className="Header">
      <nav>
        <div className="Nav__header">
          <img className="Image__profile" src={image} alt="profile"></img>
        </div>
        <h4 className="Heading__menu">Meniu</h4>
        <ul className="Nav__list">
          <li className="Active">
            <FontAwesomeIcon icon={faBriefcase} />
            Pagrindinis
          </li>
          <li className="Inactive">
            <FontAwesomeIcon icon={faUtensils} />
            Pietūs
          </li>
          <li className="Inactive">
            <FontAwesomeIcon icon={faBook} />
            Apmokymai
          </li>
          <li className="Inactive">
            <FontAwesomeIcon icon={faCalendarDays} />
            Renginiai
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
