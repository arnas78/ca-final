import React from "react";
import "./index.css";

const Lecture = ({ lecture, isChosen, image, onClick, id }) => {
  return (
    <div className="Container__learning_single" onClick={onClick}>
        <h4 id="Learning__name">{lecture.title}</h4>
        <h4 id="Learning__place">{lecture.place}</h4>
        <h4 id="Learning__start">{lecture.start}</h4>
        <h4 id="Learning__end">{lecture.end}</h4>
        <div className="Container__learning_attendees">
        <div class="avatars">
            <span class="avatar">
                <img  src="https://picsum.photos/70"/>
            </span>
            <span class="avatar">
                <img src="https://picsum.photos/80"/>
            </span>
            <span class="avatar">
                <img src="https://picsum.photos/90"/>
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
