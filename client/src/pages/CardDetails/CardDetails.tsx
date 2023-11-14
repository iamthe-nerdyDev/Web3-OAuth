import { Footer_2, Header } from "@/components";
import userImage from "@assets/user.png";
import emptyResultImage from "@assets/empty-result.png";
import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";

import "./CardDetails.css";
import { Trash } from "@/icons";

const CardDetails = () => {
  const { theme } = useContext(StateContext)!;

  return (
    <main className={`card-details-${theme}`}>
      <Header />

      <div className="container mt-5 mt-md-0">
        <div className="row g-5">
          <div className="col-12 col-md-10 col-lg-8 mx-auto">
            <div className="card-details__box px-2">
              <div className="info d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center line-text px-3 gap-1">
                  <hr />
                  <h2>
                    Card-<span>01</span>
                  </h2>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <button>edit</button>
                  <div className="pointer">
                    <Trash fill="crimson" />
                  </div>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-12 col-md-5">
                  <div className="pfp">
                    <img src={userImage} className="mb-1" alt="user" />
                    <span>pfp</span>
                  </div>
                </div>
                <div className="col-12 col-md-7">
                  <div className="entries d-flex flex-column gap-1">
                    <div>
                      <span>username</span>
                      <p>NerdyDev</p>
                    </div>
                    <div>
                      <span>email</span>
                      <p>adedeji@gmail.com</p>
                    </div>
                    <div>
                      <span>bio</span>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-9 col-lg-8 mx-auto">
            <div className="px-2">
              <hr />
            </div>
          </div>

          <div className="col-12 col-md-9 col-lg-8 mx-auto mb-5">
            <div className="px-2">
              <div className="connected-sites">
                <span className="mb-2 d-block">Connected Sites</span>
                <div className="empty-result align-items-center py-4 d-flex flex-column">
                  <img src={emptyResultImage} alt="empty result" />
                  <p>Nothing found</p>
                </div>
                <div className="sites"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer_2 />
    </main>
  );
};

export default CardDetails;
