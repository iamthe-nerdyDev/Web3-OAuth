import { useOAuthStore } from "../../context/OAuthProvider/OAuthProvider";

export default function useIsMounting() {
  const { isMounting } = useOAuthStore();

  return isMounting;
}
