import axios from "axios";
import { useOAuthStore } from "../context/OAuthProvider/OAuthProvider";

const { accessToken } = useOAuthStore();

const axiosInstance = axios.create({
  baseURL: "https://api.web3-oauth.com",
  headers: {
    cache: "no-store",
    "Content-Type": "application/json",
    "X-Origin": window.location.hostname,
    Authorization: `Bearer ${accessToken}`,
  },
});

export default axiosInstance;
