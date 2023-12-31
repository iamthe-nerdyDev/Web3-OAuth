import React from "react";
import { useOAuthStore } from "../../../context/OAuthProvider/OAuthProvider";
import { URL } from "../../../utils/constants";

type CardProps = {
  displayModal: boolean;
  setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CardSelector: React.FC<CardProps> = (props) => {
  const [selectedCard, setSelectedCard] = React.useState<number>();

  const { theme, cards, isLoading, createSession } = useOAuthStore();

  return (
    cards && (
      <div className={theme}>
        <div
          className={`fixed inset-0 z-50 ${
            props.displayModal ? "flex" : "hidden"
          } flex-col items-center justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-md backdrop-filter dark:bg-opacity-50`}
        >
          <div className="w-[calc(93%)] max-w-[calc(30rem)] rounded-xl border bg-white px-5 py-10 shadow-lg my-20 dark:bg-black dark:text-white">
            <div className="flex w-full flex-col">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-3 h-14 w-14 fill-red-700 dark:fill-red-200"
                  viewBox="0 0 32 32"
                >
                  <path d="M23.14 25.415v-1.988a.996.996 0 01.36-1.927 1 1 0 011 1 .994.994 0 01-.64.927v1.988a.36.36 0 11-.72 0zM31.36 16v15a.36.36 0 01-.36.36H16a.36.36 0 01-.36-.36V19h.72v11.64h14.28V16.36H1A.36.36 0 01.64 16V1A.36.36 0 011 .64h15a.36.36 0 01.36.36v12h-.72V1.36H1.36v14.28h2.28v-2.639c0-1.926 1.166-3.659 2.908-4.427A2.844 2.844 0 015.643 6.5c0-1.577 1.283-2.86 2.86-2.86s2.86 1.283 2.86 2.86c0 .794-.335 1.542-.907 2.075 1.74.77 2.904 2.502 2.904 4.426v2.639h6.28V11.5a3.864 3.864 0 013.859-3.86 3.864 3.864 0 013.861 3.86l-.001 4.14H31a.36.36 0 01.36.36zm-18.72-2.999c0-1.837-1.25-3.47-3.041-3.97a.36.36 0 01-.076-.662 2.14 2.14 0 001.12-1.869c0-1.18-.96-2.14-2.14-2.14s-2.14.96-2.14 2.14c0 .773.429 1.489 1.119 1.868a.36.36 0 01-.078.662c-1.792.499-3.044 2.132-3.044 3.971v2.639h8.28v-2.639zm14-1.501c0-1.731-1.408-3.14-3.14-3.14s-3.14 1.409-3.14 3.14v4.14h6.278l.002-4.14z"></path>
                </svg>
                <h2 className="mb-5 text-center text-3xl font-medium">
                  Choose Card
                </h2>

                {cards.length == 0 ? (
                  <React.Fragment>
                    <div className="mb-4 flex flex-col gap-3">
                      <div className="w-full flex flex-col justify-center items-center gap-2 my-4 border py-4 rounded-xl dark:border-slate-500">
                        <img
                          className="w-40 h-40"
                          src="https://iili.io/J5dKIft.png"
                        />
                        <p className="mb-3 border-dotted border-black border-b-2 px-2 font-medium dark:border-white text-lg">
                          No card found
                        </p>
                      </div>
                    </div>

                    <a href={URL}>
                      <button className="w-full rounded-lg font-medium text-blue-600 dark:text-blue-400">
                        Click to create one &rarr;
                      </button>
                    </a>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="max-h-[calc(20rem)] p-4 rounded-lg mb-4 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
                      <div className="mb-4 mt-3 flex flex-col gap-3">
                        {cards.map((card, index) => (
                          <div
                            onClick={() => setSelectedCard(card.id)}
                            key={`web3-oauth-card-listing-${index}`}
                            className="flex w-full cursor-pointer flex-row items-center gap-4 rounded-lg border px-3 py-2.5 bg-white dark:bg-black dark:border-slate-500"
                          >
                            <img
                              className="h-16 w-16 rounded-full"
                              src={card.pfp}
                            />
                            <div className="mb-1 flex flex-col">
                              <h4 className="text-md mb-0 font-bold">
                                @{card.username}
                              </h4>
                              <p className="mb-3 w-max text-sm font-normal opacity-65">
                                {card.email}
                              </p>
                              <div className="flex flex-col gap-1.5 text-sm">
                                <p>
                                  <span className="border-b-1 border-solid border-black px-0 py-0.5 font-semibold dark:border-white">
                                    Created
                                  </span>
                                  : Jan. 26, 2021 at 1:09am
                                </p>
                                <p>
                                  <span className="border-b-1 border-solid border-black px-0 py-0.5 font-semibold dark:border-white">
                                    Last updated
                                  </span>
                                  : Jan. 26, 2021 at 1:09am
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (selectedCard) createSession(selectedCard);
                      }}
                      disabled={!selectedCard || isLoading}
                      className={`mb-4 w-full ${
                        !selectedCard || isLoading ? "cursor-not-allowed" : ""
                      } rounded-lg bg-black px-2 py-3.5 font-bold text-white dark:bg-white dark:text-black`}
                    >
                      {isLoading ? (
                        <span className="loader w-7 h-7 border-t-white dark:border-t-black border-t-2"></span>
                      ) : (
                        "Import Card"
                      )}
                    </button>
                    <a href={URL}>
                      <button className="w-full rounded-lg font-medium text-blue-600 dark:text-blue-400">
                        Visit website &nbsp;&rarr;
                      </button>
                    </a>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CardSelector;
