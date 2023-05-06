import React from "react";
import { useState, useContext } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faX } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-solid-svg-icons";
import image from "../../components/images/blank_profile.png";
import fakeApi from "../../data/data.json";
import Training from "../../components/Training";
import Popup from "../../components/Popup";
import Heading from "../../components/Heading";
import ContentContext from "../../context/Content";
import GoogleMapReact from 'google-map-react';
import Lecture from "../../components/Lecture";
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const center = {
  lat: 54.86463618199356,
  lng: 23.944770457672913
};

const MapOptions = {
  zoomControl: true,
  mapTypeControl: false,
}

const Learning = () => {


  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const allLectures = fakeApi.lectures;
  const { lectureChosen, handleChosenLecture } = useContext(ContentContext);

  return (
    <div className="Section__Learning">
      <Nav className="asd" image={logo} />
      <div className="Color__block"></div>

      <div className={ lectureChosen || lectureChosen === 0 ? "Container__learning_popup_bg" : "Container__learning_popup_bg Inactive" } onClick={() => (lectureChosen || lectureChosen === 0 ? handleChosenLecture("", false) : null)}></div>
      <div className={ lectureChosen || lectureChosen === 0 ? "Container__learning_popup" : "Container__learning_popup Inactive" }>
        <div className="Container__learning_popup_header">
          <h2>
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="Icon__location"
            />
            Kubernetes basics
          </h2>
          <FontAwesomeIcon icon={faX} className="Icon__popup" onClick={() => (lectureChosen || lectureChosen === 0 ? handleChosenLecture("", false) : null)} />
        </div>
        <div className="Container__popup_info">
          <div className="Container__popup_details">
            <h4>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="Icon__location"
              />
              Kaunas Office, Lithuania
            </h4>
            <h4>
              <FontAwesomeIcon
                icon={faCalendar}
                className="Icon__location"
              />
              2023-06-24 - 2023-07-01
            </h4>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus sit amet orci. Curabitur aliquam, est dapibus feugiat consequat, lorem enim iaculis elit, ullamcorper consequat enim odio sit amet dui. Nam eu ipsum velit. Nulla cursus, nulla sit amet efficitur suscipit, velit justo congue. 
            </p>
          </div>
          <LoadScript
            googleMapsApiKey="AIzaSyDzILljratmTZbvzMz3ULfqfhRd7nA7LUg"
          >
            <GoogleMap
              mapContainerClassName="Map__popup"
              center={center}
              zoom={17}
              options={MapOptions}
            >
              <></>
            </GoogleMap>
          </LoadScript>
        </div>
        <div>
        <button className="Btn__apply Btn__popup">
                  Norėčiau dalyvauti! <FontAwesomeIcon icon={faHand} />
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
        </div>
        <div>
          <h4>
            <FontAwesomeIcon
              icon={faUser}
              className="Icon__location"
            />
            Dalyviai:
          </h4>
          <div className="Container__popup_attendees">
            <div className="Container__popup_attendees_single">
              <span class="avatar__popup">
                  <img  src="https://picsum.photos/10"/>
              </span>
              <h4>Vardenis P.</h4>
            </div>
            <div className="Container__popup_attendees_single">
              <span class="avatar__popup">
                  <img  src="https://picsum.photos/100"/>
              </span>
              <h4>Vardenis P.</h4>
            </div>
            <div className="Container__popup_attendees_single">
              <span class="avatar__popup">
                  <img  src="https://picsum.photos/20"/>
              </span>
              <h4>Vardenis P.</h4>
            </div>
            <div className="Container__popup_attendees_single">
              <span class="avatar__popup">
                  <img  src="https://picsum.photos/90"/>
              </span>
              <h4>Vardenis P.</h4>
            </div>
            <div className="Container__popup_attendees_single">
              <span class="avatar__popup">
                  <img  src="https://picsum.photos/80"/>
              </span>
              <h4>Vardenis P.</h4>
            </div>
            <div className="Attendee__last">
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
                    <p>+10</p>
                </span>
              </div>
              <div><p>Daugiau...</p></div>
            </div>
          </div>
        </div>

      </div>
      <div className="Container__learning">
        <div className="Header__learning">
            <div>
              <h1>Darbuotojų mokymai</h1>
              <p>
                Žemiau rasite visus mokymus, vyksiančius įmonėje. Jei kiltų klausimų, susisiekite su savo vadovu.
              </p>
            </div>
            <div className="Container__sort_learning">
              <div className="Container__checkbox_learning">
                <label class="switch">
                  <input id="checkbox" type="checkbox" name="checkbox" />
                  <span class="slider round"></span>
                </label>
                <h4>Rodyti pasibaigusius</h4>
              </div>
              <div className="Container__checkbox_learning">
                <label class="switch">
                  <input id="checkbox" type="checkbox" name="checkbox" />
                  <span class="slider round"></span>
                </label>
                <h4>Mano mokymai</h4>
              </div>
            </div>
        </div>
        <div className="Container__learning_list">
          <div className="Container__learning_header">
            <div id="Learning__name">
              <h4>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="Icon__location"
                />
                Pavadinimas
              </h4>
            </div>
            <div id="Learning__place">
              <h4>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="Icon__location"
                />
                  Vieta, valstybė
              </h4>
            </div>
            <div className="Container__sorting" id="Learning__start">
              <FontAwesomeIcon icon={faCalendar} className="Icon__pick" />
              <div>
                {/* <p>Pradžia</p> */}
                <h4>Pradžios data</h4>
              </div>
              {/* <FontAwesomeIcon icon={faChevronDown} /> */}
            </div>
            <div className="Container__sorting" id="Learning__end">
              <FontAwesomeIcon icon={faCalendar} className="Icon__pick" />
              <div>
                <h4>Pabaigos data</h4>
              </div>
              {/* <FontAwesomeIcon icon={faChevronDown} /> */}
            </div>
            <div id="Learning__end">
              <h4>
                <FontAwesomeIcon
                  icon={faUser}
                  className="Icon__location"
                />
                Dalyviai
              </h4>
            </div>
          </div>
          <div className="Container__learnings">
            {allLectures.map((lecture, i) => {
              return (
                <Lecture
                  key={i}
                  lecture={lecture}
                  onClick={() => {
                    handleChosenLecture(lecture, true);
                  }}
                  id={lecture.id}
                />
              );
            })}
          </div>
        </div>
        <div className="Container__learning_nav">
          <div class="dropdown">
            <div>
              <h4>Kiekis per puslapį:</h4>
            </div>
            <select class="dropbtn">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
          </div>
          <div className="Container__learning_navigation">
            <FontAwesomeIcon icon={faChevronLeft} className="Icon__navigation"/>
            <FontAwesomeIcon icon={faChevronRight} className="Icon__navigation"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
