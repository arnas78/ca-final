import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-calendar/dist/Calendar.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ContentContext from "../../context/Content";

const Login = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { setBackendData, setUserExtra } = useContext(ContentContext);

  const handleLogin = (event) => {
    setLoginEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setLoginPassword(event.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (loginEmail.length === 0 || loginPassword.length === 0) {
      alert("Please provide needed information");
      return;
    }

    const user = {
      work_email: loginEmail,
      password: loginPassword,
    };

    try {
      const data = await (
        await fetch("http://localhost:5000/api" + "/users/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
      ).json();

      if (data.message === "Vartotojas rastas") {
        localStorage.setItem("user", data.user._id);
        localStorage.setItem("userData", JSON.stringify(data.user));
        if (data.user.level === 9) {
          navigate("/lunch");
        } else {
          setBackendData(data.user);
          fetch("/api/users/extra/" + data.user._id)
            .then((response) => response.json())
            .then((data) => {
              setUserExtra(data);
            });
          navigate("/dashboard");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <p>Prisijungimas - admin@admin.com</p>
              <p>Slaptažodis - admin</p>
            </div>

            <div>
              <p>Prisijungimas - test@test.com</p>
              <p>Slaptažodis - test</p>
            </div>
          </div>
        </div>

        <form id="Login__form" className="Container__login_form">
          <div>
            <label>El. paštas</label>
            <input
              onChange={handleLogin}
              type="mail"
              placeholder="Prisijungimo vardas"
            />
          </div>
          <div>
            <label>Slaptažodis</label>
            <input
              onChange={handlePassword}
              id="Login__password"
              type="password"
              placeholder="Slaptažodis"
            />
          </div>
        </form>
        <button className="Btn__apply" onClick={loginUser}>
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
