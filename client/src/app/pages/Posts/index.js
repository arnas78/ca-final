import React, { useState, useContext } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowRight,
  faEnvelopeOpenText,
  faHand,
  faPaperPlane,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHouseLaptop } from "@fortawesome/free-solid-svg-icons";
import logo from "../../components/images/Vector.svg";
import fakeApi from "../../data/data.json";
import Post from "../../components/Post";
import GoogleMapReact from "google-map-react";
import Lecture from "../../components/Lecture";
import ContentContext from "../../context/Content";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const Posts = () => {
  const center = {
    lat: 54.86463618199356,
    lng: 23.944770457672913,
  };

  const MapOptions = {
    zoomControl: true,
    mapTypeControl: false,
  };

  const [sortLocation, setSortLocation] = useState("All");
  const [sortLevel, setSortLevel] = useState("Any");
  const [chosenPost, setChosenPost] = useState(null);
  const [isPostChosen, setPostChosen] = useState(false);
  const { postData, referData } = useContext(ContentContext);

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

  const postsData =
    typeof postData.posts === "undefined" ? fakeApi.posts : postData.posts;

  let postDataRecent = postsData;
  if (postDataRecent.length >= 4) {
    postDataRecent = postDataRecent.slice(-4);
  }

  const handleLocation = (e) => {
    setSortLocation(e.target.value);
  };

  const handleLevel = (e) => {
    setSortLevel(e.target.value);
  };

  const [searchValue, setSearchValue] = useState(null);
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  function handleClick() {
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

  return (
    <div className="Section__Posts">
      <Nav image={logo} />
      <div className="background-1"></div>
      <div className="Container__posts">
        <div className="Header__posts">
          <div>
            <h1>Darbo skelbimai</h1>
            <h4>
              Čia galite matyti darbo skelbimus bei pasiūlyti kitą žmogų į
              pasirinktą poziciją.
            </h4>
          </div>
          <h3>
            Naujausi skelbimai <FontAwesomeIcon icon={faArrowDown} />
          </h3>
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
                isPostChosen || chosenPost === 0 ? setPostChosen(false) : null
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
                        <div className="Tag__popup_post_single">{tag}</div>
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
            <button className="Btn__apply Btn__popup" onClick={handleClick}>
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
        <div className="Container__info">
          <h2>Visi skelbimai</h2>
          <div className="Container__picker_posts">
            <div className="Container__sorting_posts">
              <FontAwesomeIcon icon={faLocationDot} className="Icon__pick" />
              <div>
                <p>Vieta</p>
                <select
                  className="Select__restaurant Select__posts"
                  onChange={handleLocation}
                >
                  <option value="All">Visur</option>
                  <option value="Kaunas, Lietuva">Kaunas</option>
                  <option value="Vilnius, Lietuva">Vilnius</option>
                  <option value="Varšuva, Lenkija">Varšuva</option>
                  <option value="Londonas, Anglija">Londonas</option>
                </select>
              </div>
            </div>
            <div className="Container__sorting_posts">
              <FontAwesomeIcon icon={faAnglesUp} className="Icon__pick" />
              <div>
                <p>Lygis</p>
                <select
                  className="Select__restaurant Select__posts"
                  onChange={handleLevel}
                >
                  <option value="Any">Visi</option>
                  <option value="Junior">Junior</option>
                  <option value="Regular/Mid">Regular/Mid</option>
                  <option value="Senior">Senior</option>
                  <option value="Praktika">Praktika</option>
                </select>
              </div>
            </div>

            <div className="Container__search_posts">
              <FontAwesomeIcon icon={faSearch} className="Icon__search" />
              <input
                type="text"
                placeholder="Ieškokite tarp skelbimų..."
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        <div className="Container__postings">
          {postsData.map((post, i) => {
            if (searchValue) {
              if (
                post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                post.description
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              ) {
                if (sortLocation === "All" && sortLevel === "Any") {
                  return (
                    <Post
                      key={i}
                      post={post}
                      onClick={() => {
                        setChosenPost(post);
                        setPostChosen(true);
                      }}
                      isRecent={false}
                    />
                  );
                } else if (
                  sortLocation === post.location &&
                  sortLevel === "Any"
                ) {
                  return (
                    <Post
                      key={i}
                      post={post}
                      onClick={() => {
                        setChosenPost(post);
                        setPostChosen(true);
                      }}
                      isRecent={false}
                    />
                  );
                } else if (sortLevel === post.level && sortLocation === "All") {
                  return (
                    <Post
                      key={i}
                      post={post}
                      onClick={() => {
                        setChosenPost(post);
                        setPostChosen(true);
                      }}
                      isRecent={false}
                    />
                  );
                } else if (
                  sortLocation === post.location &&
                  sortLevel === post.level
                ) {
                  return (
                    <Post
                      key={i}
                      post={post}
                      onClick={() => {
                        setChosenPost(post);
                        setPostChosen(true);
                      }}
                      isRecent={false}
                    />
                  );
                }
              }
            } else {
              if (sortLocation === "All" && sortLevel === "Any") {
                return (
                  <Post
                    key={i}
                    post={post}
                    onClick={() => {
                      setChosenPost(post);
                      setPostChosen(true);
                    }}
                    isRecent={false}
                  />
                );
              } else if (
                sortLocation === post.location &&
                sortLevel === "Any"
              ) {
                return (
                  <Post
                    key={i}
                    post={post}
                    onClick={() => {
                      setChosenPost(post);
                      setPostChosen(true);
                    }}
                    isRecent={false}
                  />
                );
              } else if (sortLevel === post.level && sortLocation === "All") {
                return (
                  <Post
                    key={i}
                    post={post}
                    onClick={() => {
                      setChosenPost(post);
                      setPostChosen(true);
                    }}
                    isRecent={false}
                  />
                );
              } else if (
                sortLocation === post.location &&
                sortLevel === post.level
              ) {
                return (
                  <Post
                    key={i}
                    post={post}
                    onClick={() => {
                      setChosenPost(post);
                      setPostChosen(true);
                    }}
                    isRecent={false}
                  />
                );
              }
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Posts;
