import { useOAuthStore } from "../../context/OAuthProvider/OAuthProvider";

export default function useIsLoggedIn() {
  const { isLoggedIn } = useOAuthStore();

  return isLoggedIn;
}
