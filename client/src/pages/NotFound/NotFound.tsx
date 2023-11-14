import { useContext } from "react";
import "./NotFound.css";
import StateContext from "@/utils/context/StateContext";

const NotFound = () => {
  const { theme, isLoggedIn } = useContext(StateContext)!;

  return (
    <div className={`not-found ${theme}`}>
      <h1>404</h1>
      <p>Page not found</p>
      <a href={isLoggedIn ? "/dashboard" : "/"}>
        <button>Back home</button>
      </a>
    </div>
  );
};

export default NotFound;
