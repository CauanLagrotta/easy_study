import { useState, useEffect } from 'react';
import Axios from 'axios';
import { CardLogin } from './card-login.jsx';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function CrudLogin() {
    const [values, setValues] = useState({
        id: '',
        username: '',
        useremail: '',
        userpassword: '',
        staff: 0,
        created_at: '',
    });

    const [listLogin, setListLogin] = useState([]);

    const handleChangeValues = (event) => {
        setValues((prevValue) => ({
            ...prevValue,
            [event.target.name]: event.target.value,
        }));
    };

    const handleClickButton = async () => {
        try {
            await Axios.post("http://localhost:3001/crud/crud-login", {
                username: values.username,
                useremail: values.useremail,
                userpassword: values.userpassword,
                staff: values.staff,
                created_at: values.created_at,
            });

            toast.success("Usuario inserido com sucesso", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            const response = await Axios.get("http://localhost:3001/crud/crud-login");
            setListLogin(response.data);
        } catch (error) {
            console.error("Erro ao cadastrar login:", error);

            toast.error("Erro ao cadastrar login", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

        setValues({
            username: '',
            useremail: '',
            userpassword: '',
            staff: 0,
            created_at: '',
        });
    };

    useEffect(() => {
        const fetchLogins = async () => {
            try {
                const response = await Axios.get("http://localhost:3001/crud/crud-login");
                setListLogin(response.data);
            } catch (error) {
                console.error("Erro ao buscar logins:", error);
            }
        };
        fetchLogins();
    }, []);

    return (
        <div className="app--container">
            <div className="register--container">
                <input
                    autoComplete="off"
                    value={values.username}
                    className="register--input"
                    type="text"
                    name="username"
                    placeholder="Nome:"
                    onChange={handleChangeValues}
                />

                <input
                    autoComplete="off"
                    value={values.useremail}
                    className="register--input"
                    type="text"
                    name="useremail"
                    placeholder="Email:"
                    onChange={handleChangeValues}
                />
                <input
                    autoComplete="off"
                    value={values.userpassword}
                    className="register--input"
                    type="text"
                    name="userpassword"
                    placeholder="Senha:"
                    onChange={handleChangeValues}
                />
                <select
                    name="staff"
                    onChange={handleChangeValues}
                    value={values.staff}
                    className="register--input register--select"
                >
                    <option value="0">Usuário comum</option>
                    <option value="1">Administrador</option>
                </select>

                <button className="register--button" onClick={handleClickButton}>
                    Cadastrar
                </button>
            </div>

            {listLogin.map((value) => (
                <CardLogin
                    key={value.id}
                    listCard={listLogin}
                    setListLogin={setListLogin}
                    id={value.id}
                    username={value.username}
                    useremail={value.useremail}
                    userpassword={value.userpassword}
                    created_at={value.created_at}
                    staff={value.staff}
                />
            ))}

            <ToastContainer/>
        </div>
    );
}