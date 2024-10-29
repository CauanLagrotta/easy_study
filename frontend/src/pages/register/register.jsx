import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import Axios from "axios";

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    const type = showPassword ? "password" : "text";
    document.getElementById("password").setAttribute("type", type);
    document.getElementById("confirmPassword").setAttribute("type", type);
  };

  const validationRegister = yup.object().shape({
    name: yup.string().required("Este campo é obrigatório"),
    email: yup
      .string()
      .email("Email inválido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .required("Este campo é obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas devem ser iguais")
      .required("Este campo é obrigatório"),
  });

  const handleClickRegister = (values, { resetForm }) => {
    Axios.post("http://localhost:5000/register", {
      username: values.name,
      useremail: values.email,
      userpassword: values.password,
    })
      .then((res) => {
        if (res.data.msg === "Cadastrado com sucesso!") {
          toast.success(res.data.msg, { position: "bottom-left" });
          navigate("/login");
          resetForm();
        }
      })
      .catch((error) => {
        const errorMsg =
          error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : "Erro ao concluir registro!";
        toast.error(errorMsg, {
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
          <h1>Registrar-se</h1>
        </div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleClickRegister}
          validationSchema={validationRegister}
        >
          <Form className="login-form">
            <div className="login-form-group">
              <Field
                name="name"
                className="form-field"
                placeholder="Nome de usuário"
              />
              <ErrorMessage component="span" name="name" className="form-error" />
            </div>
            <div className="login-form-group">
              <Field
                name="email"
                className="form-field"
                placeholder="Email"
                type="email"
              />
              <ErrorMessage component="span" name="email" className="form-error" />
            </div>
            <div className="login-form-group">
              <div className="show-password-container">
                <Field
                  id="password"
                  name="password"
                  className="form-field"
                  placeholder="Senha"
                  type="password"
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              <ErrorMessage component="span" name="password" className="form-error" />
            </div>
            <div className="login-form-group">
              <div className="show-password-container">
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-field"
                  placeholder="Confirme sua senha"
                  type="password"
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              <ErrorMessage
                component="span"
                name="confirmPassword"
                className="form-error"
              />
            </div>
            <button className="login-button" type="submit">
              Registrar-se
            </button>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
}
