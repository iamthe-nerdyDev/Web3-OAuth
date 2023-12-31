import { useContext, useEffect, useState } from "react";
import StateContext from "@/utils/context/StateContext";
import { IImagePicker, INewNFT } from "@/interface";
import emptyResultImage from "@/assets/empty-result.png";
import { Close, LoaderIcon } from "@/icons";
import { serializeForm } from "@/utils/helper";
import { useAddress } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";

import "./ImagePicker.css";

const ImagePicker = ({
  displayModal,
  setDisplayModal,
  selectedURL,
  setSelectedURL,
}: IImagePicker) => {
  const { theme } = useContext(StateContext)!;

  const address = useAddress();

  const [currentTab, setCurrentTab] = useState<"one" | "two">("one");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nfts, setNfts] = useState<INewNFT[]>([]);
  const [chain, setChain] = useState<string>("");

  const getAllNFTS = async () => {
    if (!address || !chain || chain.length == 0) return;

    setIsLoading(true);

    try {
      const { data } = await axiosInstance.get(`/nft/${chain}/${address}`);

      if (data.status) return data.data;
    } catch (e: any) {
      console.error(e);

      toast.error("Unable to fetch NFTs");
    } finally {
      setIsLoading(false);
    }

    return [];
  };

  useEffect(() => {
    async function init() {
      const _nfts = await getAllNFTS();
      if (_nfts) setNfts(_nfts);
    }

    init();
  }, [chain]);

  const onlineURL = (e: any) => {
    e.preventDefault();

    const { url } = serializeForm(e.target);

    setIsLoading(true);

    setTimeout(() => {
      setSelectedURL(url);
      setDisplayModal(false);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (displayModal) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  }, [displayModal]);

  const handleOverlayClick = (e: any) => {
    if (e.target.classList.contains("image-picker")) {
      setDisplayModal(false);
    }
  };

  return (
    <div
      className={`image-picker ${displayModal ? "d-block" : "d-none"} ${theme}`}
      onClick={handleOverlayClick}
    >
      <div className="image-picker-box">
        <div className="close cursor" onClick={() => setDisplayModal(false)}>
          <Close />
        </div>
        <div className="tabs mb-4 mt-4 pt-3">
          <p
            onClick={() => setCurrentTab("one")}
            className={currentTab === "one" ? "active" : ""}
          >
            NFT Collection
          </p>
          <p
            onClick={() => setCurrentTab("two")}
            className={currentTab === "two" ? "active" : ""}
          >
            Online Image
          </p>
        </div>

        <div
          className={`nft-iamges ${
            currentTab === "one" ? "d-block" : "d-none"
          }`}
        >
          <div className="entries">
            <select
              defaultValue={chain}
              onChange={(e) => setChain(e.target.value)}
            >
              <option value="" disabled>
                -- select chain --
              </option>
              <option value="arb_geo">Arbitrium (Georli)</option>
              <option value="arb_main">Arbitrium (Mainnet)</option>
              <option value="arb_sep">Arbitrium (Sepolia)</option>
              <option value="astar_main">Astar (Mainnet)</option>
              <option value="base_geo">Base (Georli)</option>
              <option value="base_main">Base (Mainnet)</option>
              <option value="eth_geo">Ethereum (Georli)</option>
              <option value="eth_main">Ethereum (Mainnet)</option>
              <option value="eth_sep">Ethereum (Sepolia)</option>
              <option value="matic_main">Matic (Mainnet)</option>
              <option value="matic_mumbai">Matic (Mumbai)</option>
              <option value="opt_geo">Optimism (Georli)</option>
              <option value="opt_main">Optimism (Mainnet)</option>
              <option value="polygon_test">Polygon zkEVM (Testnet)</option>
              <option value="polygon_main">Polygon zkEVM (Mainnet)</option>
            </select>
          </div>

          {isLoading ? (
            <div className="py-5 mt-5 mb-4 d-flex align-items-center justify-content-center">
              <LoaderIcon />
            </div>
          ) : nfts.length === 0 ? (
            <div className="empty-result py-5 mb-4 d-flex flex-column align-items-center justify-content-center">
              <img src={emptyResultImage} alt="Empty result" />
              <p>No NFTs found</p>
            </div>
          ) : (
            <div className="nfts-display my-4 pt-2">
              <div className="row g-3">
                {nfts.map((nft, i) => (
                  <div
                    className="col-6 col-sm-4 col-md-3"
                    key={`nft-${i}`}
                    onClick={() => {
                      setSelectedURL(nft.image);
                      setDisplayModal(false);
                    }}
                  >
                    <div
                      className={`single-nft ${
                        selectedURL === nft.image && "selected"
                      }`}
                    >
                      <img src={nft.image} alt={nft.name} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <form
          action="#"
          method="post"
          onSubmit={onlineURL}
          className={`local-image ${
            currentTab === "two" ? "d-block" : "d-none"
          }`}
        >
          <div className="py-5 mb-4 d-flex flex-column align-items-center justify-content-center gap-1">
            <input
              type="url"
              placeholder="e.g https://...."
              required
              name="url"
              id="url"
            />
            <button disabled={isLoading} type="submit">
              {isLoading ? <LoaderIcon /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImagePicker;
