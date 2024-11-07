import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputMask from "react-input-mask";
import Axios from "axios";

export function DialogContact(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    username: props.username,
    useremail: props.useremail,
    usernumber: props.usernumber,
    usermessage: props.usermessage,
    contact_at: props.contact_at,
  });

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEdit = () => {
    Axios.put("http://localhost:3001/crud/crud-contact", {
      id: editValues.id,
      username: editValues.username,
      useremail: editValues.useremail,
      usernumber: editValues.usernumber,
      usermessage: editValues.usermessage,
      contact_at: editValues.contact_at,
      
    }).then((response) => {
      console.log(response);
      Axios.get("http://localhost:3001/crud/crud-contact").then((response) => {
        props.setListContact(response.data);
      });
      handleClose();

    }).catch((error) => {
      console.error("Erro ao editar contato:", error);
    });
  };
  

  const handleDelete = () => {
    Axios.delete(`http://localhost:3001/crud/crud-contact/${editValues.id}`).then((response) => {
      console.log(response);
      Axios.get("http://localhost:3001/crud/crud-contact").then((response) => {
        props.setListContact(response.data);
      });
    });
    handleClose();
  };

  const handleChangeValues = (event) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar Contato</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            value={editValues.username}
            onChange={handleChangeValues}
          />
          <TextField
            margin="dense"
            name="useremail"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={editValues.useremail}
            onChange={handleChangeValues}
          />
          <InputMask
            mask="(99) 99999-9999"
            value={editValues.usernumber}
            onChange={handleChangeValues}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                margin="dense"
                name="usernumber"
                label="Telefone"
                type="text"
                fullWidth
                variant="standard"
              />
            )}
          </InputMask>
          <TextField
            margin="dense"
            name="usermessage"
            label="Mensagem"
            type="text"
            fullWidth
            variant="standard"
            value={editValues.usermessage}
            onChange={handleChangeValues}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleEdit}>Salvar</Button>
          <Button onClick={handleDelete}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogContact.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setListContact: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  useremail: PropTypes.string.isRequired,
  usernumber: PropTypes.string.isRequired,
  usermessage: PropTypes.string.isRequired,
  contact_at: PropTypes.string.isRequired,
};
