import {
  ConnectWallet,
  useAddress,
  useConnectionStatus,
  useSigner,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import "./App.css";
import { useEffect, useState } from "react";
import {
  clearForm,
  deleteDApp,
  getDApps,
  registerDApp,
  serializeForm,
  truncateAddress,
} from "./utils";

const App = () => {
  const address = useAddress();
  const signer = useSigner();

  const connectionStatus = useConnectionStatus();

  return connectionStatus === "unknown" || connectionStatus === "connecting" ? (
    <></>
  ) : connectionStatus === "connected" ? (
    <DashboardComponent address={address} signer={signer} />
  ) : (
    <WelcomeComponent />
  );
};

const DashboardComponent = ({
  address,
  signer,
}: {
  address: string | undefined;
  signer: ethers.Signer | undefined;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
  const [dApps, setdApps] = useState<any[]>([]);

  const doRegisterDApp = async (e: any) => {
    if (isBtnLoading) return;

    e.preventDefault();

    const { domain } = serializeForm(e.target);

    setIsBtnLoading(true);

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        registerDApp(domain, signer!)
          .then((tx) => {
            doGetDApps();
            clearForm(e.target);
            setIsBtnLoading(false);

            resolve(tx);
          })
          .catch((error) => {
            setIsBtnLoading(false);
            reject(error);
          });
      }),
      {
        pending: "Approve transaction",
        success: "dApp registered successfully!",
        error: "Unable to complete request",
      }
    );
  };

  const doDeleteDApp = async (id: number) => {
    if (isBtnLoading) return;

    if (!confirm("Are you sure you want to delete this dApp?")) {
      return;
    }

    setIsBtnLoading(true);

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        deleteDApp(id, signer!)
          .then((tx) => {
            doGetDApps();
            setIsBtnLoading(false);

            resolve(tx);
          })
          .catch((error) => {
            setIsBtnLoading(false);
            reject(error);
          });
      }),
      {
        pending: "Approve transaction",
        success: "dApp deleted successfully!",
        error: "Unable to complete request",
      }
    );
  };

  const doGetDApps = async () => {
    if (!address) return;

    setIsLoading(true);

    try {
      const _dApps = await getDApps(signer!);
      setdApps(_dApps);
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    doGetDApps();
  }, [address]);

  return (
    <main className="dashboard">
      <nav className="py-4 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <img
                src="/logo.png"
                alt="Web3 OAuth logo"
                style={{ width: "3rem", height: "3rem" }}
                className="mb-1"
              />
              <p>Web3 OAuth</p>
            </div>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row g-4">
          <div className="col-12 mb-2">
            <div className="px-2 gap-1 py-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between">
              <h1>Howdy, Welcome!</h1>
              <ConnectBtn />
            </div>
          </div>

          <div className="col-12 mb-5">
            <div className="px-2 register">
              <p className="mb-3">Register dApp +</p>

              <form
                action="#"
                method="post"
                className="d-flex align-items-center"
                onSubmit={doRegisterDApp}
              >
                <input
                  type="text"
                  name="domain"
                  id="domain"
                  required
                  placeholder="e.g. google.com"
                />
                <button type="submit" disabled={isBtnLoading}>
                  {isBtnLoading ? (
                    <LoaderIcon width={15} height={15} />
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="col-12">
            <div className="px-2">
              {isLoading ? (
                <div className="py-4">
                  <LoaderIcon width={35} height={35} />
                </div>
              ) : dApps.length === 0 ? (
                <div className="py-4">
                  <p>No dApp registered yet!</p>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Domain</th>
                      <th>Access Token</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dApps.map((dApp, i) => (
                      <tr key={`dapp-${i}`}>
                        <td>{i + 1}</td>
                        <td>{dApp.domain}</td>
                        <td>{dApp.accessToken.substring(2)}</td>
                        <td className="d-flex align-items-center">
                          {isBtnLoading ? (
                            <LoaderIcon />
                          ) : (
                            <span onClick={() => doDeleteDApp(dApp.id)}>
                              delete
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const WelcomeComponent = () => {
  const year = new Date().getFullYear();

  return (
    <main className="welcome full-screen">
      <div className="container h-100">
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
          <div className="col-12 col-md-10 col-lg-8 mx-auto">
            <div className="px-2">
              <img
                src="/logo.png"
                alt="Web3 OAuth logo"
                style={{ width: "5.5rem", height: "5.5rem" }}
                className="mb-3"
              />
              <h1>
                <span>Web3 OAuth</span> developers dashboard
              </h1>
              <p>
                You get access to register your dApps and get a unique access
                token for each dApp
              </p>
              <div className="buttons d-flex align-items-center">
                <ConnectBtn />
                <a
                  target="_blank"
                  href="https://github.com/iamthe-nerdyDev/Web3-OAuth/blob/master/sdk/README.md"
                >
                  <button>Read Docs</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <span>&copy;</span>
        <hr />
        <span>{year}</span>
      </div>
    </main>
  );
};

const ConnectBtn = () => {
  const address = useAddress();

  return (
    <ConnectWallet
      theme="light"
      detailsBtn={() => (
        <button className="address-btn">{truncateAddress(address)}</button>
      )}
    />
  );
};

interface IIcon {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const LoaderIcon = ({ width, height, fill, className, ...props }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      viewBox="0 0 38 38"
      {...props}
      className={className}
    >
      <defs>
        <linearGradient id="a" x1="8.042%" x2="65.682%" y1="0%" y2="23.865%">
          <stop
            offset="0%"
            stopColor={fill || "currentColor"}
            stopOpacity="0"
          ></stop>
          <stop
            offset="63.146%"
            stopColor={fill || "currentColor"}
            stopOpacity="0.631"
          ></stop>
          <stop offset="100%" stopColor={fill || "currentColor"}></stop>
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <path stroke="url(#a)" strokeWidth="2" d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            dur="0.9s"
            from="0 18 18"
            repeatCount="indefinite"
            to="360 18 18"
            type="rotate"
          ></animateTransform>
        </path>
        <circle cx="36" cy="18" r="1" fill={fill || "currentColor"}>
          <animateTransform
            attributeName="transform"
            dur="0.9s"
            from="0 18 18"
            repeatCount="indefinite"
            to="360 18 18"
            type="rotate"
          ></animateTransform>
        </circle>
      </g>
    </svg>
  );
};

export default App;
