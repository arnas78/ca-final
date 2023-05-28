import React from "react";
import "./index.css";

const Attendee = ({ attendee, userData, userExtra }) => {
  let userObj = {};
  let extraObj = {};
  for (let index = 0; index < userData.length; index++) {
    if (attendee.user_id === userData[index]._id) {
      userObj = userData[index];
    }
  }
  for (let index = 0; index < userExtra.length; index++) {
    if (attendee.user_id === userExtra[index].user_id) {
      extraObj = userExtra[index];
    }
  }
  return (
    <div className="Container__popup_attendees_single">
      <span class="avatar__popup">
        <img src={extraObj.image} />
      </span>
      <h4>{userObj.name + " " + userObj.surname[0] + "."}</h4>
    </div>
  );
};

export default Attendee;
