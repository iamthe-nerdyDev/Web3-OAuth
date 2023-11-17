import express from "express";
import v1Routes from "../routes/v1_Routes";
import swaggerDocs from "./swagger";

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

    res.header("Access-Control-Allow-Headers", "POST, PATCH, GET");

    if (req.method === "OPTIONS") return res.status(200).end();
    
    next();
  });

  app.use("/v1", v1Routes);

  swaggerDocs(app); //starting docs server..

  app.use((req, res) => {
    return res
      .status(404)
      .json({ status: false, mesage: "endpoint not found!" });
  });

  return app;
}

export default createServer;
