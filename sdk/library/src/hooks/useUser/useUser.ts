import { useOAuthStore } from "../../context/OAuthProvider/OAuthProvider";

export default function useUser() {
  const { user } = useOAuthStore();

  return user;
}
