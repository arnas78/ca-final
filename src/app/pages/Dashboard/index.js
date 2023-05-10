import React, { useState, useContext, useRef } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import { Link } from "react-router-dom";
import logo from "../../components/images/Vector.svg";
import image from "../../components/images/photo-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import ContentContext from "../../context/Content";
import Meal from "../../components/Meal";
import food from "../../components/images/food.jpg";
import profile from "../../components/images/blank_profile.png";
import event from "../../components/images/event.jpg";
import conference from "../../components/images/conf-2.png";
import conference_2 from "../../components/images/conf-3.webp";
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
  faCalendarDay,
  faClock,
  faPersonChalkboard,
  faLocationDot,
  faEnvelopeOpenText,
  faBook,
  faCutlery,
  faAnglesUp,
  faCircleDollarToSlot,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import fakeApi from "../../data/data.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
// import fakeApi from "../../data/data.json";
import "./index.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const allMeals = fakeApi.main;
  const allSoups = fakeApi.soups;
  const [value, onChange] = useState(new Date());

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const location = useLocation().pathname;

  const tileDisabled = ({ activeStartDate, date, view }) => {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    return date <= d;
  };

  const { soupChosen, handleChosenSoup, mainChosen, handleChosenMain } =
    useContext(ContentContext);

  return (
    <div className="Section__dashboard">
      <Nav image={logo} />
      <div className="background-5"></div>
      <div className="Color__block"></div>
      <div className="Container__dashboard">
        <div className="Header__dashboard">
          <div>
            <Link className="Link__dashboard_profile" to="/profile">
              <img
                className="Image__dashboard"
                src={image}
                alt="profile_image"
              ></img>
              <h3 className="Heading__my_profile">Mano profilis</h3>
            </Link>
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
          <div className="Container__dashboard_content_left">
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
              <Link className="Btn__apply Btn__apply_vacation" to="/profile">
                Sužinoti daugiau... <FontAwesomeIcon icon={faArrowRight} />
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Link>
            </div>
            <div className="Container__dashboard_lectures">
              <h2>
                <FontAwesomeIcon icon={faBook} /> Mano mokymai
              </h2>
              <h4>Vyksta: </h4>
              <div className="Container__dashboard_lecture_list">
                <div className="Container__dashboard_lecture_single Lecture__active">
                  <h3>Kubernetes basics</h3>
                  <div>
                    <div className="Container__date_dashboard">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p>Kaunas office, Lithuania</p>
                    </div>
                    <div className="Container__date_dashboard">
                      <FontAwesomeIcon icon={faCalendar} />{" "}
                      <p>2023-05-01 - 2023-07-01</p>
                    </div>
                  </div>
                </div>
              </div>
              <h4>Būsimi:</h4>
              <div className="Container__dashboard_lecture_list">
                <div className="Container__dashboard_lecture_single">
                  <h3>Kubernetes basics</h3>
                  <div>
                    <div className="Container__date_dashboard">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p>Vilnius office, Lithuania</p>
                    </div>
                    <div className="Container__date_dashboard">
                      <FontAwesomeIcon icon={faCalendar} />{" "}
                      <p>2023-09-01 - 2023-10-01</p>
                    </div>
                  </div>
                </div>
              </div>
              <Link className="Btn__apply Btn__lectures" to="/lectures">
                Sužinoti daugiau... <FontAwesomeIcon icon={faArrowRight} />
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Link>
            </div>
          </div>
          <div className="Container__dashboard_content_right">
            <div className="Container__dashboard_lunch">
              <div className="Container__dashboard_lunch_header">
                <h2>
                  <FontAwesomeIcon icon={faCutlery} /> Mano pietūs
                </h2>
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
                  <Link className="Btn__apply Btn__apply_lunch" to="/lunch">
                    Sužinoti daugiau... <FontAwesomeIcon icon={faArrowRight} />
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="Container__dashboard_events">
              <h2 className="Heading__swiper">
                <FontAwesomeIcon icon={faCalendarDay} /> Renginiai
              </h2>
              <Link className="Btn__apply Btn__swiper_dashboard" to="/events">
                Visi renginiai <FontAwesomeIcon icon={faArrowRight} />
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Link>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 10000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper swiper__dashboard"
              >
                <SwiperSlide>
                  <img src={event} alt="event" className="Image__event"></img>
                  <div className="Container__event_highlight">
                    <h1>DevOps Enterprise Summit</h1>
                    <div>
                      <h4>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="Icon__location"
                        />{" "}
                        Warsaw, Poland
                      </h4>
                      <h3>
                        <FontAwesomeIcon
                          icon={faClock}
                          className="Icon__location"
                        />{" "}
                        21 LAP 2024, 8:00
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={conference}
                    alt="event"
                    className="Image__event"
                  ></img>
                  <div className="Container__event_highlight">
                    <h1>DevOps Enterprise Summit</h1>
                    <div>
                      <h4>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="Icon__location"
                        />{" "}
                        Manchester, London
                      </h4>
                      <h3>
                        <FontAwesomeIcon
                          icon={faClock}
                          className="Icon__location"
                        />{" "}
                        21 LAP 2024, 8:00
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={conference_2}
                    alt="event"
                    className="Image__event"
                  ></img>
                  <div className="Container__event_highlight">
                    <h1>DevOps Enterprise Summit</h1>
                    <div>
                      <h4>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="Icon__location"
                        />{" "}
                        02 Arena, Prague
                      </h4>
                      <h3>
                        <FontAwesomeIcon
                          icon={faClock}
                          className="Icon__location"
                        />{" "}
                        21 LAP 2024, 8:00
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>

                <div className="autoplay-progress" slot="container-end">
                  <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                  </svg>
                  <span ref={progressContent}></span>
                </div>
              </Swiper>
            </div>
            <div className="Container__dashboard_posts">
              <div className="Container__dashboard_posts_header">
                <h2>
                  <FontAwesomeIcon icon={faEnvelopeOpenText} /> Darbo skelbimai
                </h2>
                <div>
                  <h3>
                    Paskutiniai pridėti <FontAwesomeIcon icon={faArrowDown} />
                  </h3>
                </div>
              </div>

              <div className="Container__recent">
                <div className="Container__posts_recent">
                  <div className="Post__recent_dashboard">
                    <div>
                      <h4>Frontend Engineer</h4>
                      <div className="Container__recent_details">
                        <div>
                          <FontAwesomeIcon icon={faAnglesUp} />
                        </div>
                        <p>Junior</p>
                      </div>
                      <div className="Container__recent_details">
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} />
                        </div>
                        <p>Kaunas, Lietuva</p>
                      </div>

                      <div className="Container__recent_details">
                        <div>
                          <FontAwesomeIcon icon={faCircleDollarToSlot} />
                        </div>
                        <p>1750$ - 3000$</p>
                      </div>
                    </div>
                    <div>
                      <p className="Paragraph__time">Paskelbta prieš: 2d.</p>
                    </div>
                    <div>
                      <button className="Btn__apply">
                        Pasiūlyti draugą <FontAwesomeIcon icon={faArrowRight} />
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </button>
                    </div>
                  </div>
                  <div className="Post__recent_dashboard">
                    <div>
                      <h4>Frontend Engineer</h4>

                      <div className="Container__recent_details">
                        <div>
                          <FontAwesomeIcon icon={faAnglesUp} />
                        </div>
                        <p>Junior</p>
                      </div>
                      <div className="Container__recent_details">
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} />
                        </div>
                        <p>Kaunas, Lietuva</p>
                      </div>

                      <div className="Container__recent_details">
                        <div>
                          <FontAwesomeIcon icon={faCircleDollarToSlot} />
                        </div>
                        <p>1750$ - 3000$</p>
                      </div>
                    </div>
                    <div>
                      <p className="Paragraph__time">Paskelbta prieš: 2d.</p>
                    </div>
                    <div>
                      <button className="Btn__apply">
                        Pasiūlyti draugą <FontAwesomeIcon icon={faArrowRight} />
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </button>
                    </div>
                  </div>
                  <div className="Post__recent_dashboard">
                    <div>
                      <h4>Frontend Engineer</h4>

                      <div className="Container__recent_details">
                        <div>
                          <FontAwesomeIcon icon={faAnglesUp} />
                        </div>
                        <p>Junior</p>
                      </div>
                      <div className="Container__recent_details">
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} />
                        </div>
                        <p>Kaunas, Lietuva</p>
                      </div>

                      <div className="Container__recent_details">
                        <div>
                          <FontAwesomeIcon icon={faCircleDollarToSlot} />
                        </div>
                        <p>1750$ - 3000$</p>
                      </div>
                    </div>
                    <div>
                      <p className="Paragraph__time">Paskelbta prieš: 2d.</p>
                    </div>
                    <div>
                      <button className="Btn__apply">
                        Pasiūlyti draugą
                        <FontAwesomeIcon icon={faArrowRight} />
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Link className="Btn__apply Btn__lectures" to="/posts">
                Visi darbo skelbimai... <FontAwesomeIcon icon={faArrowRight} />
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
