import { useContext, useEffect } from "react";
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

  useEffect(() => {
    if (!ignore && location.pathname !== "/") {
      // If the user is not on the landing page and not logged in, redirect to the homepage
      if (!isMounting && !isLoggedIn) {
        navigate("/");
      }
    }
  }, [ignore, isMounting, isLoggedIn, navigate]);

  return isMounting ? <Loader theme={theme} /> : <>{children}</>;
};

export default Middleware;
