import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ showingIdx, idx, func, items, weekday }) => {
  return (
    <div className="dropdown-wrapper">
      <button
        onClick={func}
        className={showingIdx === idx ? "Activated" : "trigger-button"}
      >
        {weekday}
        <FontAwesomeIcon
          icon={showingIdx === idx ? faArrowUp : faArrowDown}
          className="Icon__arrow"
        />
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
