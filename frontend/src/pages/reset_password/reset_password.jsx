import { useParams } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import Axios from "axios";

export function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const { userid, token } = useParams();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);

    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");

    if (passwordField && confirmPasswordField) {
      const type = showPassword ? "password" : "text";

      passwordField.setAttribute("type", type);
      confirmPasswordField.setAttribute("type", type);
    }
  };

  const validationResetPassword = yup.object().shape({
    userpassword: yup
      .string()
      .min(8, "A nova senha deve ter no mínimo 8 caracteres")
      .required("Este campo é obrigatório"),
    userconfirmPassword: yup
      .string()
      .oneOf([yup.ref("userpassword"), null], "As senhas devem ser iguais")
      .required("Este campo é obrigatório"),
  });

  const handleResetPassword = (values, { resetForm }) => {
    Axios.post(`http://localhost:3001/auth/reset-password/${userid}/${token}`, {
      userpassword: values.userpassword,
    })
      .then((res) => {
        if (res.data.msg === "Senha atualizada com sucesso") {
          navigate("/login");
          resetForm();
        }
      })
      .catch(() => {
        toast.error("Erro ao redefinir senha!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      });
  };

  return (
    <div className="container">
      <div className="contents">
        <div className="box-tittle">
          <h1>Redefinir Senha</h1>
        </div>

        <Formik
          initialValues={{ userpassword: "", userconfirmPassword: "" }}
          onSubmit={handleResetPassword}
          validationSchema={validationResetPassword}
        >
          <Form className="login-form">
            <div className="login-form-group">
              <div className="show-password-container">
                <Field
                  id="password"
                  name="userpassword"
                  className="form-field"
                  placeholder="Nova Senha"
                  type="password"
                />
                <button
                  className="show-password"
                  type="button"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              <ErrorMessage
                component="span"
                name="userpassword"
                className="form-error"
              />
            </div>

            <div className="login-form-group">
              <div className="show-password-container">
                <Field
                  id="confirmPassword"
                  name="userconfirmPassword"
                  className="form-field"
                  placeholder="Confirme a Nova Senha"
                  type="password"
                />
                <button
                  className="show-password"
                  type="button"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              <ErrorMessage
                component="span"
                name="userconfirmPassword"
                className="form-error"
              />
            </div>

            <button className="login-button" type="submit">
              Redefinir Senha
            </button>
          </Form>
        </Formik>
      </div>

      <ToastContainer />
    </div>
  );
}