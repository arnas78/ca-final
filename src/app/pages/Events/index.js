import React, { useContext } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/logo-no-background.png";
import conference_1 from "../../components/images/conference-1.jpeg";
import Heading from "../../components/Heading";
import Event from "../../components/Event";
import fakeApi from "../../data/data.json";
import ContentContext from "../../context/Content";

const Events = () => {
  const events = fakeApi.events;

  const { appliedEvents, applyEvent } = useContext(ContentContext);

  return (
    <div>
      <Nav image={logo} />
      <div className="Section__events">
        <Heading
          title={fakeApi.heading_events.title}
          description={fakeApi.heading_events.description}
        ></Heading>
        <div>
          {events.map((event, i) => {
            return (
              <Event
                key={i}
                idx={i}
                eventObj={event}
                image={conference_1}
                isApplied={appliedEvents}
                onClick={() => applyEvent(i)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;
