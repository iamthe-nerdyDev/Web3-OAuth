import { Request, Response } from "express";
import { CreateSession, DeleteSessionn, Login } from "../utils/schema";
import { createSession, deleteSession, triggerLogin } from "../utils/services";

async function triggerLoginHandler(
  req: Request<{}, {}, Login["body"]>,
  res: Response
) {
  try {
    const { id: dAppId } = res.locals.info;
    const response = await triggerLogin({ ...req.body, dAppId });

    if (response[0] == 0) {
      //user does not have a session
      //return all cards
      //verify possible that user does not have any card tho
      //so if count is `0` or `data.length` == 0:- no card created yet

      return res
        .status(200)
        .json({ status: true, data: response[1], count: response[1].length });
    }

    return res.status(200).json({ status: true, data: response[0] });
  } catch (e: any) {
    console.error(e);

    res.sendStatus(500);
  }
}

async function createSessionHandler(
  req: Request<{}, {}, CreateSession["body"]>,
  res: Response
) {
  try {
    const { id: dAppId } = res.locals.info;
    const response = await createSession({ ...req.body, dAppId });

    if (!response) return res.sendStatus(409);

    return res.status(200).json({ status: true, data: response });
  } catch (e: any) {
    console.error(e);

    res.sendStatus(500);
  }
}

async function deleteSessionHandler(
  req: Request<DeleteSessionn["params"]>,
  res: Response
) {
  try {
    const { token } = req.params;

    await deleteSession(token);

    return res.status(200).json({ status: true });
  } catch (e: any) {
    console.error(e);

    res.sendStatus(500);
  }
}

async function getdAppInfoHandler(_: Request, res: Response) {
  try {
    return res.status(200).json({ status: true, data: res.locals.info });
  } catch (e: any) {
    console.error(e);

    res.sendStatus(500);
  }
}

export default {
  triggerLoginHandler,
  createSessionHandler,
  deleteSessionHandler,

  getdAppInfoHandler,
};
