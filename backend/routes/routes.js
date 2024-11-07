import express from "express";

import loginRoute from "../auth/login.js";
import registerRoute from "../auth/register.js";
import forgotPasswordRoute from "../auth/forgot-password.js";
import resetPasswordRoute from "../auth/reset-password.js";

import contactFormRoute from "../contact/contact.js";

import crudLoginRoute from "../crud/crud_login.js";
import crudContactRoute from "../crud/crud_contact.js";


const router = express.Router();

// Rotas de Autenticação
router.use("/auth", forgotPasswordRoute);
router.use("/auth", resetPasswordRoute);
router.use("/auth", loginRoute);
router.use("/auth", registerRoute);

// Rotas de Contact
router.use("/contact", contactFormRoute);

// Rotas de CRUD
router.use("/crud", crudLoginRoute)
router.use("/crud", crudContactRoute);


export default router;