import { useOAuthStore } from "../../context/OAuthProvider/OAuthProvider";

export default function useAddress() {
  const { address } = useOAuthStore();

  return address;
}
