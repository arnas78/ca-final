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
      <div
        onClick={() => (selectedTraining.name ? setSelectedTraining({}) : null)}
        className={
          selectedTraining.name
            ? "background-blur"
            : "background-blur Z__invisible"
        }
      ></div>
      <Nav image={logo} />
      <div className="Section__learning">
        <Heading
          title={fakeApi.heading_learning.title}
          description={fakeApi.heading_learning.description}
        ></Heading>
        <div className="Container__box">
          <div className="Container__heading">
            <p>Pavadinimas</p>
            <p>Dėstytojas(-ai)</p>
            <p>Būsena</p>
            <p>Pradžios data</p>
            <p>Pabaigos data</p>
            <p>Aprašymas</p>
          </div>
          <div className="Container__trainings">
            {trainings.map((training, i) => {
              return (
                <Training
                  key={i}
                  idx={i}
                  training={training}
                  appliedTrainings={appliedTrainings}
                  image={image}
                  onClick={() => {
                    const newTraining = trainings[i];
                    setSelectedTraining(newTraining);
                  }}
                />
              );
            })}
          </div>
        </div>
        <Popup
          trainingObj={selectedTraining}
          image={image}
          onClick={() => {
            applyTraining(selectedTraining.id);
            // eslint-disable-next-line no-unused-expressions
            selectedTraining.name ? setSelectedTraining({}) : null;
          }}
        ></Popup>
      </div>
    </div>
  );
};

export default Learning;
