import { useOAuthStore } from "../../context/OAuthProvider/OAuthProvider";

export default function useSigner() {
  const { signer } = useOAuthStore();

  return signer;
}
