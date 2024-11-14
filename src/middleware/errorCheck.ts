import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/responseError";

export const errorCheck = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ResponseError) {
    res.status(error.status).json({ error: error.message });
  } else {
    res.status(500).json({ error: error.message });
  }
};
