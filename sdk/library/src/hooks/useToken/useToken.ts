import { useOAuthStore } from "../../context/OAuthProvider/OAuthProvider";

export default function useToken() {
  const { token } = useOAuthStore();

  return token;
}
