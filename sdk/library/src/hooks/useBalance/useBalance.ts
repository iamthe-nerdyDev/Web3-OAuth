import { useOAuthStore } from "../../context/OAuthProvider/OAuthProvider";

export default function useBalance() {
  const { balance } = useOAuthStore();

  return balance;
}
