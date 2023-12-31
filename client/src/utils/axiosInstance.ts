import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://web3-oauth-backend.onrender.com/v1",
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
