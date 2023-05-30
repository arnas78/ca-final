import React, { useState, useContext, useEffect } from "react";
import Nav from "../../components/Nav";
import { Navigate } from "react-router-dom";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../../components/images/photo-1.jpg";
import "react-calendar/dist/Calendar.css";
import ContentContext from "../../context/Content";
import User from "../../components/User";
import {
  faArrowDown,
  faEnvelope,
  faEnvelopeOpen,
  faGraduationCap,
  faMailForward,
  faPhone,
  faPlus,
  faSave,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";

const Admin = () => {
  const [authenticated, setauthenticated] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const {
    allUserData,
    allExtraData,
    orderData,
    mealData,
    lectureData,
    eventsData,
    referData,
    vacationData,
    setWeekdayChosen,
    weekdayChosen,
    setUserExtra,
    setVacationData,
    setAllUserData,
    setAllExtraData,
  } = useContext(ContentContext);

  let userArr =
    typeof allUserData.users === "undefined" ? [] : allUserData.users;

  let userExtraArr =
    typeof allExtraData.extra === "undefined" ? [] : allExtraData.extra;

  const [sampleUsers, setSampleUsers] = useState(userArr);
  const [sampleExtra, setSampleExtra] = useState(userExtraArr);
  const [userSelected, setUserSelected] = useState(null);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [adminPopup, setAdminPopup] = useState(false);
  const [adminPopupEdit, setAdminPopupEdit] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

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

  const handlePictureValue = () => {
    if (selectedFile) {
      return preview;
    } else if (userSelected) {
      return userExtraArr.filter((obj) => {
        return obj.user_id === userSelected._id;
      })[0].image;
    }
  };

  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userBirthdate, setUserBirthdate] = useState("");
  const [userSex, setUserSex] = useState("");
  const [userPersonalCode, setUserPersonalCode] = useState("");

  const handleUsers = (e) => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setSampleUsers(data.users);
        setAllUserData(data);
      });
  };

  const handleUserExtras = (e) => {
    fetch("/api/users/extra")
      .then((response) => response.json())
      .then((data) => {
        setSampleExtra(data.extra);
        setAllExtraData(data);
      });
  };

  const handleUpload = (e) => {
    if (
      !selectedFile ||
      userName.length === 0 ||
      userSurname.length === 0 ||
      userPosition.length === 0 ||
      userEmail.length === 0 ||
      userPhone.length === 0 ||
      userBirthdate.length === 0 ||
      userSex.length === 0 ||
      userPersonalCode.length === 0
    ) {
      alert("Neteisingi duomenys. Bandykite dar kartą.");
    } else {
      const formData = new FormData();
      formData.append("name", userName);
      formData.append("surname", userSurname);
      formData.append("position", userPosition);
      formData.append("work_email", userEmail);
      formData.append("phone", userPhone);
      formData.append("birthdate", userBirthdate);
      formData.append("sex", userSex);
      formData.append("userPersonalCode", userPersonalCode);
      formData.append("image", selectedFile);
      formData.append("password", "test");
      formData.append("level", 1);
      const data = fetch("http://localhost:5000/api/users", {
        method: "POST",
        body: formData,
      }).catch((err) => ("Error occured", err));
      alert("Sėkmingai sukūrėte vartotoją!");
      setAdminPopup(!adminPopup);
      handleUsers();
      handleUserExtras();
      setUserName("");
      setUserSurname("");
      setUserPosition("");
      setUserEmail("");
      setUserPhone("");
      setUserBirthdate("");
      setUserSex("");
      setUserPersonalCode("");
    }
  };

  if (!authenticated) {
    return <Navigate replace to="/login" />;
  } else {
    if (!authenticated.level === 9) {
      return <Navigate replace to="/dashboard" />;
    } else {
      return (
        <div className="Section__admin">
          <div className="background-3"></div>
          <div className="Color__block"></div>
          <Nav image={logo} />
          <div className="Container__admin">
            <div className="Header__admin">
              <div>
                <h1 className="Heading_1__white">Administratoriaus sąsaja</h1>
                <h4>
                  Čia galite valdyti sistemos vartotojus - matyti, redaguoti ar
                  ištrinti jų duomenis bei taip pat, sukurti (priregistruoti)
                  naujus vartotojus.
                </h4>
              </div>
            </div>
            <div className="Container__admin_user_list">
              <div className="Container__admin_user_list_header">
                <div>
                  <FontAwesomeIcon icon={faUser} className="Icon__admin" />
                  <h2>Vartotojų sąrašas</h2>
                </div>
                <button
                  className="Button__sort Button__admin"
                  onClick={() => {
                    setAdminPopup(!adminPopup);
                    setUserName("");
                    setUserSurname("");
                    setUserPosition("");
                    setUserEmail("");
                    setUserPhone("");
                    setUserBirthdate("");
                    setUserSex("");
                    setUserPersonalCode("");
                    setPreview("");
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="Icon__sort Icon__admin"
                  />{" "}
                  Naujas vartotojas
                </button>
              </div>
              <div className="Container__admin_user_listing">
                {typeof allUserData.users === "undefined" ||
                typeof allExtraData.extra === "undefined" ? (
                  <p>Loading...</p>
                ) : (
                  sampleUsers.map((user, i) => {
                    for (
                      let index = 0;
                      index < allExtraData.extra.length;
                      index++
                    ) {
                      if (user._id === allExtraData.extra[index].user_id) {
                        return (
                          <User
                            key={i}
                            userAdditional={allExtraData.extra[index]}
                            user={user}
                            onClick={() => {
                              setUserSelected(user);
                              setIsUserSelected(true);
                            }}
                          />
                        );
                      }
                    }
                  })
                )}
              </div>
            </div>

            <div
              className={`Container__learning_popup_bg ${
                !isUserSelected ? "Opacity" : ""
              }`}
              onClick={() => setIsUserSelected(!isUserSelected)}
            ></div>

            <div
              className={`Container__admin_popup ${
                !isUserSelected ? "Inactive" : ""
              }`}
            >
              <div className="Container__learning_popup_header">
                <h2>
                  <FontAwesomeIcon icon={faUser} className="Icon__location" />
                  Vartotojo duomenys
                </h2>
                <FontAwesomeIcon
                  icon={faX}
                  className="Icon__popup"
                  onClick={() => setIsUserSelected(!isUserSelected)}
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
                  src={handlePictureValue()}
                  alt=" "
                ></img>
              </div>
              <div className="Container__popup_admin_create_inputs">
                <div>
                  <label>Vardas</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Vardas"
                    defaultValue={userSelected ? userSelected.name : ""}
                    // onChange={adminHandleTitle}
                  ></input>
                </div>
                <div>
                  <label>Pavardė</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Pavardė"
                    defaultValue={userSelected ? userSelected.surname : ""}
                    // onChange={adminHandleLevel}
                  />
                </div>
                <div>
                  <label>Darbo pozicija</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Darbo pozicija"
                    defaultValue={userSelected ? userSelected.position : ""}
                    // onChange={adminHandleLocation}
                  />
                </div>

                <div>
                  <label>Darbo el. paštas</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Darbo el. paštas"
                    defaultValue={userSelected ? userSelected.work_email : ""}
                    // onChange={adminHandleRequirements}
                  />
                </div>
                <div>
                  <label>Telefono numeris</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Telefono numeris"
                    defaultValue={userSelected ? userSelected.phone : ""}
                    // onChange={adminHandleDescription}
                  />
                </div>
                <div>
                  <label>Gimimo data</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Gimimo data"
                    defaultValue={userSelected ? userSelected.birthdate : ""}
                    // onChange={adminHandlePayrange}
                  />
                </div>
                <div>
                  <label>Lytis</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Lytis"
                    defaultValue={userSelected ? userSelected.sex : ""}
                    // onChange={adminHandlePayrange}
                  />
                </div>
                <div>
                  <label>Asmens kodas</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Asmens kodas"
                    defaultValue={
                      userSelected ? userSelected.personal_number : ""
                    }
                    // onChange={adminHandlePayrange}
                  />
                </div>
              </div>

              <div className="Container__popup_admin_user_orders"></div>
              <button className="Btn__apply Btn__popup" onClick={handleUpload}>
                Išsaugoti duomenis
                <FontAwesomeIcon icon={faSave} />
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            <div
              className={`Container__learning_popup_bg ${
                !adminPopup ? "Opacity" : ""
              }`}
              onClick={() => setAdminPopup(!adminPopup)}
            ></div>

            <div
              className={`Container__admin_popup ${
                !adminPopup ? "Inactive" : ""
              }`}
            >
              <div className="Container__learning_popup_header">
                <h2>
                  <FontAwesomeIcon icon={faUser} className="Icon__location" />
                  Vartotojo duomenys
                </h2>
                <FontAwesomeIcon
                  icon={faX}
                  className="Icon__popup"
                  onClick={() => setAdminPopup(!adminPopup)}
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
              <div className="Container__popup_admin_create_inputs">
                <div>
                  <label>Vardas</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Vardas"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    value={userName}
                  ></input>
                </div>
                <div>
                  <label>Pavardė</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Pavardė"
                    onChange={(e) => {
                      setUserSurname(e.target.value);
                    }}
                    value={userSurname}
                  />
                </div>
                <div>
                  <label>Darbo pozicija</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Darbo pozicija"
                    onChange={(e) => {
                      setUserPosition(e.target.value);
                    }}
                    value={userPosition}
                  />
                </div>

                <div>
                  <label>Darbo el. paštas</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Darbo el. paštas"
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                    value={userEmail}
                  />
                </div>
                <div>
                  <label>Telefono numeris</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Telefono numeris"
                    onChange={(e) => {
                      setUserPhone(e.target.value);
                    }}
                    value={userPhone}
                  />
                </div>
                <div>
                  <label>Gimimo data</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Gimimo data"
                    onChange={(e) => {
                      setUserBirthdate(e.target.value);
                    }}
                    value={userBirthdate}
                  />
                </div>
                <div>
                  <label>Lytis</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Lytis"
                    onChange={(e) => {
                      setUserSex(e.target.value);
                    }}
                    value={userSex}
                  />
                </div>
                <div>
                  <label>Asmens kodas</label>
                  <input
                    type="text"
                    className="Input__admin"
                    placeholder="Asmens kodas"
                    onChange={(e) => {
                      setUserPersonalCode(e.target.value);
                    }}
                    value={userPersonalCode}
                  />
                </div>
              </div>

              <div className="Container__popup_admin_user_orders"></div>
              <button className="Btn__apply Btn__popup" onClick={handleUpload}>
                Sukurti vartotoją
                <FontAwesomeIcon icon={faSave} />
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Admin;
