import express from "express";
import controller from "../controllers/SignIn";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post("/", ValidateSchema(Schemas.signin.login), controller.login);

export = router;
