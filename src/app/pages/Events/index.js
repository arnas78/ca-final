import React, { useContext } from "react";
import Nav from "../../components/Nav";
import logo from "../../components/images/Vector.svg";
import event from "../../components/images/event.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
// import fakeApi from "../../data/data.json";
import "./index.css";

import ContentContext from "../../context/Content";

const Events = () => {
  // const events = fakeApi.events;

  // const { appliedEvents, applyEvent } = useContext(ContentContext);

  return (
    <div className="Section__events">
      <Nav image={logo} />
      <div className="Container__events">
        <div className="Header__events">
          <div>
            <h1>Aplikuokite į renginius, konferencijas!</h1>
            <div className="Container__events_header">
              <h4>
                Artimiausi įvykiai &nbsp;{" "}
                <FontAwesomeIcon icon={faArrowRight} />
              </h4>
              <div className="Container__search_events">
                <FontAwesomeIcon icon={faSearch} className="Icon__search" />
                <input type="text" placeholder="Ieškokite tarp įvykių..." />
              </div>
            </div>
          </div>
        </div>
        <div className="Container__events_upcoming">
          <div className="Container__event_upcoming_single">
            <div>
              <div className="Event__upcoming_date">
                <h4>20</h4>
                <p>NOV</p>
              </div>
              <div>
                <h3>All American Reject EU Tour</h3>
              </div>
            </div>
            <div className="Event__upcoming_place">
              <p>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="Icon__location"
                />{" "}
                Lanxess Arena, Cologne
              </p>
            </div>
          </div>
          <div className="Container__event_upcoming_single">
            <div>
              <div className="Event__upcoming_date">
                <h4>20</h4>
                <p>NOV</p>
              </div>
              <div>
                <h3>All American Reject EU Tour</h3>
              </div>
            </div>
            <div className="Event__upcoming_place">
              <p>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="Icon__location"
                />{" "}
                Lanxess Arena, Cologne
              </p>
            </div>
          </div>
          <div className="Container__event_upcoming_single">
            <div>
              <div className="Event__upcoming_date">
                <h4>20</h4>
                <p>NOV</p>
              </div>
              <div>
                <h3>All American Reject EU Tour</h3>
              </div>
            </div>
            <div className="Event__upcoming_place">
              <p>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="Icon__location"
                />{" "}
                Lanxess Arena, Cologne
              </p>
            </div>
          </div>
          <div className="Container__event_upcoming_single">
            <div>
              <div className="Event__upcoming_date">
                <h4>20</h4>
                <p>NOV</p>
              </div>
              <div>
                <h3>All American Reject EU Tour</h3>
              </div>
            </div>
            <div className="Event__upcoming_place">
              <p>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="Icon__location"
                />{" "}
                Lanxess Arena, Cologne
              </p>
            </div>
          </div>
        </div>
        <div className="Container__event_events">
          <div className="Container__image_event">
            <img src={event} alt="event" className="Image__event"></img>
            <div className="Container__event_highlight">
              <h1>DevOps Enterprise Summit</h1>
              <div>
                <h3>
                  <FontAwesomeIcon icon={faClock} className="Icon__location" />{" "}
                  21 LAP 2024, 8:00
                </h3>
              </div>
            </div>
          </div>
          {/* <div className="Container__tickets">
            <div className="Container__event_single"></div>
          </div> */}
        </div>

        {/* <div className="Container__event_posts">
          <div className="Container__event_single">
            <div className="Container__event_image"></div>
          </div>

          <div className="Container__event_single"></div>
          <div className="Container__event_single"></div>

          <div className="Container__event_single"></div>
        </div> */}
      </div>
    </div>
  );
};

export default Events;
