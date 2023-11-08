import express from "express";
import http from "http";
import { config } from "./config/config";

import SignInRoutes from "./routes/SignIn";

const router = express();

const startServer = () => {
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-Width, Content-Type, Accept, Authorization, cache"
    );

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Headers",
        "PUT, POST, PATCH, DELETE, GET"
      );

      return res.status(200).json({ status: true });
    }

    next();
  });

  router.use("/login", SignInRoutes);

  router.get("/healthcheck", (req, res) => {
    return res.status(200).json({ status: true, message: "running" });
  });

  router.use((req, res, next) => {
    const error = new Error("`endpoint not found!`");

    return res.status(404).json({ status: false, mesage: error.message });
  });

  http.createServer(router).listen(config.server.port, () => {
    console.log("Server is running on port: " + config.server.port);
  });
};

startServer();
