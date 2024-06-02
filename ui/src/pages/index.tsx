import React from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import PageTitle from "../components/page-title";
import Logo from "../components/logo";

import Icon from "../assets/svg";
import logo from "../assets/svg/logo.svg";
import {
  uk,
  secure,
  ethereum,
  ens,
  fleek,
  filecoin,
  galadriel,
} from "../assets/img";
import { socialOnClick } from "../utils/functions";

const HomePage = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });

  const brands: any = [ethereum, ens, fleek, filecoin, galadriel];

  const socials: any = [
    { name: "facebook", handle: "id.cv" },
    { name: "instagram", handle: "id.cv" },
    { name: "linkedin", handle: "id.cv" },
    { name: "twitter", handle: "id.cv" },
  ];

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

              <Link to="/register" className="btn_secondary">
                Get your id.cv
              </Link>
            </div>
          </div>

          <div className="hero_content">
            <p className="built">BUILT WITH LOVE AT ETHGLOBAL 🖤</p>
            <h1>All your data are belong to you.</h1>
            <p className="sub_title">
              Next-gen resumes: private, owner-controlled, decentralized, IPFS
              stored and .cv domain linked on and off chain.
            </p>

            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>
                {acceptedFiles?.length > 0
                  ? acceptedFiles[0]?.name
                  : "Start by importing your resume or Paste"}
              </p>
              <div className="btn">Browse files</div>
            </div>

            <Link to="/register" className="btn_primary">
              Create your id.cv
            </Link>
            <p className="free_and_paid">Free and Paid Options available</p>
          </div>
        </div>

        <div className="truly_yours">
          <div className="d_flex">
            <div className="info">
              <h4>A CV that’s truly yours. Not owned by LinkedIn or Indeed.</h4>
              <p>
                🔐 Decentralized and Secure.
                <br />
                💼 Store resume data, credentials and badges.
                <br />
                🧑🏼‍💻 Memorable ENS-ready Address.
                <br />
                🙋🏽‍♀️ Decide who sees what, and for how long.
              </p>

              <Link to="/register" className="btn_primary">
                Get your id.cv <Icon name="arrow" />
              </Link>
            </div>

            <img src={secure} alt="Security Img" />
          </div>

          <div className="brands vertical_scroll">
            {brands?.map((item: any, i: number) => (
              <img key={i} className="brand" src={item} alt="Brand logo" />
            ))}
          </div>
        </div>

        <div className="footer">
          <div className="info">
            <img src={logo} alt="Logo Img" />
            <p>All your data are belong to you.</p>

            <div className="socials">
              {socials?.map((item: any, i: number) => (
                <div
                  key={i}
                  className="icon"
                  onClick={() => socialOnClick(item)}
                >
                  <Icon name={item?.name} />
                </div>
              ))}
            </div>
          </div>

          <div className="links">
            <h6>Products</h6>

            <Link to="/">id.cv</Link>
            <Link to="/">Profile Builder</Link>
            <Link to="/">My Data</Link>
          </div>

          <div className="links">
            <h6>Company</h6>

            <Link to="/">About Us</Link>
            <Link to="/">Blog</Link>
          </div>

          <div className="links">
            <h6>FAQ</h6>

            <Link to="/">Help Center</Link>
            <Link to="/">FAQ</Link>
          </div>

          <div className="links">
            <h6>Legal</h6>

            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
          </div>

          <div className="animated_text">
            <p>
              All your data are belong to you 🖤 <span>✦</span> All your data
              are belong to you 🖤 <span>✦</span> All your data are belong to
              you 🖤 <span>✦</span> All your data are belong to you 🖤{" "}
              <span>✦</span> All your data are belong to you 🖤 <span>✦</span>{" "}
              All your data are belong to you 🖤 <span>✦</span> All your data
              are belong to you 🖤 <span>✦</span>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
