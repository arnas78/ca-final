import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import image from "../../components/images/photo-1.jpg";
import conference from "../../components/images/conf-1.jpg";
import conference_2 from "../../components/images/conf-2.png";
import ContentContext from "../../context/Content";
import Select from "react-select";
import Order from "../../components/Order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faSave,
  faPlane,
  faClipboard,
  faCalendar,
  faXmark,
  faGraduationCap,
  faCalendarDays,
  faLocationDot,
  faClock,
  faThumbsUp,
  faArrowDown,
  faUser,
  faXmarkmark,
  faUtensils,
  faSpoon,
  faEuro,
} from "@fortawesome/free-solid-svg-icons";
import fakeApi from "../../data/data.json";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Profile = () => {
  const [authenticated, setauthenticated] = useState(localStorage.getItem("user"));
  function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  const [value, onChange] = useState();

  const tileDisabled = ({ activeStartDate, date, view }) => {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    return date < d;
  };

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

  const realDates = (a) => {
    let start =
      a.getFullYear() +
      "-" +
      ((a.getMonth() + 1).length !== 2
        ? "0" + (a.getMonth() + 1)
        : a.getMonth() + 1) +
      "-" +
      (a.getDate().toString().length !== 2 ? "0" + a.getDate() : a.getDate());

    return start;
  };

  const handleReserve = () => {
    if (value && typeof userExtra !== "undefined") {
      if (diffDays(value[0], value[1]) <= userExtra.vacation_days) {
        let obj = {};

        obj = {
          user_id: backendData._id,
          start_date: realDates(value[0]),
          end_date: realDates(value[1]),
        };

        // Send data to the backend via POST
        fetch("http://localhost:5000/api/vacations", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj), // body data type must match "Content-Type" header
        });

        let subtractDay =
          userExtra.vacation_days - diffDays(value[0], value[1]);

        fetch(
          `http://localhost:5000/api/user/extra/` + backendData._id,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              vacation_days: subtractDay,
            }), // body data type must match "Content-Type" header
          }
        );

        alert("Jūsų rezervacija atlikta sėkmingai. Gerų atostogų!");
        window.location.reload(false);
      } else {
        alert("Jūsų pasirinktas dienų kiekis per didelis!");
      }
    } else {
      alert("Atostogų laikotarpis nepasirinktas. Atlikite pasirinkimą!");
    }
  };

  const handleUpdate = () => {
    if (typeof userExtra !== "undefined") {
      let obj = {};

      obj = {
        bio: bio,
        address: address,
      };

      console.log(obj);

      // Send data to the backend via POST
      fetch("http://localhost:5000/api/user/extra/" + backendData._id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj), // body data type must match "Content-Type" header
      });

      alert("Jūs sėkmingai atnaujinote asmeninius duomenis!");
      window.location.reload(false);
    } else {
      alert("Kažkas ne taip... Pabandykite dar kartą!");
    }
  };

  const {
    backendData,
    userExtra,
    orderData,
    mealData,
    lectureData,
    eventsData,
    referData,
    vacationData,
  } = useContext(ContentContext);

  const [bio, setBio] = useState("");

  const handleBio = (event) => {
    setBio(event.target.value);
  };

  const [address, setAddress] = useState("");

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const options = [
    { value: "Vyras", label: "Vyras" },
    { value: "Moteris", label: "Moteris" },
    { value: "Kita", label: "Kita" },
  ];

  const userVacations =
    typeof vacationData.vacations === "undefined"
      ? []
      : vacationData.vacations.filter(
          (obj) => obj.user_id === backendData._id
        );

  const userRefers =
    typeof referData.refers === "undefined"
      ? []
      : referData.refers.filter(
          (obj) => obj.user_id === backendData._id
        );

  const userOrders =
    typeof orderData.orders === "undefined"
      ? []
      : orderData.orders.filter(
          (obj) => obj.user_id === backendData._id
        );

  if (!authenticated){
    return <Navigate replace to="/login" />;
  }
  else {
    if (authenticated.level === 9){
      return <Navigate replace to="/admin" />;
    }
    else {
      return (
        <div className="Section__profile">
          <div className="background-3"></div>
          <div className="Color__block"></div>
          <Nav image={logo} />
          <div className="Container__profile">
            <div className="Header__profile">
              <div>
                <h1 className="Heading_1__white">Jūsų profilis</h1>
                <h4>
                  Čia galite matyti ar keisti savo asmeninę bei kitą informaciją.
                </h4>
              </div>
              <h3>
                <FontAwesomeIcon icon="fa-sharp fa-solid fa-hat-chef" />
                Mano veikla <FontAwesomeIcon icon={faArrowDown} />
              </h3>
            </div>
            <div className="Container__profile_intro">
              <div className="Container__profile_details">
                <img
                  className="Image__profile"
                  src={typeof userExtra === "undefined" ? image : userExtra.image}
                  alt="profile_image"
                ></img>
                <div>
                  <h1>
                    {typeof backendData === "undefined" ? (
                      <p>Loading...</p>
                    ) : (
                      backendData.name + " " + backendData.surname
                    )}
                  </h1>
                  <h3>
                    {" "}
                    {typeof backendData === "undefined" ? (
                      <p>Loading...</p>
                    ) : (
                      backendData.position
                    )}
                  </h3>
                  <h4>
                    {" "}
                    {typeof backendData === "undefined" ? (
                      <p>Loading...</p>
                    ) : (
                      backendData.location
                    )}
                  </h4>
                </div>
              </div>
              <div className="Container__profile_contacts">
                <div>
                  <FontAwesomeIcon className="Icon__social" icon={faPhone} />
                  <h4>
                    {typeof backendData === "undefined" ? (
                      <p>Loading...</p>
                    ) : (
                      backendData.phone
                    )}
                  </h4>
                </div>
                <div>
                  <FontAwesomeIcon className="Icon__social" icon={faEnvelope} />
                  <h4>
                    {" "}
                    {typeof backendData === "undefined" ? (
                      <p>Loading...</p>
                    ) : (
                      backendData.work_email
                    )}
                  </h4>
                </div>
              </div>
              <div className="Container__profile_socials">
                <a
                  className="Container__profile_socials_single"
                  href={typeof userExtra === "undefined" ? "" : userExtra.linkedin}
                >
                  <FontAwesomeIcon
                    id="linkedin"
                    className="Icon__social"
                    icon={faLinkedinIn}
                  />
                </a>
  
                <a
                  className="Container__profile_socials_single"
                  href={typeof userExtra === "undefined" ? "" : userExtra.github}
                >
                  <FontAwesomeIcon
                    id="github"
                    className="Icon__social"
                    icon={faGithub}
                  />
                </a>
              </div>
            </div>
            <div className="Container__profile_content">
              <div>
                <div className="Container__profile_edit">
                  <div className="Container__profile_edit_header">
                    <h2>Asmeninė informacija</h2>
                    <div className="Container__edit" onClick={handleUpdate}>
                      <h3>Išsaugoti</h3>
                      <FontAwesomeIcon className="Icon__edit" icon={faSave} />
                    </div>
                  </div>
                  <div className="Container__profile_form">
                    <div>
                      <label>Vardas</label>
                      <input
                        type="text"
                        className="Input__disabled"
                        value={
                          typeof backendData === "undefined" ? (
                            <p>Loading...</p>
                          ) : (
                            backendData.name
                          )
                        }
                        disabled
                      />
                    </div>
                    <div>
                      <label>Pavardė</label>
                      <input
                        type="text"
                        className="Input__disabled"
                        value={
                          typeof backendData === "undefined" ? (
                            <p>Loading...</p>
                          ) : (
                            backendData.surname
                          )
                        }
                        disabled
                      />
                    </div>
                    <div>
                      <label>Gimimo data</label>
                      <input
                        type="text"
                        className="Input__disabled"
                        value={
                          typeof backendData === "undefined" ? (
                            <p>Loading...</p>
                          ) : (
                            backendData.birthdate
                          )
                        }
                        disabled
                      />
                    </div>
                    <div>
                      <label>Lytis</label>
                      <input
                        type="text"
                        className="Input__active"
                        defaultValue={
                          typeof backendData === "undefined"
                            ? "Vyras"
                            : backendData.sex
                        }
                        options={options}
                        placeholder="Lytis"
                      ></input>
                    </div>
                    <div>
                      <label>Marškinėlių dydis</label>
                      <input
                        type="text"
                        className="Input__active"
                        defaultValue={
                          typeof userExtra === "undefined"
                            ? ""
                            : userExtra.shirt_size
                        }
                        placeholder="L"
                      ></input>
                    </div>
                    <div>
                      <label>Asmens kodas</label>
                      <input
                        value={
                          typeof backendData === "undefined"
                            ? ""
                            : backendData.personal_number
                        }
                        className="Input__disabled"
                        type="text"
                        disabled
                        placeholder="ZXXXXXXYYYY"
                      />
                    </div>
                    <div className="Container__profile_bio">
                      <label>Bio</label>
                      <textarea
                        className="Input__bio"
                        placeholder="Jūsų bio..."
                        defaultValue={
                          typeof userExtra === "undefined" ? "" : userExtra.bio
                        }
                        onChange={handleBio}
                        value={bio.length !== 0 ? bio : userExtra.bio}
                      />
                    </div>
                  </div>
  
                  <div className="Container__separator"></div>
                  <div className="Container__profile_edit_header">
                    <h2>Kontaktai</h2>
                  </div>
                  <div className="Container__profile_form">
                    <div>
                      <label>Asmeninis el. paštas</label>
                      <input
                        type="text"
                        className="Input__active"
                        placeholder="v.pavardenis@gmail.com"
                      />
                    </div>
                    <div>
                      <label>Telefono nr.</label>
                      <input
                        defaultValue={
                          typeof backendData === "undefined"
                            ? ""
                            : backendData.phone
                        }
                        type="text"
                        className="Input__active"
                        placeholder="+37061234567"
                      />
                    </div>
                    <div>
                      <label>Adresas</label>
                      <input
                        type="text"
                        defaultValue={
                          typeof backendData === "undefined"
                            ? ""
                            : backendData.address
                        }
                        className="Input__active"
                        placeholder="Taikos pr. XX-XX"
                        onChange={handleAddress}
                        value={address.length !== 0 ? address : userExtra.address}
                      />
                    </div>
                    <div>
                      <label>Automobilio numeris</label>
                      <input
                        type="text"
                        defaultValue={
                          typeof userExtra === "undefined" ? "" : userExtra.car
                        }
                        className="Input__active"
                        placeholder="XXXYYY"
                      />
                    </div>
                    <div>
                      <label>
                        GitHub{" "}
                        <FontAwesomeIcon
                          id="linkedin"
                          className="Icon__social"
                          icon={faGithub}
                        />{" "}
                      </label>
                      <input
                        type="text"
                        className="Input__active"
                        defaultValue={
                          typeof userExtra === "undefined" ? "" : userExtra.github
                        }
                        placeholder="https://github.com/profileName"
                      />
                    </div>
                    <div>
                      <label>
                        Linkedin{" "}
                        <FontAwesomeIcon
                          id="linkedin"
                          className="Icon__social"
                          icon={faLinkedinIn}
                        />{" "}
                      </label>
                      <input
                        type="text"
                        className="Input__active"
                        defaultValue={
                          typeof userExtra === "undefined" ? "" : userExtra.linkedin
                        }
                        placeholder="https://linkedin.com/profileName"
                      />
                    </div>
                  </div>
                  <div className="Container__separator"></div>
                  <div className="Container__profile_edit_header">
                    <h2>Banko informacija</h2>
                  </div>
                  <div className="Container__profile_form">
                    <div>
                      <label>Banko pavadinimas</label>
                      <input
                        type="text"
                        className="Input__active"
                        defaultValue={
                          typeof userExtra === "undefined"
                            ? ""
                            : userExtra.bank_name
                        }
                      />
                    </div>
                    <div>
                      <label>Banko sąskaitos nr.</label>
                      <input
                        type="text"
                        className="Input__active"
                        defaultValue={
                          typeof userExtra === "undefined"
                            ? ""
                            : userExtra.bank_number
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="Container__profile_activities">
                  <h2>Mano veikla</h2>
                  <div>
                    <div className="Container__profile_activities_header">
                      <FontAwesomeIcon icon={faGraduationCap} />
                      <h3>Mano mokymai</h3>
                    </div>
                    <div className="Container__profile_activities_lectures">
                      {typeof orderData.orders === "undefined" ||
                      typeof mealData.meals === "undefined" ? (
                        <p>Loading...</p>
                      ) : (
                        userOrders.map((order, i) => {
                          for (
                            let index = 0;
                            index < lectureData.lectures.length;
                            index++
                          ) {
                            if (order.obj_id === lectureData.lectures[index]._id) {
                              return (
                                <Order
                                  key={i}
                                  obj={lectureData.lectures[index]}
                                  order={order}
                                  type={"lectures"}
                                />
                              );
                            }
                          }
                        })
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="Container__profile_activities_header">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      <h3>Mano renginiai</h3>
                    </div>
                    <div className="Container__profile_activities_events">
                      {typeof orderData.orders === "undefined" ||
                      typeof eventsData.events === "undefined" ? (
                        <p>Loading...</p>
                      ) : (
                        userOrders.map((order, i) => {
                          for (
                            let index = 0;
                            index < eventsData.events.length;
                            index++
                          ) {
                            if (order.obj_id === eventsData.events[index]._id) {
                              return (
                                <Order
                                  key={i}
                                  obj={eventsData.events[index]}
                                  order={order}
                                  type={"events"}
                                />
                              );
                            }
                          }
                        })
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="Container__profile_activities_header">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      <h3>Mano pasiūlymai į pozicijas</h3>
                    </div>
                    <div className="Container__profile_activities_posts">
                      {typeof userRefers === "undefined" ? (
                        <p>Loading...</p>
                      ) : (
                        userRefers.map((refer, i) => {
                          return <Order key={i} obj={refer} type={"refer"} />;
                        })
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="Container__profile_activities_header">
                      <FontAwesomeIcon icon={faUtensils} />
                      <h3>Mano pietų užsakymai</h3>
                    </div>
                    <div className="Container__profile_activities_posts Container__meal_orders">
                      {typeof orderData.orders === "undefined" ||
                      typeof mealData.meals === "undefined" ? (
                        <p>Loading...</p>
                      ) : (
                        userOrders.map((order, i) => {
                          for (
                            let index = 0;
                            index < mealData.meals.length;
                            index++
                          ) {
                            if (order.obj_id === mealData.meals[index]._id) {
                              return (
                                <Order
                                  key={i}
                                  obj={mealData.meals[index]}
                                  order={order}
                                  type={"lunch"}
                                />
                              );
                            }
                          }
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="Container__vacation">
                <h2>Mano atostogos</h2>
                <div>
                  <div className="Container__vacation_days">
                    <h3>Mano likutis:</h3>
                    <FontAwesomeIcon icon={faClipboard} id="vacation" />
                    <h4>
                      {typeof userExtra === "undefined" ? (
                        <p>Loading...</p>
                      ) : (
                        userExtra.vacation_days + " dienos"
                      )}
                    </h4>
                  </div>
                </div>
                <Calendar
                  className="react-calendar-style"
                  onChange={onChange}
                  selectRange={true}
                  tileDisabled={tileDisabled}
                  locale="lt"
                />
                <div className="Container__vacation_chosen">
                  <h4>
                    Jūs pasirinkote: {value ? diffDays(value[0], value[1]) : "0"}{" "}
                    dienų(-as).
                  </h4>
                </div>
                <div className="Container__vacation_reservation">
                  <h4>Mano rezervacijos:</h4>
                  {typeof vacationData.vacations === "undefined" ? (
                    <p>Loading...</p>
                  ) : (
                    userVacations.map((vacation, i) => {
                      return (
                        <Order
                          key={i}
                          obj={vacation}
                          type={"vacation"}
                          currentDays={userExtra.vacation_days}
                        />
                      );
                    })
                  )}
                  {/* <div className="Container__vacation_reservation_single">
                    <div>
                      <FontAwesomeIcon icon={faCalendar} />
                      <p>2023-06-24 - 2023-07-01</p>
                    </div>
                    <FontAwesomeIcon icon={faXmark} id="Remove" />
                  </div> */}
                </div>
                <button
                  className="Btn__apply Btn__apply_vacation"
                  onClick={handleReserve}
                >
                  Rezervuoti <FontAwesomeIcon icon={faPlane} />
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }


  }
};

export default Profile;
