import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web3 OAuth API Docs",
      version,
    },
  },
  apis: ["./src/routes/Routes.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  app.get("/docs.json", (_: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");

    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
