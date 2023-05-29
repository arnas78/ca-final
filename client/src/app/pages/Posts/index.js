import React, { useState, useContext, useEffect } from "react";
import Nav from "../../components/Nav";
import { Navigate } from "react-router-dom";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowRight,
  faEnvelopeOpenText,
  faHand,
  faPaperPlane,
  faPen,
  faPlus,
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
  const [authenticated, setauthenticated] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
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
  const [fileName, setFileName] = useState("");

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

  const { setPostData } = useContext(ContentContext);

  const [samplePosts, setSamplePosts] = useState(postsData);
  const [recentPosts, setRecentPosts] = useState(postDataRecent);

  const handlePosts = () => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setSamplePosts(data.posts);
        setRecentPosts(data.posts.slice(-4));
        setPostData(data);
      });
  };

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

  const handleUpload = (e) => {
    setFileName(e.target.value);
  };

  const handleClose = () => {
    if (isPostChosen) {
      setPostChosen(false);
      setFileName("");
      setSurname("");
      setPhone("");
      setName("");
      setEmail("");
    }
  };

  function handleClick() {
    if (isPostChosen && referData !== "undefined") {
      let obj = {};

      if (
        name.length === 0 ||
        surname.length === 0 ||
        email.length === 0 ||
        phone.length === 0 ||
        fileName.length === 0
      ) {
        alert("Yra tuščių laukų arba neįkėlėte CV!");
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
        handleClose();
      }
    }
  }

  const [postTitle, setPostTitle] = useState("");
  const [postLevel, setPostLevel] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [postRequirements, setPostRequirements] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postPayrange, setPostPayrange] = useState("");
  const [adminPopupEdit, setAdminPopupEdit] = useState(false);
  const [adminPopup, setAdminPopup] = useState(false);

  const handleAdminPopupEdit = (e) => {
    setPostChosen(false);
    if (chosenPost) {
      setPostTitle(chosenPost.title);
      setPostLevel(chosenPost.level);
      setPostLocation(chosenPost.location);
      setPostRequirements(chosenPost.requirements);
      setPostDescription(chosenPost.description);
      setPostPayrange(chosenPost.payrange);
    }
    setAdminPopupEdit((prevCheck) => !prevCheck);
  };

  const handleUploadPost = (e) => {
    if (
      postTitle.length === 0 ||
      postLevel.length === 0 ||
      postLocation.length === 0 ||
      postRequirements.length === 0 ||
      postDescription.length === 0 ||
      postPayrange.length === 0
    ) {
      alert("Neteisingi duomenys. Bandykite dar kartą.");
    } else {
      let postObj = {
        title: postTitle,
        level: postLevel,
        location: postLocation,
        requirements: postRequirements,
        description: postDescription,
        posted: new Date().toISOString().split("T")[0],
        payrange: postPayrange,
      };

      const data = fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(postObj),
      }).catch((err) => ("Error occured", err));
      alert("Sėkmingai sukūrėte darbo skelbimą!");
      handleAdminPopup();
      handlePosts();
      setPostTitle("");
      setPostLevel("");
      setPostLocation("");
      setPostRequirements("");
      setPostDescription("");
      setPostPayrange("");
    }
  };

  const handleDeletePost = () => {
    if (chosenPost) {
      fetch(`http://localhost:5000/api/posts/` + chosenPost._id, {
        method: "DELETE",
      });
      alert("Sėkmingai ištrynėte darbo skelbimą " + chosenPost.title);
      setPostChosen(false);
      handlePosts();
    }
  };

  const handleUpdate = (e) => {
    if (chosenPost) {
      if (
        postTitle.length === 0 ||
        postLevel.length === 0 ||
        postLocation.length === 0 ||
        postRequirements.length === 0 ||
        postDescription.length === 0 ||
        postPayrange.length === 0
      ) {
        alert("Neteisingi duomenys. Bandykite dar kartą.");
      } else {
        let postObj = {
          title: postTitle,
          level: postLevel,
          location: postLocation,
          requirements: postRequirements,
          description: postDescription,
          payrange: postPayrange,
        };

        const data = fetch(
          "http://localhost:5000/api/posts/" + chosenPost._id,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(postObj),
          }
        ).catch((err) => ("Error occured", err));

        alert("Sėkmingai atnaujinote darbo skelbimą!");
        handleAdminPopupEdit();
        handlePosts();
        setPostTitle("");
        setPostLevel("");
        setPostLocation("");
        setPostRequirements("");
        setPostDescription("");
        setPostPayrange("");
      }
    }
  };

  const handleAdminPopup = () => {
    setAdminPopup((prevCheck) => !prevCheck);
  };

  const adminHandleTitle = (e) => {
    setPostTitle(e.target.value);
  };

  const adminHandleLevel = (e) => {
    setPostLevel(e.target.value);
  };

  const adminHandleLocation = (e) => {
    setPostLocation(e.target.value);
  };

  const adminHandleRequirements = (e) => {
    setPostRequirements(e.target.value.split(";"));
  };

  const adminHandleDescription = (e) => {
    setPostDescription(e.target.value);
  };

  const adminHandlePayrange = (e) => {
    setPostPayrange(e.target.value);
  };

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
          <h2>Naujas darbo skelbimas</h2>
          <div className="Container__popup_admin_create_inputs">
            <div>
              <label>Pavadinimas</label>
              <input
                type="text"
                className="Input__admin"
                placeholder="Pozicijos pavadinimas"
                onChange={adminHandleTitle}
              ></input>
            </div>
            <div>
              <label>Pozicijos lygis</label>
              <input
                type="text"
                className="Input__admin"
                placeholder="Pozicijos lygis"
                onChange={adminHandleLevel}
              />
            </div>
            <div>
              <label>Vieta</label>
              <input
                type="text"
                className="Input__admin"
                placeholder="Pozicijos vieta"
                onChange={adminHandleLocation}
              />
            </div>

            <div>
              <label>Reikalavimai</label>
              <input
                type="text"
                className="Input__admin"
                placeholder="Darbo skelbimo reikalavimai (atskirti per ;)"
                onChange={adminHandleRequirements}
              />
            </div>
            <div>
              <label>Aprašymas</label>
              <input
                type="text"
                className="Input__admin"
                placeholder="Pozicijos aprašymas"
                onChange={adminHandleDescription}
              />
            </div>
            <div>
              <label>Atlygio rėžiai</label>
              <input
                type="text"
                className="Input__admin"
                placeholder="Pozicijos atlygio rėžiai"
                onChange={adminHandlePayrange}
              />
            </div>
          </div>

          <button className="Btn__apply Btn__popup" onClick={handleUploadPost}>
            Sukurti naują darbo skelbimą
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
          <h2>Redaguoti darbo skelbimą</h2>
          <div className="Container__popup_admin_create_inputs">
            <div>
              <label>Pavadinimas</label>
              <input
                type="text"
                className="Input__admin"
                placeholder="Pozicijos pavadinimas"
                onChange={adminHandleTitle}
                defaultValue={chosenPost ? chosenPost.title : ""}
              ></input>
            </div>
            <div>
              <label>Pozicijos lygis</label>
              <input
                type="text"
                className="Input__admin"
                placeholder="Pozicijos lygis"
                onChange={adminHandleLevel}
                defaultValue={chosenPost ? chosenPost.level : ""}
              />
            </div>
            <div>
              <label>Vieta</label>
              <input
                type="text"
                className="Input__admin"
                placeholder="Pozicijos vieta"
                onChange={adminHandleLocation}
                defaultValue={chosenPost ? chosenPost.location : ""}
              />
            </div>

            <div>
              <label>Reikalavimai</label>
              <input
                type="text"
                className="Input__admin"
                placeholder="Darbo skelbimo reikalavimai (atskirti per ;)"
                onChange={adminHandleRequirements}
                defaultValue={chosenPost ? chosenPost.requirements : ""}
              />
            </div>
            <div>
              <label>Aprašymas</label>
              <input
                type="text"
                className="Input__admin"
                placeholder="Pozicijos aprašymas"
                onChange={adminHandleDescription}
                defaultValue={chosenPost ? chosenPost.description : ""}
              />
            </div>
            <div>
              <label>Atlygio rėžiai</label>
              <input
                type="text"
                className="Input__admin"
                placeholder="Pozicijos atlygio rėžiai"
                onChange={adminHandlePayrange}
                defaultValue={chosenPost ? chosenPost.payrange : ""}
              />
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
            isPostChosen
              ? "Container__learning_popup_bg"
              : "Container__learning_popup_bg Opacity"
          }
          onClick={handleClose}
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
              onClick={handleClose}
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
          {authenticated && authenticated.level === 9 ? (
            <div>
              <button
                className="Button__sort Button__admin"
                onClick={handleDeletePost}
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
            <div>
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
                <div className="Container__post_popup_cv_header">
                  <h4>Jūsų CV</h4>
                  <p>{fileName.substring(fileName.lastIndexOf("\\") + 1)}</p>
                </div>
                <div className="Container__post_popup_cv">
                  <label for="file-upload" class="custom-file-upload">
                    Įkelkite aplikanto CV (gyvenimo aprašymą)!
                  </label>
                  <input
                    accept=".pdf"
                    id="file-upload"
                    type="file"
                    onChange={handleUpload}
                  />
                </div>
                {/* <div className="Container__post_popup_cv">
              <p>Įkelkite aplikanto CV (gyvenimo aprašymą)!</p>
            </div> */}
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
          )}
        </div>
        <div className="Container__recent">
          <div className="Container__posts_recent">
            {recentPosts.map((post, i) => {
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
            {authenticated && authenticated.level === 9 ? (
              <div className="Container__button_add_posts">
                <button
                  className="Button__sort Button__admin"
                  onClick={handleAdminPopup}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="Icon__sort Icon__admin"
                  />{" "}
                  Pridėti mokymus
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="Container__postings">
          {samplePosts.map((post, i) => {
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
