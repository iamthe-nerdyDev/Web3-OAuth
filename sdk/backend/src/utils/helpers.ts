export type ICardStruct = {
  id: number;
  owner: string;
  username: string;
  pfp: string;
  emailAddress: string;
  bio: string;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
};

export const structureCards = (cards: any[]): Array<ICardStruct> =>
  cards
    .map((card) => ({
      id: Number(card.id),
      owner: card.owner,
      username: card.username,
      pfp: card.pfp,
      emailAddress: card.email,
      bio: card.bio,
      isDeleted: card.isDeleted,
      createdAt: Number(card.createdAt),
      updatedAt: Number(card.updatedAt),
    }))
    .sort((a, b) => b.updatedAt - a.updatedAt);

export type IDAppStruct = {
  id: number;
  domain: string;
  accessToken: string;
  owner: string;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
};

export const structureDApps = (dApps: any[]): Array<IDAppStruct> =>
  dApps
    .map((dApp) => ({
      id: Number(dApp.id),
      domain: dApp.domain,
      accessToken: dApp.accessToken,
      owner: dApp.owner,
      isDeleted: dApp.isDeleted,
      createdAt: Number(dApp.createdAt),
      updatedAt: Number(dApp.updatedAt),
    }))
    .sort((a, b) => b.updatedAt - a.updatedAt);
