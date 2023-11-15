import { AnchorLink, Footer_2, Header, Loader } from "@/components";
import emptyResultImage from "@/assets/empty-result.png";
import { useContext, useEffect, useState } from "react";
import StateContext from "@/utils/context/StateContext";
import { LoaderIcon, Trash } from "@/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ICardStruct } from "@/interface";
import { deleteCard, getUserCard } from "@/utils/helper";
import { NotFound } from "..";
import { toast } from "react-toastify";

import "./CardDetails.css";

const CardDetails = () => {
  const navigate = useNavigate();

  const { cardId, index } = useParams();

  const { theme, isMounting } = useContext(StateContext)!;

  const address = useAddress();
  const signer = useSigner();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
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

  const doDeleteCard = async (cardId: number) => {
    if (isDeleteLoading) return;

    if (
      !confirm(
        "Are you sure you want to delete this card?\n\nNOTE:This will automatically log you out of all sites you have linked it to.."
      )
    ) {
      return;
    }

    if (!signer) return;

    setIsDeleteLoading(true);

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        deleteCard(cardId, signer)
          .then((tx) => {
            resolve(tx);

            navigate("/dashboard");
          })
          .catch((error) => {
            reject(error);
            setIsDeleteLoading(false);
          });
      }),
      {
        pending: "Approve transaction",
        success: "Card deleted successfully!",
        error: "Unable to complete request",
      }
    );
  };

  return isLoading ? (
    <Loader theme={theme} />
  ) : card == null ? (
    <NotFound />
  ) : (
    <main className={`card-details-${theme}`}>
      <Header />

      <div className="container mt-5 mt-md-0">
        <div className="row g-5">
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
                  <h2>
                    Card&nbsp;<span>0{index}</span>
                  </h2>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <AnchorLink to={`/edit-card/${cardId}`}>
                    <button>edit</button>
                  </AnchorLink>
                  <div
                    className="pointer"
                    onClick={() => doDeleteCard(parseInt(cardId!))}
                  >
                    {isDeleteLoading ? (
                      <LoaderIcon />
                    ) : (
                      <Trash fill="crimson" />
                    )}
                  </div>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-12 col-md-5">
                  <div className="pfp">
                    <img src={card.pfp} className="mb-1" alt="user" />
                    <span>pfp</span>
                  </div>
                </div>
                <div className="col-12 col-md-7">
                  <div className="entries d-flex flex-column gap-1">
                    <div>
                      <span>username</span>
                      <p>{card.username}</p>
                    </div>
                    <div>
                      <span>email</span>
                      <p>{card.emailAddress}</p>
                    </div>
                    <div>
                      <span>bio</span>
                      <p>{card.bio}</p>
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
