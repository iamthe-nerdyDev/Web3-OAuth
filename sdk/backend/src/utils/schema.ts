import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    signer: z.string().regex(/(0x)?[0-9a-fA-F]{40}/),
    nonce: z.number(),
    signature: z.string().regex(/(0x)?[0-9a-fA-F]{130}/),
  }),
});

export const createSessionSchema = z.object({
  body: z.object({
    cardId: z.number(),
    signer: z.string().regex(/(0x)?[0-9a-fA-F]{40}/),
    nonce: z.number(),
    signature: z.string().regex(/(0x)?[0-9a-fA-F]{130}/),
  }),
});

export const deleteSessionSchema = z.object({
  params: z.object({ token: z.string().regex(/(0x)?[0-9a-fA-F]{64}/) }),
});

export type Login = z.TypeOf<typeof loginSchema>;
export type CreateSession = z.TypeOf<typeof createSessionSchema>;
export type DeleteSessionn = z.TypeOf<typeof deleteSessionSchema>;
