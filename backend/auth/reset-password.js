import dotenv from "dotenv"
dotenv.config()

import jwt from "jsonwebtoken"

export const generateResetToken = (useremail, id) => {
    const payload = { useremail, id };
    const options = { expiresIn: "1d" }
    const secret = process.env.TOKEN
    return jwt.sign(payload, secret, options,)
}

