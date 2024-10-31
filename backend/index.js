import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer"

import routes from "./routes/routes.js";

import db from "./db/db.js";

dotenv.config();

const port = 3001;
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});