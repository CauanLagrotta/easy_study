import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { CardContact } from "./card-contact.jsx";
import "react-toastify/dist/ReactToastify.css";

export function CrudContact() {
  const [values, setValues] = useState({
    id: "",
    username: "",
    useremail: "",
    usernumber: "",
    usermessage: "",
    contact_at: "",
  });

  const [listContact, setListContact] = useState([]);

  const handleChangeValues = (event) => {
    setValues((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClickButton = async () => {
    try {
      await Axios.post("http://localhost:3001/crud/crud-contact", {
        username: values.username,
        useremail: values.useremail,
        usernumber: values.usernumber,
        usermessage: values.usermessage,
        contact_at: values.contact_at,
      });

      toast.success("Mensagem inserida com sucesso", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });

      const response = await Axios.get(
        "http://localhost:3001/crud/crud-contact"
      );
      setListContact(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar contato:", error);

      toast.error("Erro ao cadastrar contato", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }

    setValues({
      username: "",
      useremail: "",
      usernumber: "",
      usermessage: "",
      contact_at: "",
    });
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/crud/crud-contact"
        );
        setListContact(response.data);
      } catch (error) {
        console.error("Erro ao buscar contatos:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <input
        autoComplete="off"
        value={values.username}
        type="text"
        name="username"
        placeholder="Nome:"
        onChange={handleChangeValues}
      />

      <input
        type="text"
        autoComplete="off"
        value={values.useremail}
        className="register--input"
        name="useremail"
        placeholder="Email:"
        onChange={handleChangeValues}
      />

      <InputMask
        name="usernumber"
        mask="(99) 99999-9999"
        value={values.usernumber}
        placeholder="Telefone: "
        onChange={handleChangeValues}
      >
        {(inputProps) => (
          <input
            {...inputProps}
            type="text"
            name="usernumber"
            placeholder="Telefone"
            onChange={handleChangeValues}
          />
        )}
      </InputMask>

      <textarea
        autoComplete="off"
        value={values.usermessage}
        name="usermessage"
        placeholder="Mensagem:"
        onChange={handleChangeValues}
        cols={30}
        rows={10}
        style={{ resize: "vertical" }}
      />

      <button onClick={handleClickButton}>Cadastrar</button>

      {listContact.map((value) => (
        <CardContact
          key={value.id}
          setListContact={setListContact}
          id={value.id}
          username={value.username}
          useremail={value.useremail}
          usernumber={value.usernumber}
          usermessage={value.usermessage}
          contact_at={value.contact_at}
        />
      ))}

      <ToastContainer />
    </div>
  );
}
