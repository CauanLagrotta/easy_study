import express from "express";
import loginRoute from "../auth/login.js";
import registerRoute from "../auth/register.js";
import forgotPasswordRoute from "../auth/forgot-password.js";
import resetPasswordRoute from "../auth/reset-password.js";

import crudLoginRoute from "../crud/crud_login.js";



const router = express.Router();

// Rotas de Autenticação
router.use("/auth", forgotPasswordRoute);
router.use("/auth", resetPasswordRoute);
router.use("/auth", loginRoute);
router.use("/auth", registerRoute);

// Rotas de CRUD
router.use("/crud", crudLoginRoute)

export default router;