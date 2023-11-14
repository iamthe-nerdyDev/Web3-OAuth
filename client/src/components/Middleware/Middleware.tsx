import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";
import { redirectTo } from "@/utils/helper";
import { Themes } from "@/interface";

import "./Middleware.css";

interface Props {
  ignore?: boolean;
  children: React.ReactNode;
}

const Loader = ({ theme }: { theme: Themes }) => {
  return (
    <div className={`loading-screen ${theme}`}>
      <h2>Web3 OAuth</h2>
      <div className="loader-box mb-2">
        <div></div>
      </div>
      <p>Loading..</p>
    </div>
  );
};

const Middleware = ({ ignore = false, children }: Props) => {
  const { isMounting, isLoggedIn, theme } = useContext(StateContext)!;

  if (!ignore) {
    if (location.pathname !== "/") {
      //if user is not in the landing page....
      //check if user is loggedIn..if no! redirect to homepage
      if (!isMounting && !isLoggedIn) {
        redirectTo("/");
        return;
      }
    }

    if (location.pathname == "/") {
      //if user is in the landing page....
      //check if user is loggedIn...if yes! redirect to dashboard
      if (!isMounting && isLoggedIn) {
        redirectTo("/dashboard");
        return;
      }
    }
  }

  return isMounting ? <Loader theme={theme} /> : <>{children}</>;
};

export default Middleware;
