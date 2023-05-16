import React, { useEffect } from "react";
import "../index.css";
import { Routes, Route, Navigate, withRouter } from "react-router-dom";
import Profile from "./pages/Profile";
import Learning from "./pages/Learning";
import Events from "./pages/Events";
import Lunch from "./pages/Lunch";
import Posts from "./pages/Posts";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainProvider from "./context/MainProvider";
import ScrollToTop from "./context/ScrollToTop";

function App() {
  return (
    <MainProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lunch" element={<Lunch />} />
        <Route path="/lectures" element={<Learning />} />
        <Route path="/events" element={<Events />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    </MainProvider>
  );
}

export default App;
