import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import image from "../../components/images/photo-1.jpg";

const User = ({ user, userAdditional, onClick }) => {
  return (
    <div className="Container__admin_user_single" onClick={onClick}>
      <div className="Container__admin_user_single_info">
        <img
          className="Image__admin_user"
          src={userAdditional ? userAdditional.image : image}
          alt="profile_image"
        ></img>
        <div>
          <h3>{user.name + " " + user.surname}</h3>
          <div>
            <FontAwesomeIcon
              icon={faEnvelope}
              className="Icon__sort Icon__admin"
            />{" "}
            <h4>{user.work_email}</h4>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faPhone}
              className="Icon__sort Icon__admin"
            />{" "}
            <h4>{user.phone}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
