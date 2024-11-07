import db from "../db/db.js";
import express from "express";
import { verifyUser } from "../auth/login.js";

const contactFormRoute = express.Router();

contactFormRoute.post("/contact-form", verifyUser, (req, res) => {
    console.log("Recebendo requisição para /contact-form");
    console.log("Corpo da requisição:", req.body);

    const { username, useremail, usernumber, usermessage } = req.body;
    const SQL = "INSERT INTO contactform (username, useremail, usernumber, usermessage) VALUES (?, ?, ?, ?)";

    db.run(SQL, [username, useremail, usernumber, usermessage], (err) => {
        if (err) {
            console.error("Erro ao inserir mensagem:", err);
            return res.status(500).send({ msg: "Erro ao inserir mensagem" });
        }
        res.status(200).send({ msg: "Mensagem inserida com sucesso" });
    });
});

export default contactFormRoute;