import { useState } from 'react';
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
import button1 from "../public/Group.svg";
import button2 from "../public/Store Buttons.svg";



export default function Home() {
  // const [openFaqs, setOpenFaqs] = useState([]);

  // const toggleFAQ = (index) => {
  //   const newOpenFaqs = [...openFaqs];
  //   if (newOpenFaqs.includes(index)) {
  //     newOpenFaqs.splice(newOpenFaqs.indexOf(index), 1);
  //   } else {
  //     newOpenFaqs.push(index);
  //   }
  //   setOpenFaqs(newOpenFaqs);
  // };

  // const faqs = [
  //   {
  //     question: 'How do I purchase a membership?',
  //     answer: [
  //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, veniam!',
  //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa voluptatem voluptatibus temporibus nemo amet tempore aperiam pariatur laboriosam qui vel!',
  //     ],
  //   },
  //   {
  //     question: 'Which platforms are supported?',
  //     answer: [
  //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa voluptatem voluptatibus temporibus nemo amet tempore aperiam pariatur laboriosam qui vel!',
  //     ],
  //   },
  //   {
  //     question: 'How to cancel the subscription?',
  //     answer: [
  //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, veniam!',
  //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa voluptatem voluptatibus temporibus nemo amet tempore aperiam pariatur laboriosam qui vel!',
  //     ],
  //   },
  // ];

  // const generateFAQs = () => {
  //   return faqs.map((faq, index) => (
  //     <div className="content-container" key={index}>
  //       <div className="faq-header" onClick={() => toggleFAQ(index)}>
  //         <h3>{faq.question}</h3>
  //         <span className={`open ${openFaqs.includes(index) ? '' : 'active'}`}>+</span>
  //         <span className={`close ${openFaqs.includes(index) ? 'active' : ''}>-</span>
  //       </div>

  //       <div className={`content ${openFaqs.includes(index) ? 'active' : ''}`}>
  //         {faq.answer.map((answer, i) => (
  //           <p key={i}>{answer}</p>
  //         )}
  //       </div>
  //     </div>
  //   ));
  // };

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
            <Image className='image2' src={Management} alt="Management" />
          </div>

          <div className="offer1">
            <h3>Secure and Privacy-Conscious Data Sharing</h3>
            <p>Ensure safe and private data sharing with user consent.</p>
            <Image className='image3' src={Privacy} alt="Privacy" />
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
        {/* <div className="questions-container">{generateFAQs()}</div> */}
      </div>

      <div className="group8">
        <h3>Unlock Limitless Possibilities with Our New Card Solutions</h3>
        <p>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div className="flex">
        <Image src={button1} alt="rating"/>
        <Image src={button2} alt="rating"/>
        </div>
      </div>

      <div className="group9">
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
                <input type="email" /><br/>
                <button>Subscribe</button>
              </div>
              </div>
      </div>
    </div>
  );
}
