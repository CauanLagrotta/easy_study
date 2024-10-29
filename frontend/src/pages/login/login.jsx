import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Axios from "axios";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);

    if (showPassword) {
      document.getElementById("password").setAttribute("type", "password");
    } else {
      document.getElementById("password").setAttribute("type", "text");
    }
  };

  const validationLogin = yup.object().shape({
    useremail: yup
      .string()
      .email("Endereço de email inválido")
      .required("Este campo é obrigatório"),

    userpassword: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 dígitos")
      .required("Este campo é obrigatório"),
  });

  const handleClickLogin = (values, { resetForm }) => {
    Axios.post("http://localhost:5000/auth/", {
      useremail: values.useremail,
      userpassword: values.userpassword,
    })
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.msg === "Login efetuado com sucesso") {
          navigate("/");
          resetForm();
        }
      })
      .catch(() => {
        toast.error("Senha inválida", {
          icon: false,
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
      <div className="right-side">
        <Formik
          initialValues={{ useremail: "", userpassword: "" }}
          onSubmit={handleClickLogin}
          validationSchema={validationLogin}
        >
          <Form>
            <div className="container-inputs">
              <div className="input-group">
                <label>Email:</label>
                <Field
                  type="email"
                  name="useremail"
                  placeholder="useremail@example.com"
                />
                <ErrorMessage name="useremail" component="span" />
              </div>

              <div className="input-group">
                <div className="password-label-container">
                  <label>Senha:</label>
                  {showPassword ? (
                    <Visibility onClick={handleClickShowPassword} />
                  ) : (
                    <VisibilityOff onClick={handleClickShowPassword} />
                  )}
                </div>

                <Field
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="userpassword"
                  placeholder="Senha de no mínimo 8 dígitos"
                />
                <ErrorMessage name="userpassword" component="span" />
              </div>
            </div>

            <Link to="/register">Cadastre-se</Link>
            <Link to="/forgot-password">Esqueceu sua senha?</Link>

            <button type="submit">Entrar</button>
          </Form>
        </Formik>
      </div>

      <ToastContainer />
    </div>
  );
}
