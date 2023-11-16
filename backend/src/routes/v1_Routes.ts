import express, { Request, Response } from "express";
import controller from "../controllers/v1_Controller";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

/**
 * @openapi
 * /v1/healthcheck:
 *   get:
 *     tags:
 *       - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 *         contents:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  message:
 *                    type: string
 */
router.get("/healthcheck", (req: Request, res: Response) => {
  return res.status(200).json({ status: true, message: "running" });
});

/**
 * @openapi
 * /v1/login:
 *   post:
 *     tags:
 *       - User
 *     description: Tries to log the user in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - accessToken
 *               - domain
 *               - message
 *               - signature
 *             properties:
 *               user:
 *                 type: string
 *                 default: 0x....
 *               accessToken:
 *                 type: string
 *                 default: xxxx-xxxx-xxxx
 *               domain:
 *                 type: string
 *                 default: my-dApp.xyz
 *               message:
 *                 type: string
 *                 default: Sign me!
 *               signature:
 *                 type: string
 *                 default: 0x....
 *     responses:
 *       200:
 *         description: Success
 *         contents:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  token:
 *                    type: string
 *                  message:
 *                    type: string
 *       400:
 *         description: Bad Request
 *         contents:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  message:
 *                    type: string
 *       500:
 *         description: Server Error
 *         contents:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  message:
 *                    type: string
 */
router.post("/login", ValidateSchema(Schemas.main.login), controller.login);

/**
 * @openapi
 * /v1/session:
 *   post:
 *     tags:
 *       - User
 *     description: Registers a new session for a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cardId
 *               - user
 *               - accessToken
 *               - domain
 *               - message
 *               - signature
 *             properties:
 *               cardId:
 *                 type: number
 *                 default: 0
 *               user:
 *                 type: string
 *                 default: 0x....
 *               accessToken:
 *                 type: string
 *                 default: xxxx-xxxx-xxxx
 *               domain:
 *                 type: string
 *                 default: my-dApp.xyz
 *               message:
 *                 type: string
 *                 default: Sign me!
 *               signature:
 *                 type: string
 *                 default: 0x....
 *     responses:
 *       200:
 *         description: Success
 *         contents:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  token:
 *                    type: string
 *                  message:
 *                    type: string
 *       400:
 *         description: Bad Request
 *         contents:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  message:
 *                    type: string
 *       500:
 *         description: Server Error
 *         contents:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  message:
 *                    type: string
 */
router.post(
  "/session",
  ValidateSchema(Schemas.main.session),
  controller.createSession
);

/**
 * @openapi
 * /v1/logout/{token}:
 *   patch:
 *     tags:
 *       - User
 *     summary: Deactivates a session token
 *     parameters:
 *     - name: token
 *       description: The session token of the user
 *       required: true
 *     responses:
 *       200:
 *         description: Success
 *         contents:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  message:
 *                    type: string
 *       400:
 *         description: Bad Request
 *         contents:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  message:
 *                    type: string
 *       500:
 *         description: Server Error
 *         contents:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  message:
 *                    type: string
 */
router.patch("/logout/:token", controller.deactivateSession);

export = router;
