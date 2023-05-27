import React, { useState, useEffect } from "react";

const ContentContext = React.createContext();

function ContentProvider({ children }) {
  const [appliedEvents, setSelectedTraining] = useState([]);
  const [appliedTrainings, setAppliedTrainings] = useState([]);
  const [soupChosen, setSoupChosen] = useState(null);
  const [mainChosen, setMainChosen] = useState(null);
  const [lectureChosen, setLectureChosen] = useState(null);
  const [weekdayChosen, setWeekdayChosen] = useState(0);
  const [backendData, setBackendData] = useState([{}]);
  const [userExtra, setUserExtra] = useState([{}]);
  const [eventsData, setEventsData] = useState([{}]);
  const [postData, setPostData] = useState([{}]);
  const [lectureData, setLectureData] = useState([{}]);
  const [mealData, setMealData] = useState([{}]);
  const [orderData, setOrderData] = useState([{}]);
  const [referData, setReferData] = useState([{}]);
  const [vacationData, setVacationData] = useState([{}]);
  const [handleRender, setHandleRender] = useState(false);

  const applyEvent = (id) => {
    const newArr = [...appliedEvents];
    if (!newArr.includes(id)) {
      newArr.push(id);
      setSelectedTraining(newArr);
    }
    alert("Sėkmingai aplikavote!");
  };

  const applyTraining = (id) => {
    const newArr = [...appliedTrainings];
    if (!newArr.includes(id)) {
      newArr.push(id);
      setAppliedTrainings(newArr);
    }
    alert("Sėkmingai aplikavote!");
  };

  const handleChosenSoup = (obj, isMap) => {
    if (isMap) {
      if (soupChosen === obj.id) {
        setSoupChosen(null);
      } else {
        setSoupChosen(obj.id);
      }
    } else {
      setSoupChosen(null);
    }
  };

  const handleChosenMain = (obj, isMap) => {
    if (isMap) {
      if (mainChosen === obj.id) {
        setMainChosen(null);
      } else {
        setMainChosen(obj.id);
      }
    } else {
      setMainChosen(null);
    }
  };

  const handleChosenLecture = (obj, isMap) => {
    if (isMap) {
      if (lectureChosen === obj.id) {
        setLectureChosen(null);
      } else {
        setLectureChosen(obj.id);
      }
    } else {
      setLectureChosen(null);
    }
  };

  const handleChosenWeekday = (weekdayId) => {
    setWeekdayChosen(weekdayId);
  };

  const handleSomeChange = () => {
    setHandleRender((prevCheck) => !prevCheck);
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userData"))
    if (user) {
      fetch("/api/users/" + user._id)
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });

    fetch("/api/users/extra/" + user._id)
      .then((response) => response.json())
      .then((data) => {
        setUserExtra(data);
      });
    }

    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEventsData(data);
      });

    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPostData(data);
      });

    fetch("/api/lectures")
      .then((response) => response.json())
      .then((data) => {
        setLectureData(data);
      });

    fetch("/api/meals")
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      });

    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrderData(data);
      });

    fetch("/api/refers")
      .then((response) => response.json())
      .then((data) => {
        setReferData(data);
      });

    fetch("/api/vacations")
      .then((response) => response.json())
      .then((data) => {
        setVacationData(data);
      });
  }, []);

  return (
    <ContentContext.Provider
      value={{
        appliedEvents,
        applyEvent,
        appliedTrainings,
        applyTraining,
        soupChosen,
        setSoupChosen,
        handleChosenSoup,
        mainChosen,
        setMainChosen,
        handleChosenMain,
        lectureChosen,
        handleChosenLecture,
        weekdayChosen,
        handleChosenWeekday,
        backendData,
        setBackendData,
        userExtra,
        setUserExtra,
        eventsData,
        postData,
        lectureData,
        mealData,
        orderData,
        handleSomeChange,
        referData,
        vacationData,
        setOrderData,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export { ContentProvider };
export default ContentContext;
