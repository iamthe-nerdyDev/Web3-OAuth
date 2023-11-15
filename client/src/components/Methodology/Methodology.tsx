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
                            Our system will be built on the blockchain,
                            utilizing various web3 libraries to ensure security
                            and efficiency.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="methodology-box">
                        <h3>Normal Users:</h3>
                        <ul>
                          <li>
                            Regular users will enjoy a seamless experience with
                            a simple landing page.
                          </li>
                          <li>
                            To log in, users need to connect their web3 wallet;
                            no other details are required.
                          </li>
                          <li>
                            After connecting their wallet, users gain access to
                            their dashboard.
                          </li>
                          <li>
                            The dashboard displays a randomly generated profile
                            picture, username (unchangeable), a list of linked
                            profile cards, and associated websites.
                          </li>
                          <li>
                            Users can also access JSON-format details for each
                            profile card, useful for developers who want to
                            update information on their websites.
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
                            an API Key to integrate their users into our system.
                          </li>
                          <li>
                            Sign-up details include username, email address,
                            password, and organization details (if applicable).
                          </li>
                          <li>
                            Sign-in allows access to the dashboard, where
                            developers can create API Keys, monitor usage, and
                            manage their settings.
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
