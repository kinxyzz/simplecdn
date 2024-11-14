import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { ResponseError } from "../error/responseError";
import { createSafeImageName } from "../lib/utils";

dotenv.config();

export default async function uploadProductImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.file) throw new ResponseError(404, "No file was uploaded");
    const originalName = path.parse(req.file.originalname).name;
    const imageName = createSafeImageName(originalName);

    const uploadPath = path.join(process.env.STATIC_PATH as string, imageName);

    await fs.writeFile(uploadPath, req.file.buffer);
    res.status(200).json({ imageUrl: imageName });
  } catch (error) {
    next(error);
  }
}
