import React, { useState } from "react";
import classNames from "classnames";

import PageTitle from "../../components/page-title";
import Button from "../../components/button";

import OfficialName from "./official-name";
import Email from "./email";
import ResumeData from "./resume-data";
import Certificates from "./certificates";
import Identification from "./identification";

import Icon from "../../assets/svg";

const navigations = [
  { key: "name", label: "Official Name" },
  { key: "email", label: "Email" },
  { key: "document", label: "Resume Data" },
  { key: "certification", label: "Certificates and Credentials" },
  { key: "identification", label: "Identification" },
];

const MyDataPage = () => {
  const [activeNav, setActiveNav] = useState(navigations[0].label);

  return (
    <React.Fragment>
      <PageTitle title="My Data" />

      <div className="my_data_page_container">
        <div className="content_container">
          <div className="section_header">
            <div className="left">
              <h3>My Data</h3>
              <p>Yours always.</p>
            </div>

            <div className="actions">
              <Button text="Update" onClick={() => {}} />
              <Button text="Download JSON" onClick={() => {}} />
            </div>
          </div>

          <div className="navigation">
            <p className="title">Quick Search</p>

            <div className="navs vertical_scroll">
              {navigations.map((item, i) => (
                <div
                  key={i}
                  className={classNames("item", {
                    active: activeNav === item.label,
                  })}
                  onClick={() => setActiveNav(item.label)}
                >
                  <div className="icon">
                    <Icon name={item.key} />
                  </div>

                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr />

        {activeNav === navigations[0].label && <OfficialName />}
        {activeNav === navigations[1].label && <Email />}
        {activeNav === navigations[2].label && <ResumeData />}
        {activeNav === navigations[3].label && <Certificates />}
        {activeNav === navigations[4].label && <Identification />}
      </div>
    </React.Fragment>
  );
};

export default MyDataPage;
