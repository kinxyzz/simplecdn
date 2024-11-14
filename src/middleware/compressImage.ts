import { NextFunction, Request, Response } from "express";
import sharp from "sharp";

export default async function compressImage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  try {
    const buffer = await sharp(req.file.buffer)
      .jpeg({ quality: 70 })
      .toBuffer();

    req.file.buffer = buffer;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error compressing image.");
    return;
  }
}
