import { useOAuthStore } from "../../context/OAuthProvider/OAuthProvider";

export default function useChainId() {
  const { chainId } = useOAuthStore();

  return chainId;
}
