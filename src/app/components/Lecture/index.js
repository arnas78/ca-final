import React from "react";
import "./index.css";

const Lecture = ({ lecture, isChosen, image, onClick, id }) => {
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

  const setClass = () => {
    let classname = "Container__learning_single";
    if (isActive() && !isEnded()) {
      classname = classname + " Lecture__active";
    } else if (isEnded()) {
      classname = classname + " Lecture__ended";
    }
    return classname;
  };

  return (
    <div className={setClass()} onClick={onClick}>
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
};

export default Lecture;
