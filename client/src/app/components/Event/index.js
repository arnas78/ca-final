import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const Event = ({ event, isRecent, image, onClick }) => {
  if (!isRecent) {
    return (
      <div className="Container__event_single">
        <div className="Container__event_image">
          <img src={image} alt="event" className="Image__event_single"></img>
          <div className="Event__single_location">
            <p>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="Icon__location"
              />
              {event.place}
            </p>
          </div>
        </div>
        <div className="Container__event_details">
          <h3>{event.title}</h3>
          <div>
            <p>
              <FontAwesomeIcon icon={faClock} className="Icon__location" />
              {event.date}
            </p>
          </div>
          <div className="Container__event_single_tags">
            {event.tags
              ? event.tags.map((tag, i) => {
                  return (
                    <div className="Container__event_single_tag">
                      <p>{tag}</p>
                    </div>
                  );
                })
              : ""}
          </div>
          <div>
            <button className="Btn__apply Btn__event_single" onClick={onClick}>
              Sužinoti daugiau <FontAwesomeIcon icon={faArrowRight} />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    let date = event.date.split(" ");
    return (
      <div className="Container__event_upcoming_single" onClick={onClick}>
        <div>
          <div className="Event__upcoming_date">
            <h4>{date[0]}</h4>
            <p>{date[1]}</p>
          </div>
          <div>
            <h3>{event.title}</h3>
          </div>
        </div>
        <div className="Event__upcoming_place">
          <p>
            <FontAwesomeIcon icon={faLocationDot} className="Icon__location" />{" "}
            {event.place}
          </p>
        </div>
      </div>
    );
  }
};

export default Event;
