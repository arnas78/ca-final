import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Lecture = ({ lecture, isChosen, image, onClick, id, dashboard }) => {
  const isActive = () => {
    if (new Date() - new Date(lecture.start) > 0) {
      return true;
    } else return false;
  };

  const isEnded = () => {
    if (new Date(lecture.end) - new Date() < 0) {
      return true;
    } else return false;
  };

  const setClass = (isDashboard) => {
    let classname = "";
    if (!isDashboard) {
      classname = "Container__learning_single";
      if (isActive() && !isEnded()) {
        classname = classname + " Lecture__active";
      } else if (isEnded()) {
        classname = classname + " Lecture__ended";
      }
    } else {
      classname = "Container__dashboard_lecture_single";
      console.log(isActive());
      if (isActive()) {
        classname = classname + " Lecture__active_dashboard";
      }
    }

    return classname;
  };

  if (!dashboard) {
    return (
      <div className={setClass(false)} onClick={onClick}>
        <h4 id="Learning__name">{lecture.title}</h4>
        <h4 id="Learning__place">{lecture.place}</h4>
        <h4 id="Learning__start">{lecture.start}</h4>
        <h4 id="Learning__end">{lecture.end}</h4>
        <div className="Container__learning_attendees">
          <div class="avatars">
            <span class="avatar">
              <img src="https://picsum.photos/70" />
            </span>
            <span class="avatar">
              <img src="https://picsum.photos/80" />
            </span>
            <span class="avatar">
              <img src="https://picsum.photos/90" />
            </span>
            <span class="avatar last">
              <p>+20</p>
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={setClass(true)} onClick={onClick}>
        <h3>{lecture.title}</h3>
        <div>
          <div className="Container__date_dashboard">
            <FontAwesomeIcon icon={faLocationDot} />
            <p>{lecture.place}</p>
          </div>
          <div className="Container__date_dashboard">
            <FontAwesomeIcon icon={faCalendar} />{" "}
            <p>{lecture.start + " - " + lecture.end}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Lecture;
