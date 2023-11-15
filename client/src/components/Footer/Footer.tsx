import { Github, Telegram, Twitter, Discord } from "@/icons";
import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";

import "./Footer.css";

const Footer = () => {
  const { theme } = useContext(StateContext)!;

  return (
    <footer className={`footer pb-5 ${theme}`}>
      <div className="container">
        <div className="row g-5">
          <div className="col-12 mb-4">
            <div className="px-3">
              <div className="row g-4">
                <div className="col-12 col-md-4 mb-3">
                  <div>
                    <h2 className="gradient-text mb-4">Web3 OAuth</h2>
                    <ul>
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li>
                        <a href="#">Tokenomics(Coming soon)</a>
                      </li>
                      <li>
                        <a
                          href="https://web3-oauth-dev.vercel.app"
                          target="_blank"
                        >
                          Developer
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://github.com/iamthe-nerdyDev/Web3-OAuth/blob/master/client/README.md"
                          target="_blank"
                        >
                          Docs
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div className="mx-md-auto newsletter">
                    <h4 className="mb-2">
                      Get latest update with our <br />
                      newsletter
                    </h4>
                    <div className="d-flex flex-column gap-1">
                      <input type="text" placeholder="Enter your email" />
                      <button>Subscribe</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="socials d-flex align-items-center gap-2 px-3">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
