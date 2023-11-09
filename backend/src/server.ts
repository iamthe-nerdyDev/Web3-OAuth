import http from "http";
import { config } from "./config";
import createServer from "./utils/app";

const startServer = () => {
  const router = createServer();

  http.createServer(router).listen(config.server.port, () => {
    console.log("Server is running on port: " + config.server.port);
  });
};

startServer();
