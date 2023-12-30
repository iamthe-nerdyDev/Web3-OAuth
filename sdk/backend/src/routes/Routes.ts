import express from "express";
import controller from "../controllers/Controller";
import validate from "../middleware/ValidateSchema";
import {
  createSessionSchema,
  deleteSessionSchema,
  getUserInfoSchema,
  getUsersInfoSchema,
  loginSchema,
} from "../utils/schema";

const router = express.Router();

router.post("/login", validate(loginSchema), controller.triggerLoginHandler);

router.post(
  "/session",
  validate(createSessionSchema),
  controller.createSessionHandler
);

router.delete(
  "/session/:token",
  validate(deleteSessionSchema),
  controller.deleteSessionHandler
);

router.get(
  "/user/:token",
  validate(getUserInfoSchema),
  controller.getUserInfoHandler
);

router.post(
  "/user",
  validate(getUsersInfoSchema),
  controller.getUsersInfosHandler
);

router.get("/dApp", controller.getdAppInfoHandler);

export = router;
