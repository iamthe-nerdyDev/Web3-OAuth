import { config } from "../config";
import { ethers } from "ethers";

async function getDappInfoFromToken(accessToken: string) {
  const Contract = config.contract.Contract;

  if (!Contract || accessToken) return null;

  const result = await Contract.getDappFromToken(accessToken);

  return result;
}

export async function performValidation(
  user: string,
  accessToken: string,
  domain: string,
  message: string,
  signature: string
) {
  const _signer = ethers.utils.verifyMessage(
    ethers.utils.solidityPack(["string"], [message]),
    signature
  );

  if (_signer != user) return "Unable to verify signature";

  try {
    const _dapp = await getDappInfoFromToken(accessToken);

    if (_dapp.id == 0) return "Invalid access token";

    if (_dapp.domain != domain) return "ERR: Domain not registered to token";

    return _dapp;
  } catch (e: any) {
    return e.message;
  }
}
