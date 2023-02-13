import React from "react";
import "./index.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';

function Header({ image }) {
  // const [number, setNumber] = useState("");

  const location = useLocation().pathname;
  
  return (
    <header className="Header">
      <nav>
        <div className="Nav__header">
          <img className="Image__logo" src={image} alt="profile"></img>
        </div>
        <ul className="Nav__list">
          <Link className={location === "/" ? "Active" : "Inactive"} to="/">
            <FontAwesomeIcon icon={faBriefcase} className="Icon__link"/>
            Pagrindinis
          </Link>
          <Link className={location === "/lunch" ? "Active" : "Inactive"} to="/lunch">
            <FontAwesomeIcon icon={faUtensils} className="Icon__link"/>
            Pietūs
          </Link>
          <Link className={location === "/learning" ? "Active" : "Inactive"} to="/learning">
            <FontAwesomeIcon icon={faBook} className="Icon__link"/>
            Apmokymai
          </Link>
          <Link className={location === "/events" ? "Active" : "Inactive"} to="/events">
            <FontAwesomeIcon icon={faCalendarDays} className="Icon__link"/>
            Renginiai
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
