import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import CoinMarketCapProvider from "./coins/CoinMarketCapProvider";
import ApiV1InternalErrorException from "../../../shared/exceptions/ApiV1InternalErrorException";
const { OK } = StatusCodes;

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  let response;
  try {
    response = await new CoinMarketCapProvider().get(id);
  } catch (e) {
    throw new ApiV1InternalErrorException(e as string);
  }

  return res.status(OK).json(response);
};
