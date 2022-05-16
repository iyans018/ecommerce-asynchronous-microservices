import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { productRoutes } from "../api/routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(productRoutes);

export default app;