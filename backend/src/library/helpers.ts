import { config } from "../config/config";

export async function getDappIdFromToken(accessToken: string) {
  const Contract = config.contract.Contract;

  if (!Contract || accessToken) return null;

  const result = await Contract.connect(
    config.contract.Wallet
  ).getDappFromToken();

  console.log("Result");

  return result;
}
