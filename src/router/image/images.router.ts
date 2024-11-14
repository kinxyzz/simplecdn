import express from "express";
import upload from "../../config/multer";
import uploadProductImage from "../../controller/uploadImage";
import compressImage from "../../middleware/compressImage";

const imageRouter = express.Router();

imageRouter.post(
  "/upload-image",
  upload.single("file"),
  compressImage,
  uploadProductImage
);

export default imageRouter;
