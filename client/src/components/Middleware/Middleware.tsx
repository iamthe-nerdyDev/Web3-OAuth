import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";
import { Loader } from "@/components";
import { useNavigate } from "react-router-dom";

interface Props {
  ignore?: boolean;
  children: React.ReactNode;
}

const Middleware = ({ ignore = false, children }: Props) => {
  const navigate = useNavigate();

  const { isMounting, isLoggedIn, theme } = useContext(StateContext)!;

  if (!ignore) {
    if (location.pathname !== "/") {
      //if user is not in the landing page....
      //check if user is loggedIn..if no! redirect to homepage
      if (!isMounting && !isLoggedIn) {
        return navigate("/");
      }
    }
  }

  return isMounting ? <Loader theme={theme} /> : <>{children}</>;
};

export default Middleware;
