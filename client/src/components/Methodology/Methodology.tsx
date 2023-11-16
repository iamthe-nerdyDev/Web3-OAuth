import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";

import "./Methodology.css";

const Methodology = () => {
  const { theme } = useContext(StateContext)!;

  return (
    <section className={`methodology py-5 ${theme} mb-4`} id="methodology">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="px-2">
              <div className="row g-4">
                <div className="col-12 mb-3">
                  <h2 className="gradient-text text-center">Methodology</h2>
                </div>
                <div className="col-12">
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <div className="methodology-box p-4">
                        <div className="d-flex align-items center justify-content-center">
                          <img src="/images/puzzle.png" alt="Puzzle" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="methodology-box">
                        <h3>Development Approach:</h3>
                        <ul>
                          <li>
                            Our system will be built on the&nbsp;
                            <span>Telos EVM blockchain</span>, utilizing various
                            web3 libraries to ensure security and efficiency.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="methodology-box">
                        <h3>Normal Users:</h3>
                        <ul>
                          <li>
                            Regular users will enjoy a&nbsp;
                            <span>seamless experience</span> with a simple
                            landing page.
                          </li>
                          <li>
                            To log in, users need to connect their&nbsp;
                            <span>web3 wallet</span>; no other details are
                            required.
                          </li>
                          <li>
                            After connecting their wallet, users gain access to
                            their dashboard.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="methodology-box">
                        <h3>Developer:</h3>
                        <ul>
                          <li>
                            Developers, mainly website owners, can sign up for
                            an <span>Access Token</span> to integrate their
                            users into our system.
                          </li>
                          <li>
                            Sign-in allows access to the dashboard, where
                            developers can create <span>Access tokens</span>,
                            monitor usage, and manage their settings (coming
                            soon).
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
