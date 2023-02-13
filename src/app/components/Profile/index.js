import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Header({ image }) {
  const options = [
    { value: "apple", text: "Vyras" },
    { value: "banana", text: "Moteris" },
    { value: "kiwi", text: "Kita" },
  ];
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [number, setNumber] = useState("");
  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <main>
      <section className="Section__profile">
        <div className="Container__intro">
          <img className="Image__profile" src={image} alt="Profile image"></img>
          <div>         
            <h1>Vardenis Pavardenis</h1>
            <h3>Frontend Engineer</h3>
          </div>
        </div>

        <div className="Container__data">
          <div className="Container__row">    
            <div>
              <label>Vardas</label>
              <input
                type="text"
                className="Input__profile"
                placeholder="Arnas"
                disabled
              ></input>
            </div>      

            <div>
              <label>Pavardė</label>
              <input
                type="text"
                className="Input__profile"
                placeholder="Klimasauskas"
                disabled
              ></input>  
            </div>    

          </div>

          <label>Gimimo data</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <label>Lytis</label>
          <select
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <label>Telefono numeris</label>
          <input
            type="text"
            className="Input__profile"
            placeholder="Telefono nr."
          ></input>

          <label>Adresas</label>
          <input
            type="text"
            className="Input__profile"
            placeholder="Adresas"
          ></input>
          <button>Išsaugoti</button>
        </div>
      </section>
    </main>
  );
}

export default Header;
