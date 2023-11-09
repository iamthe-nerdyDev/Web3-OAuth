import { config } from "../config";

async function getDappInfoFromToken(accessToken: string) {
  const Contract = config.contract.Contract;

  if (!Contract || accessToken) return null;

  try {
    const result = await Contract.getDappFromToken(accessToken);

    return result;
  } catch (e: any) {
    return e.message;
  }
}

export async function performValidation(accessToken: string, domain: string) {
  try {
    const _dapp = await getDappInfoFromToken(accessToken);

    if (typeof _dapp === "string") return _dapp;

    if (!_dapp) return "dApp not found";

    if (_dapp.id == 0) return "Invalid access token";

    if (_dapp.domain != domain) return "ERR: Domain not registered to token";

    return _dapp;
  } catch (e: any) {
    return e.message;
  }
}
