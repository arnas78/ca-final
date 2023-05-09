import React, { useRef } from "react";
import Nav from "../../components/Nav";
import logo from "../../components/images/Vector.svg";
import event from "../../components/images/event.jpg";
import conference from "../../components/images/conference-1.jpeg";
import conference_2 from "../../components/images/conference-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
// import fakeApi from "../../data/data.json";
import "./index.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ContentContext from "../../context/Content";

const Events = () => {
  // const events = fakeApi.events;
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  // const { appliedEvents, applyEvent } = useContext(ContentContext);

  return (
    <div className="Section__events">
      <div className="background"></div>
      <div className="Color__block"></div>
      <Nav image={logo} />

      <div className="Container__events">
        <div className="Header__events">
          <div>
            <h1>Aplikuokite į renginius, konferencijas!</h1>
            <div className="Container__events_header">
              <h4>
                Artimiausi įvykiai
                <FontAwesomeIcon icon={faArrowRight} className="Icon__header" />
              </h4>
              <div className="Container__search_events">
                <FontAwesomeIcon icon={faSearch} className="Icon__search" />
                <input type="text" placeholder="Ieškokite tarp įvykių..." />
              </div>
            </div>
          </div>
        </div>
        <div className="Container__events_upcoming">
          <div className="Container__event_upcoming_single">
            <div>
              <div className="Event__upcoming_date">
                <h4>20</h4>
                <p>NOV</p>
              </div>
              <div>
                <h3>All American Reject EU Tour</h3>
              </div>
            </div>
            <div className="Event__upcoming_place">
              <p>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="Icon__location"
                />{" "}
                Lanxess Arena, Cologne
              </p>
            </div>
          </div>
          <div className="Container__event_upcoming_single">
            <div>
              <div className="Event__upcoming_date">
                <h4>20</h4>
                <p>NOV</p>
              </div>
              <div>
                <h3>All American Reject EU Tour</h3>
              </div>
            </div>
            <div className="Event__upcoming_place">
              <p>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="Icon__location"
                />{" "}
                Lanxess Arena, Cologne
              </p>
            </div>
          </div>
          <div className="Container__event_upcoming_single">
            <div>
              <div className="Event__upcoming_date">
                <h4>20</h4>
                <p>NOV</p>
              </div>
              <div>
                <h3>All American Reject EU Tour</h3>
              </div>
            </div>
            <div className="Event__upcoming_place">
              <p>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="Icon__location"
                />{" "}
                Lanxess Arena, Cologne
              </p>
            </div>
          </div>
          <div className="Container__event_upcoming_single">
            <div>
              <div className="Event__upcoming_date">
                <h4>20</h4>
                <p>NOV</p>
              </div>
              <div>
                <h3>All American Reject EU Tour</h3>
              </div>
            </div>
            <div className="Event__upcoming_place">
              <p>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="Icon__location"
                />{" "}
                Lanxess Arena, Cologne
              </p>
            </div>
          </div>
        </div>

        <div className="Container__event_events">
          <h1>
            Populiariausi{" "}
            <FontAwesomeIcon icon={faArrowRight} className="Icon__header" />
          </h1>
          <div className="Container__image_event">
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
              className="mySwiper"
            >
              <SwiperSlide>
                <img src={event} alt="event" className="Image__event"></img>
                <div className="Container__event_highlight">
                  <h1>DevOps Enterprise Summit</h1>
                  <div>
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
        </div>
        <div className="Header__event_posts">
          <h1>
            Visi renginiai
            <FontAwesomeIcon icon={faArrowRight} className="Icon__header" />
          </h1>
        </div>
        <div className="Container__event_posts">
          <div className="Container__event_single">
            <div className="Container__event_image">
              <img
                src={event}
                alt="event"
                className="Image__event_single"
              ></img>
              <div className="Event__single_location">
                <p>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="Icon__location"
                  />{" "}
                  Lanxess Arena, Cologne
                </p>
              </div>
            </div>
            <div className="Container__event_details">
              <h3>DevOps enterprise summit</h3>
              <div>
                <p>
                  <FontAwesomeIcon icon={faClock} className="Icon__location" />{" "}
                  21 LAP 2024, 8:00
                </p>
              </div>
              <div className="Container__event_single_tags">
                <div className="Container__event_single_tag">
                  <p>DevOps</p>
                </div>
                <div className="Container__event_single_tag">
                  <p>Cloud</p>
                </div>
              </div>
              <div>
                <button className="Btn__apply Btn__event_single">
                  Sužinoti daugiau <FontAwesomeIcon icon={faArrowRight} />
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
          <div className="Container__event_single">
            <div className="Container__event_image">
              <img
                src={event}
                alt="event"
                className="Image__event_single"
              ></img>
              <div className="Event__single_location">
                <p>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="Icon__location"
                  />{" "}
                  Lanxess Arena, Cologne
                </p>
              </div>
            </div>
            <div className="Container__event_details">
              <h3>DevOps enterprise summit</h3>
              <div>
                <p>
                  <FontAwesomeIcon icon={faClock} className="Icon__location" />{" "}
                  21 LAP 2024, 8:00
                </p>
              </div>
              <div className="Container__event_single_tags">
                <div className="Container__event_single_tag">
                  <p>DevOps</p>
                </div>
                <div className="Container__event_single_tag">
                  <p>Cloud</p>
                </div>
              </div>
              <div>
                <button className="Btn__apply Btn__event_single">
                  Sužinoti daugiau <FontAwesomeIcon icon={faArrowRight} />
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
          <div className="Container__event_single">
            <div className="Container__event_image">
              <img
                src={event}
                alt="event"
                className="Image__event_single"
              ></img>
              <div className="Event__single_location">
                <p>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="Icon__location"
                  />{" "}
                  Lanxess Arena, Cologne
                </p>
              </div>
            </div>
            <div className="Container__event_details">
              <h3>DevOps enterprise summit</h3>
              <div>
                <p>
                  <FontAwesomeIcon icon={faClock} className="Icon__location" />{" "}
                  21 LAP 2024, 8:00
                </p>
              </div>
              <div className="Container__event_single_tags">
                <div className="Container__event_single_tag">
                  <p>DevOps</p>
                </div>
                <div className="Container__event_single_tag">
                  <p>Cloud</p>
                </div>
              </div>
              <div>
                <button className="Btn__apply Btn__event_single">
                  Sužinoti daugiau <FontAwesomeIcon icon={faArrowRight} />
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
          <div className="Container__event_single">
            <div className="Container__event_image">
              <img
                src={event}
                alt="event"
                className="Image__event_single"
              ></img>
              <div className="Event__single_location">
                <p>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="Icon__location"
                  />{" "}
                  Lanxess Arena, Cologne
                </p>
              </div>
            </div>
            <div className="Container__event_details">
              <h3>DevOps enterprise summit</h3>
              <div>
                <p>
                  <FontAwesomeIcon icon={faClock} className="Icon__location" />{" "}
                  21 LAP 2024, 8:00
                </p>
              </div>
              <div className="Container__event_single_tags">
                <div className="Container__event_single_tag">
                  <p>DevOps</p>
                </div>
                <div className="Container__event_single_tag">
                  <p>Cloud</p>
                </div>
              </div>
              <div>
                <button className="Btn__apply Btn__event_single">
                  Sužinoti daugiau <FontAwesomeIcon icon={faArrowRight} />
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
          <div className="Container__event_single">
            <div className="Container__event_image">
              <img
                src={event}
                alt="event"
                className="Image__event_single"
              ></img>
              <div className="Event__single_location">
                <p>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="Icon__location"
                  />{" "}
                  Lanxess Arena, Cologne
                </p>
              </div>
            </div>
            <div className="Container__event_details">
              <h3>DevOps enterprise summit</h3>
              <div>
                <p>
                  <FontAwesomeIcon icon={faClock} className="Icon__location" />{" "}
                  21 LAP 2024, 8:00
                </p>
              </div>
              <div className="Container__event_single_tags">
                <div className="Container__event_single_tag">
                  <p>DevOps</p>
                </div>
                <div className="Container__event_single_tag">
                  <p>Cloud</p>
                </div>
              </div>
              <div>
                <button className="Btn__apply Btn__event_single">
                  Sužinoti daugiau <FontAwesomeIcon icon={faArrowRight} />
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
