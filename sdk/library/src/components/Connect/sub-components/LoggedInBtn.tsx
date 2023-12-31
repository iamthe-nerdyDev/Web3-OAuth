import React from "react";
import { useOAuthStore } from "../../../context/OAuthProvider/OAuthProvider";
import { truncateAddress } from "../../../utils";

const LoggedInBtn = () => {
  const {
    theme,
    address,
    balance,
    isMounting,
    isLoading,
    disconnectWallet,
    deleteToken,
    user,
  } = useOAuthStore();

  return isMounting ? (
    //loader....
    <div className={theme}>
      <div className="flex flex-row gap-2">
        <button className="text flex min-w-40 flex-row items-center justify-center gap-3.5 rounded-md bg-black px-5 py-4 text-white dark:bg-white dark:text-black">
          <div className="opaq-animation h-12 w-12 rounded-full bg-slate-400"></div>
          <div className="flex flex-col items-start gap-2 pr-1">
            <div className="text-md flex items-center gap-2 font-medium">
              <span className="opaq-animation h-3.5 w-32 rounded bg-slate-400"></span>
            </div>
            <span className="opaq-animation h-2.5 w-16 rounded bg-slate-400"></span>
          </div>
        </button>
        <div className="h-100 flex w-11 flex-col gap-2">
          <div className="flex h-1/2 cursor-pointer items-center justify-center rounded border border-slate-300 bg-white dark:border-slate-500 dark:bg-black">
            <span className="loader h-4 w-4 border-t-2 border-t-black dark:border-t-white"></span>
          </div>

          <div className="flex h-1/2 cursor-pointer items-center justify-center rounded border border-slate-300 bg-white dark:border-slate-500 dark:bg-black">
            <span className="loader h-4 w-4 border-t-2 border-t-black dark:border-t-white"></span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    //logged in user card
    <div className={theme}>
      <div className="flex flex-row gap-2">
        <button className="text flex min-w-40 flex-row items-center justify-center gap-3.5 rounded-md bg-black px-5 py-4 text-white dark:bg-white dark:text-black cursor-auto">
          {user ? (
            <img
              className="h-12 w-12 rounded-full bg-slate-400"
              src={user.pfp}
              alt={user.username}
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-slate-400"></div>
          )}

          <div className="flex flex-col items-start gap-2 pr-1">
            <div className="text-md flex items-center gap-2 font-medium">
              <span className="border-b-2 border-solid border-white dark:border-black">
                {truncateAddress(address)}
              </span>
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-6 opacity-60"
                  viewBox="0 -0.5 25 25"
                >
                  <path
                    d="M8.946 5h4.308A3.465 3.465 0 0116.7 8.484v4.232a3.465 3.465 0 01-3.446 3.484H8.946A3.466 3.466 0 015.5 12.716V8.485A3.465 3.465 0 018.946 5z"
                    clipRule="evenodd"
                  ></path>
                  <path d="M10.167 19h4.77a4.616 4.616 0 004.563-4.667V9.666"></path>
                </svg>
              </div>
            </div>
            <span className="text-sm font-medium opacity-70">
              {balance == 0 ? "0.000" : balance.toLocaleString()} FON
            </span>
          </div>
        </button>
        <div className="h-100 flex w-11 flex-col gap-2">
          <div
            onClick={disconnectWallet}
            title="Logout"
            className="flex h-1/2 items-center justify-center rounded border border-slate-300 bg-white dark:bg-black dark:border-slate-500 cursor-pointer"
          >
            {isLoading ? (
              <span className="loader h-4 w-4 border-t-2 border-t-black dark:border-t-white"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-blue-600 dark:fill-blue-300"
                viewBox="0 0 24 26"
              >
                <path d="M15 24H0V2h15v8h-2V4H2v18h11v-6h2v8zm3.4-5.3L17 17.3l3.3-3.3H5v-2h15.3L17 8.7l1.4-1.4L24 13l-5.6 5.7z"></path>
              </svg>
            )}
          </div>

          <div
            onClick={deleteToken}
            title="Delete token"
            className="flex h-1/2 items-center justify-center rounded border border-slate-300 bg-white dark:bg-black dark:border-slate-500 cursor-pointer"
          >
            {isLoading ? (
              <span className="loader h-4 w-4 border-t-2 border-t-black dark:border-t-white"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="w-5 stroke-red-500 dark:stroke-red-300"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16m-4 0l-.27-.812c-.263-.787-.394-1.18-.637-1.471a2 2 0 00-.803-.578C13.938 3 13.524 3 12.694 3h-1.388c-.829 0-1.244 0-1.596.139a2 2 0 00-.803.578c-.243.29-.374.684-.636 1.471L8 6m10 0v10.2c0 1.68 0 2.52-.327 3.162a3 3 0 01-1.311 1.311C15.72 21 14.88 21 13.2 21h-2.4c-1.68 0-2.52 0-3.162-.327a3 3 0 01-1.311-1.311C6 18.72 6 17.88 6 16.2V6m8 4v7m-4-7v7"
                ></path>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedInBtn;
