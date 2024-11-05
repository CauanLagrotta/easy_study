import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/home.jsx";
import { Login } from "../pages/login/login.jsx";
import { ForgotPassword } from "../pages/forgot_password/forgot_password.jsx";
import { ResetPassword } from "../pages/reset_password/reset_password.jsx";
import { Register } from "../pages/register/register.jsx";
import { CrudLogin } from "../pages/crud_login/crud-login.jsx";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password/:userid/:token" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/crud_login" element={<CrudLogin />} />

        </Routes>
    );
}