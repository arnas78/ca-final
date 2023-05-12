import React, { useState } from "react";

const ContentContext = React.createContext();

function ContentProvider({ children }) {
  const [appliedEvents, setSelectedTraining] = useState([]);
  const [appliedTrainings, setAppliedTrainings] = useState([]);
  const [soupChosen, setSoupChosen] = useState(null);
  const [mainChosen, setMainChosen] = useState(null);
  const [lectureChosen, setLectureChosen] = useState(null);
  const [weekdayChosen, setWeekdayChosen] = useState(0);

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
    setWeekdayChosen = weekdayId;
  };

  return (
    <ContentContext.Provider
      value={{
        appliedEvents,
        applyEvent,
        appliedTrainings,
        applyTraining,
        soupChosen,
        handleChosenSoup,
        mainChosen,
        handleChosenMain,
        lectureChosen,
        handleChosenLecture,
        weekdayChosen,
        handleChosenWeekday,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export { ContentProvider };
export default ContentContext;
