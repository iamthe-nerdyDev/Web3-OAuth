import { z } from "zod";

export const getNFTsSchema = z.object({
  params: z.object({
    chain: z.enum([
      "arb_geo",
      "arb_main",
      "arb_sep",
      "astar_main",
      "base_geo",
      "base_main",
      "eth_geo",
      "eth_main",
      "eth_sep",
      "matic_main",
      "matic_mumbai",
      "opt_geo",
      "opt_main",
      "polygon_main",
      "polygon_test",
    ]),
    address: z.string().regex(/(0x)?[0-9a-fA-F]{40}/),
  }),
});

export const generateImageSchema = z.object({
  body: z.object({ text: z.string().min(1) }),
});

export const uploadImageSchema = z.object({
  body: z.object({ image: z.string().min(1) }),
});

export const getdAppsConnectedToCardSchema = z.object({
  params: z.object({ cardId: z.string() }),
});

export const getUserCardsSchema = z.object({
  params: z.object({ user: z.string().regex(/(0x)?[0-9a-fA-F]{40}/) }),
});

export const getCardSchema = z.object({
  params: z.object({ cardId: z.string() }),
});

export type GenerateImage = z.TypeOf<typeof generateImageSchema>;
export type UploadImage = z.TypeOf<typeof uploadImageSchema>;
export type GetUserCards = z.TypeOf<typeof getUserCardsSchema>;
export type GetCard = z.TypeOf<typeof getCardSchema>;
export type GetdAppsConnected = z.TypeOf<typeof getdAppsConnectedToCardSchema>;
export type GetNFTs = z.TypeOf<typeof getNFTsSchema>;
