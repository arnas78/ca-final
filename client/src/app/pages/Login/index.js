import React, { useState } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-calendar/dist/Calendar.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <div className="Section__login">
      <div className="background-3"></div>
      <Nav image={logo} />
      <div className="Container__login">
        <div>
          <h1>Prisijungti</h1>

          <div className="Container__default_logins">
            <h4>Test paskyros:</h4>
            <div>
              <p>Prisijungimas - admin</p>
              <p>Slaptažodis - admin</p>
            </div>

            <div>
              <p>Prisijungimas - v.pavardenis</p>
              <p>Slaptažodis - test2023</p>
            </div>
          </div>
        </div>

        <div className="Container__login_form">
          <div>
            <label>Vardas / el. paštas</label>
            <input type="text" className="" placeholder="Prisijungimo vardas" />
          </div>
          <div>
            <label>Slaptažodis</label>
            <input type="text" className="" placeholder="Slaptažodis" />
          </div>
        </div>
        <button className="Btn__apply">
          Prisijungti <FontAwesomeIcon icon={faArrowRight} />
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default Login;
