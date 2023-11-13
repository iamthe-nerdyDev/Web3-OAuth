import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://web3-oauth.onrender.com/v1",
  headers: {
    cache: "no-store",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
