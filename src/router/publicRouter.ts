import express from "express";
import imageRouter from "./image/images.router";

const publicRoutes = express.Router();
const Routes = [imageRouter];

Routes.forEach((route) => {
  publicRoutes.use("/api", route);
});

export default publicRoutes;
