import { Request, Response } from "express";
import { config } from "../config";
import request from "request";
import { Alchemy, Network } from "alchemy-sdk";
import { newNFTObj } from "../utils/helpers";
import {
  GenerateImage,
  GetCard,
  GetNFTs,
  GetUserCards,
  GetdAppsConnected,
  UploadImage,
} from "../utils/schema";
import {
  getCard,
  getDappsConnectedToCard,
  getUserCards,
} from "../utils/services";

const { freeimage, deepai, alchemy } = config.keys;

async function getNFTsHandler(req: Request<GetNFTs["params"]>, res: Response) {
  try {
    const { chain, address } = req.params;

    if (!alchemy) {
      console.error(".env varible missing: ALCHEMY_KEY");

      return res.sendStatus(500);
    }

    let network: Network | undefined;

    if (chain === "arb_geo") network = Network.ARB_GOERLI;
    if (chain === "arb_main") network = Network.ARB_MAINNET;
    if (chain === "arb_sep") network = Network.ARB_SEPOLIA;
    if (chain === "astar_main") network = Network.ASTAR_MAINNET;
    if (chain === "base_geo") network = Network.BASE_GOERLI;
    if (chain === "base_main") network = Network.BASE_MAINNET;
    if (chain === "eth_geo") network = Network.ETH_GOERLI;
    if (chain === "eth_main") network = Network.ETH_MAINNET;
    if (chain === "eth_sep") network = Network.ETH_SEPOLIA;
    if (chain === "matic_main") network = Network.MATIC_MAINNET;
    if (chain === "matic_mumbai") network = Network.MATIC_MUMBAI;
    if (chain === "opt_geo") network = Network.OPT_GOERLI;
    if (chain === "opt_main") network = Network.OPT_MAINNET;
    if (chain === "polygon_main") network = Network.POLYGONZKEVM_MAINNET;
    if (chain === "polygon_test") network = Network.POLYGONZKEVM_TESTNET;

    const config = { apiKey: alchemy, network };

    const _alchemy = new Alchemy(config);

    const _nfts = await _alchemy.nft.getNftsForOwner(address);

    return res
      .status(200)
      .json({ status: true, data: newNFTObj(_nfts), count: _nfts.totalCount });
  } catch (e: any) {
    console.error(e);

    return res.sendStatus(500);
  }
}

async function getUserCardsHandler(
  req: Request<GetUserCards["params"]>,
  res: Response
) {
  try {
    const { user } = req.params;

    const cards = await getUserCards(user);

    return res
      .status(200)
      .json({ status: true, data: cards, count: cards.length });
  } catch (e: any) {
    console.error(e);

    return res.sendStatus(500);
  }
}

async function getCardHandler(req: Request<GetCard["params"]>, res: Response) {
  try {
    const { cardId } = req.params;

    if (isNaN(parseInt(cardId))) return res.sendStatus(400);

    const card = await getCard(parseInt(cardId));

    return res.status(200).json({ status: true, data: card });
  } catch (e: any) {
    console.error(e);

    return res.sendStatus(500);
  }
}

async function getdAppsConnectedToCardHandler(
  req: Request<GetdAppsConnected["params"]>,
  res: Response
) {
  try {
    const { cardId } = req.params;

    if (isNaN(parseInt(cardId))) return res.sendStatus(400);

    const dApps = await getDappsConnectedToCard(parseInt(cardId));

    return res
      .status(200)
      .json({ status: true, data: dApps, count: dApps.length });
  } catch (e: any) {
    console.error(e);

    return res.sendStatus(500);
  }
}

async function uploadImageHandler(
  req: Request<{}, {}, UploadImage["body"]>,
  res: Response
) {
  try {
    const { image } = req.body;

    if (!freeimage) {
      console.error(".env varible missing: FREEIMAGE_KEY");

      return res.sendStatus(500);
    }

    const formdata = new FormData();
    formdata.append("key", freeimage);
    formdata.append("action", "upload");
    formdata.append("source", image);
    formdata.append("format", "json");

    const response = await fetch("https://freeimage.host/api/1/upload", {
      method: "POST",
      body: formdata,
    });

    const data = await response.json();

    if (!response.ok) return res.sendStatus(response.status);

    if (data?.status_code === 200 && data?.success?.code === 200) {
      return res.status(200).json({
        status: true,
        url: (data?.image?.file?.resource?.chain?.image as string) ?? null,
      });
    }

    return res.sendStatus(409);
  } catch (e: any) {
    console.error(e);

    return res.sendStatus(500);
  }
}

async function generateImageHandler(
  req: Request<{}, {}, GenerateImage["body"]>,
  res: Response
) {
  try {
    const { text } = req.body;

    const endpoint = "https://api.deepai.org/api/cyberpunk-portrait-generator";

    if (!deepai) {
      console.error(".env varible missing: DEEPAI_KEY");

      return res.sendStatus(500);
    }

    const headers = new Headers();
    headers.append("api-key", deepai);
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({ text });

    const response = await fetch(endpoint, { method: "POST", headers, body });

    const data = await response.json();

    if (!response.ok) return res.sendStatus(response.status);

    if (data.output_url) {
      const url = data.output_url;

      request.get(url).pipe(res);
    } else return res.sendStatus(400);
  } catch (e: any) {
    console.error(e);

    return res.sendStatus(500);
  }
}

export default {
  getNFTsHandler,
  getUserCardsHandler,
  getCardHandler,
  uploadImageHandler,
  generateImageHandler,
  getdAppsConnectedToCardHandler,
};
