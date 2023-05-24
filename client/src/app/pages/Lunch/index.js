import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import food from "../../components/images/food.jpg";
import imageSoup from "../../components/images/soup.webp";
import profile from "../../components/images/blank_profile.png";
import {
  faCircleArrowRight,
  faEuro,
  faSpoon,
  faUtensils,
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
  const [authenticated, setauthenticated] = useState(localStorage.getItem("user"));
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
    if (mainChosen || mainChosen === 0 || soupChosen || soupChosen === 0) {
      let soupPrice = 0.0;
      let mainPrice = 0.0;
      if (
        (mainChosen || mainChosen === 0) &&
        (soupChosen || soupChosen === 0)
      ) {
        soupPrice = soupData[soupChosen].price;
        mainPrice = sampleData[mainChosen].price;
        combinedPrice = soupPrice + mainPrice;
      } else if (mainChosen || mainChosen === 0) {
        mainPrice = sampleData[mainChosen].price;
        combinedPrice = mainPrice;
      } else {
        soupPrice = soupData[soupChosen].price;
        combinedPrice = soupPrice;
      }
    }
    return combinedPrice.toFixed(2);
  };

  // Sets current day string value from array
  const {
    soupChosen,
    handleChosenSoup,
    mainChosen,
    handleChosenMain,
    weekdayChosen,
    handleChosenWeekday,
    mealData,
    orderData,
    setOrderData,
  } = useContext(ContentContext);

  const [isSorted, setSorted] = useState(false);
  const [isPopularitySorted, setPopularitySorted] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const [isVegan, setVegan] = useState(false);
  // 1 is Monday
  const [weekday, setWeekday] = useState(new Date().getDay());

  const handleCartClick = () => {
    setCartActive((current) => !current);
  };

  let soupArr =
    typeof mealData.meals === "undefined"
      ? fakeApi.soups[0].soups
      : mealData.meals.filter((obj) => {
          return obj.type === "soup";
        });

  let mainArr =
    typeof mealData.meals === "undefined"
      ? fakeApi.main[0].mains
      : mealData.meals.filter((obj) => {
          return obj.type === "main";
        });

  const [soupData, setSoupData] = useState(soupArr);
  const [sampleData, setSampleData] = useState(mainArr);

  const handleChange = (e) => {
    setSampleData(
      typeof mealData.meals === "undefined"
        ? fakeApi.main[0].mains
        : mealData.meals.filter((obj) => {
            return obj.type === "main";
          })[e.target.value]
    );
    setSoupData(
      typeof mealData.meals === "undefined"
        ? fakeApi.main[0].mains
        : mealData.meals.filter((obj) => {
            return obj.type === "soup";
          })[e.target.value]
    );
    handleChosenWeekday(Number(e.target.value));
  };

  const handleDay = (e) => {
    setWeekday(Number(e.target.value));
  };

  const handleVegan = (event) => {
    setVegan((current) => !current);
  };

  const handleCartCount = () => {
    // console.log(soupChosen, mainChosen);
    if ((soupChosen || soupChosen === 0) && mainChosen === null) {
      return <p>1</p>;
    } else if ((mainChosen || mainChosen === 0) && soupChosen === null) {
      return <p>1</p>;
    } else if (
      (mainChosen || mainChosen === 0) &&
      (soupChosen || soupChosen === 0)
    ) {
      return <p>2</p>;
    } else {
      return <p>0</p>;
    }
  };

  const [searchValue, setSearchValue] = useState(null);
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  let currentDay = new Date().getDay();

  console.log(mainChosen);

  function handleClick() {
    if (typeof orderData !== "undefined") {
      let obj = {};

      fetch("/api/orders")
        .then((response) => response.json())
        .then((data) => {
          setOrderData(data);
        });

      const myOrders = orderData.orders.filter((obj) => {
        return (
          obj.type === "lunch" && obj.user_id === "646a4910cc114a5a37df1014"
        );
      });

      if (myOrders.length < 2) {
        obj = {
          user_id: "646a4910cc114a5a37df1014",
          type: "lunch",
          obj_id: sampleData[mainChosen]._id,
        };
        // Send data to the backend via POST
        fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj), // body data type must match "Content-Type" header
        });

        obj = {
          user_id: "646a4910cc114a5a37df1014",
          type: "lunch",
          obj_id: soupData[soupChosen]._id,
        };

        // Send data to the backend via POST
        fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj), // body data type must match "Content-Type" header
        });

        alert(`Jūs sėkmingai atlikote užsakymą!`);
        window.location.reload(false);
      } else {
        console.log(myOrders.length);
        alert(`Pietų užsakymą šiandien jau atlikote!`);
      }
    }
  }

  if (!authenticated){
    return <Navigate replace to="/login" />;
  }
  else {
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
                Čia galite užsisakyti pietus, kuriuos restoranai atveš pasirinktą
                dieną per pietus.
              </h4>
            </div>

            <h3>
              Užsakymui likęs laikas: &nbsp;
              <Countdown date={getNextWeekDay(weekday)}></Countdown>
            </h3>
          </div>
          <div className="Container__picker">
            <div className="Container__sorting">
              <FontAwesomeIcon icon={faUtensils} className="Icon__pick" />
              <div>
                <p>Restoranas</p>
                <select className="Select__restaurant">
                  <option value="0">Grill London</option>
                  <option value="1">Čili pizza</option>
                  <option value="2">Talutti</option>
                  <option value="3">Katpedėlė</option>
                </select>
              </div>
            </div>
            <div className="Container__sorting">
              <FontAwesomeIcon icon={faCalendar} className="Icon__pick" />
              <div>
                <p>Data</p>
                <select className="Select__date" onChange={handleDay}>
                  <option disabled={currentDay - 1 > 0 ? true : false} value="1">
                    Pirmadienis
                  </option>
                  <option disabled={currentDay - 2 > 0 ? true : false} value="2">
                    Antradienis
                  </option>
                  <option disabled={currentDay - 3 > 0 ? true : false} value="3">
                    Treciadienis
                  </option>
                  <option disabled={currentDay - 4 > 0 ? true : false} value="4">
                    Ketvirtadienis
                  </option>
                  <option disabled={currentDay - 5 > 0 ? true : false} value="5">
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
                    setSoupData([...soupData].sort((a, b) => a.price - b.price));
                  } else {
                    setSampleData(sampleData);
                    setSoupData(soupData);
                  }

                  setSorted(!isSorted);

                  console.log(sampleData);
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
                    setSoupData([...soupData].sort((a, b) => b.count - a.count));
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
                  <p>
                    <FontAwesomeIcon icon={faSpoon} className="Icon__sort" />{" "}
                    Sriuba
                  </p>
                  <div
                    className={
                      soupChosen || soupChosen === 0
                        ? "Cart__item_invisible"
                        : "Cart__empty"
                    }
                  >
                    <h4>Jūs nesate pasirinkę sriubos!</h4>
                  </div>
                  <div
                    className={
                      soupChosen || soupChosen === 0
                        ? " Container__cart_opened_item_single "
                        : "Cart__item_invisible"
                    }
                  >
                    <img
                      src={
                        soupChosen || soupChosen === 0
                          ? soupArr[soupChosen].image
                          : imageSoup
                      }
                      className="Image__cart"
                      alt="asd"
                    ></img>
                    <div>
                      <h4>
                        {soupChosen || soupChosen === 0
                          ? soupData[soupChosen].title
                          : ""}
                      </h4>
                      <p>
                        {soupChosen || soupChosen === 0
                          ? soupData[soupChosen].desc
                          : "0.00"}{" "}
                      </p>
                      <h4>
                        {soupChosen || soupChosen === 0
                          ? soupData[soupChosen].price
                          : ""}
                        <FontAwesomeIcon icon={faEuro} className="Icon__cart" />{" "}
                      </h4>
                    </div>
                  </div>
                  <p className="Paragraph__cart">
                    <FontAwesomeIcon icon={faUtensils} className="Icon__sort" />{" "}
                    Pagrindinis
                  </p>
                  <div
                    className={
                      mainChosen || mainChosen === 0
                        ? "Cart__item_invisible"
                        : "Cart__empty"
                    }
                  >
                    <h4>Jūs nesate pasirinkę pagrindinio patiekalo!</h4>
                  </div>
                  <div
                    className={
                      mainChosen || mainChosen === 0
                        ? " Container__cart_opened_item_single "
                        : "Cart__item_invisible"
                    }
                  >
                    <img
                      src={
                        mainChosen || mainChosen === 0
                          ? mainArr[mainChosen].image
                          : mainChosen
                      }
                      className="Image__cart"
                      alt="img"
                    ></img>
                    <div>
                      <h4>
                        {mainChosen || mainChosen === 0
                          ? sampleData[mainChosen].title
                          : ""}
                      </h4>
                      <p>
                        {mainChosen || mainChosen === 0
                          ? sampleData[mainChosen].desc
                          : ""}
                      </p>
                      <h4>
                        {mainChosen || mainChosen === 0
                          ? sampleData[mainChosen].price
                          : ""}
                        <FontAwesomeIcon icon={faEuro} className="Icon__cart" />{" "}
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
                    mainChosen ||
                    mainChosen === 0 ||
                    soupChosen ||
                    soupChosen === 0
                      ? "Btn__apply Btn__cart"
                      : "Cart__item_invisible"
                  }
                >
                  Užsakyti
                  <FontAwesomeIcon FontAwesomeIcon icon={faCircleArrowRight} />
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
                  soupChosen || soupChosen === 0 || mainChosen || mainChosen === 0
                    ? "Container__cart_counter Container__cart_counter_active"
                    : "Container__cart_counter"
                }
              >
                <p>{handleCartCount()}</p>
              </div>
            </div>
          </div>

          <div className="Container__content">
            <div className="Header__restaurant">
              <h1 className="Heading__restaurant">
                {fakeApi.main[weekdayChosen].restaurant}
              </h1>
              <div className="Container__search">
                <FontAwesomeIcon icon={faSearch} className="Icon__search" />
                <input
                  type="text"
                  placeholder="Ieškokite restorane..."
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="Container__meals">
              <h3 className="Heading__food">Sriubos</h3>
              <div className="Container__soup">
                {soupArr.map((soup, i) => {
                  if (searchValue) {
                    if (
                      soup.title
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      soup.desc.toLowerCase().includes(searchValue.toLowerCase())
                    ) {
                      return (
                        <Meal
                          key={i}
                          meal={soup}
                          profile={profile}
                          isChosen={soupChosen}
                          image={soup.image}
                          onClick={() => {
                            handleChosenSoup(soup, true);
                          }}
                          id={soup.id}
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
                        image={imageSoup}
                        onClick={() => {
                          handleChosenSoup(soup, true);
                        }}
                        id={soup.id}
                        vegan={isVegan}
                      />
                    );
                  }
                })}
              </div>
              <h3 className="Heading__food">Pagrindiniai patiekalai</h3>
              <div className="Container__main">
                {mainArr.map((meal, i) => {
                  if (searchValue) {
                    if (
                      meal.title
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      meal.desc.toLowerCase().includes(searchValue.toLowerCase())
                    ) {
                      return (
                        <Meal
                          key={i}
                          meal={meal}
                          profile={profile}
                          isChosen={mainChosen}
                          image={food}
                          onClick={() => {
                            handleChosenMain(meal, true);
                          }}
                          vegan={isVegan}
                          id={meal.id}
                        />
                      );
                    }
                  } else {
                    return (
                      <Meal
                        key={i}
                        meal={meal}
                        profile={profile}
                        isChosen={mainChosen}
                        image={food}
                        onClick={() => {
                          handleChosenMain(meal, true);
                        }}
                        vegan={isVegan}
                        id={meal.id}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Lunch;
