import {
  AnchorLink,
  Footer_2,
  Header,
  ImageGenerator,
  ImagePicker,
} from "@/components";
import { useContext, useState } from "react";
import StateContext from "@/utils/context/StateContext";
import { toast } from "react-toastify";
import nftIcon from "@/assets/nft.png";
import { clearForm, createCard, serializeForm } from "@/utils/helper";
import { useSigner } from "@thirdweb-dev/react";
import { List, LoaderIcon, Robot } from "@/icons";

import "./AddCard.css";

const AddCard = () => {
  const { theme } = useContext(StateContext)!;
  const signer = useSigner()!;

  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [displayAIModal, setDisplayAIModal] = useState<boolean>(false);
  const [selectedURL, setSelectedURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const doAddCard = async (e: any) => {
    e.preventDefault();

    const { pfp, username, email, bio } = serializeForm(e.target);

    setIsLoading(true);

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        createCard({ username, pfp, emailAddress: email, bio }, signer)
          .then((tx) => {
            setSelectedURL(null);
            clearForm(e.target);
            setIsLoading(false);

            resolve(tx);
          })
          .catch((error) => {
            setIsLoading(false);
            reject(error);
          });
      }),
      {
        pending: "Approve transaction",
        success: "Card created successfully!",
        error: "Unable to complete request",
      }
    );
  };

  return (
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
                    <span>Create</span> Card
                  </h1>
                </div>
              </div>

              <form
                className="row g-4 mb-4"
                action="#"
                method="post"
                onSubmit={doAddCard}
              >
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
                  {selectedURL ? (
                    <div className="pfp selected">
                      <div className="e position-relative mb-3">
                        <img src={selectedURL} alt="User PFP" />
                        <div>
                          <button
                            type="button"
                            onClick={() => setDisplayModal(true)}
                          >
                            <List />
                            <p>Choose</p>
                          </button>
                        </div>
                      </div>
                      <span>pfp</span>
                    </div>
                  ) : (
                    <div className="pfp form">
                      <div
                        className="py-5 mb-3 px-5 f"
                        onClick={() => setDisplayModal(true)}
                      >
                        <img
                          src={nftIcon}
                          className="mb-1 small"
                          alt="NFT Icon"
                        />
                        <p>
                          Click here to select an NFT from your&nbsp;
                          <strong>collection</strong>
                        </p>
                      </div>
                      <span>pfp</span>
                    </div>
                  )}

                  <input
                    type="hidden"
                    name="pfp"
                    id="pfp"
                    value={selectedURL ?? ""}
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
                      />
                    </div>
                    <button
                      type="submit"
                      className="d-flex align-items-center justify-content-center"
                      disabled={isLoading}
                    >
                      {isLoading ? <LoaderIcon /> : "Create"}
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
