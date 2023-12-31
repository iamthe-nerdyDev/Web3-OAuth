import axios from "axios";

const ACCESS_TOKEN = import.meta.env.VITE_WEB3_OAUTH_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  throw new Error(".env variable missing: VITE_WEB3_OAUTH_ACCESS_TOKEN");
}

const axiosInstance = axios.create({
  baseURL: "https://api-web3-oauth.onrender.com",
  //baseURL: "http://localhost:1338",
  headers: {
    "Content-Type": "application/json",
    "X-Origin": "localhost",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export default axiosInstance;
