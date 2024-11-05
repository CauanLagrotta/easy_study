import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";

export function DialogLogin(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        username: props.username,
        useremail: props.useremail,
        userpassword: props.userpassword,
        staff: props.staff,
        created_at: props.created_at
    });

    // const handleOpen = () => {
    //     props.setOpen(true);
    // };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleEdit = () =>{
        Axios.put("http://localhost:3001/crud/crud-login", {
            id: editValues.id,
            username: editValues.username,
            useremail: editValues.useremail,
            userpassword: editValues.userpassword,
            staff: editValues.staff,
            created_at: editValues.created_at

        }).then((response) =>{
            console.log(response);
            Axios.get("http://localhost:3001/crud/crud-login").then((response)=>{
                props.setListLogin(response.data);
            })
        })

        handleClose();
    }

    const handleDelete = () =>{
        Axios.delete(`http://localhost:3001/crud/crud-login/${editValues.id}`).then((response) => {
            console.log(response);
            Axios.get("http://localhost:3001/crud/crud-login").then((response)=>{
                props.setListLogin(response.data);
            })
        })

        handleClose();
    }

    const handleChangeValues = (value) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [value.target.name]: value.target.value,
        }));
    };


    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editar</DialogTitle>

                <DialogContent>
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="id" name="id" label="id" type="text" fullWidth value={editValues.id} disabled/>
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="username" name="username" label="Usuário" type="text" fullWidth value={editValues.username} />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="email" name="useremail" label="Email" type="email" fullWidth value={editValues.email} />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="password" name="userpassword" label="Senha" type="password" fullWidth value={editValues.password} disabled />
                    <Select id="staff" name="staff" value={editValues.staff} onChange={handleChangeValues} fullWidth>
                        <MenuItem value={0}>Usuário Comum</MenuItem>
                        <MenuItem value={1}>Administrador</MenuItem>
                    </Select>
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="created_at" name="created_at" label="Criado em" type="text" fullWidth value={editValues.created_at} disabled/>
                </DialogContent>

                <DialogActions>
                    <Button className="btn--dialog" onClick={handleClose} color="primary">
                        Cancelar
                    </Button>

                    <Button className="btn--dialog" onClick={handleEdit} color="primary">
                        Salvar
                    </Button>

                    <Button className="btn--dialog" onClick={handleDelete} color="primary">
                        Remover
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

DialogLogin.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    useremail: PropTypes.string.isRequired,
    userpassword: PropTypes.string.isRequired,
    staff: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    setListLogin: PropTypes.func.isRequired,
};