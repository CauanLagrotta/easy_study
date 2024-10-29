import generateResetToken from "./reset-password.js"
import express from "express"
import db from "../db/db.js"

const forgotPasswordRoute = express.Router()

forgotPasswordRoute.post("/", (req, res) =>{
    const { useremail } = req.body;

    db.get("SELECT * FROM users WHERE useremail")
})


