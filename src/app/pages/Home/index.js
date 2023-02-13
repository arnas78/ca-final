import React from "react";
import Profile from "../../components/Profile"
import Header from "../../components/Header";
import "./index.css";
import logo from "../../components/images/logo-no-background.png";


class Home extends React.Component {

  render() {
    return (
        <div className="Section__Home">
            <Header image={logo} />
            <Profile image={logo} />
        </div>
    );
  }
}

export default Home;
