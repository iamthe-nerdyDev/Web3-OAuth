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
    const response = await getDappInfoFromToken(accessToken);

    if (typeof response === "string") return response;

    if (!response) return "dApp not found";

    if (response.id == 0) return "Invalid access token";

    if (response.domain != domain) return "ERR: Domain not registered to token";

    return response;
  } catch (e: any) {
    return e.message;
  }
}
