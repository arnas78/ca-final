import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesUp,
  faArrowRight,
  faCircleDollarToSlot,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const Post = ({ post, onClick, isRecent }) => {
  var time_difference = new Date().getTime() - new Date(post.posted).getTime();
  var days_difference = time_difference / (1000 * 60 * 60 * 24);
  const [authenticated, setauthenticated] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const handleButtonName = () => {
    if (authenticated) {
      if (authenticated.level === 9) {
        return "Daugiau informacijos";
      } else {
        return "Pasiūlyti žmogų";
      }
    } else {
      return "Pateikti aplikaciją";
    }
  };

  if (isRecent) {
    return (
      <div className="Post__recent">
        <div>
          <h4>{post.title}</h4>

          <div className="Container__recent_details">
            <div>
              <FontAwesomeIcon icon={faAnglesUp} />
            </div>
            <p>{post.level}</p>
          </div>
          <div className="Container__recent_details">
            <div>
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <p>{post.location}</p>
          </div>

          <div className="Container__recent_details">
            <div>
              <FontAwesomeIcon icon={faCircleDollarToSlot} />
            </div>
            <p>{post.payrange}</p>
          </div>
        </div>
        <div>
          <p className="Paragraph__time">
            Paskelbta prieš: {Math.round(days_difference)}d.
          </p>
        </div>

        <div>
          <button className="Btn__apply" onClick={onClick}>
            {handleButtonName()} <FontAwesomeIcon icon={faArrowRight} />
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Container__posting_single" onClick={onClick}>
        <div className="Container__posting_intro">
          <h3>{post.title}</h3>
          <div className="Container__posting_details">
            <div className="Container__details_single">
              <div>
                <FontAwesomeIcon icon={faAnglesUp} />
              </div>
              <p>{post.level}</p>
            </div>
            <div className="Container__details_single">
              <div>
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <p>{post.location}</p>
            </div>
            <div className="Container__details_single">
              <div>
                <FontAwesomeIcon icon={faCircleDollarToSlot} />
              </div>
              <p>{post.payrange}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="Container__posting_desc">{post.description}</p>
        </div>
      </div>
    );
  }
};
export default Post;
