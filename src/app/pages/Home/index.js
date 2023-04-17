import React, { useState } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import image from "../../components/images/blank_profile.png";
import Input from "../../components/Input";
import Heading from "../../components/Heading";
import fakeApi from "../../data/data.json";

const Home = () => {
  const genders = fakeApi.genders;

  const [selected, setSelected] = useState(genders[0].value);

  return (
    <div className="Section__Home">
      <Nav image={logo} />
      <div className="Container__home">
        <Heading
          title={fakeApi.heading_home.title}
          description={fakeApi.heading_home.description}
        ></Heading>
        <section className="Section__profile">
          <div className="Container__intro">
            <img
              className="Image__profile"
              src={image}
              alt="profile_image"
            ></img>
            <div>
              <h1>Vardenis Pavardenis</h1>
              <h3>Frontend Engineer</h3>
            </div>
          </div>

          <div className="Container__data">
            <div className="Container__row">
              <Input label="Vardas" placeholder="Vardas" value="Vardenis" />
              <Input label="Pavardė" placeholder="Pavardė" value="Pavardenis" />
            </div>

            <div className="Container__row">
              <div>
                <label>Gimimo data</label>
                <Input type="date" placeholder="YYYY-MM-DD" />
              </div>
              <div>
                <label>Lytis</label>
                <select
                  value={selected}
                  onChange={(event) => setSelected(event.target.value)}
                >
                  {genders.map((option, i) => (
                    <option key={i}>{option.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="Container__row">
              <Input label="Telefono numeris" placeholder="Telefono nr." />
              <Input label="Adresas" placeholder="Adresas" />
            </div>
            <div className="Container__row">
              <Input label="Bio" placeholder="Jūsų bio" />
              <Input label="Marškinėlių dydis" placeholder="Dydis" />
            </div>
            <div className="Container__row">
              <Input label="Išsilavinimas" placeholder="Išsilavinimas" />
              <Input
                label="Automobilio numeris"
                placeholder="Automobilio numeris"
              />
            </div>

            <button
              className="Button__save"
              onClick={() => {
                alert("Sėkmingai išsaugota!");
              }}
            >
              Išsaugoti
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
