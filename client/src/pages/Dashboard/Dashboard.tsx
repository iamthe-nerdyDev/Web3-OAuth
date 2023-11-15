import { AnchorLink, Footer_2, Header, Loader } from "@/components";
import emptyResultImage from "@/assets/empty-result.png";
import { ChevronRight, QuoteLeft, QuoteRight } from "@/icons";
import { useContext, useEffect, useState } from "react";
import StateContext from "@/utils/context/StateContext";

import { ICardStruct } from "@/interface";
import { getUserCards } from "@/utils/helper";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";

import "./Dashboard.css";

const Dashboard = () => {
  const { theme, isMounting } = useContext(StateContext)!;
  const address = useAddress();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<ICardStruct[]>([]);
  const [fact, setFact] = useState<string>("");

  useEffect(() => {
    async function getRandomFact() {
      try {
        const { data } = await axios.get(
          "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (data?.text) setFact(data.text);
        else setFact("No fact today :-)");
      } catch (e: any) {
        setFact("Unable to fetch fact");
        console.error(e);
      }
    }

    getRandomFact();
  }, []);

  useEffect(() => {
    if (!isMounting) {
      async function init() {
        if (!address) return;

        try {
          const _cards = await getUserCards(address);
          setCards(_cards);
        } catch (e: any) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      }

      init();
    }
  }, [isMounting, address]);

  return isLoading ? (
    <Loader theme={theme} />
  ) : (
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
                    <span>{fact}</span>
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
                  {cards.length > 0 ? (
                    <RenderCards cards={cards} />
                  ) : (
                    <RenderEmptyResult />
                  )}
                </div>

                <div className="new-card-btn">
                  <AnchorLink to="/create-card">
                    <button>New Card</button>
                  </AnchorLink>
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

const RenderCards = ({ cards }: { cards: ICardStruct[] }) => {
  return cards.map((card, i) => (
    <AnchorLink to={`/card/${card.id}/${i + 1}`} key={`my-card-${i}`}>
      <div className="single-card d-flex align-items-center">
        <img src={card.pfp} alt="User" />
        <div className="d-flex flex-column">
          <h4 className="username">{card.username}</h4>
          <p className="email">{card.emailAddress}</p>
          <p className="bio">{card.bio}</p>
        </div>
      </div>
    </AnchorLink>
  ));
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
