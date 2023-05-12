import React, { useRef, useState } from "react";
import Nav from "../../components/Nav";
import Event from "../../components/Event";
import logo from "../../components/images/Vector.svg";
import eventImage from "../../components/images/event.jpg";
import conference from "../../components/images/conference-1.jpeg";
import conference_2 from "../../components/images/conference-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faGraduationCap,
  faHand,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import fakeApi from "../../data/data.json";
import "./index.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ContentContext from "../../context/Content";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import GoogleMapReact from "google-map-react";
import Lecture from "../../components/Lecture";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const Events = () => {
  // const events = fakeApi.events;
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [isEventChosen, setIsEventChosen] = useState(false);

  const [selectedEvent, setEventSelected] = useState(null);

  console.log(isEventChosen);

  const center = {
    lat: 54.86463618199356,
    lng: 23.944770457672913,
  };

  const MapOptions = {
    zoomControl: true,
    mapTypeControl: false,
  };

  const eventData = fakeApi.events;

  let eventDataUpcoming = fakeApi.events;
  if (eventDataUpcoming.length >= 4) {
    eventDataUpcoming = eventDataUpcoming.slice(-4);
  }
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
                Naujausiai pridėti
                <FontAwesomeIcon icon={faArrowRight} className="Icon__header" />
              </h4>
              <div className="Container__search_events">
                <FontAwesomeIcon icon={faSearch} className="Icon__search" />
                <input type="text" placeholder="Ieškokite tarp įvykių..." />
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            isEventChosen
              ? "Container__learning_popup_bg"
              : "Container__learning_popup_bg Hidden"
          }
          onClick={() =>
            isEventChosen || isEventChosen === 0
              ? setIsEventChosen(false)
              : null
          }
        ></div>
        <div
          className={
            isEventChosen
              ? "Container__events_popup"
              : "Container__events_popup Hidden"
          }
        >
          <div className="Container__learning_popup_header">
            <div className="Container__events_popup_image">
              <img
                src={eventImage}
                alt="event"
                className="Image__events_popup"
              ></img>
            </div>
            <h2 className="Heading__events_popup_header">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="Icon__location"
              />
              {selectedEvent ? selectedEvent.title : ""}
            </h2>
            <FontAwesomeIcon
              icon={faX}
              className="Icon__popup Icon__popup_events"
              onClick={() =>
                isEventChosen || isEventChosen === 0
                  ? setIsEventChosen(false)
                  : null
              }
            />
          </div>
          <div className="Container__popup_info Container__popup_info_events">
            <div className="Container__popup_details">
              <h4>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="Icon__location"
                />
                {selectedEvent ? selectedEvent.place : ""}
              </h4>
              <h4>
                <FontAwesomeIcon icon={faCalendar} className="Icon__location" />
                {selectedEvent ? selectedEvent.date : ""}
              </h4>
              <p>{selectedEvent ? selectedEvent.description : ""}</p>
            </div>
            <LoadScript googleMapsApiKey="AIzaSyDzILljratmTZbvzMz3ULfqfhRd7nA7LUg">
              <GoogleMap
                mapContainerClassName="Map__popup_events"
                center={center}
                zoom={17}
                options={MapOptions}
              >
                <></>
              </GoogleMap>
            </LoadScript>
          </div>
          <div>
            <button
              className="Btn__apply Btn__popup"
              onClick={() => {
                if (selectedEvent) {
                  alert(
                    `Jūs sėkmingai aplikavote į renginį ${selectedEvent.title}!`
                  );
                  window.location.reload(false);
                }
              }}
            >
              Norėčiau dalyvauti! <FontAwesomeIcon icon={faHand} />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        <div className="Container__events_upcoming">
          {eventDataUpcoming.map((event, i) => {
            return (
              <Event
                key={i}
                event={event}
                image={eventImage}
                onClick={() => {
                  setEventSelected(event);
                  setIsEventChosen(true);
                }}
                isRecent={true}
              />
            );
          })}
          {/* <div className="Container__event_upcoming_single">
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
          </div> */}
          {/* <div className="Container__event_upcoming_single">
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
          </div> */}
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
              {eventDataUpcoming.map((event, i) => {
                return (
                  <SwiperSlide
                    onClick={() => {
                      setEventSelected(event);
                      setIsEventChosen(true);
                    }}
                  >
                    <img
                      src={eventImage}
                      alt="event"
                      className="Image__event"
                    ></img>
                    <div className="Container__event_highlight">
                      <h1>{event.title}</h1>
                      <div>
                        <h4>
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="Icon__location"
                          />
                          {event.place}
                        </h4>
                        <h3>
                          <FontAwesomeIcon
                            icon={faClock}
                            className="Icon__location"
                          />
                          {event.date}
                        </h3>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
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
          {eventData.map((event, i) => {
            return (
              <Event
                key={i}
                event={event}
                image={eventImage}
                onClick={() => {
                  setEventSelected(event);
                  setIsEventChosen(true);
                }}
                isRecent={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;
