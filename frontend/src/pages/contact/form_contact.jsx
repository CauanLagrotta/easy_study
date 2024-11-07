import InputMask from "react-input-mask";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function FormContact() {
  const navigate = useNavigate();
  const maxLength = 200; 
  const validationContact = yup.object().shape({
    username: yup.string().required("Este campo é obrigatório"),
    useremail: yup
      .string()
      .email("Endereço de email inválido")
      .required("Este campo é obrigatório"),
    usernumber: yup.string().required("Este campo é obrigatório"),
    usermessage: yup
      .string()
      .required("Este campo é obrigatório")
      .max(maxLength, `Limite de ${maxLength} caracteres`),
  });

  const submitForm = async (values) => {
    try {
      const res = await Axios.post("http://localhost:3001/contact/contact-form", values, {
        withCredentials: true,
      });
      if (res.data.msg === "Mensagem inserida com sucesso") {
        toast.success("Mensagem inserida com sucesso", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Você precisa estar logado", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast.error("Erro ao inserir mensagem", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          useremail: "",
          usernumber: "",
          usermessage: "",
        }}
        onSubmit={submitForm}
        validationSchema={validationContact}
      >
        {({ values }) => (
          <Form>
            <Field type="text" name="username" placeholder="Nome" />
            <ErrorMessage name="username" component="span" />

            <Field type="email" name="useremail" placeholder="Email" />
            <ErrorMessage name="useremail" component="span" />

            <Field name="usernumber">
              {({ field }) => (
                <InputMask
                  {...field}
                  mask="(99) 99999-9999"
                  placeholder="Número de contato"
                />
              )}
            </Field>
            <ErrorMessage name="usernumber" component="span" />

            <Field
              as="textarea"
              name="usermessage"
              placeholder="Mensagem"
              cols={30}
              rows={5}
              maxLength={maxLength}
              style={{ resize: "vertical" }}
            />
            <div>
              {maxLength - values.usermessage.length} caracteres restantes
            </div>
            <ErrorMessage name="usermessage" component="span" />

            <button type="submit">Enviar</button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}
