import React from "react";
import { Link } from "react-router-dom";

import PageTitle from "../components/page-title";
import Logo from "../components/logo";

import { uk } from "../assets/img";

const HomePage = () => {
  return (
    <React.Fragment>
      <PageTitle title="Home" />

      <div className="home_page_container">
        <div className="hero_section">
          <div className="navbar">
            <Logo />

            <div className="flex_end">
              <div className="language">
                <img src={uk} alt="Language icon" />
                <p>EN</p>
              </div>

              <Link to="/" className="btn_secondary">
                Get your id.cv
              </Link>
            </div>
          </div>

          <div className="hero_content"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
