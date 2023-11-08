import express from "express";
import controller from "../controllers/SignIn";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post("/", ValidateSchema(Schemas.signin.login), controller.login);
router.post(
  "/session",
  ValidateSchema(Schemas.signin.session),
  controller.createSession
);

export = router;
