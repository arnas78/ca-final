import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ showingIdx, idx, func, items, weekday, isActive }) => {
  const getButtonClass = () => {
    let buttonClass = "trigger-button";
    if (isActive) {
      if (showingIdx === idx) {
        buttonClass = "trigger-button Activated";
      }
    } else {
      buttonClass = "trigger-button Disabled";
    }
    return buttonClass;
  };

  return (
    <div>
      <button onClick={isActive ? func : null} className={getButtonClass()}>
        {weekday}
        <FontAwesomeIcon icon={showingIdx === idx ? faArrowUp : faArrowDown} />
      </button>
      <ul className={showingIdx === idx ? "List List__Active" : "List"}>
        {items.map((item) => (
          <li className="Item__list">{item} </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
