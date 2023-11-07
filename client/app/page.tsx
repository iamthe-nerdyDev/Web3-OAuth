import Image from "next/image";
import localFont from "next/font/local";
import icon from "../public/arrow-right-solid.svg";
import dots from "../public/Dot.svg";
import profile from "../public/profile_sample.svg";
import Creation from "../public/profile_picture.svg";
import Update from "../public/website_update.svg";
import Management from "../public/profile_management.svg";
import Privacy from "../public/Privacy.svg";
import Puzzle from "../public/puzzle.png";
import Rating from "../public/Rating.svg";

export default function Home() {
//   const faqHeaders = document.querySelectorAll(".faqs-container .faq-header");

// faqHeaders.forEach((header, i) => {
//   header.addEventListener("click", () => {
//     header.nextElementSibling.classList.toggle("active");

//     const open = header.querySelector(".open");
//     const close = header.querySelector(".close");

//     if (header.nextElementSibling.classList.contains("active")) {
//       open.classList.remove("active");
//       close.classList.add("active");
//     } else {
//       open.classList.add("active");
//       close.classList.remove("active");
//     }
//   });
// });
  return (
    <div className="general_container">
      <div className="group1">
        <div className="nav">
          <div className="nav-cont">
            <a href="">web3 Oauth</a>
            <div className="group2">
              <ul>
                <li className="nav_L">
                  <a href="#about" className="link">
                    What we offer
                  </a>
                </li>
                <li className="nav_L">
                  <a href="#work" className="link">
                    Methodology
                  </a>
                </li>
                <li className="nav_L">
                  <a href="#contact" className="link">
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
                  {/* <Image className="arrow" src={icon} alt="Icon" /> */}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="group3">
        <div className="dot">
          <Image className="dots" src={dots} alt="Dots" />
        </div>
        <p>Seamless Experience</p>
        <h2>
          Simplifying user data management across websites. Seamless profile
          updates. Blockchain-powered.
        </h2>
        <h5>Experience the future of web interaction.</h5>

        <div className="button">
          <a href="">Connect Wallet</a>
          <a href="">Read Docs</a>
        </div>
      </div>

      <div className="group4">
        <div className="image">
          <Image className="profile" src={profile} alt="Profile" />
        </div>
      </div>

      <div className="group5">
        <h3>What we offer</h3>
        <div className="group_offers">
          <div className="offer1">
            <h3>Streamlined Profile Creation</h3>
            <p>
              Allow users to create and manage multiple profile card details for
              different scenarios.
            </p>
            <Image src={Creation} alt="Creation" />
          </div>

          <div className="offer1">
            <h3>Real-Time Website Updates</h3>
            <p>
              Instantly notify connected websites of any changes through webhook
              integration.
            </p>
            <Image src={Update} alt="update" />
          </div>

          <div className="offer1">
            <h3>Effortless Profile Picture Management</h3>
            <p>
              Enable users to effortlessly manage their profile pictures,
              whether from existing NFTs or local device images.
            </p>
            <Image src={Management} alt="Management" />
          </div>

          <div className="offer1">
            <h3>Secure and Privacy-Conscious Data Sharing</h3>
            <p>Ensure safe and private data sharing with user consent.</p>
            <Image src={Privacy} alt="Privacy" />
          </div>
        </div>
      </div>

      <div className="group5">
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
            {/* <Image src={Update} alt="update"/> */}
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
                dashboard.{" "}
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
            {/* <Image src={Management} alt="Management"/> */}
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
            {/* <Image src={Privacy} alt="Privacy" /> */}
          </div>
        </div>
      </div>

      <div className="group6">
        <h3>Bonus Concept</h3>
        <p>Developers can integrate our SDK into their websites, which activates a modal for a smooth user experience. The SDK file streamlines library integration for developers.</p>
        <Image src={Rating} alt="rating"/>
      </div>

      <div className="group7">
        <h3>Find Answers to Your Burning Questions about Profile Card Solutions</h3>
        <div className="faqs-container">
      <h2>Frequently Asked Questions</h2>

      <div className="questions-container">
        <div className="content-container">
          <div className="faq-header">
            <h3>How do I purchase a membership?</h3>
            <span className="open active">+</span>
            <span className="close">-</span>
          </div>

          <div className="content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              veniam!
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              voluptatem voluptatibus temporibus nemo amet tempore aperiam
              pariatur laboriosam qui vel!
            </p>
          </div>
        </div>

        <div className="content-container">
          <div className="faq-header">
            <h3>Which platforms are supported?</h3>
            <span className="open active">+</span>
            <span className="close">-</span>
          </div>

          <div className="content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              voluptatem voluptatibus temporibus nemo amet tempore aperiam
              pariatur laboriosam qui vel!
            </p>
          </div>
        </div>

        <div className="content-container">
          <div className="faq-header">
            <h3>How to cancel the subscription?</h3>
            <span className="open active">+</span>
            <span className="close">-</span>
          </div>

          <div className="content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              veniam!
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              voluptatem voluptatibus temporibus nemo amet tempore aperiam
              pariatur laboriosam qui vel!
            </p>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}
