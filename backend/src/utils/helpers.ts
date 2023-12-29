import { OwnedNftsResponse } from "alchemy-sdk";

type ICardStruct = {
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
      emailAddress: card.emailAddress,
      bio: card.bio,
      isDeleted: card.isDeleted,
      createdAt: Number(card.createdAt),
      updatedAt: Number(card.updatedAt),
    }))
    .sort((a, b) => b.updatedAt - a.updatedAt);

type IDAppStruct = { domain: string };

export const structureDApps = (dApps: any[]): Array<IDAppStruct> =>
  dApps
    .map((dApp) => ({ domain: dApp.domain }))
    .sort((a, b) => b.domain - a.domain);

type INewNFT = {
  name: string;
  image: string;
};

export const newNFTObj = (data: OwnedNftsResponse): INewNFT[] => {
  const newArr = [];

  for (let i in data.ownedNfts) {
    let _data = data.ownedNfts[i];

    const metaData = _data.rawMetadata;

    if (metaData && metaData.image) {
      newArr.push({
        name: metaData.name ?? "undefined",
        image: getValidURLIfIPFS(metaData.image),
      });
    }
  }

  return newArr;
};

const getValidURLIfIPFS = (url: string) => {
  if (url.startsWith("ipfs://")) {
    return `https://ipfs.io/ipfs/${url.substring("ipfs://".length)}`;
  }

  return url;
};
