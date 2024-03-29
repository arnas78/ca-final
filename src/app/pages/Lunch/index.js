import React, { useState, useContext } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/logo-no-background.png";
import profile from "../../components/images/blank_profile.png";
import Dropdown from "../../components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Meal from "../../components/Meal";
import fakeApi from "../../data/data.json";
import Heading from "../../components/Heading";
import ContentContext from "../../context/Content";

const Lunch = () => {
  const allMeals = fakeApi.main;
  const allSoups = fakeApi.soups;
  const items = fakeApi.restaurants;
  const allWeekdays = fakeApi.weekdays;

  const currentDay = new Date().getDay();

  let currentDayId = 1;
  // 6 = Saturday; 0 = Sunday
  if (currentDay !== 6 && currentDay !== 0) {
    // Disables past weekdays
    for (let i = 1; i < currentDayId; i++) {
      allWeekdays[i - 1].status = false;
    }
    currentDayId = currentDay;
  }

  // Sets current day string value from array
  const { soupChosen, handleChosenSoup, mainChosen, handleChosenMain } =
    useContext(ContentContext);

  const [activeId, setActiveId] = useState(currentDayId - 1);
  const [sampleData, setSampleData] = useState(allMeals);
  const [soupData, setSoupData] = useState(allSoups);
  const [isSorted, setSorted] = useState(false);
  const [isPopularitySorted, setPopularitySorted] = useState(false);
  // Sets default day

  return (
    <section>
      <Nav image={logo} />
      <div className="Section__lunch">
        <Heading
          title={fakeApi.heading_lunch.title}
          description={fakeApi.heading_lunch.description}
        ></Heading>
        <div className="Container__content">
          <div className="Container__weekdays">
            {allWeekdays.map((item, i) => {
              return (
                <Dropdown
                  key={i}
                  showingIdx={activeId}
                  idx={i}
                  func={() => {
                    if (activeId === i) {
                      setActiveId(null);
                    } else {
                      setActiveId(i);
                    }
                  }}
                  items={items}
                  weekday={item.name}
                  isActive={item.status}
                />
              );
            })}
          </div>
          <div className="Container__meals">
            <div className="Container__order">
              <div className="Container__sort">
                <button
                  className={isSorted ? "Button__sort Active" : "Button__sort"}
                  onClick={() => {
                    if (isPopularitySorted) {
                      setPopularitySorted(!isPopularitySorted);
                    }

                    if (!isSorted) {
                      setSampleData(
                        [...allMeals].sort((a, b) => a.price - b.price)
                      );
                      setSoupData(
                        [...allSoups].sort((a, b) => a.price - b.price)
                      );
                    } else {
                      setSampleData(allMeals);
                      setSoupData(allSoups);
                    }

                    setSorted(!isSorted);
                  }}
                >
                  <FontAwesomeIcon icon={faFilter} className="Icon__sort" />
                  Kaina
                </button>
                <button
                  className={
                    isPopularitySorted ? "Button__sort Active" : "Button__sort"
                  }
                  onClick={() => {
                    if (isSorted) {
                      setSorted(!isSorted);
                    }

                    if (!isPopularitySorted) {
                      setSampleData(
                        [...allMeals].sort((a, b) => b.count - a.count)
                      );
                      setSoupData(
                        [...allSoups].sort((a, b) => b.count - a.count)
                      );
                    } else {
                      setSampleData(allMeals);
                      setSoupData(allSoups);
                    }

                    setPopularitySorted(!isPopularitySorted);
                  }}
                >
                  <FontAwesomeIcon icon={faFilter} className="Icon__sort" />
                  Populiarumas
                </button>
              </div>
              <div className="Container__current_order">
                <h4
                  className={
                    soupChosen || soupChosen === 0 ? "Meal__chosen" : "Hidden"
                  }
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="Icon__sort"
                    onClick={() => {
                      handleChosenSoup({}, false);
                    }}
                  />
                  {soupChosen || soupChosen === 0
                    ? allSoups[soupChosen].desc
                    : allSoups[0].desc}
                </h4>
                <h4
                  className={
                    mainChosen || mainChosen === 0 ? "Meal__chosen" : "Hidden"
                  }
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="Icon__sort"
                    onClick={() => {
                      handleChosenMain({}, false);
                    }}
                  />
                  {mainChosen || mainChosen === 0
                    ? allMeals[mainChosen].desc
                    : ""}
                </h4>
                <button
                  className="Button__order"
                  onClick={() => {
                    // eslint-disable-next-line no-unused-expressions
                    mainChosen ||
                    soupChosen ||
                    soupChosen === 0 ||
                    mainChosen === 0
                      ? alert("Sėkmingai užsakyta")
                      : {};
                  }}
                >
                  Užsakyti
                </button>
              </div>
            </div>
            <h3 className="Heading__food">Sriubos</h3>
            <div className="Container__soup">
              {soupData.map((soup, i) => {
                return (
                  <Meal
                    key={i}
                    meal={soup}
                    profile={profile}
                    isChosen={soupChosen}
                    onClick={() => {
                      handleChosenSoup(soup, true);
                    }}
                    id={soup.id}
                  />
                );
              })}
            </div>
            <h3 className="Heading__food">Pagrindiniai patiekalai</h3>
            <div className="Container__main">
              {sampleData.map((meal, i) => {
                return (
                  <Meal
                    key={i}
                    meal={meal}
                    profile={profile}
                    isChosen={mainChosen}
                    onClick={() => {
                      handleChosenMain(meal, true);
                    }}
                    id={meal.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lunch;
