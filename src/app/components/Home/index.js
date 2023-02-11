import React, { useState } from "react";
import "./index.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Header() {
  const options = [
    {value: 'apple', text: 'Vyras'},
    {value: 'banana', text: 'Moteris'},
    {value: 'kiwi', text: 'Kita'},
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [number, setNumber] = useState("");
  const [selected, setSelected] = useState(options[0].value);

  const handleChange = event => {
    setSelected(event.target.value);
  };

  return (
    <main>
      <section className="Section__intro">
        <h1>Sveiki, Arnas!</h1>
        <p>
          Jūsų darbo įrankis. Čia galite tvarkyti savo profilį, užsisakyti
          pietus, užsiregistruoti apmokymams bei pateikti prašymą į dalyvavimą
          renginyje!
        </p>
        <div>
          <label>Vardas:</label>
          <input type="text" className="Input__profile" placeholder="Arnas" disabled></input>
          <input type="text" className="Input__profile" placeholder="Klimasauskas" disabled></input>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          <select value={selected} onChange={(event) => setSelected(event.target.value)}>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <input type="text" className="Input__profile" onChange={(date) => setStartDate(date)} placeholder="Telefono nr."></input>
        </div>
      </section>
    </main>
  );
}

export default Header;
