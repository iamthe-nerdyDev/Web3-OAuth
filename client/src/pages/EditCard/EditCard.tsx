import {
  AnchorLink,
  Footer_2,
  Header,
  ImageGenerator,
  ImagePicker,
  Loader,
} from "@/components";
import { useContext, useEffect, useState } from "react";
import StateContext from "@/utils/context/StateContext";
import { List, LoaderIcon, Revert, Robot } from "@/icons";
import { useParams } from "react-router-dom";
import { ICardStruct } from "@/interface";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { getUserCard, serializeForm, updateCard } from "@/utils/helper";
import { NotFound } from "..";
import { toast } from "react-toastify";

import "./EditCard.css";

const AddCard = () => {
  const { theme, isMounting } = useContext(StateContext)!;
  const { cardId } = useParams();

  const address = useAddress();
  const signer = useSigner();

  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [card, setCard] = useState<ICardStruct | null>(null);

  useEffect(() => {
    if (!isMounting) {
      async function init() {
        if (!address) return;

        try {
          const _card = await getUserCard(parseInt(cardId!));
          setCard(_card);
        } catch (e: any) {
          console.error(e);
        } finally {
          setIsPageLoading(false);
        }
      }

      init();
    }
  }, [isMounting, address]);

  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [displayAIModal, setDisplayAIModal] = useState<boolean>(false);
  const [selectedURL, setSelectedURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const doEditCard = async (e: any) => {
    e.preventDefault();

    const { pfp, username, email, bio } = serializeForm(e.target);

    setIsLoading(true);

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        updateCard(
          {
            cardId: parseInt(cardId!),
            username,
            pfp,
            emailAddress: email,
            bio,
          },
          signer!
        )
          .then((tx) => {
            setSelectedURL(null);
            setIsLoading(false);

            let _newCard = card;
            _newCard!.pfp = pfp;
            _newCard!.username = username;
            _newCard!.emailAddress = email;
            _newCard!.bio = bio;

            setCard(_newCard);

            resolve(tx);
          })
          .catch((error) => {
            setIsLoading(false);
            reject(error);
          });
      }),
      {
        pending: "Approve transaction",
        success: "Card updated successfully!",
        error: "Unable to complete request",
      }
    );
  };

  return isPageLoading ? (
    <Loader theme={theme} />
  ) : card == null ? (
    <NotFound />
  ) : (
    <main className={`form-${theme}`}>
      <Header />

      <ImageGenerator
        displayModal={displayAIModal}
        setDisplayModal={setDisplayAIModal}
        setSelectedURL={setSelectedURL}
      />

      <ImagePicker
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        selectedURL={selectedURL}
        setSelectedURL={setSelectedURL}
      />

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
                  <div className="py-4 d-flex align-items-center justify-content-center gap-1">
                    <Robot width={35} height={35} />
                    <span
                      className="fw-bold pointer dot-underline"
                      onClick={() => setDisplayAIModal(true)}
                    >
                      Generate PFP with AI
                    </span>
                  </div>

                  <div className="pfp selected">
                    <div className="e position-relative mb-3">
                      <img src={selectedURL ?? card.pfp} alt="NFT Sample" />
                      <div>
                        <button
                          type="button"
                          onClick={() => setDisplayModal(true)}
                        >
                          <List />
                          <p>Choose</p>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedURL(card.pfp)}
                        >
                          <Revert />
                          <p>Undo</p>
                        </button>
                      </div>
                    </div>
                    <span>pfp</span>
                  </div>
                  <input
                    type="hidden"
                    name="pfp"
                    id="pfp"
                    value={selectedURL ?? card.pfp}
                    readOnly
                  />
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
                    <button
                      type="submit"
                      className="d-flex align-items-center justify-content-center"
                      disabled={isLoading}
                    >
                      {isLoading ? <LoaderIcon /> : "Update"}
                    </button>
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
