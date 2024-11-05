import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

export function ForgotPassword() {
  Axios.defaults.withCredentials = true;

  const validationForgotPassword = yup.object().shape({
    useremail: yup
      .string()
      .email("Email inválido")
      .required("Este campo é obrigatório"),
  });

  const handleForgotPassword = (values, { resetForm }) => {
    console.log("Valores enviados:", values); 
    Axios.post("http://localhost:3001/auth/forgot-password", {
      useremail: values.useremail,
    })
      .then((res) => {
        console.log("Resposta do servidor:", res.data); 
        if (res.data.msg === "Email para redefinição de senha enviado com sucesso") {
          toast.success("Email para redefinição de senha enviado com sucesso", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
          resetForm();
        }
      })
      .catch((err) => {
        console.error("Erro ao enviar o email:", err);
        toast.error("Erro ao enviar link para redefinir a senha", {
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
    <div>
      <div className="container">
        <div className="contents">
          <div className="box-title">
            <h1>Esqueceu a senha?</h1>
          </div>

          <Formik
            initialValues={{ useremail: "" }}
            onSubmit={handleForgotPassword}
            validationSchema={validationForgotPassword}
          >
            <Form className="login-form">
              <div className="login-form-group">
                <Field
                  name="useremail"
                  className="form-field"
                  placeholder="Email"
                />
                <ErrorMessage
                  component="span"
                  name="useremail"
                  className="form-error"
                />
              </div>

              <button className="login-button" type="submit">
                Quero receber uma confirmação por email
              </button>
            </Form>
          </Formik>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}
