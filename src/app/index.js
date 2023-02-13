import React from "react";
import "../index.css";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Learning from "./pages/Learning"
import Events from "./pages/Events"
import Lunch from "./pages/Lunch"
import logo from "./components/images/logo-no-background.png";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home image={logo} />} />
      <Route path="/lunch" element={<Lunch image={logo} />} />
      <Route path="/learning" element={<Learning image={logo} />} />
      <Route path="/events" element={<Events image={logo} />} />
    </Routes>
  );
}

export default App;