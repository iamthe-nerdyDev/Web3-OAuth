import express from "express";
import v1Routes from "../routes/v1_Routes";

function createServer() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-Width, Content-Type, Accept, Authorization, cache"
    );

    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Headers", "POST, DELETE, GET");

      return res.status(200).json({ status: true });
    }

    res.header("Access-Control-Allow-Headers", "POST, DELETE, GET");

    next();
  });

  app.use("/v1", v1Routes);

  app.get("/healthcheck", (req, res) => {
    return res.status(200).json({ status: true, message: "running" });
  });

  app.use((req, res) => {
    return res
      .status(404)
      .json({ status: false, mesage: "endpoint not found!" });
  });

  return app;
}

export default createServer;
