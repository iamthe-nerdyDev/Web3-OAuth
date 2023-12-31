import { config } from "../config";
import { ethers } from "ethers";
import { ICardStruct, structureCards, structureDApps } from "./helpers";

export function getContract(): ethers.Contract {
  const provider = new ethers.providers.JsonRpcProvider(config.network.rpc_url);

  const Contract = new ethers.Contract(
    config.contract.address,
    config.contract.abi,
    new ethers.Wallet(config.network.pk, provider)
  );

  return Contract;
}

type LoginProps = {
  signer: string;
  dAppId: number;
  nonce: number;
  signature: string;
};

export async function triggerLogin(data: LoginProps) {
  try {
    const Contract = getContract();

    const result = await Contract.triggerLogin(
      data.signer,
      data.dAppId,
      data.nonce,
      data.signature
    );

    return result as { 0: number; 1: ICardStruct[] };
  } catch (e: any) {
    throw new Error(e);
  }
}

type CreateSessionProps = {
  cardId: number;
  dAppId: number;
  signer: string;
  nonce: number;
  signature: string;
};

export async function createSession(data: CreateSessionProps) {
  try {
    const Contract = getContract();

    const tx = await Contract.createToken(
      data.cardId,
      data.dAppId,
      data.signer,
      data.nonce,
      data.signature
    );

    await tx.wait();

    const activeToken = (await Contract.getActiveTokenId(
      data.signer,
      data.dAppId
    )) as { 0: boolean; 1: number };

    if (activeToken[0]) {
      const Token = await Contract.getTokenDetails(activeToken[1]);

      return Token.token as string;
    }

    //could not crete the session......
    return null;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function deleteSession(token: string) {
  try {
    const Contract = getContract();

    const tx = await Contract.deleteToken(token);
    await tx.wait();

    return true;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserInfo(token: string) {
  try {
    const Contract = getContract();

    const result = await Contract.fetchUserInfoFromToken(token);

    return structureCards([result])[0];
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserInfos(tokens: string[]) {
  try {
    const Contract = getContract();

    const result = await Contract.fetchUsersInfoFromTokens(tokens);

    return structureCards(result);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getdAppInfo(accessToken: string) {
  try {
    const Contract = getContract();

    const result = await Contract.getdAppFromToken(accessToken);

    return structureDApps([result])[0];
  } catch (e: any) {
    throw new Error(e);
  }
}
