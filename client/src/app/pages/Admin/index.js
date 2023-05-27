import React, { useState } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-calendar/dist/Calendar.css";

const Admin = () => {

  const [authenticated, setauthenticated] = useState(localStorage.getItem("user"));

  return (
    <div className="Section__profile">
      <div className="background-3"></div>
      <div className="Color__block"></div>
      <Nav image={logo} />
    </div>
  );
};

export default Admin;
