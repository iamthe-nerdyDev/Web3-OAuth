import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";
import { redirectTo } from "@/utils/helper";
import { Loader } from "@/components";

interface Props {
  ignore?: boolean;
  children: React.ReactNode;
}

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
