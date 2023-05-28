import React from "react";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronDown,
  faPen,
  faPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
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
import ContentContext from "../../context/Content";
import GoogleMapReact from "google-map-react";
import Attendee from "../../components/Attendee";
import Lecture from "../../components/Lecture";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const center = {
  lat: 54.86463618199356,
  lng: 23.944770457672913,
};

const MapOptions = {
  zoomControl: true,
  mapTypeControl: false,
};

const Learning = () => {
  const [authenticated, setauthenticated] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const {
    lectureChosen,
    handleChosenLecture,
    lectureData,
    orderData,
    backendData,
    allUserData,
    allExtraData,
    setLectureData,
    setOrderData,
  } = useContext(ContentContext);
  const [attendeesOpen, setAttendeesOpen] = useState(false);
  const [lectureSelected, setLectureSelected] = useState(null);
  const [adminPopup, setAdminPopup] = useState(false);
  const [showEnded, setShowEnded] = useState(false);

  const handleAdminPopup = () => {
    setAdminPopup((prevCheck) => !prevCheck);
  };

  const handleDeleteLecture = () => {
    if (lectureSelected) {
      fetch(`http://localhost:5000/api/lectures/` + lectureSelected._id, {
        method: "DELETE",
      });
      alert("Sėkmingai ištrynėte sriubą " + lectureSelected.title);
      handleLectures();
      handleChosenLecture("", false);
      setLectureSelected(null);
    }
  };

  const handleLectures = () => {
    fetch("/api/lectures")
      .then((response) => response.json())
      .then((data) => {
        setLectureData(data);
      });
  };

  const handleOrders = () => {
    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrderData(data);
      });
  };

  let allLectures =
    typeof lectureData.lectures === "undefined"
      ? fakeApi.lectures
      : lectureData.lectures.sort(function (a, b) {
          let firstDate = new Date(a.start);
          let secondDate = new Date(b.start);

          return firstDate - secondDate;
        });

  function handleClick() {
    if (lectureSelected && orderData !== "undefined") {
      let obj = {};

      const arrLength = orderData.orders.filter((obj) => {
        return (
          obj.obj_id === lectureSelected._id && backendData._id === obj.user_id
        );
      }).length;

      if (
        new Date() - new Date(lectureSelected.end) < 0 &&
        new Date() - new Date(lectureSelected.start) < 0
      ) {
        if (arrLength === 0) {
          obj = {
            user_id: backendData._id,
            type: "events",
            obj_id: lectureSelected._id,
          };

          // Send data to the backend via POST
          fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(obj), // body data type must match "Content-Type" header
          });

          alert(`Jūs sėkmingai aplikavote į mokymus!`);
          handleChosenLecture("", false);
          handleOrders();
          handleLectures();
        } else {
          alert(`Šiuose mokymuose jau aplikavote.`);
        }
      } else {
        alert("Registracija į šį renginį yra negalima.");
      }
    }
  }

  const allUsersArray =
    typeof allUserData.users === "undefined" ? [] : allUserData.users;

  const allExtraArray =
    typeof allExtraData.extra === "undefined" ? [] : allExtraData.extra;

  let allOrders =
    typeof orderData.orders === "undefined" ? [] : orderData.orders;

  let eventAttendees =
    typeof (orderData.orders === "undefined") && !lectureSelected
      ? []
      : orderData.orders.filter((obj) => obj.obj_id === lectureSelected._id);

  if (!authenticated) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div className="Section__Learning">
        <Nav image={logo} />
        <div className="background-2"></div>

        <div
          className={
            lectureChosen || lectureChosen === 0
              ? "Container__learning_popup_bg"
              : "Container__learning_popup_bg Inactive"
          }
          onClick={() =>
            lectureChosen || lectureChosen === 0
              ? handleChosenLecture("", false)
              : null
          }
        ></div>
        <div
          className={
            lectureChosen || lectureChosen === 0
              ? "Container__learning_popup"
              : "Container__learning_popup Inactive"
          }
        >
          <div className="Container__learning_popup_header">
            <h2>
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="Icon__location"
              />
              {lectureSelected ? lectureSelected.title : ""}
            </h2>
            <FontAwesomeIcon
              icon={faX}
              className="Icon__popup"
              onClick={() =>
                lectureChosen || lectureChosen === 0
                  ? handleChosenLecture("", false)
                  : null
              }
            />
          </div>
          <div className="Container__popup_info">
            <div className="Container__popup_details">
              <h4>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="Icon__location"
                />
                {lectureSelected ? lectureSelected.place : ""}
              </h4>
              <h4>
                <FontAwesomeIcon icon={faCalendar} className="Icon__location" />
                {lectureSelected
                  ? lectureSelected.start + ` - ` + lectureSelected.end
                  : ""}
              </h4>
              <p>{lectureSelected ? lectureSelected.desc : ""}</p>
            </div>
            <LoadScript googleMapsApiKey="AIzaSyDzILljratmTZbvzMz3ULfqfhRd7nA7LUg">
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
            {authenticated.level === 9 ? (
              <div>
                <button className="Button__sort Button__admin">
                  <FontAwesomeIcon
                    icon={faX}
                    className="Icon__sort Icon__admin"
                    onClick={handleDeleteLecture}
                  />{" "}
                  Ištrinti mokymus
                </button>
                <button className="Button__sort Button__admin">
                  <FontAwesomeIcon
                    icon={faPen}
                    className="Icon__sort Icon__admin"
                  />{" "}
                  Redaguoti mokymus
                </button>
              </div>
            ) : (
              <button className="Btn__apply Btn__popup" onClick={handleClick}>
                Norėčiau dalyvauti! <FontAwesomeIcon icon={faHand} />
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}
          </div>
          <div>
            <h4>
              <FontAwesomeIcon icon={faUser} className="Icon__location" />
              Dalyviai:
            </h4>
            <div className="Container__popup_attendees">
              {typeof allUserData === "undefined" ||
              typeof allExtraData === "undefined" ? (
                <h1>Loading...</h1>
              ) : eventAttendees.length !== 0 ? (
                eventAttendees.map((att, i) => {
                  return (
                    <Attendee
                      attendee={att}
                      key={i}
                      userData={allUsersArray}
                      userExtra={allExtraArray}
                    ></Attendee>
                  );
                })
              ) : (
                <h3>Šiuo metu apmokymuose dalyvių nėra. Užsiregistruokite!</h3>
              )}

              {/* <div className="Container__popup_attendees_single">
                <span class="avatar__popup">
                  <img src="https://picsum.photos/100" />
                </span>
                <h4>Vardenis P.</h4>
              </div>
              <div className="Container__popup_attendees_single">
                <span class="avatar__popup">
                  <img src="https://picsum.photos/20" />
                </span>
                <h4>Vardenis P.</h4>
              </div>
              <div className="Container__popup_attendees_single">
                <span class="avatar__popup">
                  <img src="https://picsum.photos/90" />
                </span>
                <h4>Vardenis P.</h4>
              </div>
              <div className="Container__popup_attendees_single">
                <span class="avatar__popup">
                  <img src="https://picsum.photos/80" />
                </span>
                <h4>Vardenis P.</h4>
              </div> */}
              {/* <div
                className="Attendee__last"
                onClick={() => {
                  setAttendeesOpen((current) => !current);
                }}
              >
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
                    <p>+10</p>
                  </span>
                </div>
                <p>Daugiau...</p>
              </div> */}
            </div>
          </div>
        </div>
        <div className="Container__learning">
          <div className="Header__learning">
            <div>
              <h1>Darbuotojų mokymai</h1>
              <h4>Žemiau rasite visus mokymus, vyksiančius įmonėje.</h4>
            </div>
            <div className="Container__sort_learning">
              {authenticated.level === 9 ? (
                <button className="Button__sort Button__admin">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="Icon__sort Icon__admin"
                    onClick={handleAdminPopup}
                  />{" "}
                  Nauji mokymai
                </button>
              ) : (
                ""
              )}

              <div className="Container__checkbox_learning">
                <label class="switch">
                  <input
                    id="checkbox"
                    type="checkbox"
                    name="checkbox"
                    onChange={() => {
                      setShowEnded((current) => !current);
                    }}
                  />
                  <span class="slider round"></span>
                </label>
                <h4>Rodyti pasibaigusius</h4>
              </div>
              {/* <div className="Container__checkbox_learning">
                <label class="switch">
                  <input id="checkbox" type="checkbox" name="checkbox" />
                  <span class="slider round"></span>
                </label>
                <h4>Mano mokymai</h4>
              </div> */}
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
                  <FontAwesomeIcon icon={faUser} className="Icon__location" />
                  Dalyviai
                </h4>
              </div>
            </div>
            <div className="Container__learnings">
              {allLectures.map((lecture, i) => {
                if (
                  typeof allUserData !== "undefined" ||
                  typeof allExtraData !== "undefined" ||
                  typeof allOrders !== "undefined"
                ) {
                  if (showEnded) {
                    return (
                      <Lecture
                        key={i}
                        lecture={lecture}
                        onClick={() => {
                          handleChosenLecture(lecture, true);
                          setLectureSelected(lecture);
                        }}
                        userData={allUsersArray}
                        userExtra={allExtraArray}
                        userOrders={allOrders}
                        id={lecture.id}
                      />
                    );
                  } else if (!showEnded) {
                    let isEnded = false;
                    if (new Date() - new Date(lecture.end) > 0) {
                      isEnded = true;
                    }
                    if (!isEnded) {
                      return (
                        <Lecture
                          key={i}
                          lecture={lecture}
                          onClick={() => {
                            handleChosenLecture(lecture, true);
                            setLectureSelected(lecture);
                          }}
                          userData={allUsersArray}
                          userExtra={allExtraArray}
                          userOrders={allOrders}
                          id={lecture.id}
                        />
                      );
                    }
                  }
                }
              })}
            </div>
          </div>
          {/* <div className="Container__learning_nav">
            <div class="dropdown">
              <h4>Kiekis per puslapį:</h4>
              <select class="dropbtn">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
            <div className="Container__learning_navigation">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="Icon__navigation"
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                className="Icon__navigation"
              />
            </div>
          </div> */}
        </div>
      </div>
    );
  }
};

export default Learning;
