import { get } from "lodash";
import { NextFunction, Response, Request } from "express";
import { getdAppInfo } from "../utils/services";

async function deserialize(req: Request, res: Response, next: NextFunction) {
  let accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) return res.sendStatus(403);
  accessToken = "0x" + accessToken;

  const domain = get(req, "headers.x-origin") as string;
  if (!domain) return res.sendStatus(400);

  try {
    const response = await getdAppInfo(accessToken);
    res.locals.info = response;

    if (domain !== response.domain) return res.sendStatus(400);

    return next();
  } catch (e: any) {
    console.error(e);

    return res.sendStatus(500);
  }
}

export default deserialize;
