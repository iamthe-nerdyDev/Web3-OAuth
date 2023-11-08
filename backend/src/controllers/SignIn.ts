import { Request, Response } from "express";
import ethers from "ethers";
import { getDappInfoFromToken } from "../library/helpers";
import { config } from "../config/config";

async function login(req: Request, res: Response) {
  try {
    let { user, accessToken, domain, message, signature } = req.body;

    if (!ethers.utils.isAddress(user)) {
      return res
        .status(200)
        .json({ status: false, message: "Invalid user address supplied" });
    }

    //getting the signer
    const _signer = ethers.utils.verifyMessage(
      ethers.utils.solidityPack(["string"], [message]),
      signature
    );

    //wrong signature passed...
    if (_signer != user) {
      return res.status(200).json({
        status: false,
        message: "Unable to verify signature",
      });
    }

    //getting the dapp info from the access token..
    const _dapp = await getDappInfoFromToken(accessToken);
    if (_dapp.id == 0) {
      return res.status(200).json({
        status: false,
        message: "Invalid access token",
      });
    }

    //wrong domain..
    if (_dapp.domain != domain) {
      return res.status(200).json({
        status: false,
        message: "ERR: Domain not registered to token",
      });
    }

    const Contract = config.contract.Contract;
    const _login = await Contract.triggerLogin(
      user,
      _dapp.id,
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
          status: false,
          message: "not found",
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
    res.status(500).json({ status: false, message: e.message });
  }
}

async function createSession(req: Request, res: Response) {
  try {
    let { cardId, user, accessToken, domain, message, signature } = req.body;

    if (!ethers.utils.isAddress(user)) {
      return res
        .status(200)
        .json({ status: false, message: "Invalid user address supplied" });
    }
  } catch (e: any) {
    res.status(500).json({ status: false, message: e.message });
  }
}

export default { login, createSession };
