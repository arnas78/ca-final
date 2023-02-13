import React, { useState } from "react";
import Profile from "../../components/Profile"
import Header from "../../components/Header";
import "./index.css";
import logo from "../../components/images/logo-no-background.png";
import Dropdown from "../../components/Dropdown"

const Lunch = () => {

    const items = [
      "Čili Pizza",
      "Grill London",
      "Jurgis ir Drakonas",
      "Jammi"
    ];
    const [open, setOpen] = React.useState(false);

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <section>
            <Header image={logo} />
            <div className="Section__lunch">
              <div className="Container__weekdays">
                <Dropdown
                  showDropdown={showDropdown}
                  setShowDropdown={() => setShowDropdown(!showDropdown)}
                  items={items}
                  weekday="Pirmadienis"
                />
                <Dropdown
                  showDropdown={showDropdown}
                  setShowDropdown={() => setShowDropdown(!showDropdown)}
                  items={items}
                  weekday="Antradienis"
                />
                <Dropdown
                  showDropdown={showDropdown}
                  setShowDropdown={() => setShowDropdown(!showDropdown)}
                  items={items}
                  weekday="Trečiadienis"
                />
                <Dropdown
                  showDropdown={showDropdown}
                  setShowDropdown={() => setShowDropdown(!showDropdown)}
                  items={items}
                  weekday="Ketvirtadienis"
                />
                <Dropdown
                  showDropdown={showDropdown}
                  setShowDropdown={() => setShowDropdown(!showDropdown)}
                  items={items}
                  weekday="Penktadienis"
                />
              </div>
              <div></div>
            </div>
        </section>
    );
}

export default Lunch;
