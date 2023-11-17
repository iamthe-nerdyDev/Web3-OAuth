import { AnchorLink, ConnectBtn } from "..";
import { useContext, useEffect, useState } from "react";
import StateContext from "@/utils/context/StateContext";
import { Sun, Moon, Menu, Close } from "@/icons";

import "./Navbar.css";

const Navbar = () => {
  const { theme, setTheme, isLoggedIn } = useContext(StateContext)!;
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [hash, setHash] = useState<string>(window.location.hash);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <nav className={`home-nav py-4 px-2 ${theme}`}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="nav-brand">
              <a href="#">
                <h2>Web3 OAuth</h2>
              </a>
            </div>
            <div className="d-none d-lg-block links">
              <ul className="d-flex align-items-center">
                <li className={hash === "#features" ? "active" : ""}>
                  <a href="#features">What We Offer</a>
                </li>
                <li className={hash === "#methodology" ? "active" : ""}>
                  <a href="#methodology">Methodology</a>
                </li>
                <li className={hash === "#faq" ? "active" : ""}>
                  <a href="#faq">FAQs</a>
                </li>
                {isLoggedIn && (
                  <li>
                    <AnchorLink to="/dashboard">Dashboard</AnchorLink>
                  </li>
                )}
              </ul>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="d-none d-md-flex align-items-center gap-2">
                <div className="theme-switcher" onClick={toggleTheme}>
                  {theme === "dark" ? <Sun /> : <Moon />}
                </div>
                <ConnectBtn />
              </div>
              <div
                className="pointer d-block d-lg-none"
                onClick={() => setDisplayModal(true)}
              >
                <Menu />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-nav-contents ${
          displayModal ? "d-flex" : "d-none"
        } d-lg-none ${theme}`}
      >
        <div className="close" onClick={() => setDisplayModal(false)}>
          <Close />
        </div>
        <div>
          <ul className="d-flex flex-column align-items-center mb-5">
            <li className={hash === "#features" ? "active" : ""}>
              <a href="#features">What We Offer</a>
            </li>
            <li className={hash === "#methodology" ? "active" : ""}>
              <a href="#methodology">Methodology</a>
            </li>
            <li className={hash === "#faq" ? "active" : ""}>
              <a href="#faq">FAQs</a>
            </li>
            {isLoggedIn && (
              <li>
                <AnchorLink to="/dashboard">Dashboard</AnchorLink>
              </li>
            )}
          </ul>
          <div>
            <div className="d-flex d-md-none align-items-center gap-2">
              <div className="theme-switcher" onClick={toggleTheme}>
                {theme === "dark" ? <Sun /> : <Moon />}
              </div>
              <ConnectBtn />
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 my-4"></div>
    </>
  );
};

export default Navbar;
