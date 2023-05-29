import React, { useRef, useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Nav from "../../components/Nav";
import Event from "../../components/Event";
import logo from "../../components/images/Vector.svg";
import eventImage from "../../components/images/event.jpg";
import conference from "../../components/images/conference-1.jpeg";
import conference_2 from "../../components/images/conference-2.png";
import ContentContext from "../../context/Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faGraduationCap,
  faHand,
  faPen,
  faPlug,
  faPlus,
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
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import GoogleMapReact from "google-map-react";
import Lecture from "../../components/Lecture";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const Events = () => {
  const [authenticated, setauthenticated] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  // const events = fakeApi.events;
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [isEventChosen, setIsEventChosen] = useState(false);

  const [selectedEvent, setEventSelected] = useState(null);

  const { eventsData, orderData, backendData, setEventsData } =
    useContext(ContentContext);

  const center = {
    lat: 54.86463618199356,
    lng: 23.944770457672913,
  };

  const MapOptions = {
    zoomControl: true,
    mapTypeControl: false,
  };

  const eventData =
    typeof eventsData.events === "undefined"
      ? fakeApi.events
      : eventsData.events;

  let eventDataUpcoming = eventData;
  if (eventDataUpcoming.length >= 4) {
    eventDataUpcoming = eventDataUpcoming.slice(-4);
  }

  const [sampleEvents, setSampleEvents] = useState(eventData);
  const [upcomingEvents, setUpcomingEvents] = useState(eventDataUpcoming);

  function handleClick() {
    if (selectedEvent && orderData !== "undefined") {
      console.log(orderData);

      let obj = {};

      const arrLength = orderData.orders.filter((obj) => {
        return (
          obj.obj_id === selectedEvent._id && backendData._id === obj.user_id
        );
      }).length;

      if (arrLength === 0) {
        obj = {
          user_id: backendData._id,
          type: "events",
          obj_id: selectedEvent._id,
        };

        // Send data to the backend via POST
        fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj), // body data type must match "Content-Type" header
        });

        alert(`Jūs sėkmingai aplikavote į renginį!`);
        window.location.reload(false);
      } else {
        alert(`Šiame renginyje jau aplikavote.`);
      }
    }
  }

  const [adminPopup, setAdminPopup] = useState(false);
  const [adminPopupEdit, setAdminPopupEdit] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const handleEvents = () => {
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => {
        setSampleEvents(data.events);
        setUpcomingEvents(data.events.slice(-4));
        setEventsData(data);
      });
  };

  const handleAdminPopup = () => {
    setAdminPopup((prevCheck) => !prevCheck);
  };

  const adminHandleTitle = (e) => {
    setEventTitle(e.target.value);
  };

  const adminHandleDate = (e) => {
    setEventDate(e.target.value);
  };

  const adminHandlePlace = (e) => {
    setEventPlace(e.target.value);
  };

  const adminHandleDescription = (e) => {
    setEventDescription(e.target.value);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handlePicture = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const handleAdminPopupEdit = (e) => {
    setAdminPopupEdit((prevCheck) => !prevCheck);
    setIsEventChosen(false);
    if (selectedEvent) {
      setEventTitle(selectedEvent.title);
      setEventDate(selectedEvent.date);
      setEventPlace(selectedEvent.place);
      setEventDescription(selectedEvent.description);
    }
  };

  const handleUpload = (e) => {
    if (
      eventTitle.length === 0 ||
      eventDate.length === 0 ||
      eventPlace.length === 0 ||
      eventDescription.length === 0 ||
      !selectedFile
    ) {
      alert("Neteisingi duomenys. Bandykite dar kartą.");
    } else {
      const formData = new FormData();
      formData.append("title", eventTitle);
      formData.append("date", eventDate);
      formData.append("place", eventPlace);
      formData.append("description", eventDescription);
      formData.append("image", selectedFile);

      const data = fetch("http://localhost:5000/api/events", {
        method: "POST",
        body: formData,
      }).catch((err) => ("Error occured", err));
      alert("Sėkmingai sukūrėte renginį!");
      handleAdminPopup();
      handleEvents();
      setEventTitle("");
      setEventDate("");
      setEventPlace("");
      setEventDescription("");
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      fetch(`http://localhost:5000/api/events/` + selectedEvent._id, {
        method: "DELETE",
      });
      alert("Sėkmingai ištrynėte renginį " + selectedEvent.title);
      setIsEventChosen(false);
      handleEvents();
    }
  };

  const handleUpdate = (e) => {
    if (selectedEvent) {
      if (
        eventTitle.length === 0 ||
        eventDate.length === 0 ||
        eventPlace.length === 0 ||
        eventDescription.length === 0
      ) {
        alert("Neteisingi duomenys. Bandykite dar kartą.");
      } else {
        let eventObj = {
          title: eventTitle,
          date: eventDate,
          place: eventPlace,
          description: eventDescription,
        };

        const data = fetch(
          "http://localhost:5000/api/events/" + selectedEvent._id,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(eventObj),
          }
        ).catch((err) => ("Error occured", err));
        alert("Sėkmingai atnaujinote renginį!");
        handleAdminPopupEdit();
        handleEvents();
        setEventTitle("");
        setEventDate("");
        setEventPlace("");
        setEventDescription("");
      }
    }
  };

  if (!authenticated) {
    return <Navigate replace to="/login" />;
  } else {
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
                  Pateikite prašymus į renginius/konferencijas! Pateikus
                  prašymą, su jumis susisieks jūsų komandos ar bendrinis vadovas
                  dėl tolimesnės informacijos.
                </h4>
                <p>
                  Naujausiai pridėti
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="Icon__header"
                  />
                </p>
              </div>
            </div>
          </div>

          <div
            className={
              adminPopup
                ? "Container__learning_popup_bg"
                : "Container__learning_popup_bg Opacity"
            }
            onClick={handleAdminPopup}
          ></div>
          <div
            className={
              adminPopup
                ? "Container__popup_admin_create"
                : "Container__popup_admin_create Opacity"
            }
          >
            <h2>Naujas renginys</h2>
            <div className="Container__popup_admin_create_inputs">
              <div>
                <label>Pavadinimas</label>
                <input
                  type="text"
                  className="Input__admin"
                  placeholder="Renginio pavadinimas"
                  onChange={adminHandleTitle}
                ></input>
              </div>
              <div>
                <label>Renginio data (DD MON YYYY, HH:MM)</label>
                <input
                  type="text"
                  className="Input__admin"
                  placeholder="Renginio data"
                  onChange={adminHandleDate}
                />
              </div>
              <div>
                <label>Vieta</label>
                <input
                  type="text"
                  className="Input__admin"
                  placeholder="Renginio vieta"
                  onChange={adminHandlePlace}
                />
              </div>

              <div>
                <label>Aprašymas</label>
                <input
                  type="text"
                  className="Input__admin"
                  placeholder="Renginio aprašymas"
                  onChange={adminHandleDescription}
                />
              </div>
              <div className="Container__post_popup_cv">
                <label for="file-upload" class="custom-file-upload">
                  Įkelkite nuotrauką
                </label>
                <input
                  accept="image/*"
                  id="file-upload"
                  type="file"
                  onChange={handlePicture}
                />
                <img
                  className="Image__admin"
                  src={selectedFile ? preview : ""}
                  alt=" "
                ></img>
              </div>
            </div>

            <button className="Btn__apply Btn__popup" onClick={handleUpload}>
              Sukurti naują renginį
              <FontAwesomeIcon icon={faPlus} />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <div
            className={
              adminPopupEdit
                ? "Container__popup_admin_create"
                : "Container__popup_admin_create Opacity"
            }
          >
            <h2>Redaguoti renginį</h2>
            <div className="Container__popup_admin_create_inputs">
              <div>
                <label>Pavadinimas</label>
                <input
                  type="text"
                  className="Input__admin"
                  placeholder="Renginio pavadinimas"
                  defaultValue={selectedEvent ? selectedEvent.title : ""}
                  onChange={adminHandleTitle}
                ></input>
              </div>
              <div>
                <label>Renginio data (DD MON YYYY, HH:MM)</label>
                <input
                  type="text"
                  className="Input__admin"
                  placeholder="Renginio data"
                  defaultValue={selectedEvent ? selectedEvent.date : ""}
                  onChange={adminHandleDate}
                />
              </div>
              <div>
                <label>Vieta</label>
                <input
                  type="text"
                  className="Input__admin"
                  placeholder="Renginio vieta"
                  defaultValue={selectedEvent ? selectedEvent.place : ""}
                  onChange={adminHandlePlace}
                />
              </div>

              <div>
                <label>Aprašymas</label>
                <input
                  type="text"
                  className="Input__admin"
                  placeholder="Renginio aprašymas"
                  defaultValue={selectedEvent ? selectedEvent.description : ""}
                  onChange={adminHandleDescription}
                />
              </div>
              <div className="Container__post_popup_cv">
                <label for="file-upload" class="custom-file-upload">
                  Įkelkite nuotrauką
                </label>
                <input
                  accept="image/*"
                  id="file-upload"
                  type="file"
                  onChange={handlePicture}
                />
                {selectedEvent ? (
                  <img
                    className="Image__admin"
                    src={selectedFile ? preview : selectedEvent.image}
                    alt=" "
                  ></img>
                ) : (
                  <img
                    className="Image__admin"
                    src={selectedFile ? preview : ""}
                    alt=" "
                  ></img>
                )}
              </div>
            </div>

            <button className="Btn__apply Btn__popup" onClick={handleUpdate}>
              Atnaujinti mokymus
              <FontAwesomeIcon icon={faPlus} />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <div
            className={
              adminPopupEdit
                ? "Container__learning_popup_bg"
                : "Container__learning_popup_bg Opacity"
            }
            onClick={handleAdminPopupEdit}
          ></div>

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
                  src={selectedEvent ? selectedEvent.image : ""}
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
              <div className="Container__events_popup_tags">
                {selectedEvent && selectedEvent.tags
                  ? selectedEvent.tags.map((tag, i) => {
                      return (
                        <div className="Container__event_single_tag">
                          <p>{tag}</p>
                        </div>
                      );
                    })
                  : ""}
              </div>
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
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="Icon__location"
                  />
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
              {authenticated.level === 9 ? (
                <div className="Container__admin_buttons">
                  <button
                    className="Button__sort Button__admin"
                    onClick={handleDeleteEvent}
                  >
                    <FontAwesomeIcon
                      icon={faX}
                      className="Icon__sort Icon__admin"
                    />{" "}
                    Ištrinti mokymus
                  </button>
                  <button
                    className="Button__sort Button__admin"
                    onClick={handleAdminPopupEdit}
                  >
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
          </div>
          <div className="Container__events_upcoming">
            {upcomingEvents.map((event, i) => {
              return (
                <Event
                  key={i}
                  event={event}
                  image={event.image}
                  onClick={() => {
                    setEventSelected(event);
                    setIsEventChosen(true);
                  }}
                  isRecent={true}
                />
              );
            })}
          </div>

          <div className="Container__event_events">
            <div className="Container__event_events_header">
              <h1>
                Populiariausi{" "}
                <FontAwesomeIcon icon={faArrowRight} className="Icon__header" />
              </h1>
              {authenticated.level === 9 ? (
                <button
                  className="Button__sort Button__admin"
                  onClick={handleAdminPopup}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="Icon__sort Icon__admin"
                  />{" "}
                  Pridėti renginį
                </button>
              ) : (
                ""
              )}
            </div>

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
                {upcomingEvents.map((event, i) => {
                  return (
                    <SwiperSlide
                      onClick={() => {
                        setEventSelected(event);
                        setIsEventChosen(true);
                      }}
                    >
                      <img
                        src={event.image}
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
            <div className="Container__search_events">
              <FontAwesomeIcon icon={faSearch} className="Icon__search" />
              <input type="text" placeholder="Ieškokite tarp įvykių..." />
            </div>
          </div>
          <div className="Container__event_posts">
            {sampleEvents.map((event, i) => {
              return (
                <Event
                  key={i}
                  event={event}
                  image={event.image}
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
  }
};

export default Events;
