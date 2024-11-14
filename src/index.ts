import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import path from "path";
import { errorCheck } from "./middleware/errorCheck";
import publicRoutes from "./router/publicRouter";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(
  "/uploads",
  express.static(path.join(process.env.STATIC_PATH as string))
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorCheck);
app.use(publicRoutes);
app.listen(port, () => {
  console.log(`Server is Fire at ${port}`);
});

export default app;
