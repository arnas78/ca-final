import React, { useState, useContext, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
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
  faGraduationCap,
  faHand,
  faUser,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import Order from "../../components/Order";
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
import { render } from "@testing-library/react";
import GoogleMapReact from "google-map-react";
import Lecture from "../../components/Lecture";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Post from "../../components/Post";

const center = {
  lat: 54.86463618199356,
  lng: 23.944770457672913,
};

const MapOptions = {
  zoomControl: true,
  mapTypeControl: false,
};

const Dashboard = () => {

  const [authenticated, setauthenticated] = useState(localStorage.getItem("user"));

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

  let eventDataUpcoming = fakeApi.events;
  if (eventDataUpcoming.length >= 4) {
    eventDataUpcoming = eventDataUpcoming.slice(-4);
  }

  const [attendeesOpen, setAttendeesOpen] = useState(false);
  const [lectureSelected, setLectureSelected] = useState(null);
  const allLectures = fakeApi.lectures.slice(-2);
  const [chosenPost, setChosenPost] = useState(null);
  const [isPostChosen, setPostChosen] = useState(false);
  const [isEventChosen, setIsEventChosen] = useState(false);

  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSurname = (event) => {
    setSurname(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const [selectedEvent, setEventSelected] = useState(null);

  const {
    soupChosen,
    mainChosen,
    weekdayChosen,
    backendData,
    userExtra,
    eventsData,
    postData,
    vacationData,
    lectureData,
    orderData,
    referData,
    mealData,
  } = useContext(ContentContext);

  let postDataRecent =
    typeof postData.posts === "undefined" ? fakeApi.posts : postData.posts;
  if (postDataRecent.length >= 3) {
    postDataRecent = postDataRecent.slice(-3);
  }

  let eventData =
    typeof eventsData.events === "undefined"
      ? fakeApi.events
      : eventsData.events;

  const [soupData, setSoupData] = useState(
    typeof mealData.meals === "undefined"
      ? fakeApi.soups[0].soups
      : mealData.meals.filter((obj) => {
          return obj.type === "soup";
        })
  );
  const [sampleData, setSampleData] = useState(
    typeof mealData.meals === "undefined"
      ? fakeApi.main[0].mains
      : mealData.meals.filter((obj) => {
          return obj.type === "main";
        })
  );

  const userOrders =
    typeof orderData.orders === "undefined"
      ? []
      : orderData.orders.filter(
          (obj) => obj.user_id === "646a4910cc114a5a37df1014"
        );

  const renderMeals = () => {
    let arr =
      typeof mealData.meals === "undefined"
        ? fakeApi.main[0].mains
        : mealData.meals;

    console.log(arr);

    if (soupChosen || mainChosen) {
      if (soupChosen && mainChosen < 0) {
        return (
          <Meal
            meal={soupData[soupChosen]}
            isChosen={soupChosen}
            image={food}
            profile={profile}
            dashboard={true}
          />
        );
      } else if (mainChosen && soupChosen < 0) {
        return (
          <Meal
            meal={allMeals[weekdayChosen].mains[mainChosen]}
            isChosen={mainChosen}
            image={food}
            profile={profile}
            dashboard={true}
          />
        );
      } else if (mainChosen >= 0 && soupChosen >= 0) {
        return (
          <div>
            <Meal
              meal={allSoups[weekdayChosen].soups[soupChosen]}
              isChosen={soupChosen}
              image={food}
              profile={profile}
              dashboard={true}
            />
            ;
            <Meal
              meal={allMeals[weekdayChosen].mains[mainChosen]}
              isChosen={mainChosen}
              image={food}
              profile={profile}
              dashboard={true}
            />
          </div>
        );
      }
    } else {
      return (
        <h4 className="Heading__lunch_empty">
          Šią dieną jūs nieko neužsisakėte! Norėdami užsisakyti pietus,
          spauskite PIETŲ SISTEMA...
        </h4>
      );
    }
  };

  function handleClickPosts() {
    if (isPostChosen && referData !== "undefined") {
      let obj = {};

      if (
        name.length === 0 ||
        surname.length === 0 ||
        email.length === 0 ||
        phone.length === 0
      ) {
        alert("Įveskite visus duomenis!");
      } else {
        obj = {
          user_id: "646a4910cc114a5a37df1014",
          title: chosenPost.title,
          name: name,
          surname: surname,
          email: email,
          phone: phone,
        };

        // Send data to the backend via POST
        fetch("http://localhost:5000/api/refers", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj), // body data type must match "Content-Type" header
        });

        alert(`Jūs sėkmingai pateikėte aplikaciją dėl ${chosenPost.title}!`);
        window.location.reload(false);
      }
    }
  }

  function handleClickEvents() {
    if (selectedEvent && orderData !== "undefined") {
      console.log(orderData);

      let obj = {};

      const arrLength = orderData.orders.filter((obj) => {
        return obj.obj_id === selectedEvent._id;
      }).length;

      console.log(arrLength);

      if (arrLength === 0) {
        obj = {
          user_id: "646a4910cc114a5a37df1014",
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


  const userVacations =
    typeof vacationData.vacations === "undefined"
      ? []
      : vacationData.vacations.filter(
          (obj) => obj.user_id === "646a4910cc114a5a37df1014"
        );

  if (!authenticated){
    return <Navigate replace to="/login" />;
  }
  else {
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
                  src={typeof userExtra === "undefined" ? image : userExtra.image}
                  alt="profile_image"
                ></img>
                <h3 className="Heading__my_profile">Mano profilis</h3>
              </Link>
            </div>
            <div>
              <h1>
                Sveiki,{" "}
                {typeof backendData === "undefined" ? (
                  <p>Loading...</p>
                ) : (
                  backendData.name
                )}
                !
              </h1>
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
                  <FontAwesomeIcon icon={faPlane} /> Atostogos
                </h2>
                <div>
                  <div className="Container__vacation_days_dashboard">
                    <FontAwesomeIcon icon={faClipboard} id="vacation_dashboard" />
                    <h4>
                      {typeof userExtra === "undefined"
                        ? "Loading..."
                        : userExtra.vacation_days}{" "}
                      dienos(-ų)
                    </h4>
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
                <div
                  className={
                    lectureSelected
                      ? "Container__learning_popup_bg"
                      : "Container__learning_popup_bg Inactive"
                  }
                  onClick={() =>
                    lectureSelected ? setLectureSelected(null) : null
                  }
                ></div>
                <div
                  className={
                    lectureSelected
                      ? "Container__learning_popup"
                      : "Container__learning_popup Inactive"
                  }
                >
                  <div
                    className={
                      attendeesOpen
                        ? "Container__learning_popup_all_atendees Attendees__all_active"
                        : "Container__learning_popup_all_atendees"
                    }
                  >
                    <div className="Container__learning_popup_all_atendees_header">
                      <h3>Visi dalyviai</h3>
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="Icon__popup"
                        onClick={() => {
                          setAttendeesOpen((current) => !current);
                        }}
                      />
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/10" />
                      </span>
                      <h4>Konstantinasasas P.</h4>
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/20" />
                      </span>
                      <h4>Vardenis P.</h4>
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/30" />
                      </span>
                      <h4>Vardenis P.</h4>
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/40" />
                      </span>
                      <h4>Vardenis P.</h4>
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/50" />
                      </span>
                      <h4>Vardenis P.</h4>
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/60" />
                      </span>
                      <h4>Vardenis P.</h4>
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/70" />
                      </span>
                      <h4>Vardenis P.</h4>
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/80" />
                      </span>
                      <h4>Vardenis P.</h4>
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/90" />
                      </span>
                      <h4>Vardenis P.</h4>
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/100" />
                      </span>
                      <h4>Vardenis P.</h4>
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/110" />
                      </span>
                      <h4>Vardenis P.</h4>
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/120" />
                      </span>
                      <h4>Vardenis P.</h4>
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/130" />
                      </span>
                      <h4>Vardenis P.</h4>
                    </div>
                    <div className="Container__popup_attendees_single_all">
                      <span class="avatar__popup">
                        <img src="https://picsum.photos/140" />
                      </span>
                      <h4>Vardenis P.</h4>
                    </div>
                  </div>
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
                        lectureSelected ? setLectureSelected(null) : null
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
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="Icon__location"
                        />
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
                    <h4>
                      <FontAwesomeIcon icon={faUser} className="Icon__location" />
                      Dalyviai:
                    </h4>
                    <div className="Container__popup_attendees">
                      <div className="Container__popup_attendees_single">
                        <span class="avatar__popup">
                          <img src="https://picsum.photos/10" />
                        </span>
                        <h4>Vardenis P.</h4>
                      </div>
                      <div className="Container__popup_attendees_single">
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
                      </div>
                      <div
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
                      </div>
                    </div>
                  </div>
                </div>
                <h2>
                  <FontAwesomeIcon icon={faBook} /> Mokymai
                </h2>
                <h4>Mano mokymai: </h4>
                <div className="Container__dashboard_lecture_list">
                  {typeof orderData.orders === "undefined" ||
                  typeof lectureData.lectures === "undefined" ? (
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
                            <Lecture
                              key={i}
                              lecture={lectureData.lectures[index]}
                              onClick={() => {
                                setLectureSelected(lectureData.lectures[index]);
                              }}
                              dashboard={true}
                            />
                            // <Order
                            //   key={i}
                            //   obj={lectureData.lectures[index]}
                            //   order={order}
                            //   type={"lecture_dashboard"}
  
                            // />
                          );
                        }
                      }
                    })
                  )}
                </div>
                {/* <h4>Būsimi:</h4>
                <div className="Container__dashboard_lecture_list">
                  {allLectures.map((lecture, i) => {
                    return (
                      <Lecture
                        key={i}
                        lecture={lecture}
                        onClick={() => {
                          setLectureSelected(lecture);
                        }}
                        dashboard={true}
                      />
                    );
                  })}
                </div> */}
                <Link className="Btn__apply Btn__lectures" to="/lectures">
                  Visi mokymai... <FontAwesomeIcon icon={faArrowRight} />
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </Link>
              </div>
            </div>
            <div className="Container__dashboard_content_right">
              {/* <div className="Container__dashboard_lunch">
                <div className="Container__dashboard_lunch_header">
                  <h2>
                    <FontAwesomeIcon icon={faCutlery} /> Pietūs ofise
                  </h2>
                  <div className="Container__dashboard_lunch_date">
                    <h4>
                      <FontAwesomeIcon icon={faCalendar} /> Pirmadienis
                    </h4>
                  </div>
                </div>
                <div className="Container__dashboard_lunch_content">
                  {renderMeals()}
                </div>
                <div className="Container__dashboard_lunch_footer">
                  <div>
                    <h4>
                      Viso:{" "}
                      {(mainChosen || soupChosen
                        ? allMeals[weekdayChosen].mains[mainChosen].price +
                          allSoups[weekdayChosen].soups[soupChosen].price
                        : 0
                      ).toFixed(2)}
                      &nbsp;
                      <FontAwesomeIcon icon={faEuro} />
                    </h4>
                  </div>
                  <div>
                    <Link className="Btn__apply Btn__apply_lunch" to="/lunch">
                      Pietų sistema <FontAwesomeIcon icon={faArrowRight} />
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </Link>
                  </div>
                </div>
              </div> */}
              <div className="Container__dashboard_events">
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
                    <button
                      className="Btn__apply Btn__popup"
                      onClick={handleClickEvents}
                    >
                      Norėčiau dalyvauti! <FontAwesomeIcon icon={faHand} />
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </div>
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
                  {eventData.map((event, i) => {
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
                <div
                  className={
                    isPostChosen
                      ? "Container__learning_popup_bg"
                      : "Container__learning_popup_bg Opacity"
                  }
                  onClick={() => (isPostChosen ? setPostChosen(false) : null)}
                ></div>
                <div
                  className={
                    isPostChosen
                      ? "Container__posts_popup"
                      : "Container__posts_popup Opacity"
                  }
                >
                  <div className="Container__learning_popup_header">
                    <h2>
                      <FontAwesomeIcon
                        icon={faEnvelopeOpenText}
                        className="Icon__location"
                      />
                      {chosenPost ? chosenPost.title : ""}
                    </h2>
                    <FontAwesomeIcon
                      icon={faX}
                      className="Icon__popup"
                      onClick={() =>
                        isPostChosen || chosenPost === 0
                          ? setPostChosen(false)
                          : null
                      }
                    />
                  </div>
                  <div className="Container__popup_info">
                    <div className="Container__popup_details Container__popup_details_posts">
                      <div>
                        <h4>
                          <FontAwesomeIcon
                            icon={faAnglesUp}
                            className="Icon__location"
                          />
                          {chosenPost ? chosenPost.level : ""}
                        </h4>
                        <h4>
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="Icon__location"
                          />
                          {chosenPost ? chosenPost.location : ""}
                        </h4>
  
                        <h4>
                          <FontAwesomeIcon
                            icon={faCircleDollarToSlot}
                            className="Icon__location"
                          />
                          {chosenPost ? chosenPost.payrange : ""}
                        </h4>
                      </div>
  
                      <div className="Container__popup_posts_tags">
                        {chosenPost
                          ? chosenPost.tags.map((tag, i) => {
                              return (
                                <div className="Tag__popup_post_single">
                                  {tag}
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                    <LoadScript googleMapsApiKey="AIzaSyDzILljratmTZbvzMz3ULfqfhRd7nA7LUg">
                      <GoogleMap
                        mapContainerClassName="Map__popup_posts"
                        center={center}
                        zoom={17}
                        options={MapOptions}
                      >
                        <></>
                      </GoogleMap>
                    </LoadScript>
                  </div>
                  <div className="Container__post_popup_details">
                    <div>
                      <h4>Aprašymas</h4>
                      <p>{chosenPost ? chosenPost.description : ""}</p>
                    </div>
                    <div>
                      <h4>Reikalavimai</h4>
                      <ul>
                        {chosenPost
                          ? chosenPost.requirements.map((requirement, i) => {
                              return <li key={i}>{requirement}</li>;
                            })
                          : ""}
                      </ul>
                    </div>
                  </div>
  
                  <div className="Container__post_popup_apply">
                    <h4>Informacija</h4>
                    <div className="Container__post_popup_inputs">
                      <div className="Container__post_popup_inputs_single">
                        <label>Vardas</label>
                        <input
                          type="text"
                          className="Input__post"
                          placeholder="Vardenis"
                          onChange={handleName}
                          value={name}
                        />
                      </div>
                      <div className="Container__post_popup_inputs_single">
                        <label>Pavardė</label>
                        <input
                          type="text"
                          className="Input__post"
                          placeholder="Pavardenis"
                          onChange={handleSurname}
                          value={surname}
                        />
                      </div>
                      <div className="Container__post_popup_inputs_single">
                        <label>El. paštas</label>
                        <input
                          type="text"
                          className="Input__post"
                          placeholder="v.pavardenis@email.com"
                          onChange={handleEmail}
                          value={email}
                        />
                      </div>
                      <div className="Container__post_popup_inputs_single">
                        <label>Telefono nr.</label>
                        <input
                          type="text"
                          className="Input__post"
                          placeholder="+37061234567"
                          onChange={handlePhone}
                          value={phone}
                        />
                      </div>
                    </div>
                    <div className="Container__post_popup_cv">
                      <p>Įkelkite aplikanto CV (gyvenimo aprašymą)!</p>
                    </div>
                  </div>
  
                  <div>
                    <button
                      className="Btn__apply Btn__popup"
                      onClick={handleClickPosts}
                    >
                      Siųsti aplikaciją <FontAwesomeIcon icon={faPaperPlane} />
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </div>
  
                <div className="Container__recent">
                  <div className="Container__posts_recent">
                    {postDataRecent.map((post, i) => {
                      return (
                        <Post
                          key={i}
                          post={post}
                          onClick={() => {
                            setChosenPost(post);
                            setPostChosen(true);
                          }}
                          isRecent={true}
                        />
                      );
                    })}
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
  }


};

export default Dashboard;
