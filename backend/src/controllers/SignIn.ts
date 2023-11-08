import { Request, Response } from "express";
import ethers from "ethers";
import { getDappIdFromToken } from "../library/helpers";

async function login(req: Request, res: Response) {
  try {
    let { user, accessToken, domain, message, signature } = req.body;

    if (!ethers.utils.isAddress(user)) {
      return res
        .status(200)
        .json({ status: false, message: "Invalid user address supplied" });
    }

    await getDappIdFromToken(accessToken);

    return res.status(200).json({ message: "Hello" });
  } catch (e: any) {
    res.status(500).json({ status: false, message: e.message });
  }
}

export default { login };
