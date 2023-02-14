import React, { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/Header";
import "./index.css";
import logo from "../../components/images/logo-no-background.png";
import profile from "../../components/images/blank_profile.png";
import Dropdown from "../../components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faF, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Meal from "../../components/Meal";

const Lunch = () => {
  const currentDay = new Date().getDay();
  let currentDayId = 0;
  // 6 = Saturday; 0 = Sunday
  if (currentDay !== 6 || currentDay !== 0) {
    currentDayId = currentDay;
  }

  const items = ["Čili Pizza", "Grill London", "Jurgis ir Drakonas", "Jammi"];
  const allWeekdays = [
    "Pirmadienis",
    "Antradienis",
    "Trečiadienis",
    "Ketvirtadienis",
    "Penktadienis",
  ];

  const allSoups = [
    {
      count: 2,
      price: 5.99,
      desc: "Lorem ipsum dolor sit amet, vienas du trys Lorem",
    },
    {
      count: 2,
      price: 5.99,
      desc: "Lorem ipsum dolor sit amet, vienas du trys Lorem",
    },
    {
      count: 2,
      price: 5.99,
      desc: "Lorem ipsum dolor sit amet, vienas du trys Lorem",
    },
  ];

  const allMeals = [
    {
      count: 5,
      price: 10.99,
      desc: "Lorem ipsum dolor sit amet",
    },
    {
      count: 5,
      price: 9.99,
      desc: "Lorem ipsum dolor sit amet",
    },
    {
      count: 5,
      price: 8.99,
      desc: "Lorem ipsum dolor sit amet, vienas du trys Lorem",
    },
    {
      count: 5,
      price: 10.99,
      desc: "Lorem ipsum dolor sit amet",
    },
    {
      count: 5,
      price: 9.99,
      desc: "Lorem ipsum dolor sit amet",
    },
    {
      count: 5,
      price: 8.99,
      desc: "Lorem ipsum dolor sit amet, vienas du trys Lorem",
    },
    {
      count: 5,
      price: 10.99,
      desc: "Lorem ipsum dolor sit amet",
    },
    {
      count: 5,
      price: 9.99,
      desc: "Lorem ipsum dolor sit amet",
    },
  ];

  // Sets current day string value from array
  const [activeId, setActiveId] = useState(currentDayId - 1);
  const [soupChosen, setSoupChosen] = useState(null);
  const [mainChosen, setMainChosen] = useState(null);

  useEffect(() => {
    console.log(mainChosen);
  }, [mainChosen]);

  // Sets default day

  return (
    <section>
      <Header image={logo} />
      <div className="Section__lunch">
        <div className="Container__header">
          <h1>Pietų užsakymo sistema</h1>
          <h4>
            Čia galite užsisakyti savo dienos pietus. Užsakymus galima atlikti
            iki einančios dienos 10:00 valandos. Dėl sąskaitos papildymo
            kreipkitės į Vardenis Pavardenis
          </h4>
        </div>
        <div className="Container__content">
          <div className="Container__weekdays">
            {allWeekdays.map((item, idx) => {
              return (
                <Dropdown
                  showingIdx={activeId}
                  idx={idx}
                  func={() => {
                    if (activeId === idx) {
                      setActiveId(null);
                    } else {
                      setActiveId(idx);
                    }
                  }}
                  items={items}
                  weekday={item}
                />
              );
            })}
          </div>
          <div className="Container__meals">
            <div className="Container__order">
              <div className="Container__sort">
                <button className="Button__sort">
                  <FontAwesomeIcon icon={faFilter} className="Icon__sort" />
                  Kaina
                </button>
                <button className="Button__sort">
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
                  <FontAwesomeIcon icon={faXmark} className="Icon__sort" />
                  {soupChosen || soupChosen === 0
                    ? allSoups[soupChosen].desc
                    : allSoups[0].desc}
                </h4>
                <h4
                  className={
                    mainChosen || mainChosen === 0 ? "Meal__chosen" : "Hidden"
                  }
                >
                  <FontAwesomeIcon icon={faXmark} className="Icon__sort" />
                  {mainChosen || mainChosen === 0
                    ? allMeals[mainChosen].desc
                    : ""}
                </h4>
                <button className="Button__order">Užsakyti</button>
              </div>
            </div>
            <h3 className="Heading__food">Sriubos</h3>
            <div className="Container__soup">
              {allSoups.map((soup, idSoup) => {
                return (
                  <Meal
                    count={soup.count}
                    price={soup.price}
                    description={soup.desc}
                    profile={profile}
                    isChosen={soupChosen}
                    onClick={() => {
                      if (soupChosen === idSoup) {
                        setSoupChosen(null);
                      } else {
                        setSoupChosen(idSoup);
                      }
                    }}
                    id={idSoup}
                  />
                );
              })}
            </div>
            <h3 className="Heading__food">Pagrindiniai patiekalai</h3>
            <div className="Container__main">
              {allMeals.map((meal, idMeal) => {
                return (
                  <Meal
                    count={meal.count}
                    price={meal.price}
                    description={meal.desc}
                    profile={profile}
                    isChosen={mainChosen}
                    onClick={() => {
                      if (mainChosen === idMeal) {
                        setMainChosen(null);
                      } else {
                        setMainChosen(idMeal);
                      }
                    }}
                    id={idMeal}
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
