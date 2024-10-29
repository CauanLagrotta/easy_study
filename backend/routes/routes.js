import express from "express";
import loginRoute from "../auth/login.js";
import registerRoute from "../auth/register.js";

const router = express.Router();

router.use("/auth", loginRoute);
router.use("/register", registerRoute);

export default router;