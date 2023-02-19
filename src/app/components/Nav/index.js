import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

function Nav({ image }) {
  // const [number, setNumber] = useState("");

  const location = useLocation().pathname;

  return (
    <header className="Header">
      <nav>
        <div className="Nav__header">
          <img className="Image__logo" src={image} alt="profile"></img>
        </div>
        <ul className="Nav__list">
          <Link className={location === "/" ? "Link Active" : "Link"} to="/">
            <FontAwesomeIcon icon={faBriefcase} className="Icon__link" />
            Pagrindinis
          </Link>
          <Link
            className={location === "/lunch" ? "Link Active" : "Link"}
            to="/lunch"
          >
            <FontAwesomeIcon icon={faUtensils} className="Icon__link" />
            Pietūs
          </Link>
          <Link
            className={location === "/learning" ? "Link Active" : "Link"}
            to="/learning"
          >
            <FontAwesomeIcon icon={faBook} className="Icon__link" />
            Apmokymai
          </Link>
          <Link
            className={location === "/events" ? "Link Active" : "Link"}
            to="/events"
          >
            <FontAwesomeIcon icon={faCalendarDays} className="Icon__link" />
            Renginiai
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
