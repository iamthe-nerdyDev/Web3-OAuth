import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";
import { AnchorLink } from "@/components";

import "./NotFound.css";

const NotFound = () => {
  const { theme, isLoggedIn } = useContext(StateContext)!;

  return (
    <div className={`not-found ${theme}`}>
      <h1>404</h1>
      <p>Page not found</p>
      <AnchorLink to={isLoggedIn ? "/dashboard" : "/"}>
        <button>Back home</button>
      </AnchorLink>
    </div>
  );
};

export default NotFound;
