import express from "express";
import v1Routes from "../routes/v1_Routes";

function createServer() {
  const router = express();

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
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

  router.use("/v1", v1Routes);

  router.get("/healthcheck", (req, res) => {
    return res.status(200).json({ status: true, message: "running" });
  });

  router.use((req, res) => {
    const error = new Error("`endpoint not found!`");

    return res.status(404).json({ status: false, mesage: error.message });
  });

  return router;
}

export default createServer;
