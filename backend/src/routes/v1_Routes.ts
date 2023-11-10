import express from "express";
import controller from "../controllers/v1_Controller";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post("/login", ValidateSchema(Schemas.main.login), controller.login);

router.post(
  "/session",
  ValidateSchema(Schemas.main.session),
  controller.createSession
);

router.delete("/logout/:token", controller.deactivateSession);

router.get("/:token", controller.getUserInfo);

export = router;
