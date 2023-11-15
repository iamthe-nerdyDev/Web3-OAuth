import { Line, Moon, Sun } from "@/icons";
import { AnchorLink, ConnectBtn } from "..";
import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";

import "./Header.css";

const Header = () => {
  const { theme, setTheme, isLoggedIn } = useContext(StateContext)!;

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <nav className={`header-nav ${theme}`}>
        <div className="container">
          <div className="py-4 px-2">
            <div className="d-flex flex-column flex-md-row align-md-items-center justify-content-between gap-1">
              <div className="nav-brand">
                <AnchorLink to={isLoggedIn ? "/dashboard" : "/"}>
                  <h1>Web3 OAuth</h1>
                </AnchorLink>
              </div>
              <div className="d-flex align-items-center gap-1">
                <div className="theme-switcher" onClick={toggleTheme}>
                  {theme === "dark" ? <Sun /> : <Moon />}
                </div>
                <Line className="opaq-1" />
                <ConnectBtn />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="py-5 my-4 my-md-0">
        <div className="py-3"></div>
      </div>
    </>
  );
};

export default Header;
