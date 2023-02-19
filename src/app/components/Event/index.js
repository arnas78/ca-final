import React from "react";
import "./index.css";

const Event = ({ idx, image, isApplied, eventObj, onClick }) => {
  return (
    <div
      className={
        isApplied.includes(idx) ? "Event__single Applied" : "Event__single"
      }
    >
      <div className="Container__image_event">
        <img className="Event__container_image" src={image} alt="img"></img>
      </div>
      <div className="Event__content">
        <h3>{eventObj.name}</h3>
        <h5>
          {eventObj.date}, {eventObj.place}
        </h5>
        <h4>{eventObj.description}</h4>
      </div>
      <div
        className={
          isApplied.includes(idx)
            ? "Event__container_button Green"
            : "Event__container_button"
        }
        onClick={isApplied.includes(idx) ? null : onClick}
      >
        <p className="Event__apply">
          A<br />P<br />L<br />I<br />K<br />U<br />O<br />T<br />I
        </p>
      </div>
    </div>
  );
};
export default Event;
