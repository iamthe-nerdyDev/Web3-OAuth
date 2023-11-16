import { Request, Response } from "express";
import { ethers } from "ethers";
import { performValidation } from "../utils/helpers";
import { config } from "../config";

async function login(req: Request, res: Response) {
  try {
    let { user, accessToken, domain, message, signature } = req.body;

    if (!ethers.utils.isAddress(user)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid user address supplied" });
    }

    const response = await performValidation(accessToken, domain);

    if (typeof response == "string") {
      return res.status(400).json({ status: false, message: response });
    }

    const Contract = config.contract.Contract;
    const _login = await Contract.triggerLogin(
      user,
      response.id,
      message,
      signature
    ); //returns tuple(bytes32, CardStruct[])

    if (
      _login[0] ==
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    ) {
      //no session token found
      //check if second tuple is empty
      if (_login[1].length <= 0) {
        //no card found
        return res.status(200).json({
          status: true,
          token: [],
          message: "You do not have any card yet!",
        });
      }

      //return all the cards
      return res.status(200).json({
        status: true,
        token: _login[1],
        message: "Cards fetched successfully!",
      });
    }

    //return session token
    return res.status(200).json({
      status: true,
      token: _login[0],
      message: "Token fetched successfully!",
    });
  } catch (e: any) {
    return res.status(500).json({ status: false, message: e.message });
  }
}

async function createSession(req: Request, res: Response) {
  try {
    let { cardId, user, accessToken, domain, message, signature } = req.body;

    if (!ethers.utils.isAddress(user)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid user address supplied" });
    }

    const response = await performValidation(accessToken, domain);

    if (typeof response == "string") {
      return res.status(400).json({ status: false, message: response });
    }

    const Contract = config.contract.Contract;
    const _session = await Contract.createSession(
      cardId,
      response.id,
      user,
      message,
      signature
    );

    const receipt = await _session.wait();
    const token = receipt.events[0].args[0];

    return res
      .json(200)
      .json({ status: true, message: "Session created", token });
  } catch (e: any) {
    return res.status(500).json({ status: false, message: e.message });
  }
}

async function deactivateSession(req: Request, res: Response) {
  const token = req.params.token ?? null;

  if (!token) {
    return res
      .status(400)
      .json({ status: false, message: "Token missing in url" });
  }

  try {
    let { accessToken, domain } = req.body;

    const response = await performValidation(accessToken, domain);

    if (typeof response == "string") {
      return res.status(400).json({ status: false, message: response });
    }

    const Contract = config.contract.Contract;
    const _tx = await Contract.deactivateSessionFromToken(token);
    await _tx.wait();

    return res.json(200).json({ status: true, message: "Token deactivated" });
  } catch (e: any) {
    return res.status(500).json({ status: false, message: e.message });
  }
}

export default { login, createSession, deactivateSession };
