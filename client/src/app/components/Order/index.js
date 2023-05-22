import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCalendar,
  faCalendarDays,
  faClock,
  faEuro,
  faLocationDot,
  faSpoon,
  faThumbsUp,
  faUser,
  faUtensils,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Order = ({ obj, order, type, currentDays }) => {
  const diffDays = (a, b) => {
    const oneDay = 24 * 60 * 60 * 1000;
    let allDayscount = Math.round(Math.abs((b - a) / oneDay));
    var copiedDate = new Date(b.getTime());

    for (let i = allDayscount; i > 0; i--) {
      if (copiedDate.getDay() === 0 || copiedDate.getDay() === 6) {
        allDayscount--;
      }
      copiedDate.setDate(copiedDate.getDate() - 1);
    }
    return allDayscount;
  };

  function handleClick() {
    if (type === "vacation") {
      fetch(`http://localhost:5000/api/vacations/` + obj._id, {
        method: "DELETE",
      });

      const addDays =
        currentDays +
        diffDays(new Date(obj.end_date), new Date(obj.start_date)) +
        1;

      fetch(
        `http://localhost:5000/api/user/extra/` + "646a4910cc114a5a37df1014",
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            vacation_days: addDays,
          }), // body data type must match "Content-Type" header
        }
      );

      alert(`Jūs sėkmingai panaikinote atostogas!`);

      window.location.reload(false);
    } else if (type === "refer") {
      fetch(`http://localhost:5000/api/refers/` + obj._id, {
        method: "DELETE",
      });

      alert(`Jūs sėkmingai panaikinote darbo aplikaciją!`);

      window.location.reload(false);
    } else {
      fetch(`http://localhost:5000/api/orders/` + order._id, {
        method: "DELETE",
      });

      alert(`Jūs sėkmingai panaikinote užsakymą!`);

      window.location.reload(false);
    }
    // Send data to the backend via POST
  }

  if (type === "lunch") {
    return (
      <div className="Container__profile_activities_events_single Status__approved">
        <img
          src={obj.image}
          className="Image__profile_event"
          alt="conference"
        ></img>
        <div className="Event__profile_single">
          <div>
            <div>
              <FontAwesomeIcon icon={faUtensils} />
              <h4>{obj.title}</h4>
            </div>
            <div>
              <FontAwesomeIcon icon={faEuro} />
              <h4>{obj.price}</h4>
            </div>
            <div>
              <FontAwesomeIcon icon={faSpoon} />
              <h4>{obj.type.toUpperCase()}</h4>
            </div>
          </div>
        </div>

        <div className="Lecture__profile_remove" onClick={handleClick}>
          <FontAwesomeIcon icon={faXmark} id="Remove" />
        </div>
      </div>
    );
  } else if (type === "refer") {
    return (
      <div className="Container__profile_activities_post_single Status__waiting">
        <div className="Post__profile_header">
          <FontAwesomeIcon icon={faUser} />
          <h4>{obj.name + " " + obj.surname}</h4>
        </div>
        <div>
          <h4 className="Heading__profile_position">{obj.title}</h4>
        </div>

        <div className="Post__profile_status">
          <div>
            <FontAwesomeIcon icon={faThumbsUp} />
            <h4>STATUSAS</h4>
          </div>
          <h4 id="yellow">Peržiūrimas</h4>
        </div>
        <div className="Lecture__profile_remove" onClick={handleClick}>
          <FontAwesomeIcon icon={faXmark} id="Remove" />
        </div>
      </div>
    );
  } else if (type === "events") {
    return (
      <div className="Container__profile_activities_events_single Status__waiting">
        <img
          src={obj.image}
          className="Image__profile_event"
          alt="conference"
        ></img>
        <div className="Event__profile_single">
          <div>
            <div>
              <FontAwesomeIcon icon={faCalendarDays} />
              <h4>{obj.title}</h4>
            </div>
            <div>
              <FontAwesomeIcon icon={faLocationDot} />
              <h4>{obj.place}</h4>
            </div>
            <div>
              <FontAwesomeIcon icon={faClock} />
              <h4>{obj.date}</h4>
            </div>
          </div>
        </div>
        <div className="Event__profile_status">
          <div>
            <FontAwesomeIcon icon={faThumbsUp} />
            <h4>STATUSAS</h4>
          </div>
          <h4 id="yellow">Peržiūrimas</h4>
        </div>
        <div className="Lecture__profile_remove" onClick={handleClick}>
          <FontAwesomeIcon icon={faXmark} id="Remove" />
        </div>
      </div>
    );
  } else if (type === "lectures") {
    return (
      <div className="Container__profile_activities_lectures_single Status__approved">
        <h4 id="Learning__name">{obj.title}</h4>
        <h4 id="Learning__place">{obj.place}</h4>
        <h4 id="Learning__start">{obj.start}</h4>
        <h4 id="Learning__end">{obj.end}</h4>
        <div className="Lecture__profile_remove" onClick={handleClick}>
          <FontAwesomeIcon icon={faXmark} id="Remove" />
        </div>
      </div>
    );
  } else if (type === "vacation") {
    return (
      <div className="Container__vacation_reservation_single">
        <div>
          <FontAwesomeIcon icon={faCalendar} />
          <p>{obj.start_date + " - " + obj.end_date}</p>
        </div>
        <FontAwesomeIcon icon={faXmark} id="Remove" onClick={handleClick} />
      </div>
    );
  }
};

export default Order;
