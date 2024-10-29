import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer"

import routes from "./routes/routes.js";

import db from "./db/db.js";

dotenv.config();

const port = 5000;
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

export const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  secure: false,
  auth:{
    user: process.env.USER,
    pass: process.env.PASS
  }
})

transporter.verify((error, success) =>{
  if(error){
    console.log("Erro na configuração do transporter: ", error)

  }else{
    console.log("O transporter está pronto para enviar emails", success)
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
