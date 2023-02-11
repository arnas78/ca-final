import React from "react";
import "../index.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import logo from "./components/images/logo-no-background.png";

function App() {
  return (
    <div className="Content">
      <Header image={logo} />
      <Home image={logo} />
      <Profile />
    </div>
  );
}

export default App;
