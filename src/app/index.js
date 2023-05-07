import React from "react";
import "../index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Learning from "./pages/Learning";
import Events from "./pages/Events";
import Lunch from "./pages/Lunch";
import Posts from "./pages/Posts";
import MainProvider from "./context/MainProvider";

function App() {
  return (
    <MainProvider>
      <Routes>
        <Route path="/lunch" element={<Lunch />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/events" element={<Events />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Navigate replace to="/profile" />} />
      </Routes>
    </MainProvider>
  );
}

export default App;
