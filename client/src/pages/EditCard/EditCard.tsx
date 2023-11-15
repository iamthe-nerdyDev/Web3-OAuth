import { AnchorLink, Footer_2, Header, Loader } from "@/components";
import { useContext, useEffect, useState } from "react";
import StateContext from "@/utils/context/StateContext";

import { List, Revert } from "@/icons";
import { useParams } from "react-router-dom";
import { ICardStruct } from "@/interface";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { getUserCard, serializeForm, updateCard } from "@/utils/helper";
import { NotFound } from "..";

import "./EditCard.css";
import { toast } from "react-toastify";

const AddCard = () => {
  const { cardId } = useParams();

  const { theme, isMounting } = useContext(StateContext)!;

  const address = useAddress();
  const signer = useSigner();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [card, setCard] = useState<ICardStruct | null>(null);

  useEffect(() => {
    if (!isMounting) {
      async function init() {
        if (!address || !signer) return;

        try {
          const _card = await getUserCard(parseInt(cardId!), signer);
          setCard(_card);
        } catch (e: any) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      }

      init();
    }
  }, [isMounting, address]);

  const doEditCard = async (e: any) => {
    e.preventDefault();

    const { pfp, username, email, bio } = serializeForm(e.target);

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        updateCard(
          parseInt(cardId!),
          { username, pfp, emailAddress: email, bio },
          signer!
        )
          .then((tx) => {
            resolve(tx);
          })
          .catch((error) => reject(error));
      }),
      {
        pending: "Approve transaction",
        success: "Card updated successfully!",
        error: "Unable to complete request",
      }
    );
  };

  return isLoading ? (
    <Loader theme={theme} />
  ) : card == null ? (
    <NotFound />
  ) : (
    <main className={`form-${theme}`}>
      <Header />

      <div className="container mt-5 mt-md-0 mb-4">
        <div className="row">
          <div className="col-12 col-md-10 col-lg-8 mx-auto">
            <div className="px-2 mb-4 pb-2">
              <div className="back-btn">
                <AnchorLink to="/dashboard">
                  &laquo; Back to dashboard
                </AnchorLink>
              </div>
            </div>
            <div className="card-details__box px-2">
              <div className="info d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center line-text px-3 gap-1">
                  <hr />
                  <h1>
                    <span>Edit</span> Card
                  </h1>
                </div>
              </div>

              <form
                className="row g-4 mb-4"
                action="#"
                method="post"
                onSubmit={doEditCard}
              >
                <input type="hidden" name="pfp" id="pfp" />
                <div className="col-12 col-md-5">
                  <div className="pfp selected">
                    <div className="e position-relative mb-3">
                      <img src={card.pfp} alt="NFT Sample" />
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
                        defaultValue={card.username}
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
                        defaultValue={card.emailAddress}
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
                        defaultValue={card.bio}
                      />
                    </div>
                    <button>Update</button>
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
