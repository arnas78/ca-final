import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import food from "../../components/images/food.jpg";
import imageSoup from "../../components/images/soup.webp";
import profile from "../../components/images/blank_profile.png";
import {
  faCircleArrowRight,
  faDeleteLeft,
  faEuro,
  faHand,
  faPen,
  faPlus,
  faSpoon,
  faUtensils,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Meal from "../../components/Meal";
import fakeApi from "../../data/data.json";
import ContentContext from "../../context/Content";
import Countdown from "react-countdown";

const Lunch = () => {
  const [authenticated, setauthenticated] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  function getNextWeekDay(dayID) {
    const dateCopy = new Date();

    const nextMonday = new Date(
      dateCopy.setDate(
        dateCopy.getDate() + ((7 - dateCopy.getDay() + dayID) % 7 || 7)
      )
    );
    let nextDay = new Date(nextMonday.setHours(12, 0, 0, 0));

    if (nextDay - new Date() > 604800000) {
      return new Date().setHours(12, 0, 0, 0);
    } else {
      return new Date(nextMonday.setHours(12, 0, 0, 0));
    }
  }

  const handleCartPrice = () => {
    let combinedPrice = 0.0;
    if (mainChosen || soupChosen) {
      if (mainChosen && soupChosen) {
        combinedPrice = soupChosen.price + mainChosen.price;
      } else if (mainChosen) {
        combinedPrice = mainChosen.price;
      } else if (soupChosen) {
        combinedPrice = soupChosen.price;
      }
    }
    return combinedPrice.toFixed(2);
  };

  // Sets current day string value from array
  const {
    weekdayChosen,
    setWeekdayChosen,
    mealData,
    orderData,
    setOrderData,
    setMealData,
  } = useContext(ContentContext);

  const [isSorted, setSorted] = useState(false);
  const [isPopularitySorted, setPopularitySorted] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const [isVegan, setVegan] = useState(false);
  const [restaurant, setRestaurant] = useState("Grill London");
  const [restaurantValue, setRestaurantValue] = useState("grill");
  const [soupChosen, setSoupChosen] = useState(null);
  const [mainChosen, setMainChosen] = useState(null);
  // 1 is Monday

  // ADMIN
  const [adminPopup, setAdminPopup] = useState(false);
  const [adminPopupEdit, setAdminPopupEdit] = useState(false);
  const [mealName, setMealName] = useState("");
  const [mealDesc, setMealDesc] = useState("");
  const [mealPrice, setMealPrice] = useState(0);
  const [mealType, setMealType] = useState("soup");
  const [mealVegan, setMealVegan] = useState(false);

  const handleAdminPopup = (e) => {
    setAdminPopup((prevCheck) => !prevCheck);
  };

  const handleAdminPopupEdit = (e) => {
    setAdminPopupEdit((prevCheck) => !prevCheck);
  };

  const adminHandleType = (e) => {
    setMealType(e.target.value);
  };

  const adminHandleVegan = (e) => {
    setMealVegan(e.target.value);
  };

  const adminHandleName = (e) => {
    setMealName(e.target.value);
  };

  const adminHandleDesc = (e) => {
    setMealDesc(e.target.value);
  };

  const adminHandlePrice = (e) => {
    setMealPrice(Number(e.target.value));
  };

  const handleSoups = (e) => {
    fetch("/api/meals")
      .then((response) => response.json())
      .then((data) => {
        setSoupData(
          data.meals.filter((obj) => {
            return obj.type === "soup" && obj.restaurant === restaurantValue;
          })
        );
        setMealData(data);
      });
  };

  const handleMeals = (e) => {
    fetch("/api/meals")
      .then((response) => response.json())
      .then((data) => {
        setSampleData(
          data.meals.filter((obj) => {
            return obj.type === "main" && obj.restaurant === restaurantValue;
          })
        );
        setMealData(data);
      });
  };

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

  const handleUpload = (e) => {
    if (
      !selectedFile ||
      mealName.length === 0 ||
      mealDesc.length === 0 ||
      mealPrice === 0 ||
      typeof mealPrice === "undefined"
    ) {
      alert("Neteisingi duomenys. Bandykite dar kartą.");
    } else {
      const formData = new FormData();
      formData.append("title", mealName);
      formData.append("restaurant", restaurantValue);
      formData.append("desc", mealDesc);
      formData.append("price", mealPrice);
      formData.append("count", 0);
      formData.append("isVegan", mealVegan);
      formData.append("isPopular", false);
      formData.append("image", selectedFile);
      formData.append("type", mealType);

      const data = fetch("http://localhost:5000/api/meals", {
        method: "POST",
        body: formData,
      }).catch((err) => ("Error occured", err));
      alert("Sėkmingai sukūrėte patiekalą!");
      handleAdminPopup();
      setMealName("");
      setMealDesc("");
      setMealPrice(0);
      mealType === "soup" ? handleSoups() : handleMeals();
    }
  };

  const handleUpdate = (e) => {
    if (soupChosen) {
      if (
        mealName.length === 0 ||
        mealDesc.length === 0 ||
        mealPrice === 0 ||
        typeof mealPrice === "undefined"
      ) {
        alert("Neteisingi duomenys. Bandykite dar kartą.");
      } else {
        let obj = {
          title: mealName,
          desc: mealDesc,
          price: mealPrice,
        };

        const data = fetch(
          "http://localhost:5000/api/meals/" + soupChosen._id,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(obj),
          }
        ).catch((err) => ("Error occured", err));

        alert("Sėkmingai atnaujinote patiekalą!");
        handleAdminPopupEdit();
        setMealName("");
        setMealDesc("");
        setMealPrice(0);
        handleSoups();
      }
    }
  };

  const adminHandleDelete = () => {
    if (soupChosen) {
      fetch(`http://localhost:5000/api/meals/` + soupChosen._id, {
        method: "DELETE",
      });
      alert("Sėkmingai ištrynėte sriubą " + soupChosen.title);
      handleSoups();
    } else if (mainChosen) {
      fetch(`http://localhost:5000/api/meals/` + mainChosen._id, {
        method: "DELETE",
      });
      alert("Sėkmingai ištrynėte pagrindinį patiekalą " + mainChosen.title);
      handleMeals();
    } else if (!mainChosen || !soupChosen) {
      alert("Pasirinkite patiekalą.");
    }
  };

  const handleCartClick = () => {
    setCartActive((current) => !current);
  };

  let soupArr =
    typeof mealData.meals === "undefined"
      ? null
      : mealData.meals.filter((obj) => {
          return obj.type === "soup" && obj.restaurant === "grill";
        });

  let mainArr =
    typeof mealData.meals === "undefined"
      ? null
      : mealData.meals.filter((obj) => {
          return obj.type === "main" && obj.restaurant === "grill";
        });

  const [soupData, setSoupData] = useState(soupArr);
  const [sampleData, setSampleData] = useState(mainArr);

  const handleDay = (e) => {
    setWeekdayChosen(e.target.value);
    setMainChosen(null);
    setSoupChosen(null);
  };

  const handleRestaurant = (e) => {
    setSoupData(
      mealData.meals.filter((obj) => {
        return obj.type === "soup" && obj.restaurant === e.target.value;
      })
    );
    setSampleData(
      mealData.meals.filter((obj) => {
        return obj.type === "main" && obj.restaurant === e.target.value;
      })
    );
    // setMainChosen(null);
    // setSoupChosen(null);
    setRestaurant(e.target.selectedOptions[0].innerText);
    setRestaurantValue(e.target.value);
  };

  const handleVegan = (event) => {
    setVegan((current) => !current);
  };

  const handleCartCount = () => {
    // console.log(soupChosen, mainChosen);
    if ((soupChosen && !mainChosen) || (mainChosen && !soupChosen)) {
      return <p>1</p>;
    } else if (mainChosen && soupChosen) {
      return <p>2</p>;
    } else {
      return <p>0</p>;
    }
  };

  const [searchValue, setSearchValue] = useState(null);
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const getRestaurantName = (name) => {
    if (name === "grill") {
      return "Grill London";
    } else if (name === "talutti") {
      return "Talutti";
    } else {
      return "Čili pizza";
    }
  };

  function handleClick() {
    if (typeof orderData !== "undefined") {
      let soupObj = {};
      let mainObj = {};
      let soupOrdered = false;
      let mainOrdered = false;

      if (soupChosen) {
        const soupOrders = orderData.orders.filter((obj) => {
          return (
            obj.type === "soup" &&
            obj.user_id === authenticated._id &&
            obj.weekday === weekdayChosen
          );
        });
        if (soupOrders.length === 0) {
          soupObj = {
            user_id: authenticated._id,
            type: "soup",
            obj_id: soupChosen._id,
            meal_type: soupChosen.type,
            weekday: weekdayChosen,
          };
          soupOrdered = true;
        }
      }

      if (mainChosen) {
        const mainOrders = orderData.orders.filter((obj) => {
          return (
            obj.type === "main" &&
            obj.user_id === authenticated._id &&
            obj.weekday === weekdayChosen
          );
        });
        if (mainOrders.length === 0) {
          mainObj = {
            user_id: authenticated._id,
            type: "main",
            obj_id: mainChosen._id,
            weekday: weekdayChosen,
          };
          mainOrdered = true;
          // Send data to the backend via POST
        }
      }

      if (mainOrdered && soupOrdered) {
        // Send data to the backend via POST
        fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(soupObj), // body data type must match "Content-Type" header
        });
        fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(mainObj), // body data type must match "Content-Type" header
        });
        alert(`Jūs sėkmingai atlikote pilną užsakymą!`);
      } else if (mainOrdered && !soupOrdered) {
        fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(mainObj), // body data type must match "Content-Type" header
        });
        alert(`Jūs sėkmingai atlikote pagrindinio patiekalo užsakymą!`);
      } else if (!mainOrdered && soupOrdered) {
        fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(soupObj), // body data type must match "Content-Type" header
        });
        alert(`Jūs sėkmingai atlikote sriubos užsakymą!`);
      } else {
        alert(
          `Jūsų užsakymas nepavyko. Pasitikrinkite savo atliktus užsakymus ,,Mano profilis'' lange!`
        );
      }

      fetch("/api/orders")
        .then((response) => response.json())
        .then((data) => {
          setOrderData(data);
        });
    }
  }

  const weekday = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const handleWeekday = () => {
    let currentDay = 3;
    if (currentDay === 6 || currentDay === 0) {
      return -1;
    } else {
      return currentDay;
    }
  };

  if (!authenticated) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div className="Container__body">
        <Nav image={logo} />
        <div className="background-5"></div>
        <div className="Color__block"></div>
        <div className="Section__lunch">
          <div className="Header__lunch">
            <div>
              <h1>Užsisakykite pietus!</h1>
              <h4>
                Čia galite užsisakyti pietus, kuriuos restoranai atveš
                pasirinktą dieną per pietus.
              </h4>
            </div>

            <h3>
              Užsakymui likęs laikas: &nbsp;
              <Countdown
                date={getNextWeekDay(weekday.indexOf(weekdayChosen))}
              ></Countdown>
            </h3>
          </div>
          <div className="Container__picker">
            <div className="Container__sorting">
              <FontAwesomeIcon icon={faUtensils} className="Icon__pick" />
              <div>
                <p>Restoranas</p>
                <select
                  className="Select__restaurant"
                  onChange={handleRestaurant}
                >
                  <option value="grill">Grill London</option>
                  <option value="cili">Čili pizza</option>
                  <option value="talutti">Talutti</option>
                </select>
              </div>
            </div>
            <div className="Container__sorting">
              <FontAwesomeIcon icon={faCalendar} className="Icon__pick" />
              <div>
                <p>Savaitės diena</p>
                <select className="Select__date" onChange={handleDay}>
                  <option
                    disabled={handleWeekday() - 1 > 0 ? true : false}
                    value="monday"
                  >
                    Pirmadienis
                  </option>
                  <option
                    disabled={handleWeekday() - 2 > 0 ? true : false}
                    value="tuesday"
                  >
                    Antradienis
                  </option>
                  <option
                    disabled={handleWeekday() - 3 > 0 ? true : false}
                    value="wednesday"
                  >
                    Treciadienis
                  </option>
                  <option
                    disabled={handleWeekday() - 4 > 0 ? true : false}
                    value="thursday"
                  >
                    Ketvirtadienis
                  </option>
                  <option
                    disabled={handleWeekday() - 5 > 0 ? true : false}
                    value="friday"
                  >
                    Penktadienis
                  </option>
                </select>
              </div>
            </div>
            <div className="Container__vegan">
              <div className="Container__checkbox">
                <label class="switch">
                  <input
                    id="checkbox"
                    type="checkbox"
                    name="checkbox"
                    onChange={handleVegan}
                  />
                  <span class="slider round"></span>
                </label>
                <h4>Veganiška</h4>
              </div>
            </div>
            <div className="Container__sort">
              <button
                className={
                  isSorted ? "Button__sort Button__sort_active" : "Button__sort"
                }
                onClick={() => {
                  if (isPopularitySorted) {
                    setPopularitySorted(!isPopularitySorted);
                  }

                  if (!isSorted) {
                    setSampleData(
                      [...sampleData].sort((a, b) => a.price - b.price)
                    );
                    setSoupData(
                      [...soupData].sort((a, b) => a.price - b.price)
                    );
                  } else {
                    setSampleData(sampleData);
                    setSoupData(soupData);
                  }
                  setSorted(!isSorted);
                }}
              >
                <FontAwesomeIcon icon={faFilter} className="Icon__sort" />
                Kaina
              </button>
              <button
                className={
                  isPopularitySorted
                    ? "Button__sort Button__sort_active"
                    : "Button__sort"
                }
                onClick={() => {
                  if (isSorted) {
                    setSorted(!isSorted);
                  }

                  if (!isPopularitySorted) {
                    setSampleData(
                      [...sampleData].sort((a, b) => b.count - a.count)
                    );
                    setSoupData(
                      [...soupData].sort((a, b) => b.count - a.count)
                    );
                  } else {
                    setSampleData(sampleData);
                    setSoupData(soupData);
                  }

                  setPopularitySorted(!isPopularitySorted);
                }}
              >
                <FontAwesomeIcon icon={faFilter} className="Icon__sort" />
                Populiarumas
              </button>
            </div>
            {authenticated.level !== 9 ? (
              <div
                className={
                  cartActive
                    ? "Container__cart Button__sort_active"
                    : "Container__cart"
                }
                onClick={handleCartClick}
              >
                <div
                  className={
                    cartActive
                      ? "Container__cart_opened Container__cart_opened_active"
                      : "Container__cart_opened"
                  }
                  onClick={handleCartClick}
                >
                  <div>
                    <h3>Mano krepšelis</h3>
                  </div>
                  <div className="Container__cart_opened_items">
                    <div className="Cart__chosen_desc_soup">
                      <p className="Paragraph__cart">
                        <FontAwesomeIcon
                          icon={faSpoon}
                          className="Icon__sort"
                        />
                        Sriuba
                      </p>
                      <p className="Paragraph__restaurant">
                        {soupChosen
                          ? getRestaurantName(soupChosen.restaurant)
                          : ""}
                      </p>
                    </div>
                    <div
                      className={
                        soupChosen ? "Cart__item_invisible" : "Cart__empty"
                      }
                    >
                      <h4>Jūs nesate pasirinkę sriubos!</h4>
                    </div>
                    <div
                      className={
                        soupChosen
                          ? " Container__cart_opened_item_single "
                          : "Cart__item_invisible"
                      }
                    >
                      <img
                        src={soupChosen ? soupChosen.image : imageSoup}
                        className="Image__cart"
                        alt="asd"
                      ></img>
                      <div>
                        <h4>{soupChosen ? soupChosen.title : ""}</h4>
                        <p>{soupChosen ? soupChosen.desc : "0.00"}</p>
                        <h4>
                          {soupChosen ? soupChosen.price : ""}
                          <FontAwesomeIcon
                            icon={faEuro}
                            className="Icon__cart"
                          />
                        </h4>
                      </div>
                    </div>
                    <div className="Cart__chosen_desc">
                      <p className="Paragraph__cart">
                        <FontAwesomeIcon
                          icon={faUtensils}
                          className="Icon__sort"
                        />
                        Pagrindinis
                      </p>
                      <p className="Paragraph__restaurant">
                        {mainChosen
                          ? getRestaurantName(mainChosen.restaurant)
                          : ""}
                      </p>
                    </div>

                    <div
                      className={
                        mainChosen ? "Cart__item_invisible" : "Cart__empty"
                      }
                    >
                      <h4>Jūs nesate pasirinkę pagrindinio patiekalo!</h4>
                    </div>
                    <div
                      className={
                        mainChosen
                          ? " Container__cart_opened_item_single "
                          : "Cart__item_invisible"
                      }
                    >
                      <img
                        src={mainChosen ? mainChosen.image : food}
                        className="Image__cart"
                        alt="img"
                      ></img>
                      <div>
                        <h4>{mainChosen ? mainChosen.title : ""}</h4>
                        <p>{mainChosen ? mainChosen.desc : ""}</p>
                        <h4>
                          {mainChosen ? mainChosen.price : ""}
                          <FontAwesomeIcon
                            icon={faEuro}
                            className="Icon__cart"
                          />{" "}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="Container__cart_price">
                    <h4>Viso: {handleCartPrice()}</h4>
                    <FontAwesomeIcon FontAwesomeIcon icon={faEuro} />
                  </div>
                  <button
                    onClick={handleClick}
                    className={
                      mainChosen || soupChosen
                        ? "Btn__apply Btn__cart"
                        : "Cart__item_invisible"
                    }
                  >
                    Užsakyti
                    <FontAwesomeIcon
                      FontAwesomeIcon
                      icon={faCircleArrowRight}
                    />
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="Icon__sort Icon__carts"
                />
                <h4>Krepšelis</h4>
                <div
                  className={
                    soupChosen || mainChosen
                      ? "Container__cart_counter Container__cart_counter_active"
                      : "Container__cart_counter"
                  }
                >
                  <p>{handleCartCount()}</p>
                </div>
              </div>
            ) : (
              <div>
                <button className="Button__sort Button__admin">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="Icon__sort Icon__admin"
                    onClick={handleAdminPopup}
                  />{" "}
                  Naujas patiekalas
                </button>
              </div>
            )}
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
            <h2>Naujas patiekalas</h2>
            <div className="Container__popup_admin_create_inputs">
              <div>
                <label>Pavadinimas</label>
                <input
                  type="text"
                  className="Input__admin"
                  placeholder="Patiekalo pavadinimas"
                  onChange={adminHandleName}
                ></input>
              </div>
              <div>
                <label>Aprašymas</label>
                <input
                  type="text"
                  className="Input__admin"
                  placeholder="Patiekalo aprašymas"
                  onChange={adminHandleDesc}
                />
              </div>
              <div className="Container__popup_admin_create_inputs_small">
                <div className="Admin__create_input_small">
                  <label>Kaina</label>
                  <input
                    type="number"
                    className="Input__admin"
                    placeholder="Patiekalo aprašymas"
                    onChange={adminHandlePrice}
                  />
                </div>
                <div className="Admin__create_input_small">
                  <label>Tipas</label>
                  <select
                    className="Select__restaurant"
                    onChange={adminHandleType}
                  >
                    <option value="soup">Sriuba</option>
                    <option value="main">Pagrindinis</option>
                  </select>
                </div>
                <div className="Admin__create_input_small">
                  <label>Veganiška</label>
                  <select
                    className="Select__restaurant"
                    onChange={adminHandleVegan}
                  >
                    <option value={false}>Ne</option>
                    <option value={true}>Taip</option>
                  </select>
                </div>
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
              Sukurti naują patiekalą
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
            <h2>Redaguoti patiekalą</h2>
            <div className="Container__popup_admin_create_inputs">
              <div>
                <label>Pavadinimas</label>
                <input
                  type="text"
                  className="Input__admin"
                  placeholder="Patiekalo pavadinimas"
                  onChange={adminHandleName}
                  defaultValue={soupChosen ? soupChosen.title : ""}
                ></input>
              </div>
              <div>
                <label>Aprašymas</label>
                <input
                  type="text"
                  className="Input__admin"
                  placeholder="Patiekalo aprašymas"
                  onChange={adminHandleDesc}
                  defaultValue={soupChosen ? soupChosen.desc : ""}
                />
              </div>
              <div className="Container__popup_admin_create_inputs_small">
                <div className="Admin__create_input_small">
                  <label>Kaina</label>
                  <input
                    type="number"
                    className="Input__admin"
                    placeholder="Patiekalo aprašymas"
                    onChange={adminHandlePrice}
                    defaultValue={soupChosen ? soupChosen.price : ""}
                  />
                </div>
                <div className="Admin__create_input_small">
                  <label>Tipas</label>
                  <select
                    className="Select__restaurant"
                    onChange={adminHandleType}
                  >
                    <option value="soup">Sriuba</option>
                    <option value="main">Pagrindinis</option>
                  </select>
                </div>
                <div className="Admin__create_input_small">
                  <label>Veganiška</label>
                  <select
                    className="Select__restaurant"
                    onChange={adminHandleVegan}
                    defaultValue={soupChosen ? soupChosen.isVegan : ""}
                  >
                    <option value={false}>Ne</option>
                    <option value={true}>Taip</option>
                  </select>
                </div>
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
                {soupChosen ? (
                  <img
                    className="Image__admin"
                    src={selectedFile ? preview : soupChosen.image}
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
              Atnaujinti patiekalą
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

          <div className="Container__content">
            <div className="Header__restaurant">
              <h1 className="Heading__restaurant">
                {typeof mealData === "undefined" ? "Loading..." : restaurant}
              </h1>
              <div className="Container__header_restaurant_admin">
                {authenticated.level === 9 ? (
                  <div>
                    <div>
                      <button
                        className="Button__sort Button__admin"
                        onClick={adminHandleDelete}
                      >
                        <FontAwesomeIcon
                          icon={faX}
                          className="Icon__sort Icon__admin"
                        />{" "}
                        Ištrinti patiekalą
                      </button>
                    </div>
                    <div>
                      <button
                        className="Button__sort Button__admin"
                        onClick={handleAdminPopupEdit}
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          className="Icon__sort Icon__admin"
                        />{" "}
                        Redaguoti patiekalą
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="Container__search">
                  <FontAwesomeIcon icon={faSearch} className="Icon__search" />
                  <input
                    type="text"
                    placeholder="Ieškokite restorane..."
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>

            <div className="Container__meals">
              <h3 className="Heading__food">Sriubos</h3>
              <div className="Container__soup">
                {!soupData ? (
                  <h1>Loading...</h1>
                ) : (
                  soupData.map((soup, i) => {
                    if (searchValue) {
                      if (
                        soup.title
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) ||
                        soup.desc
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                      ) {
                        return (
                          <Meal
                            key={i}
                            meal={soup}
                            profile={profile}
                            isChosen={soupChosen}
                            onClick={() => {
                              if (soupChosen === soup) {
                                setSoupChosen(null);
                              } else {
                                setSoupChosen(soup);
                              }
                            }}
                            vegan={isVegan}
                          />
                        );
                      }
                    } else {
                      return (
                        <Meal
                          key={i}
                          meal={soup}
                          profile={profile}
                          isChosen={soupChosen}
                          onClick={() => {
                            if (soupChosen === soup) {
                              setSoupChosen(null);
                            } else {
                              setSoupChosen(soup);
                            }
                          }}
                          vegan={isVegan}
                        />
                      );
                    }
                  })
                )}
              </div>
              <h3 className="Heading__food">Pagrindiniai patiekalai</h3>
              <div className="Container__main">
                {!sampleData ? (
                  <h1>Loading...</h1>
                ) : (
                  sampleData.map((main, i) => {
                    if (searchValue) {
                      if (
                        main.title
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) ||
                        main.desc
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                      ) {
                        return (
                          <Meal
                            key={i}
                            meal={main}
                            profile={profile}
                            isChosen={mainChosen}
                            onClick={() => {
                              if (mainChosen === main) {
                                setMainChosen(null);
                              } else {
                                setMainChosen(main);
                              }
                            }}
                            vegan={isVegan}
                          />
                        );
                      }
                    } else {
                      return (
                        <Meal
                          key={i}
                          meal={main}
                          profile={profile}
                          isChosen={mainChosen}
                          onClick={() => {
                            if (mainChosen === main) {
                              setMainChosen(null);
                            } else {
                              setMainChosen(main);
                            }
                          }}
                          vegan={isVegan}
                        />
                      );
                    }
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Lunch;
