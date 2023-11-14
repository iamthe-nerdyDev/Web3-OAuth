import { Footer_2, Header } from "@/components";
import userImage from "@assets/user.png";
import emptyResultImage from "@assets/empty-result.png";
import { ChevronRight, QuoteLeft, QuoteRight } from "@/icons";
import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";

import "./Dashboard.css";

const Dashboard = () => {
  const { theme } = useContext(StateContext)!;

  const displayCards = false;

  return (
    <main className={`dashboard dashboard-${theme}`}>
      <Header />
      <div className="container">
        <div className="row g-5">
          <div className="col-12 col-md-10 col-lg-8 mx-auto">
            <div className="top ">
              <div className="top__content pt-4 px-2">
                <div className="top__content-header mb-4 pb-3">
                  <h2>Howdy! 👋</h2>
                  <p>Manage your different profile cards easily.</p>
                </div>
                <div className="top__content-body d-flex flex-column">
                  <span>Random Facts</span>
                  <div>
                    <QuoteLeft className="opaq-1" />
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore
                    </span>
                    <QuoteRight className="opaq-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-10 col-lg-8 mx-auto mb-5">
            <div className="px-2">
              <div className="cards">
                <div className="d-flex align-items-center line-text px-3 gap-1 mb-4">
                  <hr />
                  <h1>My Cards</h1>
                </div>
                <div className="cards-box d-flex flex-column gap-2 mb-5">
                  {displayCards ? <RenderCards /> : <RenderEmptyResult />}
                </div>

                <div className="new-card-btn">
                  <button>New Card</button>
                  <div>
                    <p>slide</p>
                    <span className="d-flex align-items-center">
                      <ChevronRight />
                      <ChevronRight />
                      <ChevronRight />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer_2 />
    </main>
  );
};

const RenderCards = () => {
  return (
    <>
      <div className="single-card d-flex align-items-center">
        <img src={userImage} alt="User" />
        <div className="d-flex flex-column">
          <h4 className="username">moyinthegrait</h4>
          <p className="email">moyinadedeji@gmail.com</p>
          <p className="bio">
            Lorem ipsum dolor sit amet consectetur adipiscing elit, sed
          </p>
        </div>
      </div>

      <div className="single-card d-flex align-items-center">
        <img src={userImage} alt="User" />
        <div className="d-flex flex-column">
          <h4 className="username">moyinthegrait</h4>
          <p className="email">moyinadedeji@gmail.com</p>
          <p className="bio">
            Lorem ipsum dolor sit amet consectetur adipiscing elit, sed
          </p>
        </div>
      </div>

      <div className="single-card d-flex align-items-center">
        <img src={userImage} alt="User" />
        <div className="d-flex flex-column">
          <h4 className="username">moyinthegrait</h4>
          <p className="email">moyinadedeji@gmail.com</p>
          <p className="bio">
            Lorem ipsum dolor sit amet consectetur adipiscing elit, sed
          </p>
        </div>
      </div>

      <div className="single-card d-flex align-items-center">
        <img src={userImage} alt="User" />
        <div className="d-flex flex-column">
          <h4 className="username">moyinthegrait</h4>
          <p className="email">moyinadedeji@gmail.com</p>
          <p className="bio">
            Lorem ipsum dolor sit amet consectetur adipiscing elit, sed
          </p>
        </div>
      </div>
    </>
  );
};

const RenderEmptyResult = () => {
  return (
    <div className="py-4 empty-result d-flex flex-column align-items-center justify-content-center">
      <img src={emptyResultImage} alt="empty result" />
      <p>No profile card created yet</p>
    </div>
  );
};

export default Dashboard;
