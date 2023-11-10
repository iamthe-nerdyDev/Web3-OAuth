import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";

import { ISignIn } from "../interface";

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (e: any) {
      return res.status(400).json({ status: false, message: e.message });
    }
  };
};

export const Schemas = {
  main: {
    login: Joi.object<ISignIn>({
      user: Joi.string()
        .regex(/(0x)?[0-9a-fA-F]{40}/)
        .required(),
      accessToken: Joi.string().required(),
      domain: Joi.string().required(),
      message: Joi.string().required(),
      signature: Joi.string()
        .regex(/(0x)?[0-9a-fA-F]{130}/)
        .required(),
    }),
    session: Joi.object<ISignIn>({
      cardId: Joi.number().required(),
      user: Joi.string()
        .regex(/(0x)?[0-9a-fA-F]{40}/)
        .required(),
      accessToken: Joi.string().required(),
      domain: Joi.string().required(),
      message: Joi.string().required(),
      signature: Joi.string()
        .regex(/(0x)?[0-9a-fA-F]{130}/)
        .required(),
    }),
  },
};
