import express from "express";
import cors from "cors";
import deserialize from "../middleware/deserialize";
import Routes from "../routes/Routes";
import swaggerDocs from "./swagger";

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE"],
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization",
        "cache",
        "X-Origin",
      ],
    })
  );

  app.use(deserialize); //to deserialize the user..

  app.use((req, res, next) => {
    if (req.method === "OPTIONS") return res.sendStatus(200);

    next();
  });

  app.use("/", Routes);

  app.use((_, res) => res.status(500).send("Oops! Something ain't right"));

  swaggerDocs(app); //starting docs server..

  return app;
}

export default createServer;
