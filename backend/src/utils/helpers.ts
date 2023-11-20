import { config } from "../config";
import { ICardStruct } from "../interface";

async function getDappInfoFromToken(accessToken: string) {
  const Contract = config.contract.Contract;

  if (!Contract || !accessToken) return false;

  try {
    const result = await Contract.getDappFromToken(accessToken);

    return result;
  } catch (e: any) {
    console.error(e);
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
    console.error(e);
    return e.message;
  }
}

export const structureCards = (cards: any[]): Array<ICardStruct> =>
  cards
    .map((card) => ({
      id: Number(card.id),
      owner: card.owner,
      username: card.username,
      pfp: card.pfp,
      emailAddress: card.emailAddress,
      bio: card.bio,
      isDeleted: card.isDeleted,
      createdAt: Number(card.createdAt),
      updatedAt: Number(card.updatedAt),
    }))
    .sort((a, b) => b.updatedAt - a.updatedAt);
