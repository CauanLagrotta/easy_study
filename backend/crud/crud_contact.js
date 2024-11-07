import db from "../db/db.js";
import express from "express";
import { verifyUser } from "../auth/login.js";

const crudContactRoute = express.Router();

crudContactRoute.post("/crud-contact", verifyUser, (req, res) => {
    const { username, useremail, usernumber, usermessage, contact_at } = req.body;
    const SQL = "INSERT INTO contactform (username, useremail, usernumber, usermessage, contact_at) VALUES (?, ?, ?, ?, ?)";

    db.run(SQL, [username, useremail, usernumber, usermessage, contact_at], (err) => {
        if(err){
            return res.status(500).send({msg: "Erro ao inserir mensagem"});
        }

        res.status(200).send({msg: "Mensagem inserida com sucesso"})
    })
})

crudContactRoute.get("/crud-contact", verifyUser, (req, res) => {
    const SQL = "SELECT * FROM contactform";

    db.all(SQL, (err, rows) => {
        if (err) {
            return res.status(500).send({ msg: "Erro ao buscar mensagens" });
        }

        res.status(200).send(rows);
    });
});


crudContactRoute.put("/crud-contact", verifyUser, (req, res) => {
    const { id, username, useremail, usernumber, usermessage, contact_at } = req.body;
    const SQL = "UPDATE contactform SET username = ?, useremail = ?, usernumber = ?, usermessage = ?, contact_at = ? WHERE id = ?";

    db.run(SQL, [username, useremail, usernumber, usermessage, contact_at, id], (err) => {
        if(err){
            return res.status(500).send({msg: "Erro ao atualizar mensagem"});
        }

        res.status(200).send({msg: "Mensagem atualizada com sucesso"})
    })
})

crudContactRoute.delete("/crud-contact/:id", verifyUser, (req, res) => {
    const { id } = req.params;
    const SQL = "DELETE FROM contactform WHERE id = ?";

    db.run(SQL, [id], (err) => {
        if (err) {
            return res.status(500).send({ msg: "Erro ao deletar mensagem" });
        }
        res.status(200).send({ msg: "Mensagem deletada com sucesso" });
    });
});

export default crudContactRoute