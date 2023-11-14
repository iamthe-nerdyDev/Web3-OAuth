import { Footer_2, Header } from "@/components";
import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";
import nftSample from "@assets/nft-sample.png";

import "./EditCard.css";
import { List, Revert } from "@/icons";

const AddCard = () => {
  const { theme } = useContext(StateContext)!;

  return (
    <main className={`form-${theme}`}>
      <Header />

      <div className="container mt-5 mt-md-0 mb-4">
        <div className="row">
          <div className="col-12 col-md-10 col-lg-8 mx-auto">
            <div className="card-details__box px-2">
              <div className="info d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center line-text px-3 gap-1">
                  <hr />
                  <h1>
                    <span>Edit</span> Card
                  </h1>
                </div>
              </div>

              <form className="row g-4 mb-4">
                <div className="col-12 col-md-5">
                  <div className="pfp selected">
                    <div className="e position-relative mb-3">
                      <img src={nftSample} alt="NFT Sample" />
                      <div>
                        <button>
                          <List />
                        </button>
                        <button>
                          <Revert />
                        </button>
                      </div>
                    </div>
                    <input type="hidden" name="pfp" id="pfp" />
                    <span>pfp</span>
                  </div>
                </div>
                <div className="col-12 col-md-7">
                  <div className="entries d-flex flex-column gap-1">
                    <div>
                      <label htmlFor="username">username</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        placeholder="e.g. JohnDoe"
                        defaultValue="NerdyDev"
                      />
                    </div>
                    <div>
                      <label htmlFor="email">email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="e.g. user@example.com"
                        defaultValue="adedejimorife@gmail.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="bio">bio</label>
                      <textarea
                        id="bio"
                        name="bio"
                        required
                        placeholder="Who is this guy?"
                        rows={4}
                        defaultValue="I AM HIM!!!"
                      />
                    </div>
                    <button>Create</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer_2 />
    </main>
  );
};

export default AddCard;
