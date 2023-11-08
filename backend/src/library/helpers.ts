import { config } from "../config/config";

export async function getDappInfoFromToken(accessToken: string) {
  const Contract = config.contract.Contract;

  if (!Contract || accessToken) return null;

  const result = await Contract.getDappFromToken(accessToken);

  return result;
}
