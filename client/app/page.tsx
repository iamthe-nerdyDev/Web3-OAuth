"use client";
import { useState } from "react";

import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import icon from "../public/arrow-right-solid.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
// import { faGithub } from &apos;@fortawesome/free-solid-svg-icons&apos;;
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./style.css";
import "./page.css";

// import {faSomeIcon} from &apos;@fortawesome/react-fontawesome&apos;
import dots from "../public/Dot.svg";
import profile from "../public/profile_sample.svg";
import Creation from "../public/profile_picture.svg";
import Update from "../public/website_update.svg";
import Management from "../public/profile_management.svg";
import Privacy from "../public/Privacy.svg";
import Puzzle from "../public/puzzle.png";
import Rating from "../public/Rating.svg";
import button1 from "../public/Group.svg";
import button2 from "../public/Store Buttons.svg";
import "./Theme";
import ThemeButton from "./Theme";

function Home() {
  const [expandedFaqId, setExpandedFaqId] = useState<any>(null);
  const faqs = [
    {
      title: "Can I use a UI Kit for commercial projects?",
      description: `Yes! Mode UI Kit is designed for both personal and commercial use. 
      However, it's crucial to review the license or usage terms provided with the UI Kit 
      to ensure compliance with the specific usage rights and any attribution requirements.`,
      id: 1,
    },
    {
      title: "Can I use a UI Kit for commercial projects?",
      description: `Yes! Mode UI Kit is designed for both personal and commercial use. 
      However, it's crucial to review the license or usage terms provided with the UI Kit 
      to ensure compliance with the specific usage rights and any attribution requirements.`,
      id: 2,
    },
    {
      title: "Can I use a UI Kit for commercial projects?",
      description: `Yes! Mode UI Kit is designed for both personal and commercial use. 
      However, it's crucial to review the license or usage terms provided with the UI Kit 
      to ensure compliance with the specific usage rights and any attribution requirements.`,
      id: 3,
    },
    {
      title: "Can I use a UI Kit for commercial projects?",
      description: `Yes! Mode UI Kit is designed for both personal and commercial use. 
      However, it's crucial to review the license or usage terms provided with the UI Kit 
      to ensure compliance with the specific usage rights and any attribution requirements.`,
      id: 4,
    },
  ];

  // useEffect(() => {
  // const faqs = document.querySelectorAll(".Faq");

  // faqs.forEach((faq) => {
  //   faq.addEventListener("click", () => {
  // faq.classList.toggle("active");
  //   });
  // });
  // }, []);

  return (
    <div className="general_container">
      <div className="group1">
        <div className="nav">
          <div className="nav-cont">
            <a href="">web3 Oauth</a>

            <div className="group2">
              <ul>
                <li className="nav_L">
                  <a href="#whatweoffer" className="link">
                    What we offer
                  </a>
                </li>
                <li className="nav_L">
                  <a href="#Methodology" className="link">
                    Methodology
                  </a>
                </li>
                <li className="nav_L">
                  <a href="#Faq" className="link">
                    FAQ
                  </a>
                </li>
                <li className="nav_L">
                  <a href="#contact" className="link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <ul>
              <li className="nav_L">
                <a href="#about" className="link">
                  English
                </a>
              </li>
              <li className="nav_L">
                <a href="#work" className="link2">
                  Connect wallet
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    beat
                    style={{ width: "12px" }}
                  />
                </a>
              </li>
            </ul>
            {/* <FontAwesomeIcon icon={faBars} /> */}
          </div>
        </div>
      </div>
      <ThemeButton />

      <div className="group3">
        {/* <div className="dot"> */}
        {/* <Image className="dots" src={dots} alt="Dots" /> */}
        {/* </div> */}
        <div className=" text_cont">
          <p>Seamless Experience</p>
          <h2>
            Simplifying user data management across websites. Seamless profile
            updates. Blockchain-powered.
          </h2>
          <h5>Experience the future of web interaction.</h5>

          <div className="button">
            <a href="">
              Connect Wallet
              <FontAwesomeIcon icon={faArrowRight} style={{ width: "12px" }} />
            </a>
            <a href="">
              Read Docs
              <FontAwesomeIcon icon={faFileLines} style={{ width: "12px" }} />
            </a>
          </div>
        </div>
      </div>

      <div className="group4">
        <div className="image">
          <Image className="profile" src={profile} alt="Profile" />
        </div>
      </div>

      <div id="whatweoffer" className="group5">
        <h3>What we offer</h3>
        <div className="group_offers">
          <div className="offer1">
            <h3>Streamlined Profile Creation</h3>
            <p>
              Allow users to create and manage multiple profile card details for
              different scenarios.
            </p>
            <Image className="image" src={Creation} alt="Creation" />
          </div>

          <div className="offer1">
            <h3>Real-Time Website Updates</h3>
            <p>
              Instantly notify connected websites of any changes through webhook
              integration.
            </p>
            <Image className="image" src={Update} alt="update" />
          </div>

          <div className="offer1">
            <h3>Effortless Profile Picture Management</h3>
            <p>
              Enable users to effortlessly manage their profile pictures,
              whether from existing NFTs or local device images.
            </p>
            <Image className="image2" src={Management} alt="Management" />
          </div>

          <div className="offer1">
            <h3>Secure and Privacy-Conscious Data Sharing</h3>
            <p>Ensure safe and private data sharing with user consent.</p>
            <Image className="image3" src={Privacy} alt="Privacy" />
          </div>
        </div>
      </div>

      <div id="Methodology" className="group5">
        <h3>Methodology</h3>
        <div className="group_offers">
          <div className="offer2">
            <Image src={Puzzle} alt="puzzle" />
          </div>

          <div className="offer2">
            <h3>Development Approach:</h3>
            <ul>
              <li className="bullets">
                Our system will be built on the blockchain, utilizing various
                web3 libraries to ensure security and efficiency.
              </li>
            </ul>
          </div>

          <div className="offer3">
            <h3>Normal User:</h3>
            <ul>
              <li className="bullets">
                Regular users will enjoy a seamless experience with a simple
                landing page.
              </li>
              <li className="bullets">
                To log in, users need to connect their web3 wallet; no other
                details are required.
              </li>
              <li className="bullets">
                After connecting their wallet,users gain access to their
                dashboard.
              </li>
              <li className="bullets">
                The dashboard displays a randomly generated profile picture,
                username (unchangeable), a list of linked profile cards, and
                associated websites.
              </li>
              <li className="bullets">
                Users can also access JSON-format details for each profile card,
                useful for developers who want to update information on their
                websites.
              </li>
            </ul>
          </div>

          <div className="offer3">
            <h3>Developer:</h3>
            <ul>
              <li className="bullets">
                Developers, mainly website owners, can sign up for an API Key to
                integrate their users into our system.
              </li>
              <li className="bullets">
                Sign-up details include username, email address, password, and
                organization details (if applicable).
              </li>
              <li className="bullets">
                Sign-in allows access to the dashboard, where developers can
                create API Keys, monitor usage, and manage their settings.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="group6">
        <h3>Bonus Concept</h3>
        <p>
          Developers can integrate our SDK into their websites, which activates
          a modal for a smooth user experience. The SDK file streamlines library
          integration for developers.
        </p>
        <Image src={Rating} alt="rating" />
      </div>

      <div id="Faq" className="group7">
        <h3>
          Find Answers to Your Burning Questions about Profile Card Solutions
        </h3>
        <div className="general_faq">
          {faqs.map((faq) => (
            <div className="Faq" key={faq.id}>
              <div
                className="question"
                onClick={() => {
                  setExpandedFaqId((prevId: any) =>
                    prevId === faq.id ? null : faq.id
                  );
                  console.log(faq.id);
                }}
              >
                <h3>{faq.title}</h3>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={
                    expandedFaqId === faq.id ? "arrow-icn active" : "arrow-icn"
                  }
                />
              </div>
              <div
                className={
                  expandedFaqId === faq.id ? "answer active" : "answer"
                }
              >
                <p>{faq.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="group8">
        <h3>Unlock Limitless Possibilities with Our New Card Solutions</h3>
        <p>
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
        </p>
        <div className="flex">
          <Image src={button1} alt="rating" />
          <Image src={button2} alt="rating" />
        </div>
      </div>

      <div id="contact" className="group9">
        <div className="flex2">
          <div className="list">
            <ul>
              <li className="nav_f">
                <a href="#about" className="linkL">
                  web3 Oauth
                </a>
              </li>
              <li className="nav_f">
                <a href="#about" className="links">
                  About us
                </a>
              </li>
              <li className="nav_f">
                <a href="#work" className="links">
                  Pricing
                </a>
              </li>
              <li className="nav_f">
                <a href="#contact" className="links">
                  Contact us
                </a>
              </li>
              <li className="nav_f">
                <a href="#contact" className="links">
                  Features
                </a>
              </li>
            </ul>
          </div>

          <div className="form">
            <h5>Get latest update with our newsletter</h5>
            <input type="email" />
            <br />
            <button>Subscribe</button>
          </div>
        </div>

        <div className="flex-socials">
          <FontAwesomeIcon
            icon={faGithub}
            style={{ width: "20px", color: "#5A6475" }}
          />
          <FontAwesomeIcon
            icon={faLinkedin}
            style={{ width: "20px", color: "#5A6475" }}
          />
          <FontAwesomeIcon
            icon={faDiscord}
            style={{ width: "20px", color: "#5A6475" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
