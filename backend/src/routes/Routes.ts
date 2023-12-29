import express from "express";
import controller from "../controllers/Controller";
import validate from "../middleware/ValidateSchema";
import {
  generateImageSchema,
  getCardSchema,
  getNFTsSchema,
  getUserCardsSchema,
  getdAppsConnectedToCardSchema,
  uploadImageSchema,
} from "../utils/schema";

const router = express.Router();

/** Healthcheck route */
router.get("/healthcheck", (_, res) => res.sendStatus(200));

/** Getting address NFTs route */
router.get(
  "/nft/:chain/:address",
  validate(getNFTsSchema),
  controller.getNFTsHandler
);

/** Getting user cards route */
router.get(
  "/user-cards/:user",
  validate(getUserCardsSchema),
  controller.getUserCardsHandler
);

/** Get card route */
router.get(
  "/cards/:cardId",
  validate(getCardSchema),
  controller.getCardHandler
);

/** Getting all dApps connected to card route */
router.get(
  "/dApps-to-cards/:cardId",
  validate(getdAppsConnectedToCardSchema),
  controller.getdAppsConnectedToCardHandler
);

/** AI image generation route */
router.post(
  "/generate-image",
  validate(generateImageSchema),
  controller.generateImageHandler
);

/** Image upload route */
router.post(
  "/upload-image",
  validate(uploadImageSchema),
  controller.uploadImageHandler
);

export = router;
