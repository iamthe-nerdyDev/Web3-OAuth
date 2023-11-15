import { Discord, Github, Telegram, Twitter } from "@/icons";
import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";

import "./Footer_2.css";

const Footer_2 = () => {
  const { theme } = useContext(StateContext)!;

  const year = new Date().getFullYear();

  return (
    <footer className={`py-5 footer-2 my-0 ${theme}`}>
      <div className="container">
        <div className="main d-flex flex-column align-items-center justify-items-center gap-2">
          <div className="socials d-flex align-items-center gap-2 opaq-1 mb-2">
            <a href="#" target="_blank">
              <Github />
            </a>
            <a href="#" target="_blank">
              <Telegram />
            </a>
            <a href="#" target="_blank">
              <Twitter />
            </a>
            <a href="#" target="_blank">
              <Discord />
            </a>
          </div>
          <p className="opaq-1">Copyright &copy; {year}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer_2;
