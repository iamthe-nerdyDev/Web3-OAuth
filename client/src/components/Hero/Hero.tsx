import { Doc } from "@/icons";
import { ConnectBtn } from "..";
import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";

import "./Hero.css";

const Hero = () => {
  const { theme, isLoggedIn } = useContext(StateContext)!;

  return (
    <section className={`hero mb-5 ${theme}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="px-2 py-3 hero-content d-flex flex-column align-items-center justify-content-center text-center gap-1">
              <span>Seamless experience</span>
              <h1>
                Simplifying user data management across websites. Seamless
                profile updates. Blockchain-powered.
              </h1>
              <p className="mb-3">Experience the future of web interaction.</p>
              <div
                className={`${
                  isLoggedIn ? "gap-2" : "gap-1"
                } d-flex flex-column flex-md-row align-items-center justify-content-center`}
              >
                <ConnectBtn className="bg-purple" />
                <a
                  href="https://github.com/iamthe-nerdyDev/Web3-OAuth/blob/master/client/README.md"
                  target="_blank"
                >
                  <button className="docs d-flex align-items-center justify-content-center gap-1">
                    Read docs <Doc />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
