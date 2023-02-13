import React from "react";

const BasicDropdown = ({ showDropdown, setShowDropdown, items, weekday }) => {
  return (
    <div class="dropdown-wrapper">
      <button onClick={setShowDropdown} className="trigger-button">
        { weekday }
      </button>
      <ul className={showDropdown ? "List List__Active" : "List"}>
        {items.map((item) => (
          <li className="Item__list">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default BasicDropdown;
