import React, { useState, useContext } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import image from "../../components/images/photo-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import ContentContext from "../../context/Content";
import Meal from "../../components/Meal";
import food from "../../components/images/food.jpg";
import profile from "../../components/images/blank_profile.png";
import {
  faEnvelope,
  faPhone,
  faSave,
  faPlane,
  faClipboard,
  faCalendar,
  faX,
  faArrowRight,
  faArrowLeft,
  faEur,
  faEuro,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import fakeApi from "../../data/data.json";

const Dashboard = () => {
  const allMeals = fakeApi.main;
  const allSoups = fakeApi.soups;
  const [value, onChange] = useState(new Date());

  const tileDisabled = ({ activeStartDate, date, view }) => {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    return date <= d;
  };

  const { soupChosen, handleChosenSoup, mainChosen, handleChosenMain } =
    useContext(ContentContext);

  console.log(mainChosen);

  return (
    <div className="Section__dashboard">
      <Nav image={logo} />
      <div className="background-5"></div>
      <div className="Color__block"></div>
      <div className="Container__dashboard">
        <div className="Header__dashboard">
          <div>
            <img
              className="Image__dashboard"
              src={image}
              alt="profile_image"
            ></img>
          </div>
          <div>
            <h1>Sveiki, Vardenis!</h1>
            <h4>
              Užsisakykite pietus į ofisą, užsiregistruokite į mokymus,
              pateikite prašymą į renginį ar pasiūlykite savo draugą/pažįstamą į
              mūsų darbovietę!
            </h4>
          </div>
        </div>
        <div className="Container__dashboard_content">
          <div className="Container__dashboard_vacation">
            <h2>
              <FontAwesomeIcon icon={faPlane} /> Mano atostogos
            </h2>
            <div>
              <div className="Container__vacation_days_dashboard">
                <FontAwesomeIcon icon={faClipboard} id="vacation_dashboard" />
                <h4>13 dienų</h4>
              </div>
            </div>
            <Calendar
              className="react-calendar-dashboard"
              onChange={onChange}
              value={value}
              tileDisabled={tileDisabled}
              locale="lt"
            />
            <div className="Container__vacation_reservation">
              <h4>Būsimos atostogos:</h4>
              <div className="Container__vacation_reservation_single_dashboard">
                <div>
                  <FontAwesomeIcon icon={faCalendar} />
                  <p>2023-06-24 - 2023-07-01</p>
                </div>
              </div>
            </div>
            <button className="Btn__apply Btn__apply_vacation">
              Sužinoti daugiau... <FontAwesomeIcon icon={faArrowRight} />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="Container__dashboard_lunch">
            <div className="Container__dashboard_lunch_header">
              <h2>Mano pietūs</h2>
              <div className="Container__dashboard_lunch_date">
                <FontAwesomeIcon icon={faArrowLeft} />
                <div>
                  <h4>
                    <FontAwesomeIcon icon={faCalendar} /> Pirmadienis
                  </h4>
                </div>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
            <div className="Container__dashboard_lunch_content">
              <Meal
                meal={allMeals[mainChosen]}
                isChosen={soupChosen}
                image={food}
                profile={profile}
                dashboard={true}
              />
              <Meal
                meal={allMeals[mainChosen]}
                isChosen={soupChosen}
                image={food}
                profile={profile}
                dashboard={true}
              />
            </div>
            <div className="Container__dashboard_lunch_footer">
              <div>
                <h4>
                  Viso: {allMeals[mainChosen].price} &nbsp;
                  <FontAwesomeIcon icon={faEuro} />
                </h4>
              </div>
              <div>
                <button className="Btn__apply Btn__apply_lunch">
                  Sužinoti daugiau... <FontAwesomeIcon icon={faArrowRight} />
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
          <div className="Container__dashboard_events"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
