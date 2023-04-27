import React from "react";
import { useState, useContext } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import image from "../../components/images/blank_profile.png";
import fakeApi from "../../data/data.json";
import Training from "../../components/Training";
import Popup from "../../components/Popup";
import Heading from "../../components/Heading";
import ContentContext from "../../context/Content";

const Learning = () => {
  const trainings = fakeApi.trainings;

  const { appliedTrainings, applyTraining } = useContext(ContentContext);
  const [selectedTraining, setSelectedTraining] = useState({});

  return (
    <div className="Section__Home">
      <Nav image={logo} />
    </div>
  );
};

export default Learning;
