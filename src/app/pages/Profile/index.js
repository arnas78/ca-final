import React, { useState } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import image from "../../components/images/photo-1.jpg";
import conference from "../../components/images/conf-1.jpg";
import conference_2 from "../../components/images/conf-2.png";
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
} from "@fortawesome/free-solid-svg-icons";
import fakeApi from "../../data/data.json";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Profile = () => {
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

  const handleReserve = () => {
    if (value) {
      if (diffDays(value[0], value[1]) <= 13) {
        alert("Jūsų rezervacija atlikta sėkmingai. Gerų atostogų!");
      } else {
        alert("Jūsų pasirinktas dienų kiekis per didelis!");
      }
    } else {
      alert("Atostogų laikotarpis nepasirinktas. Atlikite pasirinkimą!");
    }
  };

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
              src={image}
              alt="profile_image"
            ></img>
            <div>
              <h1>Vardenis Pavardenis</h1>
              <h3>Frontend Programuotojas</h3>
              <h4>Kaunas, Lithuania</h4>
            </div>
          </div>
          <div className="Container__profile_contacts">
            <div>
              <FontAwesomeIcon className="Icon__social" icon={faPhone} />
              <h4> +37061234567</h4>
            </div>
            <div>
              <FontAwesomeIcon className="Icon__social" icon={faEnvelope} />
              <h4> vardenis.pavardenis@devbridge.com</h4>
            </div>
          </div>
          <div className="Container__profile_socials">
            <div className="Container__profile_socials_single">
              <FontAwesomeIcon
                id="linkedin"
                className="Icon__social"
                icon={faLinkedinIn}
              />
            </div>

            <div className="Container__profile_socials_single">
              <FontAwesomeIcon
                id="github"
                className="Icon__social"
                icon={faGithub}
              />
            </div>
          </div>
        </div>
        <div className="Container__profile_content">
          <div>
            <div className="Container__profile_edit">
              <div className="Container__profile_edit_header">
                <h2>Asmeninė informacija</h2>
                <div
                  className="Container__edit"
                  onClick={() => alert("Informacija išsaugota!")}
                >
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
                    value="Vardenis"
                    disabled
                  />
                </div>
                <div>
                  <label>Pavardė</label>
                  <input
                    type="text"
                    className="Input__disabled"
                    value="Pavardenis"
                    disabled
                  />
                </div>
                <div>
                  <label>Gimimo data</label>
                  <input
                    type="text"
                    className="Input__disabled"
                    value="2000-10-20"
                    disabled
                  />
                </div>
                <div>
                  <label>Lytis</label>
                  <select>
                    <option>Vyras</option>
                    <option>Moteris</option>
                    <option>Kita</option>
                  </select>
                </div>
                <div>
                  <label>Marškinėlių dydis</label>
                  <select>
                    <option>Extra Small (XS)</option>
                    <option>Small (S)</option>
                    <option>Medium (M)</option>
                    <option>Large (L)</option>
                    <option>Extra Large (XL)</option>
                  </select>
                </div>
                <div>
                  <label>Asmens kodas</label>
                  <input
                    className="Input__disabled"
                    type="text"
                    value="5XXXXXX1234"
                    disabled
                  />
                </div>
                <div className="Container__profile_bio">
                  <label>Bio</label>
                  <textarea className="Input__bio" placeholder="Jūsų bio..." />
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
                    value="v.pavardenis@gmail.com"
                  />
                </div>
                <div>
                  <label>Telefono nr.</label>
                  <input
                    type="text"
                    className="Input__active"
                    value="+37061234567"
                  />
                </div>
                <div>
                  <label>Adresas</label>
                  <input
                    type="text"
                    className="Input__active"
                    value="Taikos pr. XX-XX"
                  />
                </div>
                <div>
                  <label>Automobilio numeris</label>
                  <input
                    type="text"
                    className="Input__active"
                    value="LYV330"
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
                    value="Swedbank"
                  />
                </div>
                <div>
                  <label>Banko sąskaitos nr.</label>
                  <input
                    type="text"
                    className="Input__active"
                    value="XX1234YYYY4567XXXX89"
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
                  <div className="Container__profile_activities_lectures_single Status__approved">
                    <h4 id="Learning__name">DevOps kubernetes</h4>
                    <h4 id="Learning__place">Kaunas Office, Lietuva</h4>
                    <h4 id="Learning__start">2023-04-05</h4>
                    <h4 id="Learning__end">2023-08-05</h4>
                    <div className="Lecture__profile_remove">
                      <FontAwesomeIcon icon={faXmark} id="Remove" />
                    </div>
                  </div>
                  <div className="Container__profile_activities_lectures_single">
                    <h4 id="Learning__name">DevOps kubernetes</h4>
                    <h4 id="Learning__place">Kaunas Office, Lietuva</h4>
                    <h4 id="Learning__start">2023-04-05</h4>
                    <h4 id="Learning__end">2023-08-05</h4>
                    <div className="Lecture__profile_remove">
                      <FontAwesomeIcon icon={faXmark} id="Remove" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="Container__profile_activities_header">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <h3>Mano renginiai</h3>
                </div>
                <div className="Container__profile_activities_events">
                  <div className="Container__profile_activities_events_single Status__waiting">
                    <img
                      src={conference}
                      className="Image__profile_event"
                      alt="conference"
                    ></img>
                    <div className="Event__profile_single">
                      <div>
                        <div>
                          <FontAwesomeIcon icon={faCalendarDays} />
                          <h4>DevOps Enterprise Summit</h4>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} />
                          <h4>Virtual Event</h4>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faClock} />
                          <h4>03 APR 2024, 10:00</h4>
                        </div>
                      </div>
                    </div>
                    <div className="Event__profile_status">
                      <div>
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <h4>STATUSAS</h4>
                      </div>
                      <h4 id="yellow">LAUKIAMA</h4>
                    </div>
                    <div className="Lecture__profile_remove">
                      <FontAwesomeIcon icon={faXmark} id="Remove" />
                    </div>
                  </div>
                  <div className="Container__profile_activities_events_single Status__approved">
                    <img
                      src={conference_2}
                      className="Image__profile_event"
                      alt="conference"
                    ></img>
                    <div className="Event__profile_single">
                      <div>
                        <div>
                          <FontAwesomeIcon icon={faCalendarDays} />
                          <h4>WebCon 2023</h4>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} />
                          <h4>Žalgirio Arena, Kaunas</h4>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faClock} />
                          <h4>16 LAP 2023, 10:00</h4>
                        </div>
                      </div>
                    </div>
                    <div className="Event__profile_status">
                      <div>
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <h4>STATUSAS</h4>
                      </div>
                      <h4 id="green">PATVIRTINTA</h4>
                    </div>
                    <div className="Lecture__profile_remove">
                      <FontAwesomeIcon icon={faXmark} id="Remove" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="Container__profile_activities_header">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <h3>Mano pasiūlymai į pozicijas</h3>
                </div>
                <div className="Container__profile_activities_posts">
                  <div className="Container__profile_activities_post_single Status__waiting">
                    <div className="Post__profile_header">
                      <FontAwesomeIcon icon={faUser} />
                      <h4>Vardenis Pavardenis</h4>
                    </div>
                    <div>
                      <h4 className="Heading__profile_position">
                        DevOps Programuotojas - Junior
                      </h4>
                    </div>

                    <div className="Post__profile_status">
                      <div>
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <h4>STATUSAS</h4>
                      </div>
                      <h4 id="yellow">Peržiūrimas</h4>
                    </div>
                    <div className="Lecture__profile_remove">
                      <FontAwesomeIcon icon={faXmark} id="Remove" />
                    </div>
                  </div>
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
                <h4> 13 dienų</h4>
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
              <div className="Container__vacation_reservation_single">
                <div>
                  <FontAwesomeIcon icon={faCalendar} />
                  <p>2023-06-24 - 2023-07-01</p>
                </div>
                <FontAwesomeIcon icon={faXmark} id="Remove" />
              </div>
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
};

export default Profile;
