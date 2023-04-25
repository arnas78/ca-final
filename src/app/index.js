import React from "react";
import "../index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Learning from "./pages/Learning";
import Events from "./pages/Events";
import Lunch from "./pages/Lunch";
import Posts from "./pages/Posts";
import MainProvider from "./context/MainProvider";

function App() {
  return (
    <MainProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lunch" element={<Lunch />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/events" element={<Events />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </MainProvider>
  );
}

export default App;
