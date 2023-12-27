import { Request, Response } from "express";
import { ethers } from "ethers";
import {
  extractDomain,
  performValidation,
  structureCards,
} from "../utils/helpers";
import { config } from "../config";
import request from "request";

async function uploadImage(req: Request, res: Response) {
  try {
    const { image } = req.body;

    if (!image) return res.sendStatus(400);

    const formdata = new FormData();
    formdata.append("key", config.keys.freeimage);
    formdata.append("action", "upload");
    formdata.append("source", image);
    formdata.append("format", "json");

    const response = await fetch("https://freeimage.host/api/1/upload", {
      method: "POST",
      body: formdata,
    });

    const data = await response.json();

    if (!response.ok) return res.sendStatus(response.status);

    if (data?.status_code === 200 && data?.success?.code === 200) {
      return res.status(200).json({
        status: true,
        url: (data?.image?.file?.resource?.chain?.image as string) ?? null,
      });
    }

    return res.sendStatus(409);
  } catch (e: any) {
    console.error(e);

    return res.sendStatus(500);
  }
}

async function generateImage(req: Request, res: Response) {
  const { text } = req.body as { text: string };

  const endpoint = "https://api.deepai.org/api/cyberpunk-portrait-generator";

  try {
    const headers = new Headers();
    headers.append("api-key", config.keys.deepai);
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({ text });

    const response = await fetch(endpoint, { method: "POST", headers, body });

    const data = await response.json();

    if (!response.ok) return res.sendStatus(response.status);

    if (data.output_url) {
      const url = data.output_url;

      request.get(url).pipe(res);
    } else return res.sendStatus(400);
  } catch (e: any) {
    console.error(e);

    return res.sendStatus(500);
  }
}

async function login(req: Request, res: Response) {
  try {
    let { user, accessToken, domain, message, signature } = req.body;

    const _domain = extractDomain(req.headers.origin);
    if (_domain != domain) {
      return res
        .status(400)
        .json({ status: false, message: "ERR: Domain error" });
    }

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
        token: structureCards(_login[1]),
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

    const _domain = extractDomain(req.headers.origin);
    if (_domain != domain) {
      return res
        .status(400)
        .json({ status: false, message: "ERR: Domain error" });
    }

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

    console.log("Session:", _session);

    const receipt = await _session.wait();
    console.log("Receipt:", receipt);

    const token = receipt.events[0].args[0];
    console.log("Token:", token);

    return res
      .status(200)
      .json({ status: true, message: "Session created", token });
  } catch (e: any) {
    console.error(e);
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

    const _domain = extractDomain(req.headers.origin);
    if (_domain != domain) {
      return res
        .status(400)
        .json({ status: false, message: "ERR: Domain error" });
    }

    const response = await performValidation(accessToken, domain);

    if (typeof response == "string") {
      return res.status(400).json({ status: false, message: response });
    }

    const Contract = config.contract.Contract;
    const _tx = await Contract.deactivateSessionFromToken(token);
    await _tx.wait();

    return res.status(200).json({ status: true, message: "Token deactivated" });
  } catch (e: any) {
    return res.status(500).json({ status: false, message: e.message });
  }
}

export default {
  login,
  createSession,
  deactivateSession,
  uploadImage,
  generateImage,
};
