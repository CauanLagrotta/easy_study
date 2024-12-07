import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "@mui/icons-material/Logout";
import Axios from "axios";

export function Header() {
  const [auth, setAuth] = useState(false);
  const [staff, setStaff] = useState(0);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/auth/header")
      .then((res) => {
        console.log("Header: ", res.data);

        if (res.data.msg === "Autenticação bem-sucedida") {
          setAuth(true);
          setStaff(res.data.user.staff);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => console.log("Erro ao buscar header:", err));
  }, []);

  const handleLogout = () => {
    Axios.get("http://localhost:3001/auth/logout")
      .then(() => {
        location.reload(true);
      })
      .catch((err) => console.log("Erro ao fazer logout:", err));
  };

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/form_contact">Contato</Link>

        {auth && staff === 1 && (
          <>
            <Link to="/crud_login">Crud Login</Link>
            <Link to="/crud_contact">Crud Contato</Link>
          </>
        )}

        {auth ? (
          <Logout onClick={handleLogout} />
        ) : (
          <>
            <Link to="/login"> Login </Link>
            <Link to="/register"> Register </Link>
          </>
        )}
      </div>
    </div>
  );
}
