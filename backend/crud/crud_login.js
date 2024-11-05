import db from "../db/db.js";
import express from "express";
import { verifyUser } from "../auth/login.js";
import bcrypt from "bcrypt";

const saltRounds = 10;
const crudLoginRoute = express.Router();

crudLoginRoute.post("/crud-login", verifyUser, (req, res) => {
  const { username, userpassword, useremail, staff, created_at } = req.body;

  bcrypt.hash(userpassword, saltRounds, (err, hash) => {
    if (err) {
      console.error("Erro ao criptografar a senha:", err);
      return res.status(500).send({ msg: "Erro ao criptografar a senha" });
    }
    db.run(
      "INSERT INTO users (username, useremail, userpassword, staff, created_at) VALUES (?, ?, ?, ?, ?)",
      [username, useremail, hash, staff || 0, created_at],
      (err) => {
        if (err) {
          console.error("Erro ao cadastrar usuário:", err);
          return res.status(500).send({ msg: "Erro ao cadastrar usuário" });
        }
        return res.status(200).send({ msg: "Usuário criado com sucesso" });
      }
    );
  });
});

crudLoginRoute.get("/crud-login", verifyUser, (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      return res.status(500).send({ msg: "Erro ao buscar usuários" });
    }
    res.status(200).send(rows);
  });
});

crudLoginRoute.put("/crud-login", verifyUser, (req, res) => {
  const {
    id,
    username,
    olduserpassword,
    newuserpassword,
    useremail,
    staff,
    created_at,
  } = req.body;

  db.get("SELECT userpassword FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).send({ msg: "Erro ao buscar usuário" });
    }
    if (!result) {
      return res.status(404).send({ msg: "Usuário não encontrado" });
    }

    const currentPasswordHash = result.userpassword;

    if (newuserpassword) {
      bcrypt.compare(olduserpassword, currentPasswordHash, (err, match) => {
        if (err) {
          return res.status(500).send({ msg: "Erro ao comparar senhas" });
        }
        if (!match) {
          return res.status(400).send({ msg: "Senha antiga incorreta" });
        }

        bcrypt.hash(newuserpassword, saltRounds, (err, newHash) => {
          if (err) {
            return res.status(500).send({ msg: "Erro ao criar nova senha" });
          }

          const values = [username, useremail, newHash, staff, created_at, id];

          db.run(
            "UPDATE users SET username = ?, useremail = ?, userpassword = ?, staff = ?, created_at = ? WHERE id = ?",
            values,
            (err) => {
              if (err) {
                return res.status(500).send({ msg: "Erro ao atualizar usuário" });
              }
              return res.status(200).send({ msg: "Usuário atualizado com sucesso" });
            }
          );
        });
      });
    } else {
      const values = [username, useremail, staff, created_at, id];
      db.run(
        "UPDATE users SET username = ?, useremail = ?, staff = ?, created_at = ? WHERE id = ?",
        values,
        (err) => {
          if (err) {
            return res.status(500).send({ msg: "Erro ao atualizar usuário" });
          }
          res.status(200).send({ msg: "Usuário atualizado com sucesso" });
        }
      );
    }
  });
});


crudLoginRoute.delete("/crud-login/:id", verifyUser, (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).send({ msg: "Erro ao deletar usuário" });
    }
    res.status(200).send({ msg: "Usuário deletado com sucesso" });
  });
});

export default crudLoginRoute;
