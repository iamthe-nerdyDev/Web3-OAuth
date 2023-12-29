import express from "express";
import cors from "cors";
import Routes from "../routes/Routes";
import { config } from "../config";

function createServer() {
  const app = express();

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  app.use(
    cors({
      origin: config.mode.isDev
        ? "http://localhost:5174"
        : "https://web3-o-auth.vercel.app",
      methods: ["GET", "POST"],
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization",
        "cache",
      ],
    })
  );

  app.use((req, res, next) => {
    if (req.method === "OPTIONS") return res.sendStatus(200);

    next();
  });

  app.use("/v1/", Routes);

  app.use((_, res) => res.status(500).send("Oops! Something ain't right"));

  return app;
}

export default createServer;
