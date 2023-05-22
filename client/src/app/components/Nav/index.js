import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faSignIn,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faSignOut, faHome } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import profile from "../images/photo-1.jpg";

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
            {/* <div>
              <Link
                className={location === "/admin" ? "Link Active" : "Link"}
                to="/admin"
              >
                <FontAwesomeIcon icon={faUserGear} className="Icon__link" />
              </Link>
              <p className="Link__name">Administratorius</p>
            </div> */}
            <div>
              <Link
                className={location === "/dashboard" ? "Link Active" : "Link"}
                to="/dashboard"
              >
                <FontAwesomeIcon icon={faHome} className="Icon__link" />
              </Link>
              <p
                className={
                  location === "/dashboard"
                    ? "Link__name Link__active"
                    : "Link__name"
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
                className={location === "/lectures" ? "Link Active" : "Link"}
                to="/lectures"
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
          <div>
            <Link
              className={location === "/profile" ? "Link Active" : "Link"}
              to="/profile"
            >
              <div className="Btn__profile">
                <img className="Img__profile" src={profile} alt="profile"></img>
              </div>
            </Link>
            <p className="Link__name">Mano profilis</p>
          </div>
          {/* <div>
            <Link
              className={location === "/login" ? "Link Active" : "Link"}
              to="/login"
            >
              <FontAwesomeIcon icon={faSignIn} className="Icon__link" />
            </Link>
            <p
              className={
                location === "/login" ? "Link__name Link__active" : "Link__name"
              }
            >
              Prisijungti
            </p>
          </div> */}
          <div>
            <div className="Btn__logout">
              <FontAwesomeIcon icon={faSignOut} className="Icon__link" />
            </div>
            <p className="Link__name Link__active">Atsijungti</p>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Nav;