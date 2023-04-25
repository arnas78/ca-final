import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

function Nav({ image }) {
  // const [number, setNumber] = useState("");

  const location = useLocation().pathname;

  return (
    <header className="Header">
      <nav>
        <div>
          <div className="Nav__header">
            <img className="Image__logo" src={image} alt="profile"></img>
          </div>
          <ul className="Nav__list">
            <div>
              <Link
                className={location === "/" ? "Link Active" : "Link"}
                to="/"
              >
                <FontAwesomeIcon icon={faBriefcase} className="Icon__link" />
              </Link>
              <p
                className={
                  location === "/" ? "Link__name Link__active" : "Link__name"
                }
              >
                Pagrindinis
              </p>
            </div>

            <div>
              <Link
                className={location === "/lunch" ? "Link Active" : "Link"}
                to="/lunch"
              >
                <FontAwesomeIcon icon={faUtensils} className="Icon__link" />
              </Link>
              <p
                className={
                  location === "/lunch"
                    ? "Link__name Link__active"
                    : "Link__name"
                }
              >
                Pietūs
              </p>
            </div>

            <div>
              <Link
                className={location === "/learning" ? "Link Active" : "Link"}
                to="/learning"
              >
                <FontAwesomeIcon icon={faBook} className="Icon__link" />
              </Link>
              <p
                className={
                  location === "/learning"
                    ? "Link__name Link__active"
                    : "Link__name"
                }
              >
                Mokymai
              </p>
            </div>

            <div>
              <Link
                className={location === "/events" ? "Link Active" : "Link"}
                to="/events"
              >
                <FontAwesomeIcon icon={faCalendarDays} className="Icon__link" />
              </Link>
              <p
                className={
                  location === "/events"
                    ? "Link__name Link__active"
                    : "Link__name"
                }
              >
                Renginiai
              </p>
            </div>

            <div>
              <Link
                className={location === "/posts" ? "Link Active" : "Link"}
                to="/posts"
              >
                <FontAwesomeIcon
                  icon={faEnvelopeOpenText}
                  className="Icon__link"
                />
              </Link>
              <p
                className={
                  location === "/posts"
                    ? "Link__name Link__active"
                    : "Link__name"
                }
              >
                Darbo skelbimai
              </p>
            </div>
          </ul>
        </div>

        <div>
          <div className="Btn__logout">
            <FontAwesomeIcon icon={faSignOut} className="Icon__link" />
          </div>
          <p className="Link__name Link__active">Atsijungti</p>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
